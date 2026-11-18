'use server';

import { z } from 'zod';
import { redirect } from '@/i18n/navigation';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import type { Locale } from '@/types/content';

export interface LoginState {
  error?: 'invalid' | 'credentials' | 'unavailable' | 'rateLimit';
}

export async function signIn(locale: Locale, _state: LoginState, formData: FormData): Promise<LoginState> {
  const result = z.object({ email: z.email().max(254), password: z.string().min(1).max(256) }).safeParse({
    email: String(formData.get('email') ?? '').trim(),
    password: formData.get('password'),
  });
  if (!result.success) return { error: 'invalid' };
  const supabase = await createSupabaseServerClient();
  if (!supabase) return { error: 'unavailable' };
  const { data, error } = await supabase.auth.signInWithPassword(result.data);
  if (error) return { error: error.status === 429 ? 'rateLimit' : error.status && error.status >= 500 ? 'unavailable' : 'credentials' };
  if (!data.user) return { error: 'credentials' };

  const { data: profile, error: profileError } = await supabase.from('profiles').select('role').eq('id', data.user.id).maybeSingle();
  if (profileError) return { error: 'unavailable' };
  return redirect({ href: profile?.role === 'admin' ? '/admin/posts' : '/', locale });
}

export async function signOut(locale: Locale) {
  const supabase = await createSupabaseServerClient();
  if (supabase) await supabase.auth.signOut();
  redirect({ href: '/login', locale });
}
