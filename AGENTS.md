<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# ScoreitSRM — AI Development Rules

## Stack

- Next.js
- TypeScript
- Supabase
- PostgreSQL
- Tailwind CSS
- shadcn/ui
- Zod

## Rules

- Use TypeScript throughout the project.
- Do not introduce new frameworks or major dependencies without approval.
- Do not change the database architecture without approval.
- Never expose secrets, service-role keys, or private credentials.
- Keep business/game logic separate from UI components.
- Use Zod for input validation where appropriate.
- Prefer server-side validation for security-sensitive operations.
- Respect Supabase Row Level Security (RLS).
- Do not modify unrelated files.
- Do not generate unnecessary dependencies.
- Keep components reusable and focused.
- Follow existing project conventions before creating new patterns.
- Prefer simple, maintainable solutions over unnecessary complexity.
- Do not bypass existing security rules for convenience.
- Check the existing code before creating duplicate utilities, components, or logic.
- Preserve existing functionality when making changes.
- Do not make destructive database changes without explicit approval.
- When a task is unclear, inspect the existing project structure and documentation before implementing it.
