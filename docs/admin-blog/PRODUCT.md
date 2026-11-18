# Authentication and editorial workspace

## Scope
Add email/password login, an administrator-only post manager, a block-based blog editor, and public reading pages to VietExplore. The user selected Supabase for authentication, PostgreSQL, and image storage. This continues the existing editorial identity: warm cream, forest green, terracotta, Lora headings, and Jakarta Sans body text. No separate design mock was supplied; existing pages are the visual reference.

## User journeys
- A visible login link opens the localized `/login` page on desktop and mobile.
- Valid administrators land in `/admin/posts`; other authenticated accounts return to the public site and cannot access admin pages or operations.
- Administrators search/filter their post list, create a post, edit an existing post, save drafts, publish, unpublish, and delete after confirmation.
- The editor includes title, slug, summary, cover, language, tags, and ordered heading, paragraph, image, quote, list, callout, and divider blocks.
- Blocks can be reordered by drag/drop or accessible move buttons. Block widths resize along a responsive grid; text fields resize vertically. Image blocks accept an HTTPS URL or an uploaded JPEG/PNG/WebP/AVIF file.
- A preview uses the same renderer as the public article. Drafts remain private; only published posts appear at `/blog` and `/blog/[slug]`.
- Logout clears the session and removes access to protected data.

## Invariants
- Every admin read/write verifies the authenticated identity and database-controlled role. Changing browser state or user metadata never grants admin access.
- Supabase RLS also restricts direct database and storage access. Published articles are public, administrative records and drafts are not.
- Saving is explicit, reports failures, and retains input on validation/network errors. Concurrent edits report a conflict rather than overwrite another save.
- No sample credentials, fabricated posts, or pretend saves. Unconfigured Supabase shows an honest setup/unavailable state.
- Both Vietnamese and English UI, labeled controls, keyboard operation, visible focus, mobile layout, and reduced motion support are required.

## Acceptance checks
1. Previous reviewed fixes remain on remote `develop`; this feature lives on a separate branch.
2. Login and all public routes render without backend configuration; login explains why it is unavailable.
3. Invalid credentials, unauthenticated access, non-admin accounts, logout, expired sessions, and forged requests fail closed.
4. An admin can persist/reload a draft, edit/reorder/resize blocks, upload/add images, preview, publish/read, unpublish, and delete.
5. Validation, safe rendering, locale handling, role boundaries, and concurrency have regression coverage; test/lint/build pass.

## External setup
The owner supplies Supabase project URL and publishable key, applies the checked-in migration, creates an Auth account, and explicitly assigns its database role to admin. Live authentication/storage/RLS verification requires that project; tests must distinguish mocked service verification from live verification.
