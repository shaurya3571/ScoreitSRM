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

The current design tokens are defined in `src/app/globals.css`. Use them
rather than inventing unrelated colors.

The established direction includes: - Warm off-white page background. -
Dark plum/ink foreground. - Purple primary action color. - White cards
with subtle borders. - Muted neutral surfaces and text. - Soft green,
pink, orange, and blue player accents. - Rounded corners and restrained
shadows.

Treat CSS variables as the source of truth. Verify the actual stylesheet
before assuming a token exists.

## 4. Typography

-   Inter is the body font.
-   Plus Jakarta Sans is the heading font.
-   Geist Mono is available for code-like or tabular technical content.
-   Use clear hierarchy and readable line lengths.
-   Use tabular numerals for scores where helpful.
-   Avoid overly tight tracking on long body text.

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
behavior. Update it when reusable design primitives change materially.

## 11. Avoid

-   Unnecessary gradients, heavy shadows, and decorative animations.
-   Inconsistent corner radii or arbitrary spacing.
-   Unexplained icon-only controls.
-   Tiny touch targets on mobile.
-   Placeholder links presented as finished functionality.
-   Duplicated component styles when a shared primitive already exists.
