import { requireAdmin } from '@/lib/auth';
import PostEditor from '@/components/admin/PostEditor';
import type { Locale } from '@/types/content';

export default async function NewPostPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  const locale = rawLocale as Locale;
  await requireAdmin(locale);
  return <PostEditor locale={locale} />;
}
