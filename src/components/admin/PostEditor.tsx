'use client';

import { useActionState, useEffect, useState, type CSSProperties, type FormEvent } from 'react';
import { useTranslations } from 'next-intl';
import { AlignLeft, ArrowDown, ArrowLeft, ArrowUp, Check, Eye, GripVertical, Heading, Image as ImageIcon, List, LoaderCircle, Minus, NotebookPen, Plus, Quote, Save, Send, StickyNote, Trash2 } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { savePost, type PostActionState } from '@/actions/posts';
import { createBlock, isImageUrl, moveBlock, parseBlocks, postInputSchema, slugify, type BlogBlock, type BlockType, type PostInput } from '@/lib/blog';
import type { PostRow } from '@/types/database';
import type { Locale } from '@/types/content';
import BlogContent from '@/components/blog/BlogContent';
import ImageWithFallback from '@/components/ui/ImageWithFallback';
import BlockFields from './BlockFields';
import ImageField from './ImageField';

const blockTypes = [
  { type: 'heading', icon: Heading }, { type: 'paragraph', icon: AlignLeft }, { type: 'image', icon: ImageIcon },
  { type: 'quote', icon: Quote }, { type: 'list', icon: List }, { type: 'callout', icon: StickyNote }, { type: 'divider', icon: Minus },
] satisfies { type: BlockType; icon: typeof Heading }[];

export default function PostEditor({ post, locale }: { post?: PostRow; locale: Locale }) {
  const t = useTranslations('editor');
  const [draft, setDraft] = useState<PostInput>(() => ({
    title: post?.title ?? '', slug: post?.slug ?? '', excerpt: post?.excerpt ?? '', cover_image: post?.cover_image ?? '',
    tags: post?.tags ?? [], locale: post?.locale ?? locale, status: post?.status ?? 'draft', content: parseBlocks(post?.content),
  }));
  const [tags, setTags] = useState(post?.tags.join(', ') ?? '');
  const [slugEdited, setSlugEdited] = useState(Boolean(post));
  const [preview, setPreview] = useState(false);
  const [dragged, setDragged] = useState<string | null>(null);
  const [uploads, setUploads] = useState(0);
  const [validationError, setValidationError] = useState(false);
  const [state, action, pending] = useActionState<PostActionState, FormData>(savePost.bind(null, locale, post?.id ?? null), {});
  const [original] = useState(() => JSON.stringify(draft));
  const dirty = JSON.stringify(draft) !== original;
  const canSave = !pending && uploads === 0;

  useEffect(() => {
    if (!dirty || pending) return;
    const beforeUnload = (event: BeforeUnloadEvent) => { event.preventDefault(); event.returnValue = ''; };
    const confirmNavigation = (event: MouseEvent) => {
      if (!(event.target instanceof Element) || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const link = event.target.closest('a');
      if (!link || link.target === '_blank' || link.href === window.location.href) return;
      if (!window.confirm(t('leaveConfirm'))) { event.preventDefault(); event.stopPropagation(); }
    };
    window.addEventListener('beforeunload', beforeUnload);
    document.addEventListener('click', confirmNavigation, true);
    return () => {
      window.removeEventListener('beforeunload', beforeUnload);
      document.removeEventListener('click', confirmNavigation, true);
    };
  }, [dirty, pending, t]);

  const patch = (values: Partial<PostInput>) => { setDraft((current) => ({ ...current, ...values })); setValidationError(false); };
  const replaceBlock = (block: BlogBlock) => setDraft((current) => ({ ...current, content: current.content.map((item) => item.id === block.id ? block : item) }));
  const reorder = (id: string, index: number) => setDraft((current) => ({ ...current, content: moveBlock(current.content, id, index) }));
  const uploadingChanged = (uploading: boolean) => setUploads((current) => current + (uploading ? 1 : -1));
  const submit = (event: FormEvent<HTMLFormElement>) => {
    const submitter = (event.nativeEvent as SubmitEvent).submitter as HTMLButtonElement | null;
    const status = submitter?.value === 'published' ? 'published' : 'draft';
    if (!canSave || !postInputSchema.safeParse({ ...draft, status }).success) {
      event.preventDefault();
      setValidationError(true);
    }
  };

  return (
    <section>
      <Link href="/admin/posts" className="mb-6 inline-flex items-center gap-2 text-xs font-semibold text-muted-foreground hover:text-primary"><ArrowLeft className="size-3.5" />{t('back')}</Link>
      <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-secondary-text">VietExplore · Journal</p>
      <h1 className="font-serif text-3xl font-bold sm:text-4xl">{t(post ? 'editTitle' : 'newTitle')}</h1>
      <p className="mt-3 mb-7 text-sm text-muted-foreground">{t('subtitle')}</p>
      <form action={action} onSubmit={submit}>
        <input type="hidden" name="post" value={JSON.stringify(draft)} />
        <input type="hidden" name="version" value={post?.version ?? 0} />
        <fieldset disabled={pending} className="min-w-0">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-border bg-card p-3 sm:p-4">
            <div className="flex items-center gap-1 rounded-xl bg-muted p-1"><button type="button" onClick={() => setPreview(false)} aria-pressed={!preview} className={`inline-flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-semibold ${!preview ? 'bg-card text-primary shadow-sm' : 'text-muted-foreground'}`}><NotebookPen className="size-4" />{t('write')}</button><button type="button" onClick={() => setPreview(true)} aria-pressed={preview} className={`inline-flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-semibold ${preview ? 'bg-card text-primary shadow-sm' : 'text-muted-foreground'}`}><Eye className="size-4" />{t('preview')}</button></div>
            <p role="status" className="inline-flex items-center gap-1.5 text-[11px] text-muted-foreground">{pending ? <LoaderCircle className="size-3 animate-spin" /> : dirty ? <span className="size-1.5 rounded-full bg-secondary" /> : <Check className="size-3 text-primary" />}{t(pending ? 'saving' : dirty ? 'unsaved' : 'savedState')}</p>
          </div>
          {(validationError || state.error) && <p role="alert" className="mb-6 rounded-xl border border-secondary/30 bg-secondary/10 p-4 text-sm leading-relaxed text-foreground">{t(validationError ? 'invalid' : state.error!)}</p>}
          <div className="grid items-start gap-6 xl:grid-cols-[minmax(0,1fr)_250px]">
            <div className="min-w-0">
              {preview ? <article className="rounded-3xl border border-border bg-card p-5 sm:p-8">
                {draft.cover_image && isImageUrl(draft.cover_image) && <div className="relative mb-7 aspect-video overflow-hidden rounded-2xl bg-muted"><ImageWithFallback key={draft.cover_image} src={draft.cover_image} alt={draft.title} fill unoptimized objectFit="contain" /></div>}
                <h2 className="mb-5 wrap-anywhere font-serif text-3xl font-bold text-primary sm:text-4xl">{draft.title || t('titlePlaceholder')}</h2>
                {draft.excerpt && <p className="mb-8 border-l-4 border-secondary pl-5 font-serif text-lg leading-relaxed text-muted-foreground">{draft.excerpt}</p>}
                {draft.content.length ? <BlogContent blocks={draft.content} /> : <p className="py-10 text-center text-sm text-muted-foreground">{t('previewEmpty')}</p>}
                {draft.tags.length > 0 && <div className="mt-8 flex flex-wrap gap-2 border-t border-border pt-5">{draft.tags.map((tag) => <span key={tag} className="rounded-full bg-accent px-3 py-1 text-xs text-primary">#{tag}</span>)}</div>}
              </article> : <>
                <div className="mb-6 rounded-3xl border border-border bg-card p-5 sm:p-6">
                  <label htmlFor="post-title" className="mb-3 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">{t('title')}</label>
                  <input id="post-title" value={draft.title} maxLength={160} onChange={(event) => patch({ title: event.target.value, ...(!slugEdited ? { slug: slugify(event.target.value) } : {}) })} placeholder={t('titlePlaceholder')} className="w-full min-w-0 border-0 bg-transparent font-serif text-2xl font-bold text-primary outline-none placeholder:text-muted-foreground/40 focus-visible:ring-2 focus-visible:ring-primary/20 sm:text-3xl" />
                  <label htmlFor="post-excerpt" className="mt-6 mb-2 block text-xs font-semibold text-muted-foreground">{t('excerpt')}</label>
                  <textarea id="post-excerpt" value={draft.excerpt} maxLength={320} rows={3} onChange={(event) => patch({ excerpt: event.target.value })} placeholder={t('excerptPlaceholder')} className="editor-input resize-y leading-relaxed" />
                </div>
                <div className="grid grid-cols-12 items-start gap-4">
                  {draft.content.map((block, index) => <article key={block.id} aria-label={t('block', { index: index + 1, type: t(block.type) })} style={{ '--block-columns': block.width } as CSSProperties} className={`blog-block col-span-12 min-w-0 rounded-2xl border bg-card p-4 transition-colors ${dragged === block.id ? 'border-primary bg-accent/40 opacity-70' : 'border-border'}`} onDragOver={(event) => { if (dragged) { event.preventDefault(); event.dataTransfer.dropEffect = 'move'; } }} onDrop={(event) => { event.preventDefault(); const id = event.dataTransfer.getData('text/plain'); if (id) reorder(id, index); setDragged(null); }}>
                    <div className="mb-4 flex flex-wrap items-center justify-between gap-1 border-b border-border pb-3">
                      <div className="flex items-center gap-1.5"><button type="button" draggable aria-label={t('drag')} onDragStart={(event) => { event.dataTransfer.setData('text/plain', block.id); event.dataTransfer.effectAllowed = 'move'; setDragged(block.id); }} onDragEnd={() => setDragged(null)} className="editor-icon-button cursor-grab active:cursor-grabbing"><GripVertical className="size-4" /></button><span className="text-xs font-semibold text-primary">{t(block.type)}</span></div>
                      <div className="flex items-center"><button type="button" onClick={() => reorder(block.id, index - 1)} disabled={index === 0} aria-label={t('moveUp')} className="editor-icon-button"><ArrowUp className="size-3.5" /></button><button type="button" onClick={() => reorder(block.id, index + 1)} disabled={index === draft.content.length - 1} aria-label={t('moveDown')} className="editor-icon-button"><ArrowDown className="size-3.5" /></button><button type="button" onClick={() => patch({ content: draft.content.filter((item) => item.id !== block.id) })} aria-label={t('remove')} className="editor-icon-button hover:text-secondary"><Trash2 className="size-3.5" /></button></div>
                    </div>
                    <BlockFields block={block} onChange={replaceBlock} onUploadingChange={uploadingChanged} />
                    <label className="mt-5 block border-t border-border pt-3 text-[11px] text-muted-foreground">{t('width')}<input type="range" min={6} max={12} step={1} value={block.width} onChange={(event) => replaceBlock({ ...block, width: Number(event.target.value) })} className="mt-2 block w-full accent-primary" /><span className="mt-1 block">{t('widthHint', { width: block.width })}</span></label>
                  </article>)}
                </div>
                {draft.content.length === 0 && <div className="rounded-3xl border border-dashed border-border px-6 py-14 text-center"><Plus className="mx-auto mb-3 size-7 text-secondary" /><p className="text-sm text-muted-foreground">{t('empty')}</p></div>}
              </>}
            </div>
            <aside className="min-w-0 space-y-5">
              <section className="rounded-2xl border border-border bg-card p-5">
                <h2 className="mb-3 text-sm font-bold text-primary">{t('addBlock')}</h2><p className="mb-4 text-[11px] leading-relaxed text-muted-foreground">{t('addBlockHint')}</p>
                <div className="grid grid-cols-2 gap-2">{blockTypes.map(({ type, icon: Icon }) => <button key={type} type="button" disabled={draft.content.length >= 100} onClick={() => { setDraft((current) => ({ ...current, content: [...current.content, createBlock(type)] })); setPreview(false); }} className="flex flex-col items-start gap-2 rounded-xl border border-border p-3 text-xs font-medium text-primary transition-colors hover:border-primary hover:bg-accent focus-visible:outline-2 focus-visible:outline-primary disabled:opacity-40"><Icon className="size-4 text-secondary" />{t(type)}</button>)}</div>
                {draft.content.length >= 100 && <p role="status" className="mt-3 text-xs text-secondary-text">{t('blockLimit')}</p>}
              </section>
              <section className="space-y-5 rounded-2xl border border-border bg-card p-5">
                <h2 className="text-sm font-bold text-primary">{t('settings')}</h2>
                <label className="block text-xs font-semibold text-muted-foreground">{t('slug')}<input value={draft.slug} maxLength={160} onChange={(event) => { setSlugEdited(true); patch({ slug: event.target.value }); }} className="editor-input mt-2" /></label>
                <label className="block text-xs font-semibold text-muted-foreground">{t('language')}<select value={draft.locale} onChange={(event) => patch({ locale: event.target.value as Locale })} className="editor-input mt-2"><option value="vi">Tiếng Việt</option><option value="en">English</option></select></label>
                <label className="block text-xs font-semibold text-muted-foreground">{t('tags')}<input value={tags} maxLength={400} onChange={(event) => { setTags(event.target.value); patch({ tags: [...new Set(event.target.value.split(',').map((tag) => tag.trim()).filter(Boolean))] }); }} className="editor-input mt-2" /><span className="mt-2 block text-[11px] font-normal leading-relaxed">{t('tagsHint')}</span></label>
                <div><h3 className="mb-3 text-xs font-semibold text-muted-foreground">{t('cover')}</h3><ImageField value={draft.cover_image} onChange={(cover_image) => patch({ cover_image })} onUploadingChange={uploadingChanged} /></div>
              </section>
            </aside>
          </div>
          <div className="sticky bottom-3 z-20 mt-7 flex flex-wrap items-center justify-end gap-3 rounded-2xl border border-border bg-card/95 p-4 shadow-lg backdrop-blur-md">
            <button type="submit" name="intent" value="draft" disabled={!canSave} className="inline-flex items-center gap-2 rounded-xl border border-border bg-background px-4 py-2.5 text-xs font-semibold text-primary hover:bg-accent disabled:opacity-50"><Save className="size-4" />{t(post?.status === 'published' ? 'unpublish' : 'saveDraft')}</button>
            <button type="submit" name="intent" value="published" disabled={!canSave} className="editor-button text-xs">{pending ? <LoaderCircle className="size-4 animate-spin" /> : <Send className="size-4" />}{t(post?.status === 'published' ? 'savePublished' : 'publish')}</button>
          </div>
        </fieldset>
      </form>
    </section>
  );
}
