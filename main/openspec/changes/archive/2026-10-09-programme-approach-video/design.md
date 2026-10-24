# Design

## Context

See proposal.md for why. Today `Body.tsx` uses the label "Biography" twice: the life story (`id="biography"`), then later the communication and repertoire paragraphs beside video `nEvbK84KEUI` (`id="biography-2"`). `Section` already turns a quote with `source` into a pull quote, and a paragraph beside a video into a sheet. `videos.ts` has four entries. No archived specs exist yet.

## Goals / Non-Goals

**Goals:**

- One heading for the life story, a different heading for the method statement, and a following section for the new video.
- Keep the existing Section pattern: one mount, one text column, paper sheet when text sits beside a video.
- Store the two press sources as data so the current quote renderer does the markup.

**Non-Goals:**

- Rewriting either Approach paragraph, the life biography, gallery captions, or the other four video ids.
- A second video inside Approach. `Section` has one video slot; the performance film stays there.
- Setting `EXCERPT` or changing the hero audio budget. That belongs to `signature-moments`.
- A local poster for the new video. The host thumbnail is the fallback already specified for a video with no `poster`.
- Printing the 30 November debut as an event. It is past, and Upcoming already owns future dates.

## Decisions

### 1. Two sections, not one combined block

Approach is a rename of the current second biography block. Experiment is a new `Section` after it and before the Listen `section`.

Alternative: drop `nEvbK84KEUI` and put `ZUzsA6tV4Es` in the renamed block. That removes a performance film to make room, and it mixes a repertoire statement with a different film. Alternative: stack two mounts in one section. That is a new layout the page does not have.

On large screens Approach already uses `rowReverse`, so its film sits on the right. Experiment does not, so the new film sits on the left. That continues the alternation.

### 2. Labels are "Approach" and "Experiment"

"Approach" covers both kept paragraphs: how he thinks about playing, and the composers he plays. "Repertoire" would fit only the second paragraph. "Interpretation" is accurate and narrower than the composer list.

"Experiment" is the kicker for the new film. "Electronics" would match one search term and miss the concert-hall sentence. The paragraph itself contains "electronics", "classical music", and "Royal Danish Academy of Music", which is what a crawler needs; the kicker stays as short as Press and Teaching. Heading id `approach` replaces `biography-2`. The new id is `experiment`.

### 3. His words are a paragraph, not a press quote

The Experiment text is first person, beside the mount, so it uses the existing sheet path (`firstLetter` false). It is not a `Quote`. A pull quote attributed "Kendzsi Tanaka" on his own page would repeat the `h1`.

The visible paragraph is fixed in `specs/artistic-approach/spec.md`. Spelling is corrected ("debut", "of"). The promotional lines about not missing the concert are dropped.

### 4. Press sources are fields on the existing quote objects

Gershwin: `name` "Adam G. Steve", `outlet` "Régiségeknek", `url` the 2018 post without `utm_` parameters. The English sentence on the page stays; the article is in Hungarian and is the source, not a replacement text.

Chopin: `name` "PH Pianos", `outlet` "The Chopin Project", `url` the article. The page has no byline, so the brand is the name. No `Section` change is required for either quote.

### 5. Video record

Add `electronics` to `videos.ts`: id `ZUzsA6tV4Es`, title "Piano and electronics", no `poster`. The accessible name becomes "Play video: Piano and electronics". Same poster-then-iframe behaviour as the other films.

## Risks / Trade-offs

- [English quote, Hungarian source] → The link is the review the sentence comes from. Do not swap in a new translation.
- [Unsigned PH Pianos post] → Brand name as `name` is the attribution that exists. A person can replace it later without a layout change.
- [Host thumbnail request] → Same as the three videos that already lack a local poster. A still under `public/thumbnails/` can be added later without moving the section.
- [Second "Press" heading remains] → Already allowed. This change only removes the second "Biography".

## Migration Plan

Copy and one video id on the existing page. Rollback is reverting `Body.tsx`, `videos.ts`, and `quotes.ts`. No data migration.

When this is applied, mark `conversion-copy-and-contact` task 2.3 done. The sources it asked the owner for are the ones in `specs/press-sources/spec.md`.
