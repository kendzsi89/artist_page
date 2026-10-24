# Proposal

## Why

Each programme block that pairs a film with a quote or a paragraph is still two columns on one plane: a 480px mount beside a paper sheet. The page already has depth in the hero and the Listen room, where a photograph sits behind the words. These blocks do not, so the middle of the page stays flat.

## What Changes

- In every section that has both a video and featured text, the video becomes a larger block behind that text. The sheet (pull quote or paragraph) overlaps the photograph so the picture reads as its backdrop. The five sections are Press (Rhapsody in Blue), Press (live recording), Approach, Experiment, and Teaching.
- The section label stays on the page ground, above that stack. Copy, video ids, poster sources, and the rule that the player appears only after a tap stay as they are.
- `rowReverse` chooses which side the sheet overlaps. The old side-by-side row, the 480px cap, and the small-screen stack flip (`colReverse` on the first Press block) are retired for these sections.
- Assumption: the hero photograph, the gallery prints, and the Listen-room photograph already sit behind a foreground and are out of scope. Biography, Engagements, and the thank-you line have no film, so they stay on the page ground.

## Capabilities

### New Capabilities

- `section-media-depth`: a video that shares a section with featured text is a larger plane behind that text, with the play control and the playing player left clear.

### Modified Capabilities

None. There is no archived spec for section layout. Poster-before-player behaviour stays owned by the open change `signature-moments`.

## Impact

- Files: `src/body/Section.tsx`, `src/body/VideoPoster.tsx` (the mount's `max-w-[480px]`), `src/index.css` if the overlap needs a class, and the layout sentences in `docs/design/refactor-programme.md` so a later pass does not restore the two-column row.
- `Body.tsx` loses `colReverse` on the first Press section. Labels, paragraphs, and quotes are unchanged.
- No new dependency, no new page, no change to tokens, shadows, or the image budget.
