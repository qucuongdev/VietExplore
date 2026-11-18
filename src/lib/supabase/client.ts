'use client';

import { createBrowserClient } from '@supabase/ssr';
import type { Database } from '@/types/database';
import { getSupabaseConfig } from './config';

export function createSupabaseBrowserClient() {
  const config = getSupabaseConfig();
  if (!config) throw new Error('SUPABASE_NOT_CONFIGURED');
  return createBrowserClient<Database>(config.url, config.key);
}
