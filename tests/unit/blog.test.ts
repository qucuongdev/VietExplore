import { describe, expect, it } from 'vitest';
import { createBlock, isImageUrl, moveBlock, parseBlocks, postInputSchema, slugify } from '@/lib/blog';

const draft = () => ({ title: 'Hanoi journal', slug: 'hanoi-journal', excerpt: '', cover_image: '', locale: 'en', tags: [], status: 'draft', content: [] });

describe('Blog content contracts', () => {
  it.each(['https://images.example.com/photo.jpg', 'http://localhost:54321/image.jpg', 'http://127.0.0.1:54321/image.jpg'])('accepts supported image URL %s', (url) => {
    expect(isImageUrl(url)).toBe(true);
  });
  it.each(['javascript:alert(1)', 'data:image/svg+xml,<svg/>', 'http://example.com/image.jpg', '//example.com/photo.jpg', 'https://user:password@example.com/photo.jpg', 'not-a-url'])('rejects unsafe or malformed image URL %s', (url) => {
    expect(isImageUrl(url)).toBe(false);
  });
  it('normalizes Vietnamese slugs including Đ', () => {
    expect(slugify('  Đà Lạt — Một ngày đẹp! ')).toBe('da-lat-mot-ngay-dep');
    expect(slugify('a'.repeat(159) + ' b')).not.toMatch(/-$/);
    expect(slugify('a'.repeat(200))).toHaveLength(160);
  });
  it('saves an incomplete draft but rejects an empty publication', () => {
    expect(postInputSchema.safeParse(draft()).success).toBe(true);
    expect(postInputSchema.safeParse({ ...draft(), status: 'published' }).success).toBe(false);
    expect(postInputSchema.safeParse({ ...draft(), status: 'published', content: [{ ...createBlock('paragraph'), text: '   ' }] }).success).toBe(false);
  });
  it('requires descriptions and valid links for all images in published posts', () => {
    const content = [{ ...createBlock('paragraph'), text: 'An actual story.' }, { ...createBlock('image'), src: 'https://example.com/photo.jpg', alt: '' }];
    expect(postInputSchema.safeParse({ ...draft(), status: 'published', content }).success).toBe(false);
    content[1] = { ...createBlock('image'), src: 'https://example.com/photo.jpg', alt: 'Hoan Kiem Lake' };
    expect(postInputSchema.safeParse({ ...draft(), status: 'published', content }).success).toBe(true);
  });
  it('rejects invalid widths, duplicate IDs, excessive blocks and oversized content', () => {
    const block = createBlock('paragraph');
    expect(postInputSchema.safeParse({ ...draft(), content: [{ ...block, width: 0 }] }).success).toBe(false);
    expect(postInputSchema.safeParse({ ...draft(), content: [block, block] }).success).toBe(false);
    expect(postInputSchema.safeParse({ ...draft(), content: Array.from({ length: 101 }, () => createBlock('divider')) }).success).toBe(false);
    expect(postInputSchema.safeParse({ ...draft(), content: Array.from({ length: 20 }, () => ({ ...createBlock('paragraph'), text: 'a'.repeat(20000) })) }).success).toBe(false);
  });
  it('returns no renderable content for unsupported block structures', () => {
    expect(parseBlocks([{ id: crypto.randomUUID(), width: 12, type: 'html', html: '<script>alert(1)</script>' }])).toEqual([]);
  });
  it('moves a block without changing IDs, data, or the source array', () => {
    const blocks = [createBlock('heading'), createBlock('paragraph'), createBlock('image')];
    const next = moveBlock(blocks, blocks[2].id, 0);
    expect(next).toEqual([blocks[2], blocks[0], blocks[1]]);
    expect(blocks.map((block) => block.type)).toEqual(['heading', 'paragraph', 'image']);
    expect(moveBlock(blocks, blocks[0].id, -1)).toBe(blocks);
    expect(moveBlock(blocks, 'missing', 0)).toBe(blocks);
  });
});
