import { getLocale, getTranslations } from 'next-intl/server';
import { LayoutDashboard, LogIn, LogOut } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { getIdentity } from '@/lib/auth';
import { signOut } from '@/actions/auth';
import type { Locale } from '@/types/content';

export default async function AccountActions() {
  const [identity, locale, t] = await Promise.all([getIdentity(), getLocale(), getTranslations('auth')]);
  if (!identity) return <Link href="/login" aria-label={t('login')} className="editor-button px-3 py-2 text-xs"><LogIn className="size-4" /><span className="hidden sm:inline">{t('login')}</span></Link>;
  return (
    <div className="flex items-center gap-2">
      {identity.role === 'admin' && <Link href="/admin/posts" aria-label={t('admin')} className="editor-button px-3 py-2 text-xs"><LayoutDashboard className="size-4" /><span className="hidden sm:inline">{t('admin')}</span></Link>}
      <form action={signOut.bind(null, locale as Locale)}><button type="submit" aria-label={t('logout')} title={identity.email} className="rounded-xl border border-border p-2 text-primary hover:bg-accent focus-visible:outline-2 focus-visible:outline-primary"><LogOut className="size-4" /></button></form>
    </div>
  );
}
