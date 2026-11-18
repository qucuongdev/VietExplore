'use client';

import { useTranslations } from 'next-intl';
import type { BlogBlock } from '@/lib/blog';
import ImageField from './ImageField';

interface BlockFieldsProps {
  block: BlogBlock;
  onChange: (block: BlogBlock) => void;
  onUploadingChange: (uploading: boolean) => void;
}

export default function BlockFields({ block, onChange, onUploadingChange }: BlockFieldsProps) {
  const t = useTranslations('editor');
  const inputId = `block-${block.id}`;
  if (block.type === 'divider') return <hr className="my-6 border-border" />;
  if (block.type === 'image') return (
    <div className="space-y-4">
      <ImageField value={block.src} onChange={(src) => onChange({ ...block, src })} onUploadingChange={onUploadingChange} />
      <label className="block text-xs font-semibold text-muted-foreground">{t('alt')}<input value={block.alt} maxLength={200} onChange={(event) => onChange({ ...block, alt: event.target.value })} className="editor-input mt-2" /></label>
      <label className="block text-xs font-semibold text-muted-foreground">{t('caption')}<input value={block.caption} maxLength={500} onChange={(event) => onChange({ ...block, caption: event.target.value })} className="editor-input mt-2" /></label>
      <label className="block text-xs font-semibold text-muted-foreground">{t('aspect')}<select value={block.aspect} onChange={(event) => onChange({ ...block, aspect: event.target.value as 'landscape' | 'square' | 'portrait' })} className="editor-input mt-2"><option value="landscape">{t('landscape')}</option><option value="square">{t('square')}</option><option value="portrait">{t('portrait')}</option></select></label>
    </div>
  );
  if (block.type === 'list') return <label className="block text-xs font-semibold text-muted-foreground">{t('text')}<textarea id={inputId} value={block.items.join('\n')} rows={4} onChange={(event) => onChange({ ...block, items: event.target.value.split('\n') })} className="editor-input mt-2 min-h-28 resize-y" /><span className="mt-2 block text-[11px] font-normal">{t('listHint')}</span></label>;
  return (
    <div className="space-y-4">
      {block.type === 'heading' && <label className="block text-xs font-semibold text-muted-foreground">{t('level')}<select value={block.level} onChange={(event) => onChange({ ...block, level: Number(event.target.value) as 2 | 3 })} className="editor-input mt-2"><option value={2}>H2</option><option value={3}>H3</option></select></label>}
      <label htmlFor={inputId} className="block text-xs font-semibold text-muted-foreground">{t('text')}</label>
      <textarea id={inputId} value={block.text} maxLength={20000} rows={block.type === 'heading' ? 2 : 5} onChange={(event) => onChange({ ...block, text: event.target.value })} placeholder={t(block.type)} className={`editor-input min-h-24 resize-y ${block.type === 'heading' ? 'font-serif text-xl font-semibold' : block.type === 'quote' ? 'font-serif italic' : 'leading-loose'}`} />
      {block.type === 'quote' && <label className="block text-xs font-semibold text-muted-foreground">{t('attribution')}<input value={block.attribution} maxLength={200} onChange={(event) => onChange({ ...block, attribution: event.target.value })} className="editor-input mt-2" /></label>}
    </div>
  );
}
