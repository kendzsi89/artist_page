# Tasks

## 1. Press sources

- [x] 1.1 In `src/data/quotes.ts`, set `gershwinQuote.source` to `{ name: "Adam G. Steve", outlet: "Régiségeknek", url: "https://regisegeknek.blog.hu/2018/06/24/egy_japan-magyar_zongorista_igeretes_palyakezdese" }` and `liveRecordingQuote.source` to `{ name: "PH Pianos", outlet: "The Chopin Project", url: "https://phpianosphfurniture.com/blogs/news/the-chopin-project-part-1-of-2" }`. Leave both `text` strings unchanged. Verify each renders as a `blockquote` with an em dash, the name, and an outlet link (`target="_blank"`, `rel="noopener noreferrer"`) whose `href` has no `utm_`.
- [x] 1.2 Mark task 2.3 in `openspec/changes/conversion-copy-and-contact/tasks.md` done. Verify that checkbox is `[x]` and that this change did not add a second quote renderer.

## 2. Approach and Experiment

- [x] 2.1 In `src/data/videos.ts`, add `electronics` with id `ZUzsA6tV4Es`, title `Piano and electronics`, and no `poster`. Verify `tsc -b` passes and the other four ids are unchanged.
- [x] 2.2 In `src/body/Body.tsx`, change the section `id="biography-2"` to label `Approach` and id `approach`. Do not change its paragraphs, `rowReverse`, `firstLetter={false}`, or video `videos.performance`. Verify the visible text still begins "Music for me is the purest form of communication" and the poster is still video `nEvbK84KEUI`.
- [x] 2.3 Immediately after that section and before the Listen `section`, add a `Section` with label `Experiment`, id `experiment`, video `videos.electronics`, `firstLetter={false}`, and the single paragraph specified in `specs/artistic-approach/spec.md`. Do not set `rowReverse`. Verify heading order is Approach, Experiment, Listen; the paragraph matches the spec; "30 November" is absent; and the control's accessible name is "Play video: Piano and electronics".

## 3. Integration

- [x] 3.1 Load the page and read the heading outline. Verify one `h1`, one "Biography" (the life story), one "Approach", one "Experiment" directly before "Listen", and no iframe whose `src` contains `ZUzsA6tV4Es` until that poster is activated.
- [x] 3.2 Run `npm run lint`. Verify it exits 0.

## Workflow follow-up

- Archive this change after review, then archive or finish `conversion-copy-and-contact` so the press-quote behaviour and these sources land in the main specs together.
- Do not wire the hero excerpt from this change. That file is owned by `signature-moments`.
