# Design

## Context

Paired sections use one `.stage` grid. The sheet is always in the first row and overlaps the top of the mount by `4.5rem` below `lg` and `8rem` from `lg` up. `rowReverse` only sets `justify-self: start`. The play disc sits near the vertical centre, nudged down so it clears that top overlap. See the proposal for the five places. Requirements are in `specs/stage-panel-placement/spec.md`.

## Goals / Non-Goals

**Goals:**

- One placement class per paired section, readable in `Body.tsx`.
- The play disc moves into the open part of that placement.
- Teaching reads as sitting on the bottom of the film on a wide screen.
- A playing film steps in front of its sheet, and the paired label rides with that sheet.

**Non-Goals:**

- Changing copy, video ids, the sheet's type, or the poster-before-player rule.
- A free-form drag of the sheet.

## Decisions

### A placement prop replaces `rowReverse`

`Section` takes `place`: `top-end`, `top-start`, `side-start`, `side-end`, or `bottom`. `Body` sets them in order: Press `top-end`, the live-recording Press `side-start`, Approach `side-end`, Experiment `top-start`, Teaching `bottom`. Delete `rowReverse`.

The stage root carries that name as a class (`stage-top-end`, and so on). The sheet stays `z-index: 1` and at most `36rem` wide.

Alternative: keep `rowReverse` and add a second boolean for bottom. Rejected. Five places are not two flags.

### Top placements stay the current tuck

`top-end` and `top-start` keep today's grid: sheet in row 1, mount in row 2, negative margin into the top of the mount (`4.5rem` below `lg`, `8rem` from `lg`). `top-end` aligns the sheet to the trailing edge, `top-start` to the leading edge. The play disc stays in the lower open area, the position it has now.

### Side placements are a wide-layout overlap

Below `lg`, `side-start` and `side-end` use the same top tuck as the top placements, so the first two Press blocks and Approach still overlap the top on a phone. The horizontal alignment still follows start or end.

From `lg`, both the mount and the sheet share one grid cell. The mount is full width. The sheet is `min(36rem, 46%)` wide, vertically centred, on the named side, with no top tuck margin. A sheet taller than the film may extend above it, and its bottom edge stays at least `3.5rem` above the mount bottom. The play disc moves to the opposite half (`left: 68%` when the sheet is on the left, `left: 32%` when it is on the right) and to the vertical centre of that open half.

### Teaching sits on the bottom

From `lg`, the sheet and the mount share a cell. The sheet is centred horizontally, aligned to the end, and its bottom edge is `3.5rem` above the mount bottom. On a 1440px frame the film is about 660px tall and the Teaching sheet is about 355px, so the card sits in the lower half and the upper third stays open. The play disc moves to that upper third.

Below `lg` the frame is only about 210px tall and the Teaching sheet is taller than the film. The sheet then sits under the film and overlaps its lower edge by `4.5rem`, and the play disc stays in the upper area, clear of that overlap. That `4.5rem` can meet the player bar on a phone. From `lg` up, before play, the sheet stops `3.5rem` above the bar. The poster control stays clear at both widths.

### The label rides with the sheet

On a paired section the `h2` is the first element inside `.stage-copy`, directly above the sheet, with the existing small-caps style. It is not a sibling above the stage, and it is not inside the sheet. Side and bottom placements carry the label with the card, so Press on the left has its heading on the left, and Teaching's heading sits just above the bottom card. Biography has no stage, so its heading stays in the text column on the page ground.

### Playback steps the film forward

`VideoPoster` already swaps the still for an iframe on activation. It also tells the stage that this film is playing, by a callback or a class on the stage root. Until that moment the mount stays at `z-index: 0`, behind the copy stack.

When playing, the mount moves to a stacking level above the sheet and the label. It scales from `1` to `1.03` over `--duration-enter` with `--ease-out`. That scale is the travel. The layout width and height of the mount do not change when the iframe replaces the still. A fixed scrim, `rgb(52 38 30 / 0.28)`, covers the page behind the playing stage for as long as that film is playing. The scrim does not receive clicks. The playing stage sits above it, so the film stays bright and the rest of the page, including other sheets, reads as dimmed. This scrim is not the gallery veil.

Under `prefers-reduced-motion: reduce`, the scale transition is `none` and the scale stays `1`. The mount is still stacked above the sheet, and the scrim is still shown.

Alternative: animate the film to the centre of the viewport. Rejected. The film should step forward over its own sheet, not leave its section.

## Risks / Trade-offs

- [A long Approach sheet covers the vertical centre on a side placement] → Keep the sheet to 46% width so the opposite half stays open, and check the disc box against the sheet at 1440px.
- [Teaching on a phone covers the player bar before play] → Accepted below `lg`. The play control itself stays in the open upper area. From `lg` up the sheet stops above the bar until playback, and once playing the film is stacked above the sheet.
- [The dim feels like the gallery's black veil] → The scrim is a light walnut tint at 28% and only exists while a programme film is playing. The gallery change removes its own veil separately.
- [Side placement on a medium width feels like the old top tuck] → The side grid starts at `lg` (`64rem`), the same breakpoint as the current deep overlap.

## Open Questions

None. The five places are fixed in the proposal.
