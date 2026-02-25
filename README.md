# ai-service-factory

Production-ready reference monorepo for generating PRDs, architecture diagrams, and scaffold previews from client ideas.

## Stack
- Next.js App Router (web/admin)
- Fastify API service
- Supabase (SQL migrations, RLS policies)
- Shared TypeScript packages
- Vitest + Playwright
- GitHub Actions CI

## Quick start
1. Copy envs:
   ```bash
   cp .env.example .env
   ```
2. Install deps:
   ```bash
   pnpm install
   ```
3. Run apps:
   ```bash
   pnpm dev
   ```
4. Open:
   - Web: http://localhost:3000
   - Admin: http://localhost:3001
   - API: http://localhost:4000

## Commands
- `pnpm lint`
- `pnpm typecheck`
- `pnpm test`
- `pnpm test:smoke`

## Architecture docs
- `docs/01-overview.md`
- `docs/02-architecture.md`
- `docs/03-security.md`
- `docs/04-runbooks.md`
