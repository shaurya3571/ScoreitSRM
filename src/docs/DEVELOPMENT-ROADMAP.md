# ScoreitSRM --- Development Roadmap

## Delivery approach

Build incrementally, keep changes scoped to one phase, and verify
lint, build and tests before merging. The roadmap is a plan, not proof
that a phase is complete. Update status only after checking the
repository and relevant PRs.

The order is playable first: the scoring engine and a no-login local
game come before the database, so the app is usable on game night after
Phase 2.

## Phase 0 --- Reset: theme, no logo, docs

-   Apply the "Card Table" theme tokens and fonts (Bricolage Grotesque,
    Inter, Geist Mono).
-   No logo anywhere: remove the "S" badge, favicon and template SVGs.
    Brand is the text wordmark "ScoreitSRM".
-   New navbar: wordmark plus Game, Warriors and History links; mobile
    menu kept.
-   Update `/design-system` (tokens, player chips, wordmark, sample
    scorecard row).
-   Rewrite `README.md`; add `.env.example`; update this roadmap and
    `DESIGN-BRIEF.md`.

## Phase 1 --- Scoring engine

-   Pure TypeScript in `src/lib/games/least-count/`: types, Zod schemas,
    `applyRound`, `editScore`, `undoRound`, `computeStandings`,
    `rankPlayers` with tie-break, rules config.
-   Add Vitest (new dev dependency; there is no test runner yet).
-   Tests: empty game, one player, multiple zeros, no-zero warning,
    ties, edits, undo, invalid/negative/non-integer input, penalty.

## Phase 2 --- Local playable game (no login, no database)

-   Routes `/`, `/game/new`, `/game/[id]`.
-   Components: LiveTable, ScoreEntry, Scorecard, RulesChip,
    FinishDialog, WinnerView.
-   Reducer on top of the Phase 1 engine; versioned `localStorage`
    persistence with try/catch and a clear error state.

## Phase 3 --- Supabase: schema, RLS, auth

-   Migrations: profiles, warriors, games, game_players, rounds, scores,
    game_events; constraints, indexes, RLS on every table.
-   Google OAuth, session-refresh proxy, sign-in/out UI.
-   RLS tests proving cross-user isolation.

## Phase 4 --- Persistence

-   Server actions with Zod; server-side total recompute (client totals
    are never trusted).
-   Save and resume games; Warriors roster CRUD; guest-to-account
    import.

## Phase 5 --- Invite and realtime

-   Invite and spectator links.
-   Scoped Supabase Realtime with reconnect handling.

## Phase 6 --- History, leaderboard, stats

-   Paginated history, per-game detail, leaderboard, head-to-head and
    stats (Recharts).

## Phase 7 --- Hardening

-   Playwright e2e, security review, PWA manifest and install,
    error/404 pages, text-only OG metadata, accessibility and
    performance pass, delete-my-data flow.

## Phase 8 --- Ludo

-   Separate module with its own rules (finishing positions to points).
-   Do not modify Least Count code. Do not show Ludo stats or UI before
    this phase.

## Definition of done for each phase

-   Acceptance criteria are met.
-   Lint and production build pass.
-   Relevant automated tests pass or limitations are recorded.
-   UI is checked at 390, 768 and 1280 px, with keyboard only and with
    reduced motion, when applicable.
-   Security and accessibility implications are addressed.
-   Only intended files are included in the diff.
-   Required documentation is updated.
-   Work is reviewed and merged using the agreed Git workflow.
