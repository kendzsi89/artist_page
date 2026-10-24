# Proposal

## Why

The page gives a presenter, chamber partner, student, or journalist nothing to act on in the first ten seconds: the word "pianist" does not appear on the first screen, credentials are buried in a first-person paragraph, both press quotes are unattributed, there is no list of what the artist offers, and the contact details are non-clickable obfuscated text seven screens down with no path to them. The visuals can be perfect and the site will still not convert.

## What Changes

- Hero: add a one-line descriptor ("Pianist") under the name in label style, and a small "Get in touch" link that scrolls to the contact section.
- Hero or first programme block: add a credentials line — Royal Academy of Music London, Royal Danish Academy of Music Copenhagen, 2nd Prize Vilnius International Piano Competition — as a short label row, not prose.
- Press quotes: each pull quote shows a source (name, publication or role). Quotes with no known source are displayed as body text, not as pull quotes. **Assumption**: the owner can supply sources for the two existing quotes; until then the Gershwin quote and the live-recording quote render as body paragraphs.
- Add a compact "Engagements" block listing what the artist offers: solo recital, chamber music, masterclass, piano tuition. Four items, one line each, no prices.
- Add an optional "Upcoming" block driven by a static `src/data/concerts.json` (date, city, venue, programme, link). The block is hidden when the file has no future dates. **Assumption**: the owner maintains the file by editing and pushing.
- Contact: email and phone become `mailto:` and `tel:` links with plain, correct visible strings. Obfuscation is dropped by default (see design for the owner-controlled alternative).
- Move the extra-curricular paragraph (skincare, woodworking, cooking) so it sits after the teaching paragraph but before the thank-you line, and keep the social links and Engagements as the last things before Contact.
- Share preview copy (`og:description`) in `seo-head-and-semantics` reuses the descriptor and credentials wording from this change.

## Capabilities

### New Capabilities

- `artist-positioning`: how the page states who the artist is, their credentials, and what they offer, above the fold and in a scannable form.
- `press-quotes`: how testimonials are displayed and attributed.
- `contact-reachability`: how a visitor finds and uses the contact details from anywhere on the page.
- `concert-listing`: how upcoming engagements are sourced from a static file and shown or hidden.

### Modified Capabilities

None (no existing specs).

## Impact

- Files: `src/header/Hero.tsx`, `src/body/Body.tsx`, `src/body/Section.tsx`, new `src/body/Engagements.tsx`, new `src/body/Upcoming.tsx`, new `src/data/concerts.json`, `src/footer/Footer.tsx`.
- Copy: adds a descriptor, a credentials row, four engagement lines, and attribution lines. Does not rewrite the biography. Needs the owner to confirm quote sources.
- Depends on `revise-design-guideline` (allows descriptor, headings, links) and `seo-head-and-semantics` (section labels and landmarks exist). Apply after both.
