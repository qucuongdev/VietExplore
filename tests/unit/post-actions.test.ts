import { beforeEach, describe, expect, it, vi } from 'vitest';
import { savePost, deletePost } from '@/actions/posts';
import { createBlock } from '@/lib/blog';

const mocks = vi.hoisted(() => ({
  requireAdmin: vi.fn(), createClient: vi.fn(), from: vi.fn(), select: vi.fn(), eq: vi.fn(), insert: vi.fn(), update: vi.fn(), delete: vi.fn(), single: vi.fn(), maybeSingle: vi.fn(), revalidate: vi.fn(),
  redirect: vi.fn(({ href }: { href: string }): never => { throw new Error(`REDIRECT:${href}`); }),
}));
vi.mock('@/lib/auth', () => ({ requireAdmin: mocks.requireAdmin }));
vi.mock('@/lib/supabase/server', () => ({ createSupabaseServerClient: mocks.createClient }));
vi.mock('@/i18n/navigation', () => ({ redirect: mocks.redirect }));
vi.mock('next/cache', () => ({ revalidatePath: mocks.revalidate }));

const postId = '93d53901-bf0f-4380-9458-f707f8611afa';
const values = () => ({ title: 'Hanoi journal', slug: 'hanoi-journal', excerpt: '', cover_image: '', tags: [], locale: 'en', status: 'draft', content: [{ ...createBlock('paragraph'), text: 'A real journey.' }] });
function form(intent = 'draft', version = 1) {
  const data = new FormData(); data.set('post', JSON.stringify(values())); data.set('intent', intent); data.set('version', String(version)); return data;
}

beforeEach(() => {
  vi.resetAllMocks();
  const chain = { select: mocks.select, eq: mocks.eq, insert: mocks.insert, update: mocks.update, delete: mocks.delete, single: mocks.single, maybeSingle: mocks.maybeSingle };
  for (const method of [mocks.from, mocks.select, mocks.eq, mocks.insert, mocks.update, mocks.delete]) method.mockReturnValue(chain);
  mocks.createClient.mockResolvedValue({ from: mocks.from });
  mocks.requireAdmin.mockResolvedValue({ id: 'verified-admin-id' });
  mocks.single.mockResolvedValue({ data: { id: postId }, error: null });
  mocks.maybeSingle.mockResolvedValue({ data: { id: postId, published_at: null }, error: null });
  mocks.redirect.mockImplementation(({ href }: { href: string }): never => { throw new Error(`REDIRECT:${href}`); });
});

describe('Post mutation boundaries', () => {
  it('authorizes direct save/delete calls before reading or writing post data', async () => {
    mocks.requireAdmin.mockRejectedValue(new Error('FORBIDDEN'));
    await expect(savePost('en', null, {}, form())).rejects.toThrow('FORBIDDEN');
    await expect(deletePost('en', postId, {}, form())).rejects.toThrow('FORBIDDEN');
    expect(mocks.createClient).not.toHaveBeenCalled();
  });
  it('creates a draft with the verified author, then invalidates and redirects to the persisted editor', async () => {
    await expect(savePost('en', null, {}, form())).rejects.toThrow(`REDIRECT:/admin/posts/${postId}/edit?saved=1`);
    expect(mocks.insert).toHaveBeenCalledWith(expect.objectContaining({ author_id: 'verified-admin-id', status: 'draft', published_at: null }));
    expect(mocks.revalidate).toHaveBeenCalledWith('/en/blog', 'layout');
  });
  it('uses the submit intent rather than a hidden draft status to publish', async () => {
    await expect(savePost('en', null, {}, form('published'))).rejects.toThrow('REDIRECT:');
    expect(mocks.insert).toHaveBeenCalledWith(expect.objectContaining({ status: 'published', published_at: expect.any(String) }));
  });
  it('rejects empty publications, malformed JSON, forged intent and invalid versions', async () => {
    const empty = form('published'); empty.set('post', JSON.stringify({ ...values(), content: [] }));
    expect(await savePost('en', null, {}, empty)).toEqual({ error: 'invalid' });
    const malformed = form(); malformed.set('post', '{');
    expect(await savePost('en', null, {}, malformed)).toEqual({ error: 'invalid' });
    expect(await savePost('en', null, {}, form('administrator'))).toEqual({ error: 'invalid' });
    expect(await savePost('en', postId, {}, form('draft', 0))).toEqual({ error: 'invalid' });
    expect(mocks.insert).not.toHaveBeenCalled();
  });
  it('reports duplicate slugs without a successful save or redirect', async () => {
    mocks.single.mockResolvedValue({ data: null, error: { code: '23505' } });
    expect(await savePost('en', null, {}, form())).toEqual({ error: 'duplicate' });
    expect(mocks.redirect).not.toHaveBeenCalled();
  });
  it('does not overwrite a stale version and reports a conflict', async () => {
    mocks.maybeSingle.mockResolvedValueOnce({ data: { published_at: null }, error: null }).mockResolvedValueOnce({ data: null, error: null });
    expect(await savePost('en', postId, {}, form('draft', 3))).toEqual({ error: 'conflict' });
    expect(mocks.eq).toHaveBeenCalledWith('version', 3);
    expect(mocks.update).toHaveBeenCalledWith(expect.not.objectContaining({ author_id: expect.anything() }));
  });
  it('unpublishes without retaining a publication timestamp', async () => {
    mocks.maybeSingle.mockResolvedValueOnce({ data: { published_at: '2026-11-01T00:00:00Z' }, error: null }).mockResolvedValueOnce({ data: { id: postId }, error: null });
    await expect(savePost('en', postId, {}, form('draft'))).rejects.toThrow('REDIRECT:');
    expect(mocks.update).toHaveBeenCalledWith(expect.objectContaining({ status: 'draft', published_at: null }));
  });
  it('deletes the selected version and invalidates public listings', async () => {
    await expect(deletePost('en', postId, {}, form('draft', 4))).rejects.toThrow('REDIRECT:/admin/posts?deleted=1');
    expect(mocks.eq).toHaveBeenCalledWith('id', postId);
    expect(mocks.eq).toHaveBeenCalledWith('version', 4);
    expect(mocks.revalidate).toHaveBeenCalledWith('/vi/blog', 'layout');
  });
});
