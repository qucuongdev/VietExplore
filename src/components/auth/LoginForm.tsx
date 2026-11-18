'use client';

import { useActionState, useState } from 'react';
import { useTranslations } from 'next-intl';
import { ArrowRight, Eye, EyeOff, LoaderCircle, LockKeyhole, Mail } from 'lucide-react';
import { signIn, type LoginState } from '@/actions/auth';
import type { Locale } from '@/types/content';

export default function LoginForm({ locale, configured }: { locale: Locale; configured: boolean }) {
  const t = useTranslations('auth');
  const [state, action, pending] = useActionState<LoginState, FormData>(signIn.bind(null, locale), {});
  const [showPassword, setShowPassword] = useState(false);

  return (
    <form action={action} className="space-y-5">
      {(!configured || state.error) && <p role="alert" className="rounded-xl border border-secondary/30 bg-secondary/10 p-4 text-sm leading-relaxed text-foreground">{t(state.error || 'unavailable')}</p>}
      <div>
        <label htmlFor="email" className="mb-2 block text-sm font-semibold">{t('email')}</label>
        <div className="relative">
          <Mail className="pointer-events-none absolute left-4 top-3.5 size-4 text-muted-foreground" />
          <input id="email" name="email" type="email" autoComplete="username" required maxLength={254} placeholder="you@example.com" disabled={pending || !configured} className="editor-input pl-11" />
        </div>
      </div>
      <div>
        <label htmlFor="password" className="mb-2 block text-sm font-semibold">{t('password')}</label>
        <div className="relative">
          <LockKeyhole className="pointer-events-none absolute left-4 top-3.5 size-4 text-muted-foreground" />
          <input id="password" name="password" type={showPassword ? 'text' : 'password'} autoComplete="current-password" required maxLength={256} disabled={pending || !configured} className="editor-input pl-11 pr-12" />
          <button type="button" disabled={!configured} aria-label={t(showPassword ? 'hidePassword' : 'showPassword')} onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-2 rounded-lg p-1.5 text-muted-foreground focus-visible:outline-2 focus-visible:outline-primary">
            {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
          </button>
        </div>
      </div>
      <button type="submit" disabled={pending || !configured} className="editor-button w-full justify-center py-3">
        {pending ? <LoaderCircle className="size-4 animate-spin" /> : <ArrowRight className="size-4" />}{t(pending ? 'pending' : 'submit')}
      </button>
      <p className="text-xs leading-relaxed text-muted-foreground">{t('inviteOnly')}</p>
    </form>
  );
}
