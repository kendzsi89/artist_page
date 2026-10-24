# Proposal

## Why

Every paired section now parks its sheet on the top edge of the film and only flips left or right. The middle of the page repeats one composition. The sheets should sit in different places on the photograph, including along the bottom, so the programme does not read as the same card five times.

## What Changes

- From the wide layout up, each paired section gets its own place for the sheet. The film stays the larger plane behind an opaque paper sheet.
  - Press (Rhapsody in Blue): top, trailing side.
  - Press (live recording): along the left side.
  - Approach: along the right side.
  - Experiment: top, leading side.
  - Teaching: along the bottom.
- Below that breakpoint, Teaching stays on the bottom and Experiment stays on the top, aligned left. The other three keep a top overlap. The play control and the player bar stay clear in every place.
- `rowReverse` stops choosing the side. This replaces the "sheet always overlaps the top, and the reverse flag flips the side" rule from the completed change `layered-media-backdrops`. Before play, the still stays behind the sheet. Sections without a film stay flat.
- While a film is playing, that mount comes in front of its sheet. The move is a short step forward. The rest of the page dims slightly so the playing film reads as the highlighted thing. Reduced motion skips the travel and still leaves the film in front, with the dim in place. The play control stays reachable before that move.
- On a paired section the label (Press, Approach, Experiment, Teaching, and the second Press) sits immediately above that section's sheet, and moves with the sheet. It does not sit on the page ground above the whole stage. Biography has no film, so its title stays where it is.
- Assumption: "perhaps left" for Experiment is locked as the leading side. Teaching is on the bottom at every width, not only on a desktop.

## Capabilities

### New Capabilities

- `stage-panel-placement`: where the sheet sits on each paired film, where the label sits relative to that sheet, and that a playing film steps in front of the sheet while the rest of the page dims.

### Modified Capabilities

None. `section-media-depth` is not an archived spec. Its top-only side rule is retired by this change rather than edited in place.

## Impact

- Files: `src/body/Section.tsx`, `src/body/VideoPoster.tsx` (tell the stage when playback starts), `src/body/Body.tsx` (drop `rowReverse`; pass a placement), `src/index.css` (placement, play-disc position, the forward step, and the dim), and the layout sentences in `docs/design/refactor-programme.md`.
- Copy, video ids, and the rule that the player appears only after a tap stay. No new dependency. The gallery veil is a different change and is not this dim.
