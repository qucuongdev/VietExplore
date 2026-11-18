'use client';

import { useTranslations } from 'next-intl';
import { RotateCcw } from 'lucide-react';

export default function AdminError({ reset }: { reset: () => void }) {
  const t = useTranslations('admin');
  return <div className="rounded-3xl border border-border bg-card p-8"><p role="alert" className="mb-5 text-sm text-muted-foreground">{t('unavailable')}</p><button type="button" onClick={reset} className="editor-button"><RotateCcw className="size-4" />{t('retry')}</button></div>;
}
