# Design

## Context

`Section` lays a paired block out as a row from `lg` (`64rem`): `VideoPoster` in a `max-w-[480px]` `.mount`, then the text column. A sourced quote or a paragraph-with-video sits in a `.sheet`. `rowReverse` flips the row. The first Press block also sets `colReverse`, which stacks the quote above the film below `lg`. See proposal.md for why that plane is too flat. Requirements are in `specs/section-media-depth/spec.md`.

The mount, the paper sheet, the olive label, and the poster-before-player rule stay. This change only replaces the two-column geometry.

## Goals / Non-Goals

**Goals:**

- One stage per paired section: a larger film behind an overlapping sheet.
- The play disc and, after a tap, the player's bottom chrome stay fully visible and hittable.
- The same pattern at 390px and at a wide viewport, with `rowReverse` choosing the side.

**Non-Goals:**

- Recolouring, new type, or a scrim over the still. Depth comes from size, overlap, and the sheet's existing shadow.
- Changing the hero, the gallery, the Listen room, or any section that has no video.

## Decisions

### One stage inside `Section`

The paired layout lives in `Section`, not a new component. When `video` is set, the label stays in normal flow on `--paper`. Under it, a relatively positioned stage holds the mount and the sheet.

The mount is in the back (`z-index: 0`) and fills the stage. The sheet is in front (`z-index: 1`) and overlaps the mount. Sections with no video keep today's ground paragraph and do not get a stage.

Alternative: paint the still as a CSS background and float the sheet. Rejected, because the poster has to stay an `img` inside a button, and the iframe has to replace that same box.

### The film is the backdrop, and it is wider than 480px

Remove `max-w-[480px]` from the mount in `VideoPoster`. The stage sets the size.

From `lg`, the stage is the section width, `min(72rem, 92vw)`. The mount is that full width, 16:9, so the block is about twice the old 480px frame on a desktop. Below `lg`, the mount is the full content width, still 16:9.

The 12px mat, `--shadow-mount`, and the hover lift stay on the mount. The sheet does not lift with it, so a fine pointer raises the photograph under the paper.

Alternative: keep a 16:9 player at roughly 640px and add a second, decorative crop behind it. Rejected. The user asked for the video itself to be the larger block.

### The sheet overlaps the top, and stops above the chrome

The sheet is at most `36rem` wide. It is aligned to the trailing side by default and to the leading side when `rowReverse` is set. It overlaps the upper part of the mount and its bottom edge stays at least `3.5rem` above the bottom of the mount, which is the player chrome.

On a short frame (the 390px case, where 16:9 is only about 200px tall), the sheet sits mostly on the page and overlaps only the top of the mount, about `4.5rem`. The play disc moves from the centre of the frame to the centre of the uncovered area, above that chrome. Starting playback still swaps the iframe into the same mount; the box size does not change.

`colReverse` goes away. With the sheet overlapping the top of the film, the first Press quote already leads on a narrow screen.

Approach and Experiment are both unreversed, so their sheets overlap the same side. That follows the flag. Do not invent a stricter alternation.

### What stays put

DOM order is label, then the play button, then the sheet, so the heading, the control, and the quote stay in that sequence for the keyboard. The sheet catches clicks on the overlap; quote links keep working. Reveal stays: the mount is `.reveal`, the sheet is `.reveal.reveal-delay-1`. Overlap is layout, not a transform, so reduced motion still shows the stack.

`docs/design/refactor-programme.md` still says the mount stays `480px` in a row. Update those layout sentences in the same change so a later brief does not put the row back.

## Risks / Trade-offs

- [A tall quote covers the play disc on a short frame] → Cap the overlap on narrow viewports and park the disc in the uncovered area. Check all five sections at 390px, not only the shortest paragraph.
- [The full-width 16:9 frames make the programme long] → Accepted. A shorter frame would bring back the small card beside the text.
- [Hover lift on a large mount feels heavy] → Keep the existing `4px` lift. Do not scale the iframe.
- [YouTube's control bar is covered by a deep overlap] → The sheet is forbidden from the bottom `3.5rem` of the mount. Verify after the iframe appears, not only on the poster.

## Migration Plan

Visual only. Revert the stage layout and restore the `480px` cap to return to the row. No content or asset migration.

## Open Questions

None. Exact overlap can be tuned in the browser during apply as long as the sheet stays in front, the disc and the chrome stay clear, and the mount stays wider than the sheet from `lg` up.
