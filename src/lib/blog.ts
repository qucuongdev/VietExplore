import { z } from 'zod';
import { removeVietnameseDiacritics } from './utils';

export function isImageUrl(value: string): boolean {
  try {
    const url = new URL(value);
    return !url.username && !url.password && (url.protocol === 'https:' ||
      (url.protocol === 'http:' && ['localhost', '127.0.0.1', '[::1]'].includes(url.hostname)));
  } catch {
    return false;
  }
}

const imageUrl = z.string().max(2048).refine((value) => value === '' || isImageUrl(value));
const base = { id: z.uuid(), width: z.number().int().min(6).max(12) };
const text = z.string().max(20000);

export const blockSchema = z.discriminatedUnion('type', [
  z.object({ ...base, type: z.literal('heading'), text, level: z.union([z.literal(2), z.literal(3)]) }),
  z.object({ ...base, type: z.literal('paragraph'), text }),
  z.object({ ...base, type: z.literal('image'), src: imageUrl, alt: z.string().max(200), caption: z.string().max(500), aspect: z.enum(['landscape', 'square', 'portrait']) }),
  z.object({ ...base, type: z.literal('quote'), text, attribution: z.string().max(200) }),
  z.object({ ...base, type: z.literal('list'), items: z.array(z.string().max(2000)).max(50) }),
  z.object({ ...base, type: z.literal('callout'), text }),
  z.object({ ...base, type: z.literal('divider') }),
]);

export type BlogBlock = z.infer<typeof blockSchema>;
export type BlockType = BlogBlock['type'];

export const postInputSchema = z.object({
  title: z.string().trim().min(3).max(160),
  slug: z.string().min(1).max(160).regex(/^[a-z0-9]+(-[a-z0-9]+)*$/),
  excerpt: z.string().trim().max(320),
  cover_image: imageUrl,
  locale: z.enum(['vi', 'en']),
  tags: z.array(z.string().trim().min(1).max(30)).max(12),
  status: z.enum(['draft', 'published']),
  content: z.array(blockSchema).max(100).refine((blocks) => new Set(blocks.map((block) => block.id)).size === blocks.length),
}).refine((post) => new TextEncoder().encode(JSON.stringify(post.content)).byteLength <= 262144)
  .refine((post) => post.status === 'draft' || (
    post.content.some((block) => block.type === 'image' ? Boolean(block.src && block.alt.trim()) :
      block.type === 'divider' ? false : block.type === 'list' ? block.items.some((item) => item.trim()) : Boolean(block.text.trim())) &&
    post.content.every((block) => block.type !== 'image' || Boolean(block.src && block.alt.trim()))
  ), { message: 'PUBLICATION_CONTENT_REQUIRED' });

export type PostInput = z.infer<typeof postInputSchema>;

export function createBlock(type: BlockType): BlogBlock {
  const common = { id: crypto.randomUUID(), width: 12 };
  switch (type) {
    case 'heading': return { ...common, type, text: '', level: 2 };
    case 'paragraph': return { ...common, type, text: '' };
    case 'image': return { ...common, type, src: '', alt: '', caption: '', aspect: 'landscape' };
    case 'quote': return { ...common, type, text: '', attribution: '' };
    case 'list': return { ...common, type, items: [''] };
    case 'callout': return { ...common, type, text: '' };
    case 'divider': return { ...common, type };
  }
}

export function moveBlock(blocks: BlogBlock[], id: string, targetIndex: number): BlogBlock[] {
  const from = blocks.findIndex((block) => block.id === id);
  if (from < 0 || targetIndex < 0 || targetIndex >= blocks.length || from === targetIndex) return blocks;
  const next = [...blocks];
  const [block] = next.splice(from, 1);
  next.splice(targetIndex, 0, block);
  return next;
}

export function slugify(value: string) {
  return removeVietnameseDiacritics(value).replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 160).replace(/-$/, '');
}

export function parseBlocks(value: unknown): BlogBlock[] {
  const result = z.array(blockSchema).safeParse(value);
  return result.success ? result.data : [];
}

export const MAX_IMAGE_BYTES = 5 * 1024 * 1024;
export const IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/avif'];
