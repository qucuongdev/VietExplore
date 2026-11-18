# Agent Instructions & Conventions — VietExplore

> **Core Directives for all AI Agents working on this codebase**

## 1. Package Manager
- **STRICT ENFORCEMENT**: Use `pnpm` exclusively.
- **FORBIDDEN**: Do not run `npm`, `npx`, `yarn`, or `bun`.
- For package binaries or interactive tools, use `pnpm dlx <tool>` instead of `npx`.
- Install dependencies with `pnpm add <pkg>` or `pnpm add -D <pkg>`.

## 2. Skills & Knowledge Base
The following skills are pre-installed in `.agents/skills/`:
- `vitest`: Unit testing standards, component tests, test runner configuration with Vitest.
- `spec-driven-implementation`: Spec-first workflow for feature development, phase milestones, and validation gates.
- `git-workflow-and-versioning`: Git workflow, conventional commits, and semantic versioning.
- `shadcn`: Guidelines for adding, managing, and styling shadcn/ui components.
- `vercel-react-best-practices`: Next.js & React performance optimization rules from Vercel Engineering.
- `web-design-guidelines`: Web interface, UX, and accessibility guidelines.

Refer to their `SKILL.md` files whenever implementing UI, components, tests, or workflows.

## 3. Tech Stack
- Next.js (App Router) + TypeScript (strict)
- Tailwind CSS + shadcn/ui (Radix primitives) + lucide-react
- `next-intl` for i18n (`src/middleware.ts`)
- Vitest + Testing Library for unit tests; Playwright for E2E tests

## 4. Key Rules
- Keep all code identifiers, folder/file names, and comments in English.
- Server Components by default; Client Components only when browser interactivity is needed.
- No dummy/fake buttons, no fabricated ratings or administrative data.
- Ensure Vietnamese diacritic-insensitive search handles `đ/Đ` -> `d/D`.
- Ensure mobile-first responsive design without horizontal scrollbar.
