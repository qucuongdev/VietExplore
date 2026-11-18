# VietExplore — MVP Frontend Implementation Prompt

> **Purpose:** Copy this file into `docs/ai-build-prompt.md` of the project and instruct your AI coding agent to execute it.  
> **Project name:** VietExplore  
> **Repository / root folder:** `vietexplore-web`  
> **Target:** A polished, fast, fully usable, bilingual travel-discovery website covering **Vietnam's current 34 provinces and centrally governed cities**.  
> **Deployment:** Vercel. **Do not add Docker.**  
> **Scope:** **Frontend-first MVP**, using local typed content/mock data. Backend, CMS, authentication and real database are explicitly out of scope.

---

## 0. Agent role and execution contract

You are a senior **Next.js/TypeScript frontend engineer, UI/UX designer and accessibility-minded product engineer**. Your assignment is to **build the working MVP** in the repository, not merely propose designs, generate a scaffold, or describe what should be implemented.

**Working rules:**

1. First inspect the existing repository and package configuration; preserve useful code and follow existing conventions unless they conflict with this plan. If the repository is empty, initialize a new Next.js application.
2. Prefer reliable, maintainable, minimal dependencies over novelty. Use stable, compatible versions verified against official documentation at implementation time. Do not hard-code unverified version numbers.
3. **All folder names, file names, code identifiers, database-like fields, paths, component names and git-related conventions must be in English.** Comments and technical documentation should also be in English where practical. User-facing copy must be properly localized into Vietnamese and English.
4. Work phase by phase, run relevant tests after each phase, fix failures, and continue until the acceptance criteria are met. Do not stop at wireframes or placeholder pages.
5. Do not claim a requirement is complete without running/building/verifying it. If a command or resource is unavailable, report the exact blocker and implement the best safe fallback.
6. Do not invent prices, ratings, opening hours, geographic coordinates, image ownership, travel times, travel statistics, administrative facts, or editorial claims. If not verified, omit the field or display a clearly scoped placeholder in development only.
7. Do not introduce a real backend, Prisma, database, admin panel, authentication, payment, booking, external AI service, analytics service, Docker, Kubernetes or complicated infrastructure for this MVP.
8. No dead buttons, dummy navigation, fake filters or fake submission success. Every visible control must be functional, intentionally disabled with a clear reason, or removed.
9. Keep the site **deployable to Vercel** via a normal Next.js production build. Do not use `output: 'export'` because root locale negotiation is expected to run on the server.
10. Make reasonable product decisions independently. Do not block progress on minor questions; document assumptions in the final delivery report.

## 1. Product vision

Build a visual, editorial-quality discovery website for tourism in Vietnam. The experience should feel like an elegant travel magazine combined with a modern travel explorer, **not a generic CRUD dashboard or template landing page**.

**Working brand:** `VietExplore` (text logo is sufficient; no need to create or claim rights to a third-party logo).

**Primary user journeys:**

- A first-time visitor lands on a stunning homepage and immediately understands what the site is for.
- The visitor discovers provinces/cities, explores destinations and reads a clear destination detail page.
- The visitor searches by province or destination name, including Vietnamese diacritics and accent-insensitive input.
- The visitor filters destinations by area/category and can clear filters easily.
- The visitor switches between Vietnamese and English, keeping the same page and query state where feasible.
- The visitor browses comfortably on mobile with good touch targets, no jank and no horizontal overflow.

**MVP principle:** prioritize **frontend stability, excellent UI/UX, content accuracy and page performance** over feature quantity.

## 2. MVP scope and exclusions

### Must ship (P0)

- Attractive responsive homepage with hero, search entry, category exploration, featured destinations, province explorer, and clear calls to action.
- Province directory covering **all 34 official provincial-level units**.
- Province detail pages with available destination cards or an honest empty state.
- Destination directory with working search, categories, province filters, sort options (only meaningful ones based on available data), active filter chips and reset controls.
- Destination detail pages with hero/gallery, location context, descriptive content, practical information **only where verified**, related destinations and breadcrumbs.
- Site-wide header, footer, mobile navigation, loading/empty/error/not-found states.
- Working `vi`/`en` localization with language preference rules specified below.
- SEO essentials: localized title/description, correct `lang`, canonical and `hreflang`, Open Graph defaults, sitemap and `robots.txt` where appropriate.
- Robust licensed imagery strategy with credit/source metadata and elegant fallbacks.
- Keyboard accessibility, reduced-motion support and responsive layouts.
- Vercel-compatible production build, basic automated tests and a useful README.

### Nice to have only if P0 is solid (P1)

- Locally persisted favorites using `localStorage` without accounts, with transparent messaging about local-only storage.
- A simple province/destination geographic explorer with an **honest** map/list presentation if reliable source data and provider terms are available. Do **not** fabricate a map of provincial borders.
- Curated thematic collections such as “Coastal escapes”, “Mountain retreats” and “Cultural heritage”.
- Light/dark toggle only if the light theme is already excellent and the second theme can be fully supported.

### Explicitly out of scope

- Real database, headless CMS, content ingestion backend, user registration/login, comments, user reviews, ratings, booking, payments, travel price estimates, AI planner, live opening hours, automatic web scraping, upload service, admin CRUD UI, production API integrations or advanced routing/navigation maps.
- No Dockerfile, `docker-compose.yml`, database migrations, S3 integration or Vercel Blob integration in this MVP.

## 3. Technical architecture

**Preferred stack:**

- Next.js **App Router** with TypeScript and strict type checking.
- Tailwind CSS for responsive design.
- `shadcn/ui` and accessible Radix primitives selectively, rather than importing a large component library indiscriminately.
- `lucide-react` for consistent iconography.
- `next-intl` for localization.
- `next/image` and appropriately optimized assets.
- `motion` / Framer Motion **only where materially beneficial**, with `prefers-reduced-motion` support and small client bundles; CSS transitions are preferred for simple hover/focus effects.
- Vitest + React Testing Library for focused unit/component tests; Playwright for critical browser flows.
- Local, typed fixture content in `src/data/` backed by a small repository/data-access interface, so a future backend can replace it without rewriting views.

**Architecture guidelines:**

- Prefer Server Components for static/content-heavy pages. Use Client Components only for real interactivity (search controls, filters, mobile menus, language switchers, favorites).
- Avoid making the entire application a Client Component.
- Use stable IDs/slugs for content, not translated display strings as database keys.
- Keep data, translations, UI and navigation concerns separate.
- Use semantic links for navigation and buttons for actions.
- Avoid unnecessary state-management libraries; use React state and URL search params where suitable.
- Do not add fake API routes solely to simulate a backend; import from the typed local content repository.

## 4. Design direction — premium editorial travel

**Visual tone:** clean, aspirational, contemporary, warm, nature-inspired. Not corporate blue, not neon, not a standard admin panel.

**Suggested design tokens** (adjust if a coherent stronger design emerges):

- Background: warm off-white / cream (`#F8F7F3`)
- Main text: near-black charcoal (`#202723`)
- Primary accent: deep forest green (`#194D42`)
- Secondary accent: warm terracotta (`#C87956`)
- Surfaces: restrained neutral grays and warm whites
- Corners: 12–20px cards, natural rounded controls (avoid exaggerated pill styling everywhere)
- Typography: elegant modern sans such as **Be Vietnam Pro** or **Manrope** (verify Vietnamese glyph support, supply fallbacks). Use consistent scale and readable line heights.

**Required visual qualities:**

- Large, immersive hero photography with legible headline overlay and gradient protection.
- High-quality card layouts with well-chosen aspect ratios and balanced image crops.
- Distinct composition and typographic hierarchy. Alternate white space, rich imagery, editorial copy and selective visual accents.
- Consistent grid, spacing, hover and focus states across pages.
- Delightful but restrained transitions (approximately 150–300ms for small UI interactions); do not force long page entrance animations.
- Clear clickable cards, hover affordances and visible focus rings.
- Sticky header only if it does not waste mobile viewport space.
- Mobile-first layouts with bottom sheets/drawers where appropriate for filters, not tiny desktop controls squeezed into mobile.
- Content must remain usable with images blocked, JavaScript partially delayed or animations disabled.

**Avoid:** stock-looking dashboard cards, random bright gradients, text over low-contrast photos, autoplay videos, endless carousels, heavy parallax, excessive motion, fake social proof, overly small text, layout shifts and generic placeholder lorem ipsum.

## 5. Information architecture and routes

All code-level route segments are in **English**, even when the current locale is Vietnamese:

```text
/
/vi
/en
/vi/provinces
/en/provinces
/vi/provinces/[slug]
/en/provinces/[slug]
/vi/destinations
/en/destinations
/vi/destinations/[slug]
/en/destinations/[slug]
/vi/explore
/en/explore
```

Implement route groups where useful, but keep URL structure clean. Provide graceful `not-found` pages. If a section is out of scope, don't link to an empty route.

**Home page sections:**

1. Full-width image-driven hero with localized headline, short subtitle and prominent destination search.
2. Category chips or cards (e.g. mountains, beaches, culture, nature, city escapes).
3. Curated featured destinations grid with immersive image treatment.
4. 34-province explorer, with useful region groupings only if the grouping is accurate.
5. Editorial callout or curated mini-guide based on verified local fixture content.
6. Quiet CTA and useful footer with language controls, site info and source/credits link.

**Province directory:** search + optional region tabs/filters + all 34 province cards, sensible fallback visuals for provinces without verified photos.

**Province detail:** title, description, available destinations, search/filter entry, localized empty state when none are curated yet. Never invent a count of attractions.

**Destination directory:** search, category and province facets, result count, responsive filters, clear-all, no-results state, meaningful order (e.g. curated/alpha rather than fabricated popularity).

**Destination detail:** image gallery, title, province, authentic summary, highlights if sourced, suitable categories, optional verifiable location information, related content, proper image alt text.

## 6. Localization rules — mandatory

Only **two supported locales**: `vi` and `en`.

- Browser's **highest-priority** requested language has base language `vi` (e.g. `vi`, `vi-VN`) → redirect a first visit at `/` to `/vi`.
- Every other highest-priority language (`en`, `ja`, `fr`, `ko`, `zh`, unknown or missing) → `/en`.
- Respect quality weights (`q=`) in the `Accept-Language` header when deciding which language is most preferred; do **not** simply test whether the header contains `vi` anywhere.
- Explicit `/vi/...` and `/en/...` paths **always win** over browser detection.
- A manually chosen language should be remembered (cookie or equivalent) and should override detection for later visits to bare `/`; user must be able to switch back.
- No hidden default that silently translates a user from `/en` to `/vi` or vice versa.
- Translation of interface labels must use `next-intl` and `messages/vi.json`, `messages/en.json`, not hardcoded mixed-language JSX.
- Localized destination/province titles and summaries must come from content translation fields, not UI message keys.
- Missing English content must follow a documented, explicit fallback policy; never present Vietnamese content as English without marking it or pretending it was translated.
- For a language switch, preserve the corresponding content slug and query parameters as far as possible.
- Set `<html lang="vi">` / `<html lang="en">`, correct localized metadata and `hreflang` links.
- Avoid redirect loops and unexpected caching of locale redirects on Vercel.

**Implementation suggestion:** `next-intl` with locale-prefix routing, `defaultLocale: 'en'`, `localeDetection: false`, and a small custom root detection inside the current Next.js `proxy.ts` / appropriate routing entrypoint (depending on verified library version). Follow the current official Next.js/next-intl API and do not assume old Middleware filenames still apply. Test the interplay between saved preferences and explicit paths.

**Locale test cases:**

| Request / condition | Expected result |
|---|---|
| `/`, `Accept-Language: vi-VN,vi;q=0.9,en;q=0.8` | `/vi` |
| `/`, `Accept-Language: en-US,en;q=0.9,vi;q=0.7` | `/en` |
| `/`, `Accept-Language: ja-JP,vi;q=0.5` | `/en` |
| `/`, missing header | `/en` |
| `/en/provinces`, browser is Vietnamese | Stay `/en/provinces` |
| `/vi/destinations`, browser is English | Stay `/vi/destinations` |
| Manually choose English, then revisit `/` | `/en` |

## 7. Official 34-province dataset — do not use the former 63-province list

Seed the **current** 34 province/city entities using reliable official names and a machine-safe slug. This list is based on Vietnam's 2025 administrative reorganization. Six cities and 28 provinces:

**Centrally governed cities (6):**

- Hà Nội — `ha-noi`
- Hải Phòng — `hai-phong`
- Huế — `hue`
- Đà Nẵng — `da-nang`
- Cần Thơ — `can-tho`
- Thành phố Hồ Chí Minh — `ho-chi-minh-city`

**Provinces (28):**

- Lai Châu — `lai-chau`
- Điện Biên — `dien-bien`
- Sơn La — `son-la`
- Lạng Sơn — `lang-son`
- Cao Bằng — `cao-bang`
- Tuyên Quang — `tuyen-quang`
- Lào Cai — `lao-cai`
- Thái Nguyên — `thai-nguyen`
- Phú Thọ — `phu-tho`
- Bắc Ninh — `bac-ninh`
- Hưng Yên — `hung-yen`
- Ninh Bình — `ninh-binh`
- Quảng Ninh — `quang-ninh`
- Thanh Hóa — `thanh-hoa`
- Nghệ An — `nghe-an`
- Hà Tĩnh — `ha-tinh`
- Quảng Trị — `quang-tri`
- Quảng Ngãi — `quang-ngai`
- Gia Lai — `gia-lai`
- Khánh Hòa — `khanh-hoa`
- Lâm Đồng — `lam-dong`
- Đắk Lắk — `dak-lak`
- Đồng Nai — `dong-nai`
- Tây Ninh — `tay-ninh`
- Vĩnh Long — `vinh-long`
- Đồng Tháp — `dong-thap`
- Cà Mau — `ca-mau`
- An Giang — `an-giang`

**Important modeling distinction:** A tourist place name and a modern province name are not the same concept. Preserve familiar names such as Đà Lạt, Hội An, Mũi Né, Phú Quốc and Phong Nha while correctly assigning their current province/city. Never assume a tourism destination has been renamed after the 2025 administrative consolidation.

Do not generate an inaccurate SVG province outline or claim administrative boundaries without verified geo-data.

Official reference: https://en.baochinhphu.vn/infographics-resolution-on-the-administrative-reorganization-scheme-for-2025-111250512163339276.htm

## 8. Content and data contracts — local typed fixtures

Create clear TypeScript types such as:

```ts
type Locale = 'vi' | 'en';
type LocalizedText = Record<Locale, string>;

type ImageAsset = {
  src: string;
  alt: LocalizedText;
  sourceUrl: string;
  photographer?: string;
  licenseName: string;
  licenseUrl: string;
  retrievedAt?: string;
  verifiedLocation: boolean;
};

type Province = {
  id: string;
  slug: string;
  kind: 'province' | 'city';
  name: LocalizedText;
  summary?: Partial<LocalizedText>;
  image?: ImageAsset;
};

type Destination = {
  id: string;
  slug: string;
  provinceId: string;
  name: LocalizedText;
  summary: Partial<LocalizedText>;
  description?: Partial<LocalizedText>;
  categoryIds: string[];
  images: ImageAsset[];
  featured?: boolean;
  coordinates?: { latitude: number; longitude: number };
};
```

These are indicative interfaces: improve them if useful while preserving type safety, data integrity and source provenance. Keep content adapters/getters in `src/data/repositories/` or `src/lib/content/` so future replacement by an API/DB is straightforward.

**Fixture expectations:**

- Exactly **34** province/city entries, valid unique IDs and slugs, bilingual names.
- A carefully curated collection of **at least 24 real tourism destinations** spanning **at least 12 province/city entities**; quality and factual correctness matter more than artificial evenly distributed coverage.
- Each destination must link to a real, current province entity. Do not fabricate coordinates if not verified.
- At least four category labels with translations.
- At least six visually strong featured cards backed by appropriate verified imagery or clearly designed fallback artwork.
- Provinces without curated destinations show a truthful empty state; do not create random fake destinations to make every province look populated.
- All fixture data should validate through lightweight checks/tests (unique slugs, valid foreign references, nonempty names, permitted locales).

## 9. Photography and image licensing — mandatory

**Preferred sources in order:** Pexels, Unsplash, Pixabay. These services provide broad free-use licensing, but that does **not** mean every image is free of privacy, personality, trademark, property or license-specific restrictions. Check the terms for each chosen image at implementation time.

**Do:**

1. Use **real, geographically accurate** travel images; verify that a photo used for a named destination actually depicts that destination. Generic landscape images may be used for generic category/hero sections only when not falsely labeled as a specific place.
2. Select high-quality landscape images for hero sections (ideally >= 1600px source width) and suitable card-sized sources. Produce appropriately sized optimized variants, never ship 10MB originals to mobile devices.
3. Maintain provenance on every asset: source page URL, creator/photographer if available, license name, license URL, date checked, usage notes. Add `docs/image-sources.md` or a JSON asset manifest. Prefer visible source credit where reasonable even if a standard download license doesn't require it.
4. Prefer a small, curated selection of assets stored under `public/images/` **if the applicable license, usage method and tooling allow that**. Otherwise follow the image provider's API/hotlinking rules precisely. An Unsplash API integration has different linking/attribution requirements from downloading a photo under the general Unsplash License.
5. Use `next/image`, responsive `sizes`, `priority` only for critical above-the-fold imagery, blur/neutral placeholders and accessible alt text. Avoid layout shifts with explicit aspect ratios/sizing.
6. Make failures graceful: image fallback gradients / illustrative blocks with honest labels. The site must still look designed when a remote image fails.

**Don't:**

- Do not copy photos from Google Images, travel blogs, hotel listing sites, unknown Pinterest posts or other copyrighted pages without an appropriate license.
- Do not silently scrape photo services or make unapproved bulk/API requests.
- Do not use `source.unsplash.com` random URLs, broken hotlinks or arbitrary image URLs presented as verified assets.
- Do not treat Unsplash+ premium images as covered by the standard free license.
- Do not infer that the person/brand/property shown endorses this site.
- Do not invent `sourceUrl`, attribution or verification status.

**Official license references:**

- Pexels: https://www.pexels.com/license/
- Unsplash: https://unsplash.com/license
- Unsplash API guidelines (if API used): https://help.unsplash.com/en/articles/2511245-unsplash-api-guidelines
- Pixabay: https://pixabay.com/service/license-summary/

**Implementation fallback rule:** If suitable licensed imagery cannot be reliably retrieved and attributed within the environment, create polished gradient/shape-based placeholders and add a precise TODO in `docs/image-sources.md`. **Never misrepresent an unrelated photo as a real destination.**

## 10. Search, filtering and UX behavior

- Search must match Vietnamese strings with and without accents (`Đà Lạt` should match `da lat`) as well as English names, and be case-insensitive.
- Search state should be reflected in URL query parameters where appropriate so navigation/back-button works.
- Filters include province and destination category; support multiple selections only if the UI is intuitive and the implementation is sound.
- Show accurate result counts from the local dataset, clear filter actions, sensible loading/empty states and no horizontal overflow.
- Searching from the homepage must lead to the actual filtered destination directory, not a dead search field.
- On mobile, allow easy filter opening/closing, apply and reset actions without hidden inaccessible controls.
- Card click target, favorite toggles (if included), language dropdown and menus should behave predictably on keyboard and touch.
- Use skeleton loaders only when real loading exists; avoid fake loading spinners for synchronous fixture reads.

## 11. Responsive, accessibility and performance targets

### Responsive

- Verify approximately 360px, 390px, 768px, 1024px and 1440px wide viewports.
- No content clipping, horizontal scrolling, oversized images, overlapping menus or tiny touch targets.
- Main actions should be reachable with one hand on mobile; clickable/tappable targets approximately 44px where practical.

### Accessibility

- Semantic headings and landmarks, useful link labels, contrast-compliant text, keyboard focus visibility, appropriate image alternatives, form labels and error messages.
- Menus/dialogs must support Escape and focus behavior; avoid keyboard traps.
- Respect `prefers-reduced-motion` and avoid scroll-jacking.
- Do not encode essential state by color alone.

### Performance

- Aim for Lighthouse mobile Performance >= 90, Accessibility >= 95, Best Practices >= 90 and SEO >= 95 on representative pages **when measured under a documented, repeatable environment**. These are targets, not claims to make without measurement.
- Aim for good Core Web Vitals: LCP <= 2.5s, CLS <= 0.1, INP <= 200ms under appropriate test conditions.
- Lazy-load below-the-fold images. Avoid downloading huge image assets, eagerly loading carousels or large map bundles.
- Limit excessive client-side JS; keep the homepage visually rich but technically lean.

## 12. Suggested repository structure

Adapt the details to the actual Next.js version without changing the core layering:

```text
vietexplore-web/
├── public/
│   ├── images/
│   └── icons/
├── messages/
│   ├── en.json
│   └── vi.json
├── src/
│   ├── app/
│   │   ├── [locale]/
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx
│   │   │   ├── provinces/
│   │   │   │   ├── page.tsx
│   │   │   │   └── [slug]/page.tsx
│   │   │   ├── destinations/
│   │   │   │   ├── page.tsx
│   │   │   │   └── [slug]/page.tsx
│   │   │   ├── explore/page.tsx
│   │   │   └── not-found.tsx
│   │   ├── globals.css
│   │   ├── sitemap.ts
│   │   └── robots.ts
│   ├── components/
│   │   ├── ui/
│   │   ├── layout/
│   │   └── shared/
│   ├── features/
│   │   ├── home/
│   │   ├── provinces/
│   │   ├── destinations/
│   │   └── search/
│   ├── data/
│   │   ├── provinces.ts
│   │   ├── destinations.ts
│   │   ├── categories.ts
│   │   └── repositories/
│   ├── i18n/
│   │   ├── routing.ts
│   │   ├── request.ts
│   │   └── navigation.ts
│   ├── lib/
│   │   ├── search.ts
│   │   └── utils.ts
│   ├── config/
│   ├── types/
│   └── proxy.ts
├── tests/
│   ├── unit/
│   └── e2e/
├── docs/
│   ├── ai-build-prompt.md
│   ├── image-sources.md
│   └── implementation-notes.md
├── .env.example
├── next.config.ts
├── package.json
├── README.md
└── vercel.json                 # only if truly required
```

If a more current installed Next.js version requires another routing entrypoint or supports alternative conventions, follow the **actual official installed-version docs** and note the deviation. Avoid unnecessary `vercel.json` or configuration ceremony.

## 13. Implementation phases — execute in order

### Phase 1 — Foundation

- [ ] Inspect repo and initialize missing Next.js, TypeScript, Tailwind, lint and test essentials.
- [ ] Create an intentional theme (tokens, typography, responsive grid, buttons, cards).
- [ ] Implement base layout, navigation, footer and basic page shell.
- [ ] Wire up `next-intl`, translation files and routing with browser detection.
- [ ] Run lint, typecheck and build; fix errors.

**Gate 1:** `/`, `/vi`, `/en` all resolve correctly; navigation works; no console/runtime errors.

### Phase 2 — Validated content and media

- [ ] Build typed 34-province dataset and normalized getters.
- [ ] Build truthful curated destination/category fixtures.
- [ ] Source and document usable licensed imagery or clean fallbacks.
- [ ] Add fixture validation tests and image fallback component.

**Gate 2:** Dataset is internally consistent; no fabricated place/image claims; no broken visible images.

### Phase 3 — Premium pages

- [ ] Finish polished homepage with purposeful visual design.
- [ ] Implement all province directory/detail routes.
- [ ] Implement destination listing/detail routes.
- [ ] Add responsive mobile header/menu, polished empty/not-found/error states.

**Gate 3:** All principal navigation routes work with real typed data on mobile and desktop.

### Phase 4 — Real interactions and internationalization

- [ ] Functional accent-insensitive search from home and directory.
- [ ] Working province/category filters, query params and reset controls.
- [ ] Localized navigation, headings, cards, metadata and detail content or honest missing-translation state.
- [ ] Functional language switcher preserving location/query.
- [ ] Accessibility polishing and reduced-motion handling.

**Gate 4:** No decorative controls masquerading as functionality; all locale tests and important interaction tests pass.

### Phase 5 — SEO, verification and Vercel readiness

- [ ] Add metadata, canonical, `hreflang`, sitemap and robots.
- [ ] Optimize image delivery, CSS/JS payload and layout stability.
- [ ] Run Playwright across primary journeys and viewport sizes.
- [ ] Run unit tests, lint, typecheck, production build.
- [ ] Verify Vercel compatibility and provide simple deployment instructions.
- [ ] Document completed scope, assumptions, missing sourced images and future work.

**Gate 5:** Reproducible green production build; critical UX flows pass; README gives direct Vercel deployment steps without Docker.

## 14. Test plan — minimum verification

Automate at least:

1. **Locale routing:** 7 scenarios in section 6; no loops or incorrect override of explicit locale paths.
2. **Province data:** exactly 34 unique provinces/cities; six cities; unique slug; valid names.
3. **Destination integrity:** valid province references and nonempty localized titles; no duplicate slugs.
4. **Search:** `da lat`, `Đà Lạt`, uppercase and mixed diacritics produce expected results.
5. **Filter:** choosing province/category changes cards/count and resetting restores them.
6. **Navigation:** homepage → province → destination → back; no 404 on valid slugs.
7. **Language switching:** same destination/route remains open where available, UI text changes, manual preference persists.
8. **Responsive:** navigation and filters work on 390px and desktop widths; no horizontal overflow.
9. **Fallback media:** invalid/missing image does not crash cards or shift layout unexpectedly.
10. **Production:** package manager's lint, typecheck, test and build commands all finish successfully.

Use browser screenshots as evidence of visual quality if your environment supports a browser. Never fabricate screenshot results or performance numbers.

## 15. Definition of Done (DoD)

Mark the MVP as **DONE** only if:

- [ ] The project is fully runnable locally and deployable on Vercel without Docker/backend credentials.
- [ ] Homepage looks professional and intentionally designed, not like a starter template.
- [ ] Exactly 34 current province/city entities are present in the explorer.
- [ ] Main routes and internal links work and are responsive.
- [ ] Search and filter functionality is real, tested and accent-insensitive.
- [ ] `vi`/`en` localization follows the specified browser and URL priority rules.
- [ ] At least 24 genuine curated destinations across at least 12 provincial-level entities have valid model links.
- [ ] Photo origin/license documentation exists; mismatched imagery and unknown-license images are not shipped as verified place photography.
- [ ] No fabricated ratings/prices/visitor statistics appear.
- [ ] Keyboard navigation, visible focus, mobile interactions and reduced-motion behavior have been checked.
- [ ] Tests, lint, typecheck and production build pass **or failures are explicitly documented as not complete**.
- [ ] README explains local setup, folder structure, fixture editing, localization, image policy and Vercel deployment.

## 16. Delivery format for the coding agent

At the end, respond with:

1. **Implemented features** — concise factual list and route inventory.
2. **Files/modules added or changed** — grouped by feature.
3. **Tests executed** — exact commands and pass/fail counts; no unverified claims.
4. **UI review** — which viewport sizes/pages were actually checked and any screenshots/artifacts if available.
5. **Source and legal caveats** — incomplete image provenance or destination content, if any.
6. **How to run** — package manager install/start/build commands.
7. **How to deploy on Vercel** — exact repository/build settings and required variables (ideally none for MVP).
8. **Known limitations** — honest, prioritized, no hidden blockers.
9. **Suggested v1.1 backlog** — backend/CMS, favorites, trustworthy province map, itinerary planner, user content (do not implement now).

**Final instruction:** Start implementing the site now. Give the visual experience careful attention, but favor correctness, accessibility and reliability over unnecessary features. Do not present a plan as if it were a completed implementation.
