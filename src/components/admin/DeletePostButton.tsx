'use client';

import { useActionState, useState } from 'react';
import { useTranslations } from 'next-intl';
import { LoaderCircle, Trash2 } from 'lucide-react';
import ModalDialog from '@/components/ui/ModalDialog';
import { deletePost, type PostActionState } from '@/actions/posts';
import type { Locale } from '@/types/content';

export default function DeletePostButton({ id, title, version, locale }: { id: string; title: string; version: number; locale: Locale }) {
  const t = useTranslations('admin');
  const errors = useTranslations('editor');
  const [open, setOpen] = useState(false);
  const [state, action, pending] = useActionState<PostActionState, FormData>(deletePost.bind(null, locale, id), {});
  return (
    <>
      <button type="button" onClick={() => setOpen(true)} className="editor-icon-button hover:text-secondary" aria-label={`${t('delete')}: ${title}`}><Trash2 className="size-4" /></button>
      {open && <ModalDialog label={t('deleteTitle')} onClose={() => { if (!pending) setOpen(false); }} className="fixed inset-0 m-auto w-[calc(100%_-_2rem)] max-w-md rounded-3xl border border-border bg-card p-7 text-foreground shadow-xl backdrop:bg-black/40">
        <div className="mb-5 inline-flex rounded-2xl bg-secondary/10 p-3 text-secondary"><Trash2 className="size-6" /></div>
        <h2 className="mb-3 font-serif text-2xl font-bold">{t('deleteTitle')}</h2>
        <p className="mb-6 text-sm leading-relaxed text-muted-foreground">{t('deleteHint', { title })}</p>
        {state.error && <p role="alert" className="mb-4 text-sm text-secondary-text">{errors(state.error)}</p>}
        <form action={action} className="flex justify-end gap-3">
          <input type="hidden" name="version" value={version} />
          <button type="button" onClick={() => setOpen(false)} disabled={pending} className="rounded-xl border border-border px-4 py-2.5 text-sm font-semibold">{t('cancel')}</button>
          <button type="submit" disabled={pending} className="editor-button bg-secondary-text hover:bg-[#87472F]">{pending && <LoaderCircle className="size-4 animate-spin" />}{t(pending ? 'deleting' : 'delete')}</button>
        </form>
      </ModalDialog>}
    </>
  );
}
