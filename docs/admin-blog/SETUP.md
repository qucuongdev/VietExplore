# Supabase setup

## 1. Apply the migration
Create a Supabase project. Open its SQL Editor and run the entire checked-in [`202611180001_admin_blog.sql`](../../supabase/migrations/202611180001_admin_blog.sql) once. This creates the profiles/post tables, role and publication policies, update/version triggers, and the `blog-images` bucket (public image delivery, admin-only uploads).

Alternatively, link the Supabase CLI to the project and apply the migration using your normal database deployment process. Do not run the migration against a populated project with conflicting table/bucket names without reviewing those names first.

## 2. Configure the application
Copy `.env.example` to `.env.local`, then fill in:

```dotenv
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=YOUR_PUBLISHABLE_KEY
```

The values are available in the project's connection/API settings. The application does not require a service-role key. Keep `.env.local` uncommitted. Add the same values to the Vercel environment and rebuild/redeploy when they change.

## 3. Provision the administrator
In Supabase Authentication → Users, create the editor's email/password account and confirm its email. Then use SQL Editor to grant its profile the admin role:

```sql
update public.profiles
set role = 'admin'
where id = (select id from auth.users where lower(email) = lower('YOUR_ADMIN_EMAIL'));
```

Confirm exactly one intended profile was updated. All new/existing accounts default to `reader`. Neither profile role updates nor profile inserts are granted to browser users. Public self-registration is outside this feature; disable new signups in Supabase Auth settings if accounts should be invite-only.

## 4. Run and verify
Run `pnpm dev`. Open `/vi/login` or `/en/login`. An admin is redirected to `/admin/posts`; readers go back to the public homepage and cannot access the workspace.

Check with a real admin and a reader:
- Save a draft; reload to confirm persistence. Visit its public slug in a signed-out browser and confirm 404.
- Add text/image blocks, resize/reorder, upload an image, preview, and publish. Confirm it appears in `/blog` for the selected article language.
- Edit and unpublish. Confirm it disappears from the public journal. Delete only a test article.
- Open the same article in two tabs, save in one, then attempt saving the stale tab. Confirm a conflict is reported without overwriting.
- Sign out and verify admin pages/actions are denied.
- Attempt direct database inserts/updates as a reader and anonymous client; RLS must deny them. Verify a forged role in user metadata does not grant access.
- Test refresh after the session expires to verify proxy cookie refresh.

Uploads are publicly retrievable by their random URL, including images used by drafts; draft **post records** remain private. Do not upload confidential images to this public bucket. Deleting a post does not delete its media because another post may reuse it. Media-library cleanup is a separate future feature.

## Verification commands
```sh
pnpm test
pnpm lint
pnpm build
```

The original production regression script is `pnpm exec node scripts/verify-review-fixes.mjs` (server on port 3100, or set `REVIEW_BASE_URL`).

`pnpm exec node scripts/verify-admin-blog.mjs` builds the app against a loopback-only service double and runs the full browser journey on port 3101, including admin/reader login, draft persistence, reordering/resizing, upload, publishing, unpublishing, deletion, and logout. It restores the normal production build when finished; do not run it concurrently with another production build/start using the same output folder.

The database-policy suite runs the actual migration in embedded PostgreSQL (PGlite) with representative Supabase-owned auth/storage schemas. This checks SQL syntax, triggers, RLS and grants without mocking their behavior. Browser service doubles validate application integration offline, but only the owner's configured project can verify hosted Auth, refresh tokens, and actual Storage service behavior.

References: [Supabase SSR integration](https://supabase.com/docs/guides/auth/server-side/creating-a-client?framework=nextjs), [database RLS](https://supabase.com/docs/guides/database/postgres/row-level-security), [storage access control](https://supabase.com/docs/guides/storage/security/access-control).
