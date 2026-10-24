# Design

## Context

`Section` sets `playing` when `VideoPoster` calls `onPlay`. `VideoPoster` has its own `playing` flag and swaps the poster button for a YouTube iframe. A fixed `.stage-scrim` (`rgb(52 38 30 / 0.28)`, `pointer-events: none`, `z-index: 20`) covers the page. The playing `.stage` is `z-index: 21`, so the sheet sits above the scrim and stays fully sharp. The mount scales to `1.03` and stacks above the sheet. There is no way to set `playing` back to false. See the proposal for why that should end. Requirements are in `specs/programme-playback/spec.md`.

`.stage-bottom .play-disc` is `top: 28%`. On a wide frame the disc overlaps the live-recording sheet and the Teaching sheet. At `390px` the gap is about `16px`. Both of those sections use `place="bottom"` today.

## Goals / Non-Goals

**Goals:**

- One playback flag that the poster, the scrim, and the sheet all follow.
- A click outside the film, or Escape, returns that section to the poster.
- The sheet recedes only while its film plays.

**Non-Goals:**

- Moving sheets between places, or changing which sections use `bottom`.
- A custom player, a pause control on the film, or a lightbox.
- Changing the gallery, the Listen excerpt, or the walnut scrim colour.

## Decisions

### One owner for playback

`Section` keeps `playing`. `VideoPoster` takes `playing` and `onPlay` and no longer stores its own flag. When `playing` is false it renders the poster button. When it becomes true it mounts the iframe. Setting `playing` to false unmounts the iframe, which stops the film.

Alternative: leave both flags and add an `onDismiss` callback into the poster. Rejected. Two flags can disagree, and the poster is the only place that can show the still again.

### The scrim and the sheet both end playback

The scrim becomes a button, or a clickable element with `pointer-events: auto`, labelled so a screen reader can dismiss the film. A click calls `setPlaying(false)`. The playing stage stays above the scrim, so a click on the iframe does not reach it.

The sheet is inside the stage, above the scrim, so a click on `.stage-copy` while playing also calls `setPlaying(false)`. The mount does not.

A `keydown` listener for Escape, active only while `playing` is true, does the same. It does not stop other keys.

Alternative: drop the sheet under the scrim so one click target covers it. Rejected. The sheet needs its own blur, and a click on the film must not dismiss.

### The sheet recedes in place

While `.is-playing`, `.stage-copy` uses `opacity: 0.6` and `filter: blur(4px)`, transitioning opacity and filter over `--duration-enter` and `--ease-out`. Ending playback removes the class, so both return. The sheet stays in the layout. It does not unmount.

Under `prefers-reduced-motion: reduce`, that transition is `none`. The opacity and blur still apply. The existing rule that skips the mount scale stays.

### The bottom control sits in the open band

Stop using `top: 28%` for `.stage-bottom .play-disc`. The disc is positioned inside the mount, which has `12px` of padding, so `top: 3rem` leaves only about `20px` of gap at `390px`. Use `top: 2.25rem` with the existing `translate(-50%, -50%)`. The visual centre is then `3rem` from the top of the film, and the bottom edge is `76px` down.

At `390px` the sheet begins about `108px` into the film, so the gap is `32px` (`2rem`). On a wide frame the sheet starts near `202px`, so the same position clears the overlap and leaves a larger gap. If a later sheet grows into that band, keep at least `2rem` of clearance and at least `1.25rem` between the disc and the top of the film, and never let the disc intersect the sheet.

Alternative: centre the disc with a measurement of the sheet. Rejected for this change. The two bottom sheets share one height band, and a fixed top offset clears both.

### Docs

Update the playback sentences in `docs/design/refactor-programme.md`: a click away or Escape restores the sheet and clears that film's dim, and the sheet fades while the film plays. Do not rewrite the placement list in that file. It still describes an older left-side live Press block, and this change does not move sections.

## Risks / Trade-offs

- [A click on a YouTube control is inside the iframe] → The iframe stays above the scrim, so those clicks do not dismiss.
- [Two scrims stack] → Each scrim belongs to its section. Ending one film removes only that scrim. The other film's scrim remains.
- [Blur on a large sheet is expensive] → One sheet, `4px`, and only while that film plays.
- [Escape while typing in another control] → The listener is on `window` only while a programme film is playing. The page has no text field in that state except inside the iframe, which does not receive the page's keydown.

## Open Questions

None.
