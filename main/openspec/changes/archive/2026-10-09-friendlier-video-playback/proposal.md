# Proposal

## Why

Starting a programme film steps it in front of its sheet and dims the page, and nothing brings that state back. The sheet stays fully sharp beside the film, and on a bottom placement the play control sits on the text.

## What Changes

- Clicking away from a playing film restores that section: the sheet returns in front of the still, the page returns to its ordinary shading, and the film stops.
- While a film is playing, its own sheet fades back with opacity and a light blur. The fade clears when playback ends.
- On a bottom placement, the play control sits in the open area above the sheet with a clear gap, instead of overlapping the text.
- This supersedes the playback decision in `varied-stage-placement` that the scrim never receives a click and that a film stays forward for as long as it plays. Sheet placement itself stays as it is in the page today.

## Capabilities

### New Capabilities

- `programme-playback`: Starting a programme film, fading its sheet, leaving playback, and keeping the play control clear of a bottom sheet.

### Modified Capabilities

- None. `openspec/specs/` has no archived capabilities. The unarchived `stage-panel-placement` delta still says the scrim ignores clicks; this change owns the newer playback behavior.

## Impact

- `src/body/Section.tsx` and `src/body/VideoPoster.tsx`: one playback state that can end, shared by the poster and the stage.
- `src/index.css`: sheet fade while `.is-playing`, a clickable scrim, and a higher play control on `.stage-bottom`.
- `docs/design/refactor-programme.md`: the playback sentences, so a later pass does not restore a scrim that ignores clicks.
- Assumption: clicking the dimmed page or the faded sheet ends that film. Clicking the film does not. Escape ends it the same way, because the poster control is gone while the iframe is up.
- Assumption: ending playback removes the iframe and shows the poster again, so the film does not keep playing behind the sheet.
- Assumption: the fade is opacity `0.6` and a `4px` blur, over the existing enter duration. Reduced motion applies both at once, with no transition.
- Assumption: every bottom sheet gets the same play-control gap. Today that is the live-recording Press block and Teaching. At a wide viewport the control overlaps those sheets by about `11–16px`; at `390px` the gap is only `16px`. The new gap is at least `2rem`, and the control stays fully visible.
