import 'server-only';
import { cache } from 'react';
import { redirect } from '@/i18n/navigation';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import type { Locale } from '@/types/content';

export const getIdentity = cache(async () => {
  const supabase = await createSupabaseServerClient();
  if (!supabase) return null;
  const { data: { user }, error } = await supabase.auth.getUser();
  if (error || !user) return null;
  const { data: profile, error: profileError } = await supabase.from('profiles').select('id, display_name, role').eq('id', user.id).maybeSingle();
  return {
    id: user.id,
    email: user.email ?? '',
    name: profile?.display_name || user.email?.split('@')[0] || '',
    role: !profileError && profile?.role === 'admin' ? 'admin' as const : 'reader' as const,
  };
});

export async function requireAdmin(locale: Locale) {
  const identity = await getIdentity();
  if (!identity) return redirect({ href: '/login', locale });
  if (identity.role !== 'admin') return redirect({ href: '/login?error=forbidden', locale });
  return identity;
}
