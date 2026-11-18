import 'server-only';
import { z } from 'zod';
import { requireAdmin } from '@/lib/auth';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import type { Locale } from '@/types/content';

const summaryColumns = 'id, title, slug, excerpt, cover_image, locale, tags, status, published_at, updated_at, version' as const;

export async function getAdminPosts(locale: Locale, query = '', status = 'all', page = 1) {
  await requireAdmin(locale);
  const supabase = await createSupabaseServerClient();
  if (!supabase) throw new Error('POSTS_UNAVAILABLE');
  let request = supabase.from('blog_posts').select(summaryColumns, { count: 'exact' }).order('updated_at', { ascending: false });
  if (query.trim()) request = request.ilike('title', `%${query.trim().slice(0, 100)}%`);
  if (status === 'draft' || status === 'published') request = request.eq('status', status);
  const { data, count, error } = await request.range((page - 1) * 20, page * 20 - 1);
  if (error) throw new Error('POSTS_UNAVAILABLE');
  return { posts: data ?? [], total: count ?? 0 };
}

export async function getAdminPost(id: string, locale: Locale) {
  await requireAdmin(locale);
  if (!z.uuid().safeParse(id).success) return null;
  const supabase = await createSupabaseServerClient();
  if (!supabase) throw new Error('POSTS_UNAVAILABLE');
  const { data, error } = await supabase.from('blog_posts').select('*').eq('id', id).maybeSingle();
  if (error) throw new Error('POSTS_UNAVAILABLE');
  return data;
}

export async function getPublishedPosts(locale: Locale, page = 1) {
  const supabase = await createSupabaseServerClient();
  if (!supabase) return { posts: [], total: 0, unavailable: false };
  const { data, count, error } = await supabase.from('blog_posts').select(summaryColumns, { count: 'exact' })
    .eq('locale', locale).eq('status', 'published').order('published_at', { ascending: false }).range((page - 1) * 12, page * 12 - 1);
  return { posts: data ?? [], total: count ?? 0, unavailable: Boolean(error) };
}

export async function getPublishedPost(slug: string, locale: Locale) {
  const supabase = await createSupabaseServerClient();
  if (!supabase) return null;
  const { data, error } = await supabase.from('blog_posts').select('*')
    .eq('locale', locale).eq('slug', slug).eq('status', 'published').maybeSingle();
  if (error) throw new Error('POSTS_UNAVAILABLE');
  return data;
}
