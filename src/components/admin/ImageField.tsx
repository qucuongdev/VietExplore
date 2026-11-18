'use client';

import { useId, useState } from 'react';
import { useTranslations } from 'next-intl';
import { LoaderCircle } from 'lucide-react';
import { createSupabaseBrowserClient } from '@/lib/supabase/client';
import { IMAGE_TYPES, MAX_IMAGE_BYTES, isImageUrl } from '@/lib/blog';
import ImageWithFallback from '@/components/ui/ImageWithFallback';

interface ImageFieldProps {
  value: string;
  onChange: (value: string) => void;
  onUploadingChange: (uploading: boolean) => void;
}

export default function ImageField({ value, onChange, onUploadingChange }: ImageFieldProps) {
  const t = useTranslations('editor');
  const id = useId();
  const [uploading, setUploading] = useState(false);
  const [result, setResult] = useState<'uploadError' | 'uploadSuccess' | null>(null);

  const upload = async (file: File) => {
    setResult(null);
    if (!IMAGE_TYPES.includes(file.type) || file.size > MAX_IMAGE_BYTES || !file.size) { setResult('uploadError'); return; }
    setUploading(true);
    onUploadingChange(true);
    try {
      const supabase = createSupabaseBrowserClient();
      const { data: { user }, error: authError } = await supabase.auth.getUser();
      if (!user || authError) throw new Error('AUTH_REQUIRED');
      const extension = { 'image/jpeg': 'jpg', 'image/png': 'png', 'image/webp': 'webp', 'image/avif': 'avif' }[file.type];
      const path = `${user.id}/${crypto.randomUUID()}.${extension}`;
      const { error } = await supabase.storage.from('blog-images').upload(path, file, { contentType: file.type, upsert: false });
      if (error) throw error;
      onChange(supabase.storage.from('blog-images').getPublicUrl(path).data.publicUrl);
      setResult('uploadSuccess');
    } catch { setResult('uploadError'); } finally { setUploading(false); onUploadingChange(false); }
  };

  return (
    <div className="space-y-3">
      <label htmlFor={`${id}-url`} className="block text-xs font-semibold text-muted-foreground">{t('imageUrl')}</label>
      <input id={`${id}-url`} type="url" value={value} onChange={(event) => { onChange(event.target.value); setResult(null); }} placeholder="https://…" maxLength={2048} className="editor-input" aria-invalid={Boolean(value && !isImageUrl(value))} />
      {value && !isImageUrl(value) && <p className="text-xs text-secondary-text">{t('invalidUrl')}</p>}
      {value && isImageUrl(value) && <div className="relative aspect-video overflow-hidden rounded-xl bg-muted"><ImageWithFallback key={value} src={value} alt="" fill unoptimized objectFit="contain" sizes="(max-width: 768px) 100vw, 400px" /></div>}
      <label htmlFor={`${id}-file`} className="flex items-center gap-2 text-xs font-semibold text-primary">{uploading && <LoaderCircle className="size-3 animate-spin" />}{t(uploading ? 'uploading' : 'upload')}</label>
      <input id={`${id}-file`} type="file" accept={IMAGE_TYPES.join(',')} disabled={uploading} className="block w-full min-w-0 text-xs text-muted-foreground file:mr-3 file:cursor-pointer file:rounded-lg file:border-0 file:bg-accent file:px-3 file:py-2 file:font-semibold file:text-primary focus-visible:outline-2 focus-visible:outline-primary" onChange={(event) => { const file = event.target.files?.[0]; if (file) void upload(file); event.target.value = ''; }} />
      <p className="text-[11px] text-muted-foreground">{t('uploadHint')}</p>
      {result && <p role={result === 'uploadError' ? 'alert' : 'status'} className={`text-xs ${result === 'uploadError' ? 'text-secondary-text' : 'text-primary'}`}>{t(result)}</p>}
    </div>
  );
}
