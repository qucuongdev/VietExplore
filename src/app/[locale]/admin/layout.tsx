import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { ArrowUpRight, Feather, Files, PenLine } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { requireAdmin } from '@/lib/auth';
import type { Locale } from '@/types/content';

export const metadata: Metadata = { title: 'Editorial Workspace — VietExplore', robots: { index: false, follow: false } };

export default async function AdminLayout({ children, params }: { children: React.ReactNode; params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  const locale = rawLocale as Locale;
  const [identity, t] = await Promise.all([requireAdmin(locale), getTranslations('admin')]);
  return (
    <div className="mx-auto grid w-full max-w-[1440px] gap-8 px-4 py-8 sm:px-6 lg:grid-cols-[220px_minmax(0,1fr)] lg:px-8 lg:py-10">
      <aside>
        <div className="rounded-3xl bg-primary p-6 text-white lg:sticky lg:top-24">
          <Feather className="mb-5 size-7 text-secondary" />
          <p className="mb-2 text-[10px] font-semibold uppercase tracking-widest text-white/65">{t('eyebrow')}</p>
          <h2 className="font-serif text-2xl font-semibold leading-snug">{t('workspace')}</h2>
          <p className="mt-3 text-xs leading-relaxed text-white/65">{t('workspaceHint')}</p>
          <nav aria-label={t('workspace')} className="mt-7 flex flex-wrap gap-2 lg:flex-col">
            <Link href="/admin/posts" className="inline-flex items-center gap-2 rounded-xl bg-white/10 px-3 py-2.5 text-xs font-semibold hover:bg-white/20"><Files className="size-4" />{t('posts')}</Link>
            <Link href="/admin/posts/new" className="inline-flex items-center gap-2 rounded-xl px-3 py-2.5 text-xs font-semibold hover:bg-white/10"><PenLine className="size-4" />{t('newPost')}</Link>
            <Link href="/blog" className="inline-flex items-center gap-2 rounded-xl px-3 py-2.5 text-xs text-white/75 hover:bg-white/10"><ArrowUpRight className="size-4" />{t('visitSite')}</Link>
          </nav>
          <p className="mt-7 truncate border-t border-white/15 pt-4 text-xs text-white/65" title={identity.email}>{identity.name}</p>
        </div>
      </aside>
      <div className="min-w-0">{children}</div>
    </div>
  );
}
