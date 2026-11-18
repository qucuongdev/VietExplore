'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from '@/i18n/navigation';
import { requireAdmin } from '@/lib/auth';
import { postInputSchema } from '@/lib/blog';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import type { Locale } from '@/types/content';

export interface PostActionState {
  error?: 'invalid' | 'duplicate' | 'conflict' | 'unavailable';
}

function refreshBlog() {
  for (const locale of ['vi', 'en']) {
    revalidatePath(`/${locale}/admin/posts`, 'layout');
    revalidatePath(`/${locale}/blog`, 'layout');
  }
}

export async function savePost(locale: Locale, id: string | null, _state: PostActionState, formData: FormData): Promise<PostActionState> {
  const identity = await requireAdmin(locale);
  const raw = formData.get('post');
  if (typeof raw !== 'string' || raw.length > 300000) return { error: 'invalid' };
  let input: unknown;
  try {
    const value: unknown = JSON.parse(raw);
    const intent = formData.get('intent');
    if (!value || typeof value !== 'object' || Array.isArray(value) || (intent !== 'draft' && intent !== 'published')) return { error: 'invalid' };
    input = { ...value, status: intent };
  } catch { return { error: 'invalid' }; }
  const parsed = postInputSchema.safeParse(input);
  const version = Number(formData.get('version'));
  if (!parsed.success || (id && (!z.uuid().safeParse(id).success || !Number.isInteger(version) || version < 1))) return { error: 'invalid' };
  const supabase = await createSupabaseServerClient();
  if (!supabase) return { error: 'unavailable' };

  const { data: existing, error: readError } = id
    ? await supabase.from('blog_posts').select('published_at').eq('id', id).maybeSingle()
    : { data: null, error: null };
  if (readError) return { error: 'unavailable' };
  const values = {
    ...parsed.data,
    published_at: parsed.data.status === 'published' ? existing?.published_at ?? new Date().toISOString() : null,
  };
  const result = id
    ? await supabase.from('blog_posts').update(values).eq('id', id).eq('version', version).select('id').maybeSingle()
    : await supabase.from('blog_posts').insert({ ...values, author_id: identity.id }).select('id').single();
  if (result.error) return { error: result.error.code === '23505' ? 'duplicate' : 'unavailable' };
  if (!result.data) return { error: 'conflict' };
  refreshBlog();
  return redirect({ href: `/admin/posts/${result.data.id}/edit?saved=1`, locale });
}

export async function deletePost(locale: Locale, id: string, _state: PostActionState, formData: FormData): Promise<PostActionState> {
  await requireAdmin(locale);
  const version = Number(formData.get('version'));
  if (!z.uuid().safeParse(id).success || !Number.isInteger(version) || version < 1) return { error: 'invalid' };
  const supabase = await createSupabaseServerClient();
  if (!supabase) return { error: 'unavailable' };
  const { data, error } = await supabase.from('blog_posts').delete().eq('id', id).eq('version', version).select('id').maybeSingle();
  if (error) return { error: 'unavailable' };
  if (!data) return { error: 'conflict' };
  refreshBlog();
  return redirect({ href: '/admin/posts?deleted=1', locale });
}
