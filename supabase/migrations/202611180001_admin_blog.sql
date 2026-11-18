begin;

create schema if not exists private;
revoke all on schema private from public;
grant usage on schema private to authenticated;

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text not null default '',
  role text not null default 'reader' check (role in ('reader', 'admin'))
);
alter table public.profiles enable row level security;
revoke all on public.profiles from anon, authenticated;
grant select on public.profiles to authenticated;
create policy "Read own profile" on public.profiles for select to authenticated using (id = (select auth.uid()));

create function private.is_admin() returns boolean
language sql stable security definer set search_path = ''
as $$ select exists (select 1 from public.profiles where id = (select auth.uid()) and role = 'admin'); $$;
revoke all on function private.is_admin() from public;
grant execute on function private.is_admin() to authenticated;

create function private.handle_new_user() returns trigger
language plpgsql security definer set search_path = '' as $$
begin
  insert into public.profiles (id, display_name)
  values (new.id, left(coalesce(new.raw_user_meta_data ->> 'full_name', ''), 100));
  return new;
end;
$$;
revoke all on function private.handle_new_user() from public;
create trigger on_auth_user_created after insert on auth.users
for each row execute function private.handle_new_user();
insert into public.profiles (id) select id from auth.users on conflict (id) do nothing;

create table public.blog_posts (
  id uuid primary key default gen_random_uuid(),
  author_id uuid not null references auth.users(id),
  locale text not null check (locale in ('vi', 'en')),
  title text not null check (char_length(title) between 3 and 160),
  slug text not null check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$' and char_length(slug) <= 160),
  excerpt text not null default '' check (char_length(excerpt) <= 320),
  cover_image text not null default '',
  tags text[] not null default '{}' check (cardinality(tags) <= 12),
  content jsonb not null default '[]' check (jsonb_typeof(content) = 'array' and jsonb_array_length(content) <= 100 and octet_length(content::text) <= 262144),
  status text not null default 'draft' check (status in ('draft', 'published')),
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  version integer not null default 1,
  unique (locale, slug),
  check (status <> 'published' or published_at is not null)
);
create index blog_posts_published on public.blog_posts (locale, published_at desc) where status = 'published';
create index blog_posts_updated on public.blog_posts (updated_at desc);
alter table public.blog_posts enable row level security;
revoke all on public.blog_posts from anon, authenticated;
grant select on public.blog_posts to anon;
grant select, insert, update, delete on public.blog_posts to authenticated;
create policy "Read published posts" on public.blog_posts for select to anon, authenticated using (status = 'published');
create policy "Admins manage posts" on public.blog_posts for all to authenticated
using ((select private.is_admin())) with check ((select private.is_admin()));

create function private.touch_post() returns trigger language plpgsql set search_path = '' as $$
begin
  new.updated_at = now();
  new.version = old.version + 1;
  return new;
end;
$$;
revoke all on function private.touch_post() from public;
create trigger update_post_version before update on public.blog_posts for each row execute function private.touch_post();

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('blog-images', 'blog-images', true, 5242880, array['image/jpeg', 'image/png', 'image/webp', 'image/avif']);
create policy "Admins upload blog images" on storage.objects for insert to authenticated
with check (bucket_id = 'blog-images' and (select private.is_admin()) and (storage.foldername(name))[1] = (select auth.uid())::text);
create policy "Admins read blog image records" on storage.objects for select to authenticated
using (bucket_id = 'blog-images' and (select private.is_admin()));
create policy "Admins delete blog images" on storage.objects for delete to authenticated
using (bucket_id = 'blog-images' and (select private.is_admin()));

commit;
