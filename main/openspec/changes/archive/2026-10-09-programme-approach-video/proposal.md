# Proposal

## Why

The programme calls two different things "Biography": the life story, and a later statement about interpretation and repertoire. A portfolio video about mixing piano with electronics has nowhere honest to sit, and the two press lines are still unsigned even though the sources are now known. A visitor and a crawler both need the life, the reviews, and the way of playing to be different headings.

## What Changes

- Rename the section whose text begins "Music for me is the purest form of communication" from "Biography" to **Approach**. Keep that video, and keep both paragraphs word for word. The life-story section stays the only "Biography".
- Add one section, **Experiment**, immediately after Approach and before Listen. It holds a new video (`ZUzsA6tV4Es`, title "Piano and electronics") and one short first-person paragraph taken from the artist's own words. The dated "30 November, 19.30" invitation is not used; that concert is in the past.
- Attribute the two existing press quotes and render them as pull quotes:
  - Gershwin line: Adam G. Steve, Régiségeknek, linking the 2018 post (tracking parameters stripped).
  - Chopin line: PH Pianos, The Chopin Project, linking the article.
- One change, not two. The label, the new section, and the attributions all edit the same heading outline in `Body.tsx`. Splitting them would make two applies fight over that order.

The hero excerpt is out of scope for this change. Wiring that file belongs to `signature-moments`.

## Capabilities

### New Capabilities

- `artistic-approach`: the Approach and Experiment sections, their order, the portfolio video, and the paragraph beside it.
- `press-sources`: the source records for the two shipped press quotes, and that those quotes render as attributed pull quotes.

### Modified Capabilities

None. Archived specs are empty; attribution behaviour already lives on the open change `conversion-copy-and-contact`.

## Impact

- Files: `src/body/Body.tsx`, `src/data/videos.ts`, `src/data/quotes.ts`. No new page, no new dependency.
- Heading outline gains `Approach` and `Experiment` and loses the second `Biography`. One `h1` remains.
- The new poster uses the host thumbnail until a local still exists. No iframe until the poster is activated, same as the other videos.
- Apply after the programme sections and video posters already on the page. Completing this also supplies the sources that `conversion-copy-and-contact` task 2.3 was waiting for; mark that task done in the same apply rather than writing the sources twice.
