# ScoreitSRM --- Product Requirements Document

## 1. Product summary

ScoreitSRM is a web application that helps groups organize games, record
scores, and follow standings in one place. The initial focus is Least
Count scorekeeping. Additional game modes, including Ludo, are planned
for later development.

## 2. Problem

Groups often track scores manually or across informal notes and chat
messages. This can interrupt gameplay, create mistakes, and make it
difficult to follow standings over multiple rounds.

## 3. Product goals

-   Make scorekeeping quick and understandable.
-   Keep players and game state organized in one place.
-   Display current standings and completed-game results clearly.
-   Work well on mobile devices as well as desktop.
-   Protect private game and user data.
-   Provide a foundation that can support additional game modes later.

## 4. Initial scope

The intended MVP sequence includes: 1. Landing and scoreboard interface.
2. User authentication. 3. Game creation and participant management. 4.
Game room with round and score views. 5. Least Count score validation
and submission. 6. Persisted standings and game completion. 7. Realtime
updates where useful. 8. History and leaderboard features after core
gameplay is reliable.

The exact release scope should be confirmed against the active roadmap
and implementation status.

## 5. Out of scope for the first MVP

Unless explicitly reprioritized: - Full Ludo gameplay. - Complex
tournaments and bracket systems. - Payments or monetization. -
Unnecessary social feeds or chat systems. - Advanced analytics before
reliable score data exists. - Offline multi-device synchronization
before conflict resolution is designed.

## 6. Users and use cases

### Game organizer

-   Creates a game and chooses supported settings.
-   Adds or invites participants.
-   Manages the game lifecycle within their permissions.
-   Views final results.

### Participant

-   Joins an authorized game.
-   Views players, rounds, scores, and standings.
-   Submits or updates permitted score data according to the game's
    rules and permissions.

### Viewer

-   Views game information only when the product's sharing and
    authorization rules permit it.

These are product roles; do not assume a specific role model is already
implemented in the database.

## 7. Functional requirements

### FR-1: Responsive interface

Pages and game-room controls must remain usable on mobile, tablet, and
desktop.

### FR-2: Authentication

Where user-specific data is required, authenticate users and maintain
sessions securely.

### FR-3: Game creation

Authorized users can create games using validated settings and supported
game types.

### FR-4: Participants and membership

The application must track who belongs to a game and enforce access
based on membership and role.

### FR-5: Scorekeeping

The application must accept only valid score entries under the defined
rules. It must handle invalid values, repeated submissions, and invalid
game states.

### FR-6: Standings

The application must calculate and present standings consistently from
trusted score data.

### FR-7: Game lifecycle

The application must represent relevant game states, including active
and completed games, and reject invalid transitions.

### FR-8: Feedback states

Asynchronous views must provide appropriate loading, empty, and error
states. Retry controls must perform a real retry.

### FR-9: History

When implemented, users can view games and results they are authorized
to access.

### FR-10: Realtime

Where enabled, permitted participants can see relevant game updates
without manually refreshing. Persisted database state remains
authoritative.

## 8. Least Count rules

The exact Least Count rules must be explicitly confirmed before
finalizing the scoring engine. Document at least: - Accepted score
values and validation boundaries. - How round scores affect a player's
total. - Tie handling. - Game completion conditions. - Whether and how
score corrections are permitted. - Duplicate submission behavior. - What
happens when a participant leaves or is removed.

Do not infer ambiguous game rules in production code.

## 9. Non-functional requirements

### Security

-   Enforce authorization on trusted server/database boundaries.
-   Use Row Level Security for protected Supabase data.
-   Keep private credentials out of client bundles.
-   Validate untrusted input.
-   Prevent cross-user and unauthorized game access.

### Reliability

-   Preserve score and game-state consistency.
-   Handle network failures and invalid requests clearly.
-   Avoid duplicate writes where operations must be idempotent.

### Accessibility

-   Semantic markup, keyboard navigation, visible focus, accessible
    labels, and understandable error messages.

### Performance

-   Keep initial pages responsive.
-   Avoid unnecessary client-side JavaScript and subscriptions.
-   Use pagination or efficient queries as data grows.

### Maintainability

-   Use typed, reusable components.
-   Keep game rules testable and separate from presentation.
-   Document material architectural decisions.

## 10. UX and visual direction

Use `DESIGN-BRIEF.md` and the shared design system as the visual source
of truth. The experience should be clear, warm, friendly, and
score-focused. Responsive behavior and accessibility are part of
acceptance, not optional polish.

## 11. Success measures

Evaluate the MVP using evidence such as: - Users can create and complete
a supported game without confusion. - Scores and standings remain
consistent across refreshes and participants. - Unauthorized users
cannot read or modify protected game data. - The main workflows are
usable on mobile. - Automated tests cover scoring rules and important
authorization boundaries. - Errors and network failures provide
understandable feedback.

Do not claim adoption, usage, or performance metrics without measured
evidence.

## 12. Assumptions and open decisions

Confirm these during implementation: - Final Least Count rules and tie
behavior. - Game visibility and invitation model. - Who can submit,
edit, or correct scores. - Whether games can be edited after
completion. - Which game history and leaderboard views are public or
private. - Realtime requirements and expected group sizes. - Whether
offline support is required.

## 13. Release acceptance criteria

A release is ready when its agreed requirements are implemented, scoring
behavior is verified, permissions are tested, lint/build checks pass,
critical flows have appropriate tests, responsive and accessible UI is
reviewed, and known limitations are documented.
