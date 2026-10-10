# ScoreitSRM --- Architecture

## 1. Overview

ScoreitSRM is a web application for creating and managing group games,
recording scores, and viewing standings. The MVP targets Least Count
scorekeeping. Other game modes, including Ludo, are later roadmap items.

This document describes the intended architecture. Treat the codebase
and database migrations as the source of truth for what is already
implemented.

## 2. Technology choices

-   **Web framework:** Next.js App Router
-   **UI:** React, TypeScript, Tailwind CSS v4, shadcn/ui
-   **Backend/data platform:** Supabase
-   **Database:** PostgreSQL through Supabase
-   **Authentication:** Supabase Auth
-   **Live updates:** Supabase Realtime where useful
-   **Validation:** Zod
-   **Charts:** Recharts
-   **Deployment target:** Vercel

Avoid adding infrastructure unless an actual product requirement
justifies it.

## 3. Logical layers

### Presentation

Routes, layouts, page components, shared UI primitives, responsive
navigation, and loading/empty/error states. Presentation code should not
be the sole authority for permissions or score calculations.

### Application logic

Feature workflows such as creating a game, joining a room, submitting a
round score, and calculating standings. Keep scoring rules in testable
functions/modules rather than burying them in visual components.

### Data access

Use Supabase clients appropriate to the execution context. Keep
server-only credentials and privileged operations out of browser
bundles. Validate input before writes and handle failures explicitly.

### Persistence and access control

PostgreSQL stores durable game, membership, score, and profile data as
the schema is introduced. Use foreign keys, constraints, and appropriate
indexes. Protect private records with Row Level Security and policies
that match product permissions.

## 4. Expected domain concepts

The following are conceptual entities, not a claim that all tables
already exist: - **Profile:** application-facing user information
associated with an authenticated identity. - **Game:** game type, owner,
status, settings, and timestamps. - **Game membership:** participants
and their roles in a game. - **Round:** ordered game round or scoring
event. - **Score entry:** validated score submitted for a player and
round. - **Invitation:** optional mechanism for inviting participants. -
**Game result/statistics:** derived summaries, leaderboards, and
history.

Confirm the actual schema and naming before implementing migrations or
queries.

## 5. Least Count scoring

-   Keep rules explicit and covered by unit tests where possible.
-   Validate player membership, game status, round ordering, and
    accepted score values before persisting a score.
-   Prevent duplicate or conflicting submissions where the product rules
    require it.
-   Derive totals and standings consistently from trusted data.
-   Use database transactions or atomic operations when multiple writes
    must succeed together.
-   Do not trust client-calculated totals as the authoritative persisted
    result.

Exact rules and edge cases must be specified in the PRD or a dedicated
game-rules document before implementation.

## 6. Authentication and authorization

-   Authentication identifies the user; authorization determines what
    that user can do.
-   Enforce permissions on the server and/or through database policies.
-   Apply least privilege to reads and writes.
-   Do not expose Supabase service-role keys to clients.
-   Do not rely on route visibility or disabled buttons as security
    controls.
-   Test unauthorized access, membership boundaries, and attempts to
    alter another user's data.

## 7. Realtime

Use realtime subscriptions only for user-visible collaboration needs,
such as score or game-state updates. Scope subscriptions to the relevant
game and permissions. Handle reconnects, duplicate events, and stale
client state. The database remains the durable source of truth.

## 8. UI organization

Use existing shared components where possible: - `src/components/ui/`:
low-level primitives. - `src/components/layout/`: global layout
elements. - `src/components/states/`: loading, empty, and error
states. - `src/app/`: routes and route-level composition.

The `/design-system` route is intended as a visual showcase. It should
not be treated as proof that backend features are implemented.

## 9. Environments and deployment

-   Keep secrets in environment variables.
-   Document required variable names and safe setup steps without
    committing secret values.
-   Use reviewed migrations for database changes.
-   Verify production builds before deployment.
-   Keep development, preview, and production configuration separate.

## 10. Architectural principles

1.  Security and data integrity over client-side convenience.
2.  Simple, testable modules over premature abstraction.
3.  Reuse shared UI without coupling it to game-specific logic.
4.  Validate untrusted input at system boundaries.
5.  Make failure and loading behavior explicit.
6.  Update this document when material architectural decisions change.
