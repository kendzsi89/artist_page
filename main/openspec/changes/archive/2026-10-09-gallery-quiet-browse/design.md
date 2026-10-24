# Design

## Context

`Slider.tsx` is a measured horizontal strip. Slides are `w-11/12` and `lg:w-3/5`, `h-120` (`30rem`), with `gap-20`. A scroll listener sets a fixed `bg-black` veil up to opacity `0.6`. Drag commits one index past a `50px` threshold. Dots call `setCurrent`. Inactive prints scale to `0.9` and fade to `0.72` over `600ms`. There is no click on a neighbour and no arrow keys. See the proposal for why that reads as heavy. Requirements are in `specs/gallery-browse/spec.md`.

## Goals / Non-Goals

**Goals:**

- A shorter print, neighbours close enough to look touchable, and four ways to move.
- The page behind the gallery stays paper.

**Non-Goals:**

- A lightbox, new photographs, or rewritten captions.
- An ambient loop, or `useReveal` on the strip.

## Decisions

### Drop the veil and the scroll listener

Remove the fixed overlay and `fadeBackground`. The scroll effect exists only to drive that veil. The gallery section keeps its `h2`.

Alternative: tint the veil walnut and lower the cap. Rejected. The proposal retires the dimming.

### A closer, shorter strip

Each slide becomes `w-[min(42rem,78vw)]` and the image `h-[22rem]` with `object-cover`. The track gap becomes `1.25rem`. Inactive prints stay at scale `0.94` and opacity `0.82`, so the peek is a neighbour rather than a distant thumbnail. The centred-print math (`centerOffset - current * step() + translateX`) stays. `ClientOnly` stays, because the offset is measured.

The active print keeps `--shadow-mount`. Inactive prints stay flat. Radius stays `2px`.

### Four controls, one index

- A click on a slide whose index is not `current` sets `current` to that index. If the pointer moved past the `50px` drag threshold, that gesture is a swipe, not a click.
- Dots stay as they are, including `aria-label` and `aria-current`.
- The gallery section is focusable. ArrowLeft and ArrowRight change the index by one and stop at the ends. The handler calls `preventDefault` so focus does not jump between dots.
- Drag and touch stay: follow the pointer with no transition while dragging, then ease to the new index. Threshold stays `50px`. One print per swipe.

The track transition on release stays `300ms`. Scale and opacity stay `600ms` with `--ease-out`.

### The invitation is a small lift

On a fine pointer, a peeking slide translates up `4px` over `--duration-hover`. The front print does not lift. The caption under the front print fades in with the same `600ms` ease. No caption on inactive prints.

Under `prefers-reduced-motion: reduce`, `.print` and `.slide` transitions are `none`, and the hover lift is off. Choosing another print still changes `current`.

### Docs

`docs/design/refactor-gallery.md` still requires the black veil, `h-120`, and `gap-20`. Update those sentences in the same change so a later pass does not put them back. Keep the caption rules, the dot colours, and the "no red" rule.

## Risks / Trade-offs

- [A click fires at the end of a drag] → Ignore the click when the gesture passed the drag threshold.
- [Arrow keys steal scrolling when the gallery is focused] → Only handle Left and Right, and only while focus is inside the gallery.
- [22rem prints crop more than 30rem] → `object-cover` stays. Captions still name the photograph. This is the size cut that removes the wall of image.

## Open Questions

None.
