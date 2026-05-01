# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev          # Start dev server (port 3000)
npm run build        # Production build
npm run lint         # ESLint

npm test             # Run full test suite (Vitest)
npm run test:watch   # Watch mode
npm run test:coverage  # Coverage report (85% threshold required)
npm run test:unit    # Unit tests only
npm run test:component # Component tests only
npm run test:api     # API route tests only
npm run test:integration # Integration tests only

npm run setup-db     # Initialize MySQL database from scripts/setup-db.js
```

## Architecture

Next.js 16 App Router project. All routes live under `app/`. Components prefixed with `_` (e.g. `app/_components/`, `app/_context/`, `app/_utils/`) are private to the app directory.

**Routing:** Pages are `app/<route>/page.tsx`. Dynamic product pages use `app/products/[id]/page.tsx`. API routes are `app/api/<endpoint>/route.ts`.

**Auth:** Session-based auth using HTTP-only cookies (`session` cookie, 7-day expiry). `app/_context/AuthContext.tsx` exposes a `useAuth()` hook and wraps the entire app via `layout.tsx`. Auth API routes are at `app/api/auth/{login,logout,session}`. Session encryption/decryption is in `app/lib/session.ts`. Middleware in `proxy.ts` handles route protection.

**Database:** MySQL via `mysql2/promise` with a connection pool (max 10 connections) defined in `app/lib/db.ts`. Raw SQL with parameterized queries. Credentials from `.env.local` (`DB_HOST`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`).

**Data fetching:** Server components fetch directly using absolute URLs (resolved by `getBaseUrl()` for Vercel vs. localhost). Client components use relative `/api/*` paths. Products API supports pagination (`?page=1&limit=20`) and returns `{ products, total, page, limit, pages }`.

**UI:** shadcn/ui components (installed into `components/ui/`) with Tailwind CSS v4. Path alias `@/*` maps to the repo root. The `cn()` utility is in `lib/utils.ts`.

**Testing:** Tests live in `app/__tests__/` organized by type (`unit/`, `components/`, `api/`, `integration/`). Vitest with jsdom environment. Path alias `@` resolves to `./app` inside tests. API route tests use `node-mocks-http`. See `TESTING.md` for full details.

**GraphQL:** Apollo Client is installed and configured, but usage is minimal — REST endpoints are the primary data layer.
