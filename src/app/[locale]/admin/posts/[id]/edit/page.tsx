import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { getAdminPost } from '@/data/repositories/postRepository';
import PostEditor from '@/components/admin/PostEditor';
import type { Locale } from '@/types/content';

export default async function EditPostPage({ params, searchParams }: {
  params: Promise<{ locale: string; id: string }>;
  searchParams: Promise<{ saved?: string | string[] }>;
}) {
  const [{ locale: rawLocale, id }, query, t] = await Promise.all([params, searchParams, getTranslations('admin')]);
  const locale = rawLocale as Locale;
  const post = await getAdminPost(id, locale);
  if (!post) notFound();
  return <>{query.saved === '1' && <p role="status" className="mb-6 rounded-xl bg-accent p-4 text-sm text-primary">{t('saved')}</p>}<PostEditor key={`${post.id}:${post.version}`} post={post} locale={locale} /></>;
}
