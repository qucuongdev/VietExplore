import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { ArrowLeft, Compass } from 'lucide-react';
import { Link, redirect } from '@/i18n/navigation';
import LoginForm from '@/components/auth/LoginForm';
import ImageWithFallback from '@/components/ui/ImageWithFallback';
import { getIdentity } from '@/lib/auth';
import { getSupabaseConfig } from '@/lib/supabase/config';
import type { Locale } from '@/types/content';

export const metadata: Metadata = { robots: { index: false, follow: false } };

export default async function LoginPage({ params, searchParams }: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ error?: string | string[] }>;
}) {
  const [{ locale: rawLocale }, query, identity, t] = await Promise.all([params, searchParams, getIdentity(), getTranslations('auth')]);
  const locale = rawLocale as Locale;
  if (identity?.role === 'admin') return redirect({ href: '/admin/posts', locale });

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 md:py-16">
      <Link href="/" className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary"><ArrowLeft className="size-4" />{t('back')}</Link>
      <div className="grid overflow-hidden rounded-3xl border border-border bg-card shadow-sm lg:grid-cols-2">
        <section className="px-6 py-10 sm:p-12 lg:p-14">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-secondary-text">{t('eyebrow')}</p>
          <h1 className="mb-3 font-serif text-4xl font-bold tracking-tight text-primary">{t('title')}</h1>
          <p className="mb-8 text-sm leading-relaxed text-muted-foreground">{t('subtitle')}</p>
          {query.error === 'forbidden' && <p role="alert" className="mb-6 rounded-xl bg-accent p-4 text-sm leading-relaxed text-primary">{t('forbidden')}</p>}
          <LoginForm locale={locale} configured={Boolean(getSupabaseConfig())} />
        </section>
        <aside className="relative hidden min-h-[560px] flex-col justify-end overflow-hidden bg-primary p-12 text-white lg:flex">
          <div className="absolute inset-0 opacity-45"><ImageWithFallback src="/images/destinations/hanoi/ho-guom/turtle-tower.jpg" alt="" fill sizes="50vw" /></div>
          <div className="absolute inset-0 bg-linear-to-t from-primary via-primary/45 to-transparent" />
          <div className="relative"><Compass className="mb-6 size-9 text-secondary" /><p className="mb-5 font-serif text-4xl font-semibold leading-snug">{t('quote')}</p><p className="max-w-xs text-sm leading-relaxed text-white/75">{t('quoteHint')}</p></div>
        </aside>
      </div>
    </div>
  );
}
