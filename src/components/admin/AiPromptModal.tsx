'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Check, Copy, FileCode, Sparkles, X, ArrowDownToLine, AlertCircle, ClipboardPaste } from 'lucide-react';
import ModalDialog from '@/components/ui/ModalDialog';
import { isImageUrl, slugify, type BlogBlock, type PostInput } from '@/lib/blog';
import type { Locale } from '@/types/content';

interface AiPromptModalProps {
  isOpen: boolean;
  onClose: () => void;
  locale: Locale;
  currentTitle?: string;
  initialTab?: 'prompt' | 'import';
  onApply: (data: Partial<PostInput>) => void;
}

function generateBlockId(): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

function extractJsonFromText(raw: string): Record<string, unknown> {
  const trimmed = raw.trim();
  if (!trimmed) throw new Error('Empty input');

  // 1. Try markdown code fences ```json ... ``` or ``` ... ```
  const fenceMatches = [...trimmed.matchAll(/```(?:json)?\s*([\s\S]*?)\s*```/g)];
  for (const match of fenceMatches) {
    try {
      const parsed = JSON.parse(match[1].trim());
      if (parsed && typeof parsed === 'object') return parsed as Record<string, unknown>;
    } catch {
      // try next match
    }
  }

  // 2. Try raw JSON parse directly
  try {
    const parsed = JSON.parse(trimmed);
    if (parsed && typeof parsed === 'object') return parsed as Record<string, unknown>;
  } catch {
    // continue to brace matching
  }

  // 3. Try outermost { ... }
  const firstBrace = trimmed.indexOf('{');
  const lastBrace = trimmed.lastIndexOf('}');
  if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
    const candidate = trimmed.slice(firstBrace, lastBrace + 1);
    const parsed = JSON.parse(candidate);
    if (parsed && typeof parsed === 'object') return parsed as Record<string, unknown>;
  }

  throw new Error('No valid JSON found');
}

export default function AiPromptModal({
  isOpen,
  onClose,
  locale,
  currentTitle = '',
  initialTab = 'prompt',
  onApply,
}: AiPromptModalProps) {
  const t = useTranslations('editor');
  const [activeTab, setActiveTab] = useState<'prompt' | 'import'>(initialTab);
  const [topic, setTopic] = useState(currentTitle);
  const [tone, setTone] = useState<'magazine' | 'guide' | 'culture' | 'nature'>('magazine');
  const [targetLocale, setTargetLocale] = useState<Locale>(locale);
  const [copied, setCopied] = useState(false);
  const [jsonInput, setJsonInput] = useState('');
  const [importError, setImportError] = useState<string | null>(null);
  const [importSuccess, setImportSuccess] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setActiveTab(initialTab);
      setImportError(null);
      setImportSuccess(false);
    }
  }, [isOpen, initialTab]);

  if (!isOpen) return null;

  const toneDescriptions: Record<'vi' | 'en', Record<string, string>> = {
    vi: {
      magazine: 'Tạp chí du lịch trải nghiệm sâu sắc (Văn phong giàu chất thơ, tinh tế, giàu hình ảnh, gợi cảm xúc, khai thác chiều sâu văn hóa và con người).',
      guide: 'Cẩm nang hướng dẫn chi tiết A-Z (Rõ ràng, thực tế, cung cấp thông tin lịch trình, phương tiện, chi phí, thời điểm lý tưởng và mẹo thực tế).',
      culture: 'Văn hóa, ẩm thực & di sản (Tập trung khám phá hương vị truyền thống, phong tục tập quán, làng nghề và câu chuyện sau từng nét văn hóa).',
      nature: 'Khám phá thiên nhiên & mạo hiểm (Hùng vĩ, khao khát phiêu lưu, miêu tả vẻ đẹp non nước tráng lệ và các hoạt động ngoài trời).',
    },
    en: {
      magazine: 'Immersive travel magazine (Poetic, evocative storytelling emphasizing local atmosphere, cultural depth, and sensory details).',
      guide: 'Comprehensive travel guide (Clear, actionable, practical tips, itineraries, transportation, budgeting, and best visiting seasons).',
      culture: 'Heritage, culture & local gastronomy (Focusing on traditional recipes, crafts, historical anecdotes, and local customs).',
      nature: 'Nature exploration & outdoor adventure (Majestic, inspiring, capturing Vietnam’s wild landscapes and hiking experiences).',
    },
  };

  const topicDisplay = topic.trim() || (targetLocale === 'vi' ? '[ĐIỀN CHỦ ĐỀ CỦA BẠN VÀO ĐÂY]' : '[ENTER YOUR STORY TOPIC HERE]');
  const selectedToneDesc = toneDescriptions[targetLocale][tone];

  const generatedPrompt = targetLocale === 'vi'
    ? `Bạn là một cây bút du lịch và biên tập viên cao cấp của tạp chí du lịch Việt Nam "VietExplore" (Dấu Chân Việt).
Nhiệm vụ của bạn: Hãy sáng tác một bài viết hoàn chỉnh, sâu sắc, cuốn hút và đúng chuẩn biên tập tạp chí về chủ đề:
"""
${topicDisplay}
"""

Định hướng văn phong: ${selectedToneDesc}
Ngôn ngữ bài viết: Tiếng Việt

============================================================
QUY TẮC BẮT BUỘC VỀ HÌNH ẢNH (ẢNH NÉT TỪ NỀN TẢNG LỚN)
============================================================
1. NGUỒN ẢNH VÀ ĐỘ NÉT:
- BẮT BUỘC chỉ lấy link ảnh từ các nền tảng ảnh nghệ thuật lớn hàng đầu thế giới: Ưu tiên số 1 là Unsplash (https://images.unsplash.com/...) hoặc Pexels (https://images.pexels.com/...).
- TUYỆT ĐỐI KHÔNG LẤY ẢNH TỪ WIKIPEDIA / WIKIMEDIA (ảnh mờ, cũ, chất lượng thấp, không đạt chuẩn tạp chí).
- Tất cả ảnh (cả ảnh bìa cover_image và ảnh trong các khối content) PHẢI CỰC KỲ SẮC NÉT (Full HD / 2K), góc máy nghệ thuật, ánh sáng đẹp, chuẩn phong cách tạp chí du lịch cao cấp.
- Đường dẫn ảnh Unsplash mẫu chuẩn nét: "https://images.unsplash.com/photo-[ID]?auto=format&fit=crop&w=1600&q=85"
- TUYỆT ĐỐI KHÔNG để trống \`cover_image: ""\` hay \`src: ""\`! Phải luôn điền link ảnh thật, đúng phong cảnh/văn hóa của địa danh đó.

2. CẤU TRÚC KẾT QUẢ ĐẦU RA:
Bạn BẮT BUỘC phải trình bày kết quả thành 2 PHẦN rõ ràng:

------------------------------------------------------------
### PHẦN 1: NỘI DUNG TỪNG PHẦN (DÙNG ĐỂ COPY & DÁN TỪNG Ô VÀO GIAO DIỆN)
------------------------------------------------------------

[TIÊU ĐỀ BÀI VIẾT]
(Dưới 160 ký tự, giàu cảm xúc hoặc lôi cuốn, mang phong cách tạp chí cao cấp)

[ĐƯỜNG DẪN / SLUG]
(Tiếng Việt không dấu, chữ thường, nối bằng gạch ngang, ví dụ: hanh-trinh-kham-pha-dia-danh)

[LỜI DẪN / EXCERPT]
(Đoạn mở đầu sapo từ 2-3 câu, dưới 320 ký tự, khơi gợi cảm xúc người đọc)

[ẢNH BÌA BÀI VIẾT (Cover Image)]
https://images.unsplash.com/photo-...?auto=format&fit=crop&w=1600&q=85 (Link ảnh Unsplash chất lượng cao, nét căng, đúng phong cảnh địa danh này)

[THẺ CHỦ ĐỀ / TAGS]
(Từ 4-8 thẻ ngắn gọn phân cách bằng dấu phẩy, ví dụ: Côn Đảo, Biển đảo, Du lịch Việt Nam, Trải nghiệm)

[CÁC KHỐI NỘI DUNG / CONTENT BLOCKS]
(Xây dựng bài viết gồm từ 7 đến 12 khối tuần tự hợp lý theo danh sách dưới đây):

--- Khối 1: [TIÊU ĐỀ H2] ---
<Tên tiêu đề mục 1>

--- Khối 2: [ĐOẠN VĂN] ---
<Nội dung đoạn văn mở đầu chi tiết, giàu cảm xúc, cung cấp góc nhìn tinh tế...>

--- Khối 3: [HÌNH ẢNH MINH HỌA] ---
- Đường dẫn ảnh (URL): https://images.unsplash.com/photo-...?auto=format&fit=crop&w=1200&q=85 (Ảnh Unsplash nét căng, đúng địa danh phong cảnh này)
- Mô tả ảnh (Alt): <Mô tả chi tiết bức ảnh>
- Chú thích ảnh (Caption): <Câu chú thích ảnh lắng đọng, truyền cảm hứng>

--- Khối 4: [TIÊU ĐỀ H2] ---
<Tên tiêu đề mục 2>

--- Khối 5: [ĐOẠN VĂN] ---
<Nội dung đoạn văn miêu tả cảnh quan, đời sống, trải nghiệm văn hóa hoặc ẩm thực...>

--- Khối 6: [TRÍCH DẪN] ---
- Câu trích dẫn: "<Một nhận định, cảm xúc hoặc câu nói đắt giá về vùng đất này>"
- Tác giả: <Tên nhân vật hoặc "Ký sự VietExplore">

--- Khối 7: [GHI CHÚ / CALLOUT] ---
<Lời khuyên hữu ích, mẹo bỏ túi, lưu ý quan trọng về thời điểm đi, trang phục, hoặc phương tiện...>

--- Khối 8: [TIÊU ĐỀ H2] ---
<Tên tiêu đề mục 3>

--- Khối 9: [DANH SÁCH] ---
(Mỗi dòng là một gạch đầu dòng, dán thẳng vào ô danh sách):
- <Mục 1: Trải nghiệm hoặc địa điểm nổi bật>
- <Mục 2: Trải nghiệm hoặc địa điểm nổi bật>
- <Mục 3: Trải nghiệm hoặc địa điểm nổi bật>
- <Mục 4: Trải nghiệm hoặc địa điểm nổi bật>

--- Khối 10: [ĐOẠN VĂN] ---
<Đoạn văn kết đọng lại nhiều cảm xúc, dư âm khó quên...>

------------------------------------------------------------
### PHẦN 2: MÃ JSON HOÀN CHỈNH (ĐỂ TỰ ĐỘNG ĐIỀN TOÀN BỘ 1-CLICK)
------------------------------------------------------------
Hãy xuất thêm đúng duy nhất một khối mã \`\`\`json ... \`\`\` chứa toàn bộ nội dung bài viết trên theo đúng cấu trúc sau (kèm link ảnh Unsplash nét căng) để người dùng chỉ cần dán vào nút "Thêm bài bằng JSON":

\`\`\`json
{
  "title": "<Tiêu đề bài viết>",
  "slug": "<duong-dan-bai-viet-khong-dau>",
  "excerpt": "<Lời dẫn bài viết>",
  "cover_image": "https://images.unsplash.com/photo-...?auto=format&fit=crop&w=1600&q=85",
  "tags": ["Thẻ 1", "Thẻ 2", "Thẻ 3"],
  "content": [
    { "type": "heading", "level": 2, "text": "...", "width": 12 },
    { "type": "paragraph", "text": "...", "width": 12 },
    { "type": "image", "src": "https://images.unsplash.com/photo-...?auto=format&fit=crop&w=1200&q=85", "alt": "...", "caption": "...", "aspect": "landscape", "width": 12 },
    { "type": "quote", "text": "...", "attribution": "...", "width": 12 },
    { "type": "callout", "text": "...", "width": 12 },
    { "type": "list", "items": ["Mục 1", "Mục 2", "Mục 3"], "width": 12 },
    { "type": "paragraph", "text": "...", "width": 12 }
  ]
}
\`\`\`

Lưu ý:
- Tiếng Việt chuẩn mực, câu từ chau chuốt, không dịch máy cứng nhắc.
- Thông tin về địa danh, văn hóa, ẩm thực, lịch sử Việt Nam và hình ảnh phải chân thực, chính xác.`
    : `You are an acclaimed travel writer and senior editor for Vietnam's premier travel magazine "VietExplore".
Your mission: Craft a comprehensive, evocative, and beautifully styled travel story on the topic:
"""
${topicDisplay}
"""

Editorial tone: ${selectedToneDesc}
Language: English

============================================================
IMAGE REQUIREMENTS (HIGH-RES ONLY FROM MAJOR PLATFORMS)
============================================================
1. PHOTO SOURCE & QUALITY:
- MUST use high-resolution direct image URLs exclusively from world-class photography platforms: Priority #1 is Unsplash (https://images.unsplash.com/...) or Pexels (https://images.pexels.com/...).
- STRICTLY DO NOT USE WIKIPEDIA / WIKIMEDIA COMMONS (often dated, low-res, or unsuitable for luxury travel magazines).
- Every photo (both cover_image and inline images) must be tack-sharp, high-resolution (Full HD/2K), with cinematic lighting and fine-art composition.
- Example Unsplash format with sharpness params: "https://images.unsplash.com/photo-[ID]?auto=format&fit=crop&w=1600&q=85"
- NEVER leave \`cover_image: ""\` or \`src: ""\` empty!

2. TWO-PART OUTPUT STRUCTURE:
Present your response in TWO DISTINCT PARTS:

------------------------------------------------------------
### PART 1: SECTION-BY-SECTION CONTENT (FOR MANUAL COPY & PASTE)
------------------------------------------------------------

[STORY TITLE]
(Under 160 characters, poetic or captivating magazine headline)

[STORY URL / SLUG]
(Lowercase, hyphen-separated, e.g. exploring-destination-name)

[INTRODUCTION / EXCERPT]
(Lead paragraph of 2-3 sentences, under 320 characters, capturing the soul of the journey)

[COVER IMAGE]
https://images.unsplash.com/photo-...?auto=format&fit=crop&w=1600&q=85 (Direct high-res photo URL from Unsplash)

[TOPIC TAGS]
(4 to 8 short tags separated by commas, e.g. Destination, Vietnam Travel, Heritage, Adventure)

[CONTENT BLOCKS]
(Organize the narrative into 7 to 12 sequential blocks clearly labeled so the editor can paste into each):

--- Block 1: [HEADING H2] ---
<Section 1 Title>

--- Block 2: [PARAGRAPH] ---
<Opening immersive paragraph with vivid sensory details...>

--- Block 3: [IMAGE] ---
- Image URL: https://images.unsplash.com/photo-...?auto=format&fit=crop&w=1200&q=85 (High-resolution Unsplash photography)
- Image description (Alt): <Short description of the photo>
- Caption: <Evocative, inspiring caption>

--- Block 4: [HEADING H2] ---
<Section 2 Title>

--- Block 5: [PARAGRAPH] ---
<Deep dive into landscape, local life, cultural nuances, or gastronomy...>

--- Block 6: [QUOTE] ---
- Quote text: "<A memorable quote, impression, or local reflection>"
- Attribution: <Speaker name or "VietExplore Dispatch">

--- Block 7: [NOTE / CALLOUT] ---
<Practical insider tips, best timing, etiquette, or transport advice...>

--- Block 8: [HEADING H2] ---
<Section 3 Title>

--- Block 9: [LIST] ---
(Bullet points, one per line):
- <Highlight 1: Must-do experience or landmark>
- <Highlight 2: Must-do experience or landmark>
- <Highlight 3: Must-do experience or landmark>
- <Highlight 4: Must-do experience or landmark>

--- Block 10: [PARAGRAPH] ---
<Conclusive closing paragraph leaving a lasting impression...>

------------------------------------------------------------
### PART 2: STRUCTURED JSON (FOR 1-CLICK AUTOFILL)
------------------------------------------------------------
Provide a single \`\`\`json ... \`\`\` block containing the complete story matching this schema (with real, sharp Unsplash image links):

\`\`\`json
{
  "title": "<Story Title>",
  "slug": "<story-slug>",
  "excerpt": "<Story Excerpt>",
  "cover_image": "https://images.unsplash.com/photo-...?auto=format&fit=crop&w=1600&q=85",
  "tags": ["Tag 1", "Tag 2", "Tag 3"],
  "content": [
    { "type": "heading", "level": 2, "text": "...", "width": 12 },
    { "type": "paragraph", "text": "...", "width": 12 },
    { "type": "image", "src": "https://images.unsplash.com/photo-...?auto=format&fit=crop&w=1200&q=85", "alt": "...", "caption": "...", "aspect": "landscape", "width": 12 },
    { "type": "quote", "text": "...", "attribution": "...", "width": 12 },
    { "type": "callout", "text": "...", "width": 12 },
    { "type": "list", "items": ["Item 1", "Item 2", "Item 3"], "width": 12 },
    { "type": "paragraph", "text": "...", "width": 12 }
  ]
}
\`\`\`

Note: Ensure accurate facts regarding Vietnam's geography, culture, and travel logistics.`;

  const handleCopy = async () => {
    try {
      if (typeof navigator !== 'undefined' && navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(generatedPrompt);
      } else {
        const textarea = document.createElement('textarea');
        textarea.value = generatedPrompt;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // ignore clipboard error
    }
  };

  const handlePasteClipboard = async () => {
    try {
      if (typeof navigator !== 'undefined' && navigator.clipboard?.readText) {
        const text = await navigator.clipboard.readText();
        if (text) {
          setJsonInput(text);
          setImportError(null);
        }
      }
    } catch {
      // ignore clipboard permission error
    }
  };

  const handleApplyJson = () => {
    setImportError(null);
    setImportSuccess(false);

    try {
      const parsed = extractJsonFromText(jsonInput);

      const nextTitle = typeof parsed.title === 'string' ? parsed.title.slice(0, 160) : '';
      const nextSlug = typeof parsed.slug === 'string' && parsed.slug.trim()
        ? slugify(parsed.slug)
        : slugify(nextTitle);
      const nextExcerpt = typeof parsed.excerpt === 'string' ? parsed.excerpt.slice(0, 320) : '';
      const nextCoverImage = typeof parsed.cover_image === 'string' && isImageUrl(parsed.cover_image)
        ? parsed.cover_image
        : '';
      const nextTags = Array.isArray(parsed.tags)
        ? parsed.tags
            .filter((item: unknown): item is string => typeof item === 'string')
            .map((item: string) => item.trim())
            .filter(Boolean)
            .slice(0, 12)
        : [];

      const rawBlocks = Array.isArray(parsed.content) ? parsed.content : [];
      const nextBlocks: BlogBlock[] = [];

      for (const item of rawBlocks) {
        if (!item || typeof item !== 'object') continue;
        const entry = item as Record<string, unknown>;
        const id = generateBlockId();
        const width = typeof entry.width === 'number' && entry.width >= 6 && entry.width <= 12 ? entry.width : 12;

        switch (entry.type) {
          case 'heading':
            nextBlocks.push({
              id,
              width,
              type: 'heading',
              level: entry.level === 3 ? 3 : 2,
              text: String(entry.text ?? ''),
            });
            break;
          case 'paragraph':
            nextBlocks.push({
              id,
              width,
              type: 'paragraph',
              text: String(entry.text ?? ''),
            });
            break;
          case 'image':
            nextBlocks.push({
              id,
              width,
              type: 'image',
              src: typeof entry.src === 'string' && isImageUrl(entry.src) ? entry.src : String(entry.src ?? ''),
              alt: String(entry.alt ?? '').slice(0, 200),
              caption: String(entry.caption ?? '').slice(0, 500),
              aspect: ['square', 'portrait'].includes(entry.aspect as string) ? (entry.aspect as 'square' | 'portrait') : 'landscape',
            });
            break;
          case 'quote':
            nextBlocks.push({
              id,
              width,
              type: 'quote',
              text: String(entry.text ?? ''),
              attribution: String(entry.attribution ?? '').slice(0, 200),
            });
            break;
          case 'callout':
            nextBlocks.push({
              id,
              width,
              type: 'callout',
              text: String(entry.text ?? ''),
            });
            break;
          case 'list':
            nextBlocks.push({
              id,
              width,
              type: 'list',
              items: Array.isArray(entry.items)
                ? entry.items.map((e: unknown) => String(e ?? '')).filter((s: string) => s.trim().length > 0).slice(0, 50)
                : typeof entry.text === 'string'
                  ? entry.text.split('\n').filter(Boolean)
                  : [],
            });
            break;
          case 'divider':
            nextBlocks.push({
              id,
              width,
              type: 'divider',
            });
            break;
        }
      }

      if (!nextTitle && nextBlocks.length === 0) {
        setImportError(t('aiImportError'));
        return;
      }

      onApply({
        ...(nextTitle ? { title: nextTitle } : {}),
        ...(nextSlug ? { slug: nextSlug } : {}),
        ...(nextExcerpt ? { excerpt: nextExcerpt } : {}),
        ...(nextCoverImage ? { cover_image: nextCoverImage } : {}),
        ...(nextTags.length > 0 ? { tags: nextTags } : {}),
        ...(nextBlocks.length > 0 ? { content: nextBlocks } : {}),
      });

      setImportSuccess(true);
      setTimeout(() => {
        onClose();
        setImportSuccess(false);
      }, 1200);
    } catch {
      setImportError(t('aiImportError'));
    }
  };

  return (
    <ModalDialog
      label={activeTab === 'import' ? t('aiTabImport') : t('aiPromptTitle')}
      onClose={onClose}
      className="fixed inset-0 m-auto flex max-h-[92vh] w-[calc(100%_-_2rem)] max-w-3xl flex-col overflow-hidden rounded-3xl border border-border bg-card p-0 text-foreground shadow-2xl backdrop:bg-black/50"
    >
      {/* Modal Header */}
      <div className="flex shrink-0 items-center justify-between border-b border-border p-5 sm:px-7 sm:py-5">
        <div className="flex items-center gap-3">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            {activeTab === 'import' ? <FileCode className="size-5 text-primary" /> : <Sparkles className="size-5 text-secondary" />}
          </div>
          <div>
            <h2 className="font-serif text-lg font-bold sm:text-xl text-primary">
              {activeTab === 'import' ? t('aiTabImport') : t('aiPromptTitle')}
            </h2>
            <p className="text-xs text-muted-foreground">{t('aiPromptSubtitle')}</p>
          </div>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="editor-icon-button hover:bg-muted"
          aria-label={t('aiClose')}
        >
          <X className="size-4" />
        </button>
      </div>

      {/* Tabs */}
      <div className="flex shrink-0 border-b border-border bg-muted/40 px-5 sm:px-7">
        <button
          type="button"
          onClick={() => setActiveTab('prompt')}
          className={`flex items-center gap-2 border-b-2 py-3.5 text-xs font-semibold transition-colors ${
            activeTab === 'prompt'
              ? 'border-primary text-primary font-bold'
              : 'border-transparent text-muted-foreground hover:text-foreground'
          }`}
        >
          <Sparkles className="size-3.5 text-secondary" />
          <span>{t('aiTabPrompt')}</span>
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('import')}
          className={`ml-6 flex items-center gap-2 border-b-2 py-3.5 text-xs font-semibold transition-colors ${
            activeTab === 'import'
              ? 'border-primary text-primary font-bold'
              : 'border-transparent text-muted-foreground hover:text-foreground'
          }`}
        >
          <FileCode className="size-3.5 text-secondary" />
          <span>{t('aiTabImport')}</span>
        </button>
      </div>

      {/* Modal Body */}
      <div className="flex-1 overflow-y-auto p-5 sm:p-7">
        {activeTab === 'prompt' ? (
          <div className="space-y-5">
            {/* Topic Input */}
            <div>
              <label htmlFor="ai-topic-input" className="mb-2 block text-xs font-semibold text-primary">
                {t('aiTopic')} <span className="font-normal text-muted-foreground">(Chỉ cần đổi chủ đề tại đây)</span>
              </label>
              <input
                id="ai-topic-input"
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder={t('aiTopicPlaceholder')}
                className="editor-input font-medium text-foreground"
              />
            </div>

            {/* Controls: Tone & Language */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="ai-tone-select" className="mb-2 block text-xs font-semibold text-muted-foreground">
                  {t('aiTone')}
                </label>
                <select
                  id="ai-tone-select"
                  value={tone}
                  onChange={(e) => setTone(e.target.value as typeof tone)}
                  className="editor-input"
                >
                  <option value="magazine">{t('aiToneMagazine')}</option>
                  <option value="guide">{t('aiToneGuide')}</option>
                  <option value="culture">{t('aiToneCulture')}</option>
                  <option value="nature">{t('aiToneNature')}</option>
                </select>
              </div>
              <div>
                <label htmlFor="ai-locale-select" className="mb-2 block text-xs font-semibold text-muted-foreground">
                  {t('language')}
                </label>
                <select
                  id="ai-locale-select"
                  value={targetLocale}
                  onChange={(e) => setTargetLocale(e.target.value as Locale)}
                  className="editor-input"
                >
                  <option value="vi">Tiếng Việt</option>
                  <option value="en">English</option>
                </select>
              </div>
            </div>

            {/* Prompt Preview & Copy Button */}
            <div>
              <div className="mb-2 flex items-center justify-between">
                <span className="text-xs font-semibold text-muted-foreground">Prompt mẫu đã tích hợp tìm ảnh thực tế:</span>
                <button
                  type="button"
                  onClick={handleCopy}
                  className={`inline-flex items-center gap-1.5 rounded-xl px-3.5 py-1.5 text-xs font-semibold transition-all ${
                    copied
                      ? 'bg-primary text-white shadow-sm'
                      : 'border border-primary/20 bg-primary/10 text-primary hover:bg-primary/20'
                  }`}
                >
                  {copied ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
                  <span>{copied ? t('aiCopied') : t('aiCopyPrompt')}</span>
                </button>
              </div>
              <div className="relative">
                <pre className="max-h-60 overflow-y-auto rounded-2xl border border-border bg-muted/60 p-4 font-mono text-[11px] leading-relaxed whitespace-pre-wrap text-foreground">
                  {generatedPrompt}
                </pre>
              </div>
            </div>

            {/* Instructions box */}
            <div className="rounded-2xl border border-secondary/20 bg-secondary/5 p-4 text-xs leading-relaxed text-foreground">
              <p className="mb-2 font-bold text-secondary-text">{t('aiPromptGuideTitle')}</p>
              <ul className="space-y-1 text-muted-foreground">
                <li>{t('aiPromptGuide1')}</li>
                <li>{t('aiPromptGuide2')}</li>
                <li>{t('aiPromptGuide3')}</li>
              </ul>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="rounded-2xl border border-primary/20 bg-primary/5 p-4 text-xs leading-relaxed text-foreground">
              <p className="font-bold text-primary mb-1">Cách nhập bài viết tự động từ AI:</p>
              <p className="text-muted-foreground">
                Sau khi AI viết xong, bạn có thể copy <strong>khối mã JSON</strong> (hoặc copy <strong>toàn bộ câu trả lời của AI</strong>) dán vào ô bên dưới, rồi bấm nút <strong>{t('aiImportSubmit')}</strong>. Hệ thống sẽ tự động trích xuất và điền sẵn Tiêu đề, Đường dẫn, Lời dẫn, Ảnh bìa, Thẻ và tạo toàn bộ các khối nội dung kèm ảnh thật!
              </p>
            </div>

            <div>
              <div className="mb-2 flex items-center justify-between">
                <label htmlFor="ai-json-input" className="block text-xs font-semibold text-primary">
                  {t('aiImportLabel')}
                </label>
                <button
                  type="button"
                  onClick={handlePasteClipboard}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-border px-2.5 py-1 text-[11px] font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
                >
                  <ClipboardPaste className="size-3.5" />
                  <span>Dán từ bộ nhớ tạm</span>
                </button>
              </div>
              <textarea
                id="ai-json-input"
                rows={11}
                value={jsonInput}
                onChange={(e) => {
                  setJsonInput(e.target.value);
                  setImportError(null);
                }}
                placeholder={t('aiImportPlaceholder')}
                className="editor-input min-h-52 resize-y font-mono text-xs leading-relaxed"
              />
            </div>

            {importError && (
              <div role="alert" className="flex items-center gap-2 rounded-xl border border-secondary/30 bg-secondary/10 p-3 text-xs text-secondary-text">
                <AlertCircle className="size-4 shrink-0" />
                <span>{importError}</span>
              </div>
            )}

            {importSuccess && (
              <div role="status" className="flex items-center gap-2 rounded-xl border border-primary/30 bg-primary/10 p-3 text-xs text-primary font-medium">
                <Check className="size-4 shrink-0" />
                <span>{t('aiImportSuccess')}</span>
              </div>
            )}

            <div className="flex justify-end pt-2">
              <button
                type="button"
                onClick={handleApplyJson}
                disabled={!jsonInput.trim()}
                className="editor-button text-xs disabled:opacity-40"
              >
                <ArrowDownToLine className="size-4" />
                <span>{t('aiImportSubmit')}</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Modal Footer */}
      <div className="flex shrink-0 items-center justify-between border-t border-border bg-card p-4 sm:px-7">
        <span className="text-[11px] text-muted-foreground">VietExplore · Hỗ trợ định dạng chuẩn cho AI</span>
        <button
          type="button"
          onClick={onClose}
          className="rounded-xl border border-border px-4 py-2 text-xs font-semibold text-muted-foreground hover:bg-muted"
        >
          {t('aiClose')}
        </button>
      </div>
    </ModalDialog>
  );
}
