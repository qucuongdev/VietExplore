import 'server-only';
import { createClient } from '@supabase/supabase-js';
import { getSupabaseConfig } from '@/lib/supabase/config';
import type { Database } from '@/types/database';

export async function getBlogSitemapEntries() {
  const config = getSupabaseConfig();
  if (!config) return [];
  const supabase = createClient<Database>(config.url, config.key, { auth: { persistSession: false, autoRefreshToken: false } });
  const { data, error } = await supabase.from('blog_posts').select('locale, slug, updated_at').eq('status', 'published');
  return error ? [] : data ?? [];
}
