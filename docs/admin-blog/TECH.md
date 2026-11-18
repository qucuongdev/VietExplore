# Authentication and blog implementation

## Repository context
Base: `f5b4880` on `develop`; implementation branch: `feature/admin-blog-auth`. Next.js 16.4.6 local documentation is authoritative, including asynchronous cookies/params and the `proxy.ts` convention. Dependencies and commands use pnpm exclusively.

There is no connected Linear project or supplied ticket. Specs are therefore kept together under `docs/admin-blog/`, without inventing a ticket under `specs/`. The user's requested flows and Supabase selection define the implementation scope.

## Architecture
- `@supabase/ssr` request-scoped clients use cookies; the existing locale proxy refreshes authenticated sessions while preserving next-intl response headers/cookies. Server-side identity comes from `auth.getUser`, never an unverified session object.
- A cached per-request identity/role accessor powers the header, login redirect, admin layout, repository reads, and Server Action authorization. Admin access comes only from a protected `profiles.role` column.
- All mutations use Server Actions, which enforce auth/role again, validate Zod schemas, and revalidate affected routes. Passwords pass directly to Supabase, never local logs or persistence. Supabase enforces auth rate limits.
- Typed repositories query Supabase with the caller's session and publishable key. No service-role key is required or exposed.
- PostgreSQL migration creates profiles, blog posts, update/version triggers, and a storage bucket. Profiles are self-readable, role writes are privileged-only, posts are public only when published, and only admins can mutate posts/upload media. Admin predicates live in a non-exposed private schema to avoid recursive profile policies.
- Blog content is validated JSON with stable block IDs, an explicit type discriminator, content fields, and width units (6–12 on desktop, full width on mobile). A shared React renderer escapes text; no raw HTML, scripts, iframes, or arbitrary CSS are saved.
- Image links allow HTTPS (and loopback HTTP for local Supabase). Direct uploads enforce size/type client-side and bucket-side. Arbitrary external images are rendered without the server image optimizer to avoid fetching user-selected URLs on the application server.
- Editing uses an integer version as an optimistic concurrency token. Database triggers own update timestamps and version increments. Duplicate locale/slug combinations produce a useful form error.
- Public routes explicitly filter `status=published` even for logged-in admins. Admin/login metadata uses noindex.

## Verification
- Vitest: block validation/reordering, unsafe image URLs, authorization and auth failures, post save/publish/version semantics, and UI behavior.
- Browser: original regression script plus login, unauthenticated redirects, responsive editor interaction, keyboard reorder, drag/drop, preview, and save feedback. Service doubles may exercise UI offline, but are test-only and never included as an application auth bypass.
- Live Supabase checks when owner configuration is available: login/admin/non-admin roles, session refresh/logout, CRUD persistence, public-vs-draft RLS, and storage policies.
- The actual SQL migration also executes in PGlite under anonymous/authenticated PostgreSQL roles to verify grants, RLS, profile provisioning, and optimistic version triggers. Browser integration uses a loopback service double without adding any test bypass to application code.
- The sitemap includes published articles from an anonymous client and excludes admin/login routes. Article metadata does not invent a translated sibling slug.

## Setup and rollout
`.env.example` documents the public connection settings. `supabase/migrations/` contains the schema and policies. `docs/admin-blog/SETUP.md` describes SQL migration, account provisioning, configuration on local/Vercel, and verification. Existing travel fixtures remain independent from editorial posts.

## Verified implementation
- 89 unit/component/database tests pass, including the unmodified migration running in embedded PostgreSQL.
- Production browser integration passes against the loopback service: anonymous/reader/admin boundaries, draft reload, drag/drop and keyboard reordering, width persistence, media upload, preview, public publication, mobile layout, unpublishing, deletion, and logout.
- The earlier search/SEO/gallery production regression script also passes.
- Production build/type checking pass. Lint has no errors; one pre-existing unused-variable warning remains in `scripts/fetch-hanoi-commons.mjs`.
- Hosted Supabase Auth, real storage delivery and token refresh still require owner configuration and live verification; offline service results are not presented as hosted-service results.
