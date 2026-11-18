import { afterEach, describe, expect, it, vi } from 'vitest';
import { cleanup, fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import PostEditor from '@/components/admin/PostEditor';
import en from '../../messages/en.json';
import type { Locale } from '@/types/content';
import type { PostActionState } from '@/actions/posts';

const mocks = vi.hoisted(() => ({
  save: vi.fn<(locale: Locale, id: string | null, state: PostActionState, form: FormData) => Promise<PostActionState>>().mockResolvedValue({ error: 'unavailable' }),
}));
vi.mock('@/actions/posts', () => ({ savePost: mocks.save }));
vi.mock('@/i18n/navigation', () => ({ Link: ({ children, href }: { children: React.ReactNode; href: string }) => <a href={href}>{children}</a> }));
vi.mock('@/lib/supabase/client', () => ({ createSupabaseBrowserClient: vi.fn() }));

afterEach(() => { cleanup(); vi.clearAllMocks(); });

function editor() { return render(<NextIntlClientProvider locale="en" messages={en}><PostEditor locale="en" /></NextIntlClientProvider>); }

describe('Block editor interactions', () => {
  it('normalizes the slug, reorders/resizes blocks and previews the same content safely', () => {
    editor();
    fireEvent.change(screen.getByRole('textbox', { name: 'Story title' }), { target: { value: 'Đà Lạt buổi sáng' } });
    expect(screen.getByRole('textbox', { name: 'Story URL' })).toHaveValue('da-lat-buoi-sang');
    fireEvent.click(screen.getByRole('button', { name: 'Heading' }));
    fireEvent.change(within(screen.getByRole('article', { name: 'Block 1: Heading' })).getByRole('textbox', { name: 'Content' }), { target: { value: 'A lakeside morning' } });
    fireEvent.click(screen.getByRole('button', { name: 'Paragraph' }));
    const paragraph = screen.getByRole('article', { name: 'Block 2: Paragraph' });
    fireEvent.change(within(paragraph).getByRole('textbox'), { target: { value: '<script>alert(1)</script> A quiet walk.' } });
    fireEvent.change(within(paragraph).getByRole('slider'), { target: { value: '6' } });
    fireEvent.click(within(paragraph).getByRole('button', { name: 'Move up' }));
    expect(screen.getAllByRole('article')[0]).toHaveAccessibleName('Block 1: Paragraph');
    expect(within(screen.getAllByRole('article')[0]).getByRole('slider')).toHaveValue('6');
    fireEvent.click(screen.getByRole('button', { name: 'Preview' }));
    expect(screen.getByRole('heading', { name: 'A lakeside morning' })).toBeInTheDocument();
    expect(screen.getByText('<script>alert(1)</script> A quiet walk.')).toBeInTheDocument();
    expect(document.querySelector('script')).toBeNull();
  });
  it('retains edits and reports a failed save without pretending the post was saved', async () => {
    editor();
    fireEvent.change(screen.getByRole('textbox', { name: 'Story title' }), { target: { value: 'A new Hanoi story' } });
    fireEvent.click(screen.getByRole('button', { name: 'Save draft' }));
    await waitFor(() => expect(mocks.save).toHaveBeenCalledOnce());
    expect(await screen.findByRole('alert')).toHaveTextContent(en.editor.unavailable);
    expect(screen.getByRole('textbox', { name: 'Story title' })).toHaveValue('A new Hanoi story');
    expect(screen.getByText('Unsaved changes')).toBeInTheDocument();
  });
  it('prevents publishing empty content and keeps a manually edited slug', () => {
    editor();
    fireEvent.change(screen.getByRole('textbox', { name: 'Story title' }), { target: { value: 'A story title' } });
    fireEvent.change(screen.getByRole('textbox', { name: 'Story URL' }), { target: { value: 'my-custom-url' } });
    fireEvent.change(screen.getByRole('textbox', { name: 'Story title' }), { target: { value: 'A changed title' } });
    expect(screen.getByRole('textbox', { name: 'Story URL' })).toHaveValue('my-custom-url');
    fireEvent.click(screen.getByRole('button', { name: 'Publish story' }));
    expect(screen.getByRole('alert')).toHaveTextContent(en.editor.invalid);
    expect(mocks.save).not.toHaveBeenCalled();
  });
});
