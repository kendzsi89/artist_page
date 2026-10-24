# Programme

Files: `src/body/Section.tsx`, `src/body/Body.tsx`. Tokens and `useReveal` already exist.

This is the long middle of the page: biography, press quotes, and YouTube embeds. Today every block is the same flat row on white, which is the “HTML page” feeling. Give quotes and video-adjacent text a paper sheet, put each video on a mount, and reveal the pair on scroll.

## Current state

`Section` is one flex row (`flex-col` until `lg`, then row or `lg:flex-row-reverse`). A `ReactPlayer` sits in a `max-w-[480px]` box with `rounded-lg`, which `border-radius: 0 !important` cancels. A quote is body Lato at `#444` between two quote SVGs. A paragraph is the same Lato, sometimes with a red drop cap.

`Body` stacks seven `Section`s, the gallery, Spotify, and `BodyIcons`, on `bg-white`.

## Layout

A section with both media and text is a stage, `w-[min(72rem,92vw)]`, vertical padding `5.5rem` from `lg`. The film fills the stage and sits behind the sheet until it is played. From `lg`, the five places are: the first Press sheet on the top trailing side, the live-recording Press sheet on the left, Approach on the right, Experiment on the top leading side, and Teaching along the bottom. Below `lg`, Teaching stays on the bottom, Experiment stays on the top left, and the other three keep a top overlap of about `4.5rem`. There is no side-by-side row. Starting playback steps that film in front of its sheet, scaling the mount to `1.03`, dims the rest of the page with a light walnut scrim, and fades that sheet to opacity `0.6` with a `4px` blur. A click on the dimmed page, a click on the sheet, or Escape restores the sheet in front of the still, clears that film's dim, and stops the film. The scrim receives that click. Reduced motion skips the scale and the fade transition. The mount's layout size does not change.

Page ground is `--paper` on the `Body` root. Delete `bg-white`.

## Section labels

Every programme block starts with a label, and the label is an `<h2>`. This is one element doing two jobs: the design's small-caps kicker, and the page's heading structure for crawlers and screen readers.

- `Section` takes a required `label` prop and renders `<h2 id={slug}>`. On a paired section the heading is the first item in the copy stack, immediately above the sheet, and it travels with that sheet. It is not inside the sheet and not on the page ground above the whole stage. Biography has no film, so its heading stays in the text column.
- Style: Lato, `11px`, `tracking-[0.14em]`, uppercase, `--olive`, margin-bottom `0.75rem`. It looks like a kicker; it is a heading.
- The wrapping element is a `<section aria-labelledby={slug}>`.
- Labels for the current blocks, in page order: "Press" (opening quote), "Biography" (long biography), "Press" (second quote), "Biography" (the "communication" paragraph), "Listen" (album sentence; see the listening-room brief), "Teaching" (teaching and extra-curricular), and the thank-you line has no label of its own and belongs to the "Teaching" section.
- Two sections may share a label text; their `id`s must differ (`press-1`, `press-2`).

## Video mount

When `video` is set, wrap the player in a `.mount` element. (Until `signature-moments` lands the player is `ReactPlayer`; after it, the player is the `VideoPoster` component. The mount is the same either way.)

- Background `--paper-raised`
- Padding `12px`
- Radius `2px`
- Shadow `--shadow-mount`
- `transition: transform var(--duration-hover) var(--ease-out), box-shadow var(--duration-hover) var(--ease-out)`
- Hover (fine pointer only, `@media (hover: hover)`): `translateY(-4px)` and the same shadow (it is already level 2; the lift is the change). Do not scale the iframe; scaling a playing video looks soft and hurts hit testing.

The player keeps `width: 100%`, `aspect-ratio: 16/9`, black background inside the mat. The mount fills the stage. It is wider than the sheet. It has no 480px cap.

## Pull quote

When `quote` is set and has a `source`, render a `.sheet`, not a row of two icons plus a paragraph.

- Playfair italic, `text-2xl` / `lg:text-3xl`, `leading-[1.45]`, colour `--ink`
- A single opening quotation mark, Playfair, `text-6xl`, colour `--clay`, `leading-none`, sitting above the words. Retire the two `Icon` paths inside `Section` for quotes. `Icon` remains for social links.
- A `.rule` above the mark, in `--olive`
- Padding from `.sheet`, shadow `--shadow-sheet`, max width `36rem`
- Markup is a `<blockquote>` with the attribution in a `<footer>` containing a `<cite>`

The mark gets an extra transition on the same reveal: from `opacity: 0.4; transform: scale(0.92)` to rest, `800ms` `--ease-out`. Parent sheet still does the `translateY(20px)` reveal. The mark does not travel a second `20px`.

### Attribution

Every pull quote shows who said it. Under the quote text:

- An em dash, then the source name, a comma, and the publication or role: `— Anna Larsen, Politiken`
- Playfair (upright, not italic), `text-sm`, colour `--ink-muted`, margin-top `1rem`
- If the source has a URL, the publication is a link opening in a new tab with `rel="noopener noreferrer"`, underline on hover only

A quote whose source is not known is not a pull quote. Render it as a body paragraph on the page ground (same path as `paragraph`): no sheet, no quotation mark, no italic. The point of a testimonial is that someone stood behind it; a styled quote with no name is decoration.

Quotes are data, not strings in the layout: `{ text, source?: { name, outlet?, url? } }`. The current two quotes ship without a `source` until the owner supplies one, so they will render as body text first. That is correct behaviour, not a bug.

## Biography

When `paragraph` is set and there is no `video` in that section, render the paragraph on the page ground. No sheet, no shadow. Measure `max-w-[40rem]`, Lato, `--ink-body`, `leading-[1.7]`, size `text-base` / `lg:text-lg`.

When `paragraph` and `video` are both set (Approach and Teaching), put the paragraph in a `.sheet` that overlaps the mount. Same type styles inside the sheet. Drop cap rules are unchanged: `firstLetter` true only where `Body` already passes it (the opening biography). That opening section has no video, so the drop cap stays on the bare page, which is what we want — a printed initial, not a letter inside a card.

`strong` inside paragraphs stays walnut: `text-(--walnut) font-semibold`. Do not colour them red.

## Reveal

Each `Section` root uses `useReveal`. The media (or the quote sheet) is `.reveal` plus `is-shown` when `shown`. The text column is `.reveal.reveal-delay-1`.

Sections already on screen at load — the first quote, just under the hero — will reveal as soon as 20% is visible, which is immediate on a tall desktop. That is correct. Do not add a special case.

## Body spacing

Between major chunks, rely on the section padding above. Do not insert extra empty divs. The gallery, Spotify block, and icon row keep their own briefs; leave their markup alone except the `Body` background colour.

## Done when

- Every programme block begins with a small uppercase label that is an `<h2>`, and the heading outline of the page is one `h1` followed by `h2`s only.
- Every pull quote shows a source line beginning with an em dash. A quote without a source is body text, with no sheet or quotation mark.
- The opening quote, once it has a source, is a paper card with a clay quotation mark and an olive rule, italic Playfair, an attribution line, and it rises once as you reach it.
- Each YouTube embed sits on a `12px` paper mat with the level-2 walnut shadow, and lifts `4px` on hover without the iframe scaling.
- The long biography is type on `--paper`, with the red Playfair drop cap, and is not inside a card.
- The teaching paragraph beside a video is a sheet; the thank-you paragraph is not.
- Scroll back up: nothing replays.
- Quote text, biography text, and video ids are the same as before.
