import { redirect } from '@/i18n/navigation';
import type { Locale } from '@/types/content';

export default async function AdminPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return redirect({ href: '/admin/posts', locale: locale as Locale });
}
