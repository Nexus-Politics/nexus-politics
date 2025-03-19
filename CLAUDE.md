# CLAUDE.md - Agent Assistance Guide

## Commands
- Build (all): `bun run build`
- Dev (all): `bun run dev`
- Lint (all): `bun run lint`
- Format: `bun run format` (sorts and removes unused imports)
- Type check: `bun run check-types`
- Landing app dev: `cd apps/landing && bun run dev`
- Landing app lint: `cd apps/landing && bun run lint --max-warnings 0`

## Code Style
- TypeScript: strict mode, ES2022 target, no unchecked indexed access
- React: functional components with hooks, named exports
- Imports: group by external/internal, alphabetical ordering
- Naming: PascalCase for components/types, camelCase for variables/functions
- Error handling: use try/catch with specific error types
- State management: use React hooks (useState, useReducer)
- File structure: co-locate related components, separate UI from logic

## Tech Stack
- Next.js (App Router)
- TypeScript
- Tailwind CSS
- Turborepo monorepo structure
- Bun package manager (requires Node.js v22+)