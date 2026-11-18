import { getTranslations } from 'next-intl/server';
import { ArrowUpRight, BookOpen } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { getPublishedPosts } from '@/data/repositories/postRepository';
import { createPageMetadata } from '@/lib/metadata';
import ImageWithFallback from '@/components/ui/ImageWithFallback';
import type { Locale } from '@/types/content';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'blog' });
  return createPageMetadata({ locale, path: '/blog', title: t('title'), description: t('subtitle') });
}

export default async function BlogPage({ params, searchParams }: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ page?: string | string[] }>;
}) {
  const [{ locale: rawLocale }, query, t, admin] = await Promise.all([params, searchParams, getTranslations('blog'), getTranslations('admin')]);
  const locale = rawLocale as Locale;
  const page = Math.max(1, Math.min(10000, Number.parseInt((Array.isArray(query.page) ? query.page[0] : query.page) || '1') || 1));
  const { posts, total, unavailable } = await getPublishedPosts(locale, page);
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 md:py-16">
      <div className="mx-auto mb-12 max-w-2xl text-center"><p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-secondary-text">{t('eyebrow')}</p><h1 className="font-serif text-4xl font-bold leading-tight text-primary sm:text-5xl">{t('title')}</h1><p className="mt-5 text-sm leading-relaxed text-muted-foreground sm:text-base">{t('subtitle')}</p></div>
      {unavailable ? <p role="alert" className="rounded-3xl border border-border bg-card p-8 text-center text-sm text-muted-foreground">{t('unavailable')}</p> : posts.length ? <div className="grid grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => <Link key={post.id} href={`/blog/${post.slug}`} className="group overflow-hidden rounded-3xl border border-border bg-card transition-shadow hover:shadow-lg focus-visible:outline-2 focus-visible:outline-primary">
          <div className="relative aspect-16/10 overflow-hidden bg-muted"><ImageWithFallback src={post.cover_image} alt={post.title} fallbackTitle={post.title} fill unoptimized sizes="(max-width: 768px) 100vw, 33vw" className="transition-transform duration-500 group-hover:scale-105" /></div>
          <div className="p-6"><div className="mb-3 flex flex-wrap gap-2">{post.tags.slice(0, 3).map((tag) => <span key={tag} className="text-[10px] font-semibold uppercase tracking-wider text-secondary-text">{tag}</span>)}</div><h2 className="wrap-anywhere font-serif text-2xl font-bold leading-snug text-foreground group-hover:text-primary">{post.title}</h2>{post.excerpt && <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-muted-foreground">{post.excerpt}</p>}<span className="mt-6 inline-flex items-center gap-2 text-xs font-semibold text-primary">{t('read')}<ArrowUpRight className="size-4" /></span></div>
        </Link>)}
      </div> : <div className="rounded-3xl border border-dashed border-border bg-card px-6 py-20 text-center"><BookOpen className="mx-auto mb-5 size-10 text-secondary" /><h2 className="mb-3 font-serif text-2xl font-bold text-primary">{t('empty')}</h2><p className="text-sm text-muted-foreground">{t('emptyHint')}</p></div>}
      {(page > 1 || page * 12 < total) && <nav aria-label={admin('page', { page })} className="mt-10 flex items-center justify-between text-sm text-primary"><span>{page > 1 && <Link href={`/blog?page=${page - 1}`}>{admin('previous')}</Link>}</span><span>{admin('page', { page })}</span><span>{page * 12 < total && <Link href={`/blog?page=${page + 1}`}>{admin('next')}</Link>}</span></nav>}
    </div>
  );
}
