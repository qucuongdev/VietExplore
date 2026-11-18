import { cache } from 'react';
import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { ArrowLeft } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { getPublishedPost } from '@/data/repositories/postRepository';
import { createPageMetadata } from '@/lib/metadata';
import { parseBlocks } from '@/lib/blog';
import BlogContent from '@/components/blog/BlogContent';
import ImageWithFallback from '@/components/ui/ImageWithFallback';
import type { Locale } from '@/types/content';

const getPost = cache(getPublishedPost);

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  const post = await getPost(slug, locale as Locale);
  if (!post) notFound();
  const metadata = createPageMetadata({ locale, path: `/blog/${post.slug}`, title: post.title, description: post.excerpt, image: post.cover_image ? { src: post.cover_image, alt: post.title } : undefined });
  // Translations may use different slugs, so do not advertise an unverified sibling URL.
  metadata.alternates = { canonical: `/${locale}/blog/${post.slug}` };
  return metadata;
}

export default async function BlogPostPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  const [post, t] = await Promise.all([getPost(slug, locale as Locale), getTranslations('blog')]);
  if (!post) notFound();
  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 md:py-14">
      <Link href="/blog" className="mb-8 inline-flex items-center gap-2 text-xs font-semibold text-primary"><ArrowLeft className="size-4" />{t('back')}</Link>
      <article className="overflow-hidden rounded-3xl border border-border bg-card">
        {post.cover_image && <div className="relative aspect-16/9 bg-muted"><ImageWithFallback src={post.cover_image} alt={post.title} fill unoptimized objectFit="contain" sizes="(max-width: 1024px) 100vw, 1024px" priority /></div>}
        <div className="p-6 sm:p-10 md:p-14">
          {post.published_at && <p className="mb-4 text-xs font-medium text-secondary-text">{t('published', { date: new Intl.DateTimeFormat(locale, { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date(post.published_at)) })}</p>}
          <h1 className="mb-6 wrap-anywhere font-serif text-3xl font-bold leading-tight text-primary sm:text-4xl md:text-5xl">{post.title}</h1>
          {post.excerpt && <p className="mb-10 border-l-4 border-secondary pl-5 font-serif text-lg leading-relaxed text-muted-foreground sm:text-xl">{post.excerpt}</p>}
          <BlogContent blocks={parseBlocks(post.content)} />
          {post.tags.length > 0 && <div className="mt-12 flex flex-wrap gap-2 border-t border-border pt-6">{post.tags.map((tag) => <span key={tag} className="rounded-full bg-accent px-3 py-1.5 text-xs font-medium text-primary">#{tag}</span>)}</div>}
        </div>
      </article>
    </div>
  );
}
