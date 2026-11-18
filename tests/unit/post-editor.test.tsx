import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
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

beforeEach(() => {
  vi.spyOn(HTMLDialogElement.prototype, 'showModal').mockImplementation(function (this: HTMLDialogElement) {
    this.setAttribute('open', '');
  });
  vi.spyOn(HTMLDialogElement.prototype, 'close').mockImplementation(function (this: HTMLDialogElement) {
    this.removeAttribute('open');
  });
});

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
  it('opens AI prompt generator, updates prompt dynamically, and imports JSON structure', async () => {
    editor();
    fireEvent.click(screen.getAllByRole('button', { name: en.editor.aiPromptButton })[0]);
    expect(screen.getByRole('dialog', { name: en.editor.aiPromptTitle })).toBeInTheDocument();

    const promptText = screen.getByText(/You are an acclaimed travel writer/);
    expect(promptText).toBeInTheDocument();
    expect(promptText.textContent).toContain('[ENTER YOUR STORY TOPIC HERE]');

    const topicInput = screen.getByLabelText(new RegExp(en.editor.aiTopic));
    fireEvent.change(topicInput, { target: { value: 'Ha Giang Loop Adventure' } });
    expect(promptText.textContent).toContain('Ha Giang Loop Adventure');

    fireEvent.click(screen.getByRole('button', { name: en.editor.aiTabImport }));

    const jsonArea = screen.getByLabelText(en.editor.aiImportLabel);
    const samplePayload = JSON.stringify({
      title: 'Ha Giang Loop: A Journey Beyond Clouds',
      slug: 'ha-giang-loop-journey-beyond-clouds',
      excerpt: 'Riding the winding passes of Dong Van and Ma Pi Leng is an unforgettable adventure.',
      tags: ['Ha Giang', 'Motorbike', 'Adventure'],
      content: [
        { type: 'heading', level: 2, text: 'The Majesty of Ma Pi Leng' },
        { type: 'paragraph', text: 'Perched thousands of meters above the emerald Nho Que River...' }
      ]
    });
    fireEvent.change(jsonArea, { target: { value: samplePayload } });

    fireEvent.click(screen.getByRole('button', { name: en.editor.aiImportSubmit }));

    await waitFor(() => {
      expect(screen.getByRole('textbox', { name: 'Story title' })).toHaveValue('Ha Giang Loop: A Journey Beyond Clouds');
      expect(screen.getByRole('textbox', { name: 'Story URL' })).toHaveValue('ha-giang-loop-journey-beyond-clouds');
      expect(screen.getByRole('textbox', { name: 'Introduction' })).toHaveValue('Riding the winding passes of Dong Van and Ma Pi Leng is an unforgettable adventure.');
      expect(screen.getByRole('textbox', { name: /Topic tags/ })).toHaveValue('Ha Giang, Motorbike, Adventure');
    });
  });
  it('opens import dialog directly via Import JSON button and extracts JSON from full conversational AI reply', async () => {
    editor();
    fireEvent.click(screen.getAllByRole('button', { name: en.editor.aiImportButton })[0]);
    expect(screen.getByRole('dialog', { name: en.editor.aiTabImport })).toBeInTheDocument();

    const fullAiResponse = `Here is your travel article:
Part 1: Content details...

\`\`\`json
{
  "title": "Con Dao Islands: Whispers of the Wild Ocean",
  "slug": "con-dao-islands-whispers-of-the-wild-ocean",
  "excerpt": "A secluded paradise where untouched nature meets quiet colonial history.",
  "cover_image": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200",
  "tags": ["Con Dao", "Islands", "Beaches"],
  "content": [
    { "type": "heading", "level": 2, "text": "Arrival in Archipelago" },
    { "type": "image", "src": "https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=1200", "alt": "Dam Trau Beach", "caption": "The pristine shoreline of Dam Trau", "aspect": "landscape" },
    { "type": "paragraph", "text": "Stepping off the turboprop onto the runway..." }
  ]
}
\`\`\`
Hope you like it!`;

    const jsonArea = screen.getByLabelText(en.editor.aiImportLabel);
    fireEvent.change(jsonArea, { target: { value: fullAiResponse } });
    fireEvent.click(screen.getByRole('button', { name: en.editor.aiImportSubmit }));

    await waitFor(() => {
      expect(screen.getByRole('textbox', { name: 'Story title' })).toHaveValue('Con Dao Islands: Whispers of the Wild Ocean');
      expect(screen.getByRole('textbox', { name: 'Story URL' })).toHaveValue('con-dao-islands-whispers-of-the-wild-ocean');
      expect(screen.getByRole('textbox', { name: 'Introduction' })).toHaveValue('A secluded paradise where untouched nature meets quiet colonial history.');
      expect(screen.getByRole('textbox', { name: /Topic tags/ })).toHaveValue('Con Dao, Islands, Beaches');
    });
  });
});
