// @vitest-environment node
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { PGlite } from '@electric-sql/pglite';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';

const adminId = '51f939ae-9ae2-42d2-a439-986a59302db7';
const readerId = 'bc4c4b71-1fef-42ec-ac2f-60912bc43403';
let db: PGlite;

beforeAll(async () => {
  db = new PGlite();
  // Reproduce the Supabase-owned schemas/functions; the application migration is unmodified.
  await db.exec(`
    create role anon;
    create role authenticated;
    create schema auth;
    create table auth.users (id uuid primary key, raw_user_meta_data jsonb default '{}');
    create function auth.uid() returns uuid language sql stable as $$ select nullif(current_setting('request.jwt.claim.sub', true), '')::uuid; $$;
    create schema storage;
    create table storage.buckets (id text primary key, name text, public boolean, file_size_limit bigint, allowed_mime_types text[]);
    create table storage.objects (id uuid primary key default gen_random_uuid(), bucket_id text, name text);
    alter table storage.objects enable row level security;
    create function storage.foldername(name text) returns text[] language sql immutable as $$ select (string_to_array(name, '/'))[1:array_length(string_to_array(name, '/'), 1)-1]; $$;
    grant usage on schema auth, storage to anon, authenticated;
    grant select, insert, delete on storage.objects to authenticated;
    insert into auth.users (id) values ('${adminId}'), ('${readerId}');
  `);
  await db.exec(await readFile(resolve('supabase/migrations/202611180001_admin_blog.sql'), 'utf8'));
  await db.query("update public.profiles set role = 'admin' where id = $1", [adminId]);
  await db.query(`insert into public.blog_posts (author_id, locale, title, slug, status, published_at) values
    ($1, 'en', 'A private draft', 'private-draft', 'draft', null),
    ($1, 'en', 'A published story', 'published-story', 'published', now())`, [adminId]);
}, 60000);

afterAll(async () => { await db?.close(); });

function asUser<T>(role: 'anon' | 'authenticated', userId: string | null, sql: string, params: unknown[] = []) {
  return db.transaction(async (tx) => {
    await tx.exec(`set local role ${role}`);
    await tx.query("select set_config('request.jwt.claim.sub', $1, true)", [userId ?? '']);
    return tx.query<T>(sql, params);
  });
}

describe('Actual PostgreSQL migration and role policies', () => {
  it('allows anonymous visitors and readers to see published posts only', async () => {
    const anonymous = await asUser<{ slug: string }>('anon', null, 'select slug from public.blog_posts');
    const reader = await asUser<{ slug: string }>('authenticated', readerId, 'select slug from public.blog_posts');
    expect(anonymous.rows).toEqual([{ slug: 'published-story' }]);
    expect(reader.rows).toEqual([{ slug: 'published-story' }]);
  });
  it('allows admins to read drafts without recursive profile policies', async () => {
    const result = await asUser<{ slug: string }>('authenticated', adminId, 'select slug from public.blog_posts order by slug');
    expect(result.rows).toEqual([{ slug: 'private-draft' }, { slug: 'published-story' }]);
  });
  it('prevents readers and anonymous users from inserting posts directly', async () => {
    const sql = "insert into public.blog_posts (author_id, locale, title, slug) values ($1, 'en', 'Unauthorized story', 'unauthorized-story')";
    await expect(asUser('authenticated', readerId, sql, [readerId])).rejects.toThrow(/row-level security/);
    await expect(asUser('anon', null, sql, [readerId])).rejects.toThrow(/permission denied/);
  });
  it('does not allow a reader to change roles, insert profiles, or view another profile', async () => {
    await expect(asUser('authenticated', readerId, "update public.profiles set role = 'admin' where id = $1", [readerId])).rejects.toThrow(/permission denied/);
    await expect(asUser('authenticated', readerId, "insert into public.profiles values ($1, '', 'admin')", [crypto.randomUUID()])).rejects.toThrow(/permission denied/);
    const other = await asUser('authenticated', readerId, 'select * from public.profiles where id = $1', [adminId]);
    expect(other.rows).toEqual([]);
  });
  it('prevents readers from updating or deleting published posts', async () => {
    const update = await asUser('authenticated', readerId, "update public.blog_posts set title = 'Unauthorized change' where slug = 'published-story' returning id");
    const removed = await asUser('authenticated', readerId, "delete from public.blog_posts where slug = 'published-story' returning id");
    expect(update.rows).toEqual([]);
    expect(removed.rows).toEqual([]);
    const original = await db.query<{ title: string }>("select title from public.blog_posts where slug = 'published-story'");
    expect(original.rows).toEqual([{ title: 'A published story' }]);
  });
  it('ignores a forged admin role in signup metadata', async () => {
    const id = crypto.randomUUID();
    await db.query("insert into auth.users values ($1, '{\"role\":\"admin\",\"full_name\":\"A reader\"}')", [id]);
    const result = await db.query<{ role: string }>('select role from public.profiles where id = $1', [id]);
    expect(result.rows).toEqual([{ role: 'reader' }]);
  });
  it('increments versions in the database and rejects stale updates', async () => {
    const inserted = await asUser<{ id: string; version: number }>('authenticated', adminId,
      "insert into public.blog_posts (author_id, locale, title, slug) values ($1, 'en', 'Versioned story', 'versioned-story') returning id, version", [adminId]);
    const id = inserted.rows[0].id;
    expect(inserted.rows[0].version).toBe(1);
    const saved = await asUser<{ version: number }>('authenticated', adminId,
      "update public.blog_posts set title = 'Updated story' where id = $1 and version = 1 returning version", [id]);
    expect(saved.rows).toEqual([{ version: 2 }]);
    const stale = await asUser('authenticated', adminId,
      "update public.blog_posts set title = 'Stale overwrite' where id = $1 and version = 1 returning id", [id]);
    expect(stale.rows).toEqual([]);
  });
  it('enforces publication dates and unique slugs by language', async () => {
    await expect(db.query("insert into public.blog_posts (author_id, locale, title, slug, status) values ($1, 'en', 'No publication date', 'bad-date', 'published')", [adminId])).rejects.toThrow(/check constraint/);
    await expect(db.query("insert into public.blog_posts (author_id, locale, title, slug) values ($1, 'en', 'Duplicate story', 'published-story')", [adminId])).rejects.toThrow(/unique constraint/);
  });
  it('denies reader media uploads and restricts admin uploads to their own folder', async () => {
    const insert = "insert into storage.objects (bucket_id, name) values ('blog-images', $1)";
    await expect(asUser('authenticated', readerId, insert, [`${readerId}/image.jpg`])).rejects.toThrow(/row-level security/);
    await expect(asUser('authenticated', adminId, insert, [`${readerId}/image.jpg`])).rejects.toThrow(/row-level security/);
    await expect(asUser('authenticated', adminId, insert, [`${adminId}/image.jpg`])).resolves.toBeDefined();
    const bucket = await db.query<{ file_size_limit: number; allowed_mime_types: string[] }>('select file_size_limit, allowed_mime_types from storage.buckets');
    expect(Number(bucket.rows[0].file_size_limit)).toBe(5242880);
    expect(bucket.rows[0].allowed_mime_types).not.toContain('image/svg+xml');
  });
});
