# ScoreitSRM --- Development Roadmap

## Delivery approach

Build incrementally, keep changes scoped to milestones, and verify
lint/build/tests before merging. The roadmap is a plan, not proof that a
milestone has been completed. Update status only after checking the
repository and relevant PRs.

## M0 --- Product and architecture

-   Confirm MVP scope and Least Count rules.
-   Document requirements, architecture, design direction, and milestone
    order.
-   Define security and data-integrity expectations.

## M1 --- Project foundation

-   Establish Next.js, TypeScript, Tailwind CSS, and shadcn/ui.
-   Configure linting and production build.
-   Establish Git/GitHub workflow and environment conventions.

## M2 --- Design system and shared UI

-   **M2.1:** Design tokens and typography.
-   **M2.2:** UI primitives: Button, Card, Badge, Avatar, Input,
    Skeleton, Separator; optional Dialog and Tooltip.
-   **M2.3:** Navbar, Footer, Container, responsive layout, mobile
    navigation.
-   **M2.4:** Shared loading, empty, and error states.
-   **M2.5:** Design-system showcase for visual verification.
-   **M2.6:** Final responsive, accessibility, and component polish.
-   Add and maintain `AGENTS.md` development instructions.

## M3 --- Landing and scoreboard frontend

-   Build the landing page and reusable scoreboard presentation.
-   Use clearly labeled demo data until real data integration exists.
-   Verify mobile, tablet, and desktop behavior.

## M4 --- Database foundation

-   Design and review the schema for profiles, games, memberships,
    rounds, and score entries.
-   Add migrations, constraints, indexes, and appropriate Row Level
    Security policies.
-   Document local setup and required environment variables.

## M5 --- Authentication

-   Integrate Supabase Auth.
-   Implement sign-in, sign-up, sign-out, and session handling as
    required.
-   Protect authenticated routes and data access.

## M6 --- Create game

-   Create a game with validated settings and participants.
-   Enforce ownership and membership rules.

## M7 --- Game room

-   Show players, game status, round context, and current standings.
-   Add clear loading, empty, and error handling.

## M8 --- Scoring engine

-   Implement Least Count scoring rules as testable domain logic.
-   Validate boundaries and edge cases.
-   Keep authoritative scoring logic outside presentational components.

## M9 --- Score submission

-   Submit and persist scores securely.
-   Handle duplicate submissions, invalid transitions, and failures.

## M10 --- Realtime updates

-   Add scoped realtime updates where they improve collaboration.
-   Handle reconnects and stale state.

## M11 --- Security and permissions

-   Review RLS policies, server-side authorization, validation, and game
    membership boundaries.
-   Test unauthorized and cross-user access.

## M12 --- Game completion

-   Implement completion conditions and final standings.
-   Verify scoring and completion edge cases.

## M13 --- Game history

-   List previous games and show their results.
-   Add appropriate pagination or filtering when needed.

## M14 --- Leaderboards

-   Implement defined leaderboard rules and queries.
-   Make ranking and tie behavior explicit.

## M15 --- Profiles and statistics

-   Add profile details and game statistics supported by actual
    persisted data.

## M16 --- Invitations

-   Add participant invitations and secure joining flows if required by
    the product scope.

## M17 --- Mobile/PWA

-   Improve mobile ergonomics and evaluate installability/offline needs.
-   Do not promise offline synchronization until conflict handling is
    designed.

## M18 --- Testing and security review

-   Add unit, integration, and end-to-end coverage appropriate to the
    stack.
-   Review authorization, data integrity, and failure cases.

## M19 --- Polish and performance

-   Improve loading behavior, accessibility, performance, metadata, and
    deployment readiness.

## M20 --- Ludo

-   Treat Ludo as a separate game mode with its own explicit rules and
    state model.
-   Do not mix Ludo rules into Least Count-specific logic.

## M21 --- Advanced features

-   Prioritize additional capabilities based on validated user needs,
    not speculation.

## Definition of done for each milestone

-   Acceptance criteria are met.
-   Lint and production build pass.
-   Relevant automated tests pass or limitations are recorded.
-   UI is checked at mobile, tablet, and desktop widths when applicable.
-   Security and accessibility implications are addressed.
-   Only intended files are included in the diff.
-   Required documentation is updated.
-   Work is reviewed and merged using the agreed Git workflow.
