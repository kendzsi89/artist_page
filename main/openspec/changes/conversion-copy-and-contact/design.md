# Design

## Context

See `proposal.md` — Why. Shaping constraints:

- Single page, no router, no backend. Any "data" is a committed file bundled by Vite.
- `Section` takes `quote` as a bare string; attribution has nowhere to live.
- The hero is visually locked by the design contract (name bottom-left, icons top-right, descriptor and rule under the name). New elements must fit the label style.
- Obfuscated contact strings exist today; the owner has not said whether that was deliberate.
- The page is prerendered after `seo-head-and-semantics`, so anything date-dependent must agree between build time and client time.

## Goals / Non-Goals

**Goals:**

- Every new element is small, label-styled, and sits inside the existing section rhythm.
- Quotes become data with sources; layout no longer hard-codes testimonials.
- Contact works with one tap and is one click from the hero.
- Concerts can be added by editing one JSON file.

**Non-Goals:**

- A press kit download (bio in three lengths, hi-res photos). Worth doing, separate change.
- A contact form. Email and phone are the conversion path.
- A navbar. "Get in touch" is one anchor link, not navigation.
- Rewriting the biography.

## Decisions

### 1. Quotes become a typed array in `src/data/quotes.ts`

```ts
type Quote = { text: string; source?: { name: string; outlet?: string; url?: string } };
```

`Section` accepts `quote?: Quote` instead of `string`. If `source` is absent, `Section` renders the text as a body paragraph (same path as `paragraph`). The two current quotes ship with `source` left undefined until the owner supplies them, so they demote to body text automatically. That is the spec's behaviour, and it is a visible nudge to find the sources.

Alternative: keep strings and add a second `attribution` prop — rejected: easy to forget, and the "no source → not a pull quote" rule would need to live in the caller.

### 2. Descriptor and "Get in touch" are part of the hero name block

Under the `h1`: the drawn rule, then a row with `<p>Pianist</p>` on the left and `<a href="#contact">Get in touch</a>` on the right, both in label style, both entering with the `rise` animation at a later delay than the name. The link uses the signal red only on hover/focus, keeping red reserved.

Alternative: a fixed "contact" button in the corner — rejected: competes with the icons and turns the hero into a landing page.

### 3. Credentials row lives in the first "Biography" section, above the paragraph

A `ul` of three `li`s in label style separated by hairline dots, rendered by a small `Credentials` component passed as a new optional `kicker` slot on `Section`. It sits above the drop-cap paragraph so the drop cap remains the first thing in the text column.

### 5. Upcoming reads `src/data/concerts.json` and filters at render time

`Upcoming.tsx` imports the JSON, validates each entry's required fields, filters `date >= todayISO`, sorts, and returns `null` when empty. Dates compare as `YYYY-MM-DD` strings to avoid timezone drift. Because the page is prerendered, "today" differs between build and client; the component is wrapped in the `ClientOnly` helper from `seo-head-and-semantics` so the server emits nothing and the client decides. The block placement is right after the hero's first quote so dates are high on the page when they exist.

Alternative: build-time filtering only — rejected: a deployed page would show a past concert until the next push.

### 6. Contact strings are plain; obfuscation is an owner switch

`Footer.tsx` renders `<a href="mailto:…">akendzsi@gmail.com</a>` and `<a href="tel:+4550394351">+45 50 39 43 51</a>`. If the owner wants obfuscation back, the agreed approach is to keep the `href` real and only alter the display text through a single `CONTACT` constant in `src/data/contact.ts`; do not reintroduce `(@)` or letter-for-digit swaps in the href.

### 7. Smooth scroll via CSS

`html { scroll-behavior: smooth }` with a `prefers-reduced-motion` override to `auto`. The link handler moves focus to the contact `h2` (`tabIndex={-1}`) after navigation so keyboard users land in the right place.

## Risks / Trade-offs

- [Both current quotes demote to body text until sources exist] → Intentional; the design brief for the programme already positions sheets for quotes, so the first screen below the hero will look emptier. Mitigation: task asks the owner for sources before the change is applied, and the Gershwin quote source is likely findable (it appears to be a review of a concerto performance).
- [Hero gets busier] → Descriptor and link are 11-px labels; the contract's hero brief is updated by `revise-design-guideline` to allow them. Check at 390 px that the name, rule, descriptor, and link fit above the credit line.
- [Owner forgets to update `concerts.json`] → Block hides itself when stale; nothing on the page lies.
- [Phone number formatting] → `+45 50 39 43 51` is the Danish convention; the `tel:` href carries the unformatted E.164 form.

## Migration Plan

Single deploy. No data migration. If the demoted quotes look wrong, the owner can add `source` entries and redeploy without code changes.

## Open Questions

- Sources for the two existing quotes (name and outlet). The change works without them; the quotes just stay as body text.
- Whether the owner wants display-text obfuscation; default is plain.
