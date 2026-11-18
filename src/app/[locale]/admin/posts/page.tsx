import { getTranslations } from 'next-intl/server';
import { FileText, PenLine, Search } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { getAdminPosts } from '@/data/repositories/postRepository';
import DeletePostButton from '@/components/admin/DeletePostButton';
import type { Locale } from '@/types/content';
import { requireAdmin } from '@/lib/auth';

export default async function PostsPage({ params, searchParams }: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const [{ locale: rawLocale }, query, t] = await Promise.all([params, searchParams, getTranslations('admin')]);
  const locale = rawLocale as Locale;
  const first = (value: string | string[] | undefined) => Array.isArray(value) ? value[0] : value;
  const q = (first(query.q) || '').slice(0, 100);
  const status = first(query.status) || 'all';
  const page = Math.max(1, Math.min(10000, Number.parseInt(first(query.page) || '1') || 1));
  // Authorization redirects are performed before handling data-provider failures.
  await requireAdmin(locale);
  let result;
  try { result = await getAdminPosts(locale, q, status, page); } catch { result = null; }
  const pageHref = (target: number) => `/admin/posts?${new URLSearchParams({ q, status, page: String(target) })}`;

  return (
    <section>
      <div className="mb-8 flex flex-wrap items-end justify-between gap-5">
        <div><p className="mb-2 text-xs font-semibold uppercase tracking-widest text-secondary-text">{t('posts')}</p><h1 className="font-serif text-3xl font-bold text-foreground sm:text-4xl">{t('title')}</h1><p className="mt-3 text-sm text-muted-foreground">{t('subtitle')}</p></div>
        <Link href="/admin/posts/new" className="editor-button"><PenLine className="size-4" />{t('newPost')}</Link>
      </div>
      {query.deleted === '1' && <p role="status" className="mb-5 rounded-xl bg-accent p-4 text-sm text-primary">{t('deleted')}</p>}
      <form action={`/${locale}/admin/posts`} method="get" className="mb-6 flex flex-col gap-3 rounded-2xl border border-border bg-card p-4 sm:flex-row">
        <label className="relative flex-1"><span className="sr-only">{t('searchLabel')}</span><Search className="absolute left-3.5 top-3.5 size-4 text-muted-foreground" /><input name="q" defaultValue={q} placeholder={t('search')} maxLength={100} className="editor-input pl-10" /></label>
        <select name="status" defaultValue={status} aria-label={t('filter')} className="editor-input sm:w-48"><option value="all">{t('all')}</option><option value="draft">{t('draft')}</option><option value="published">{t('published')}</option></select>
        <button type="submit" className="editor-button justify-center">{t('filter')}</button>
      </form>
      {!result ? <p role="alert" className="rounded-2xl border border-border bg-card p-6 text-sm text-muted-foreground">{t('unavailable')}</p> : <>
        <p className="mb-4 text-xs text-muted-foreground">{t('results', { count: result.total })}</p>
        {result.posts.length ? <div className="overflow-hidden rounded-3xl border border-border bg-card">
          {result.posts.map((post) => <article key={post.id} className="flex flex-wrap items-center justify-between gap-4 border-b border-border p-5 last:border-0 sm:p-6">
            <div className="flex min-w-0 flex-1 items-start gap-4"><div className="hidden rounded-2xl bg-accent p-3 text-primary sm:block"><FileText className="size-5" /></div><div className="min-w-0">
              <Link href={`/admin/posts/${post.id}/edit`} className="font-serif text-lg font-bold text-foreground hover:text-primary"><h2 className="wrap-anywhere">{post.title}</h2></Link>
              <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-muted-foreground"><span className={`rounded-full px-2.5 py-1 font-medium ${post.status === 'published' ? 'bg-accent text-primary' : 'bg-secondary/10 text-secondary-text'}`}>{t(post.status)}</span><span className="uppercase">{post.locale}</span><span>·</span><time dateTime={post.updated_at}>{new Intl.DateTimeFormat(locale, { day: 'numeric', month: 'short', year: 'numeric' }).format(new Date(post.updated_at))}</time></div>
            </div></div>
            <div className="flex shrink-0 items-center gap-1"><Link href={`/admin/posts/${post.id}/edit`} className="editor-icon-button" aria-label={`${t('edit')}: ${post.title}`}><PenLine className="size-4" /></Link><DeletePostButton id={post.id} title={post.title} version={post.version} locale={locale} /></div>
          </article>)}
        </div> : <div className="rounded-3xl border border-dashed border-border bg-card px-6 py-16 text-center"><FileText className="mx-auto mb-5 size-9 text-secondary" /><h2 className="mb-3 font-serif text-2xl font-bold">{t(q || status !== 'all' ? 'noResults' : 'emptyTitle')}</h2><p className="mx-auto mb-6 max-w-md text-sm leading-relaxed text-muted-foreground">{t(q || status !== 'all' ? 'noResultsHint' : 'emptyHint')}</p><Link href="/admin/posts/new" className="editor-button"><PenLine className="size-4" />{t('newPost')}</Link></div>}
        {(page > 1 || page * 20 < result.total) && <nav aria-label={t('page', { page })} className="mt-6 flex items-center justify-between text-sm text-primary"><span>{page > 1 && <Link href={pageHref(page - 1)}>{t('previous')}</Link>}</span><span>{t('page', { page })}</span><span>{page * 20 < result.total && <Link href={pageHref(page + 1)}>{t('next')}</Link>}</span></nav>}
      </>}
    </section>
  );
}
