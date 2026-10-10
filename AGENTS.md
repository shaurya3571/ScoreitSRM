# AGENTS.md — ScoreitSRM

## 1. Project Overview

ScoreitSRM is a responsive web application for organizing games, recording scores, and tracking leaderboards. The initial product focuses on Least Count scorekeeping. Additional games, including Ludo, may be introduced in later milestones.

The project prioritizes:
- Simple and intuitive user experiences.
- Mobile-first responsive design.
- Reusable, accessible UI components.
- Reliable scorekeeping and data integrity.
- Secure authentication, authorization, and database access.
- Maintainable code with clear separation of concerns.

## 2. Technology Stack

Use the existing project stack:

- Next.js App Router
- React
- TypeScript
- Tailwind CSS v4
- shadcn/ui components
- Supabase for PostgreSQL, authentication, and realtime features
- Zod for input validation
- Recharts for charts and statistics
- Git and GitHub for version control and collaboration
- Vercel for deployment

Do not introduce a new framework, UI library, database, or dependency without a clear requirement.

Check `package.json` and existing source files before assuming a dependency or capability is available.

## 3. Project Structure

Follow the existing structure and extend it consistently.

- `src/app/`: Next.js routes, layouts, and page-level UI.
- `src/components/ui/`: Reusable low-level UI primitives.
- `src/components/layout/`: Shared navigation, footer, and layout components.
- `src/components/states/`: Shared loading, empty, and error states.
- `src/lib/`: Shared utilities and infrastructure helpers.
- `src/`: Feature-specific modules may be added as the application grows.
- `public/`: Static assets.
- `supabase/`: Database migrations and Supabase configuration, if present.
- `AGENTS.md`: Project-wide development instructions.
- `PRD.md`: Product requirements.
- `ARCHITECTURE.md`: System design and technical boundaries.
- `DESIGN-BRIEF.md`: Visual and interaction principles.
- `DEVELOPMENT-ROADMAP.md`: Milestones and implementation order.

This structure is a guideline. Inspect the actual repository before creating directories or moving files.

## 4. Source of Truth

Before implementing a feature, inspect relevant files and documentation.

Use:
1. `PRD.md` for product scope and requirements.
2. `ARCHITECTURE.md` for architectural decisions.
3. `DESIGN-BRIEF.md` for UI and visual conventions.
4. `DEVELOPMENT-ROADMAP.md` for milestone scope and sequencing.
5. Existing code for established implementation patterns.

Do not silently contradict documented decisions. If a change is necessary, explain why and update the relevant documentation.

Do not invent completed functionality, API behavior, database tables, or environment variables.

## 5. Development Workflow

- Work on the currently assigned feature branch.
- Do not commit directly to `main`.
- Keep changes scoped to the active milestone.
- Use small, meaningful commits with Conventional Commit messages.
- Inspect `git status` and `git diff` before staging.
- Never discard existing user changes without explicit permission.
- Never use destructive Git commands without checking their consequences.
- Do not force-push unless explicitly approved.
- Do not create a new branch when the current milestone is intentionally part of an existing feature branch.

Preferred commit format:

- `feat: add a user-facing feature`
- `fix: resolve a specific defect`
- `style: establish design tokens`
- `test: add feature coverage`
- `docs: update project documentation`
- `chore: polish implementation`

Before a commit:
1. Run relevant lint checks.
2. Run the production build.
3. Run available tests.
4. Review the diff for unrelated changes.
5. Commit only the intended files.

## 6. TypeScript and React

- Prefer TypeScript for application code.
- Define explicit types for reusable component props and public interfaces.
- Avoid `any` unless there is a documented and justified reason.
- Prefer small, focused React components.
- Use Server Components by default.
- Add `"use client"` only when browser-side interactivity or client hooks are required.
- Keep server-only code and secrets out of client components.
- Avoid unnecessary abstractions and premature optimization.
- Preserve existing import aliases and naming conventions.

## 7. UI and Design System

Use the existing design tokens in `src/app/globals.css`.

- Reuse the existing Button, Card, Badge, Avatar, Input, Separator, and Skeleton components.
- Reuse shared Container, Navbar, Footer, LoadingState, EmptyState, and ErrorState components where appropriate.
- Do not create duplicate versions of existing primitives.
- Use semantic HTML and consistent spacing.
- Keep layouts responsive at mobile, tablet, and desktop widths.
- Use existing CSS variables for brand colors, player colors, typography, borders, and radii.
- Avoid arbitrary colors when an appropriate design token already exists.
- Provide visible hover, focus, disabled, and loading states where applicable.
- Avoid unnecessary animations and respect reduced-motion preferences.
- Keep placeholder or demo data clearly identified as such.

The `/design-system` route is the visual reference for verifying shared UI components.

## 8. Accessibility

- Use semantic HTML elements.
- Give interactive controls accessible names.
- Associate form labels with their inputs.
- Ensure keyboard navigation works.
- Maintain visible focus indicators.
- Use appropriate ARIA attributes when native HTML is insufficient.
- Do not rely on color alone to communicate status.
- Provide meaningful alternative text for informative images.
- Keep loading, empty, and error states understandable to assistive technologies.
- Ensure responsive navigation can be opened, used, and closed with a keyboard.

## 9. Validation and Error Handling

- Validate untrusted inputs at appropriate boundaries.
- Use Zod where schema validation is useful.
- Display clear, user-friendly error messages.
- Never silently swallow unexpected errors.
- Include loading, empty, and failure states for asynchronous UI.
- Make retry actions explicit and functional when provided.
- Do not report an operation as successful before it actually succeeds.
- Avoid exposing stack traces, secrets, or internal implementation details to users.

## 10. Security and Data Integrity

Security is mandatory for features that use Supabase or other backend services.

- Enforce authorization on the server or at the database boundary.
- Do not rely on hidden UI controls as a security mechanism.
- Apply appropriate Supabase Row Level Security policies to protected tables.
- Never expose service-role keys, private tokens, or secrets in client-side code.
- Keep secrets in environment variables.
- Validate user-controlled data on trusted boundaries.
- Prevent unauthorized users from reading or changing another user's data.
- Validate game membership and permissions before accepting score changes.
- Protect score calculations and game state transitions from untrusted client input.
- Prefer database transactions or appropriate atomic operations for related writes.
- Do not disable security checks to make a build or test pass.

When introducing database changes, use reviewed migrations where supported. Never reset or delete production data as part of routine development.

## 11. Game and Scoring Logic

- Keep scoring rules separate from presentation components.
- Define and validate game rules before implementing calculations.
- Treat the backend or trusted server-side logic as authoritative for persisted scores.
- Handle invalid scores and invalid state transitions explicitly.
- Preserve score history and game consistency where required by the product specification.
- Test edge cases such as empty games, duplicate submissions, and invalid player membership.
- Do not implement Ludo or other later-stage games ahead of the roadmap unless the task explicitly requests it.

## 12. Testing and Quality Checks

Run the relevant checks before marking work complete:

```bash
npm run lint
npm run build
git diff --check
```

Run the project's available automated tests when applicable.

For UI changes, manually inspect:
- Desktop layout.
- Tablet layout.
- Mobile layout.
- Typography and spacing.
- Colors and component variants.
- Hover and focus behavior.
- Disabled and loading states.
- Empty and error states.
- Keyboard accessibility.

Fix the underlying issue rather than disabling lint rules, weakening types, or hiding errors.

## 13. Dependencies and Environment

- Prefer the existing dependencies.
- Avoid adding packages for functionality already provided by the stack.
- Explain the purpose of any new dependency.
- Do not commit `.env` files or credentials.
- Update the lockfile when dependencies genuinely change.
- Document required environment variables without including secret values.
- Keep local development and deployment instructions consistent.

## 14. Documentation

Update documentation when a change materially affects architecture, setup, database design, security, or product behavior.

- Keep `PRD.md` focused on requirements.
- Keep `ARCHITECTURE.md` focused on technical structure and decisions.
- Keep `DESIGN-BRIEF.md` focused on visual and interaction standards.
- Keep `DEVELOPMENT-ROADMAP.md` focused on milestones and delivery order.
- Keep this file focused on development rules.

Avoid duplicating large sections across documents.

## 15. Completion Criteria

A task is complete when:

- The requested scope is implemented.
- Existing functionality is not unintentionally broken.
- Lint and build checks pass.
- Relevant tests pass or any limitations are explicitly reported.
- UI behavior is verified at relevant viewport sizes.
- Accessibility and security requirements are addressed.
- The diff contains only intended changes.
- Necessary documentation is updated.
- The work is committed on the intended branch when requested.

Always report what changed, which checks passed, any remaining issues, and the exact next step.

## 16. Working Principles

- Understand before editing.
- Make the smallest correct change.
- Reuse established patterns.
- Prefer clear, maintainable code over unnecessary complexity.
- Do not claim that code, tests, deployments, commits, or merges succeeded unless verified.
- Ask for clarification when an important product or security decision cannot be inferred safely.
