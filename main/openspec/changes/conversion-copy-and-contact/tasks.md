# Tasks

## 1. Data

- [x] 1.1 Create `src/data/quotes.ts` exporting the two existing quotes as `Quote` objects with `source` undefined, and `src/data/contact.ts` exporting `CONTACT = { email, emailDisplay, phoneE164, phoneDisplay }`. Verify `tsc -b` passes and the quote texts match the current strings in `Body.tsx` character for character.
- [x] 1.2 Create `src/data/concerts.json` with an empty array and a `README` comment block in `src/data/concerts.schema.md` documenting the fields and an example entry. Verify the JSON parses and the doc shows one valid example.

## 2. Quotes and attribution

- [x] 2.1 Change `Section`'s `quote` prop to `Quote`, render a `blockquote` with the quotation mark and sheet when `source` exists, and fall back to the body-paragraph path when it does not; render attribution as `— name, outlet` in a `footer`/`cite`, with `outlet` linked when `url` is present. Verify a quote with a source shows the sheet and attribution, and one without renders as plain body text (toggle `source` locally to check both).
- [x] 2.2 Update `Body.tsx` to pass quotes from `src/data/quotes.ts`. Verify the page renders both quotes as body text (no sources yet) and nothing else moved.
- [x] 2.3 Ask the owner for the sources of the Gershwin and live-recording quotes and add them to `quotes.ts` when known. Verify, once added, that both appear as attributed pull quotes.

## 3. Hero positioning

- [x] 3.1 In `Hero.tsx`, add under the rule a label-styled row with `Pianist` and a "Get in touch" anchor to `#contact`, both entering with `rise` at a later delay than the name. Verify at 390 px and 1440 px that the row is within the first viewport and does not overlap the photo credit.
- [x] 3.2 Add `scroll-behavior: smooth` on `html` with a reduced-motion override, give the contact `h2` `id="contact"` (section) and `tabIndex={-1}`, and move focus to it on link activation. Verify clicking the link scrolls to contact, the URL shows `#contact`, focus is on the heading, and with reduced motion emulated the jump is instant.

## 4. Credentials, Engagements, Upcoming

- [x] 4.1 Add an optional `kicker` slot to `Section`, create `Credentials.tsx` (three label-styled items), and pass it to the first biography section above the drop-cap paragraph. Verify the three credentials are discrete `li`s and the drop cap is still the first glyph of the paragraph.
- [x] 4.2 Create `Engagements.tsx` (`h2` "Engagements", four items, sheet treatment) and place it in `Body.tsx` after the teaching section and before the thank-you line; move the extra-curricular paragraph to directly after the teaching paragraph. Verify document order is Teaching → extra-curricular → Engagements → thank-you → icons → Contact.
- [x] 4.3 Create `Upcoming.tsx` reading `concerts.json`, validating fields, filtering `date >= today` as ISO strings, sorting, rendering `time[datetime]` rows, and returning `null` when empty; wrap in `ClientOnly`; place it after the first programme block. Verify with an empty file nothing renders, with one future entry it renders, with a past entry it is filtered, and with a malformed entry the page still renders.

## 5. Contact links

- [x] 5.1 In `Footer.tsx`, replace the `h3` strings with `<a href="mailto:…">` and `<a href="tel:…">` from `CONTACT`, visible text `akendzsi@gmail.com` and `+45 50 39 43 51`, hover colour `--highlight`, focus ring per the visual system. Verify both links open the right apps on a phone and the phone text matches `^\+[\d ]+$`.

## 6. Integration check

- [ ] 6.1 Read the page top to bottom at 390 px and 1440 px. Verify: "Pianist" and "Get in touch" on the first screen; credentials row; quotes rendered per their source state; Upcoming hidden with the empty file; Engagements before Contact; contact links tappable; biography paragraphs unchanged against `git diff` of the strings.
- [x] 6.2 Run `npm run lint` and `npm run build`. Verify both pass and the prerendered `dist/index.html` contains "Pianist", "Engagements", and the `mailto:` href.
