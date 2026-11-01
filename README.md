# ScoreitSRM

A mobile-first web app for scoring the card game **Least Count** (lowest total wins), with leaderboards and history. Ludo comes last.

Brand: text wordmark only. There is no logo, icon or badge anywhere in the app.

## Status

Phase 0 (theme reset) is done. There is no playable game yet. See [`src/docs/DEVELOPMENT-ROADMAP.md`](src/docs/DEVELOPMENT-ROADMAP.md) for the phase list. The Warriors and History links in the navbar point to routes that arrive in later phases.

## Stack

Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4, shadcn/ui, Supabase (not wired up yet), Zod, Recharts.

## Setup

```bash
npm install
cp .env.example .env.local   # then fill in the values
npm run dev
```

Open <http://localhost:3000>. The visual reference is at <http://localhost:3000/design-system>.

## Scripts

| Script | What it does |
|---|---|
| `npm run dev` | Start the dev server |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run lint` | Run ESLint |
| `npm test` | Run unit tests (Vitest) |

## Environment variables

See [`.env.example`](.env.example).

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | Supabase publishable (anon) key. Safe for the browser; access is controlled by Row Level Security |

Never put a service-role key in a `NEXT_PUBLIC_` variable or commit any `.env` file.

Fonts (Bricolage Grotesque, Inter, Geist Mono) are loaded with `next/font/google`, so the build needs network access to Google Fonts.

## Docs

- [`AGENTS.md`](AGENTS.md): development rules
- [`src/docs/PRD.md`](src/docs/PRD.md), [`ARCHITECTURE.md`](src/docs/ARCHITECTURE.md), [`DESIGN-BRIEF.md`](src/docs/DESIGN-BRIEF.md), [`DEVELOPMENT-ROADMAP.md`](src/docs/DEVELOPMENT-ROADMAP.md)
