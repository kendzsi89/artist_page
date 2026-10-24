# Tasks

## 1. Strip

- [x] 1.1 Remove the fixed black veil and the scroll listener that drives it. Verify scrolling the gallery through the viewport leaves the page paper, with no fixed overlay changing opacity.
- [x] 1.2 Size each slide to `min(42rem, 78vw)` and each image to `22rem` tall, with a `1.25rem` gap. Keep the centred-print math. Inactive prints use scale `0.94` and opacity `0.82`; the front print stays full size with `--shadow-mount`. Verify a neighbour is visible beside the front print and only that print shows a caption, under the photograph.

## 2. Browse

- [x] 2.1 Clicking a peeking print sets it as current, unless the gesture passed the `50px` drag threshold. Verify a click on the next print brings it forward and swaps the caption, and a drag still advances at most one print and follows the pointer without an easing lag.
- [x] 2.2 Make the gallery section focusable and move one print on ArrowLeft and ArrowRight, stopping at the ends, without moving focus between dots. Verify ArrowRight from the first print shows the second caption, and ArrowRight on the last print stays put.
- [x] 2.3 On a fine pointer, lift a peeking print `4px` over the hover duration. The front print does not lift. Fade the caption in over `600ms` with the existing ease. Verify there is no continuous animation on the gallery.

## 3. Contract and check

- [x] 3.1 Update `docs/design/refactor-gallery.md` so it no longer requires the black veil, `h-120`, or `gap-20`. Keep the caption, dot-colour, and no-red rules. Verify those three old requirements are gone from the file.
- [x] 3.2 Emulate `prefers-reduced-motion: reduce`, choose another print, and verify it is in front immediately with transitions off. Confirm the second caption string is unchanged. Run `npm run lint`.
