# ScoreitSRM --- Design Brief

## 1. Product experience

ScoreitSRM should make scorekeeping feel quick, clear, and social. The
interface should help a group understand the current game, player
scores, and standings without visual clutter.

## 2. Design principles

-   **Clarity first:** prioritize score, player identity, round context,
    and game status.
-   **Fast interactions:** common actions should be easy to discover and
    use on a phone.
-   **Consistent components:** reuse the established UI primitives and
    shared states.
-   **Friendly, not childish:** rounded surfaces and player colors can
    add warmth without reducing readability.
-   **Responsive by default:** mobile layouts are first-class, not a
    compressed desktop design.
-   **Accessible:** keyboard use, visible focus, semantic structure, and
    adequate contrast are required.

## 3. Visual foundation

The design tokens are defined in `src/app/globals.css`. Use them rather
than inventing unrelated colors. Treat the CSS variables as the source
of truth and verify the actual stylesheet before assuming a token
exists.

**Theme "Card Table":** a cream-and-green card table.

-   Cream-green page background, deep green ink, white cards with
    subtle borders.
-   Green primary action color; amber accent reserved for a 0 round and
    the leader highlight.
-   Six player chip tints (`player-1` to `player-6`), each with a darker
    dark-mode variant. A chip always shows the player's initial, never
    colour alone.
-   Radius 0.75rem; minimal shadows.
-   The scorecard is styled like a ruled paper score pad.
-   Motion is limited to a count-up on total change and a row-reorder
    transition. Both are disabled under `prefers-reduced-motion`.

### No logo

ScoreitSRM has no logo. The brand is the text wordmark "ScoreitSRM" in
the heading font. Do not add an icon badge, logo image, suit-symbol
mark, logo-based favicon or OG image. OG metadata is text only.

## 4. Typography

-   Bricolage Grotesque is the heading font.
-   Inter is the body font.
-   Geist Mono with tabular numerals is used for scores and totals
    (`.score-num`).
-   No italic-serif accent words.
-   Use clear hierarchy and readable line lengths.

## 5. Layout and spacing

-   Use the shared Container for consistent page width and horizontal
    padding.
-   Use a predictable spacing scale and consistent section rhythm.
-   Keep scoreboards readable at narrow widths.
-   Prefer content-first responsive grids.
-   Avoid horizontal scrolling unless it is essential and deliberately
    designed.
-   Keep global navigation usable on mobile.

## 6. Components

Reuse components in `src/components/ui/`, including Button, Card, Badge,
Avatar, Input, Separator, and Skeleton when available. Reuse shared
layout and state components rather than reimplementing them.

Interactive controls should provide: - Default state. - Hover state
where applicable. - Visible keyboard focus. - Disabled state where
applicable. - Loading feedback for asynchronous actions. - Clear error
feedback when actions fail.

## 7. Shared states

-   **Loading:** use skeletons that approximate the final content layout
    where practical.
-   **Empty:** explain what is absent and provide a next action only
    when a real action exists.
-   **Error:** use clear language and a retry action only when retry is
    meaningful and implemented.
-   Do not display demo state as real or persisted application data.

## 8. Accessibility

-   Use semantic HTML and associated form labels.
-   Keep keyboard focus visible.
-   Ensure mobile navigation has an accessible name and state.
-   Use ARIA only where native semantics are insufficient.
-   Do not use color as the only indicator of score status or errors.
-   Provide meaningful image alt text.
-   Respect reduced-motion preferences.
-   Check contrast for foreground text and controls.

## 9. Responsive review

Review at representative widths: - **Mobile:** around 375--430 px. -
**Tablet:** around 768 px. - **Desktop:** 1280 px and wider.

Check typography, spacing, navigation, grids, score columns, forms,
dialogs, and state components at each width.

## 10. Design-system showcase

The `/design-system` route should demonstrate typography, colors,
buttons, cards, badges, avatars, inputs, shared states, and responsive
behavior, plus the wordmark, player chips and a sample scorecard row.
Update it when reusable design primitives change materially.

## 11. Scoring UI rules

-   Score inputs start empty, never 0, because 0 is the best score.
    "Save round" stays disabled until every active player has a value.
-   Use numeric keypad entry (`inputmode="numeric"`); Enter or Tab
    advances to the next player. No +/- steppers as the primary input.
-   The scorecard has a sticky player column and a sticky total column;
    only the table scrolls horizontally, with the latest round in view.
    Each row has a rank badge and there is a sort-by-rank toggle.
-   An active game is the first thing on screen; no hero above it.
-   Do not show Ludo UI or stats until Ludo is built.

## 12. Avoid

-   Unnecessary gradients, heavy shadows, and decorative animations.
-   Inconsistent corner radii or arbitrary spacing.
-   Any logo, icon badge or logo-based favicon.
-   Unexplained icon-only controls; every icon-only control needs a
    visible label or tooltip and an accessible name.
-   Touch targets under 44px on mobile.
-   Placeholder links presented as finished functionality.
-   Duplicated component styles when a shared primitive already exists.
