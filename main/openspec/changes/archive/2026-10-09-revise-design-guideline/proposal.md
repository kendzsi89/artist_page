# Proposal

## Why

The design contract in `README.md` and the briefs in `docs/design/` were written for one goal: stop the site looking like unstyled HTML. Reviewing them against conversion and SEO showed four places where they actively forbid things the site needs (a descriptor in the hero, section headings, clickable contact details, quote attribution), and `README.md` is listed in `.gitignore`, so the contract never reaches a fresh clone or a cloud agent. The three code changes proposed alongside this one (`seo-head-and-semantics`, `conversion-copy-and-contact`, `signature-moments`) would otherwise contradict the guideline agents are told to follow.

## What Changes

- Remove `README.md` from `.gitignore` so the design contract is versioned with the code.
- Hero brief: replace "do not add a tagline" with a required one-line descriptor in label style (Lato, 11px, uppercase, tracked). Still no second sentence, no scroll indicator.
- Programme and listening-room briefs: replace "do not add a heading" with a required section label rendered as an `<h2>` in the same label style. Visual size unchanged.
- Programme brief: pull quotes require an attribution line (source name and publication or role). A quote without a known source is not shown as a pull quote.
- Contact brief: email and phone are real `mailto:` and `tel:` links. Drop the instruction to preserve the obfuscated display strings; record the obfuscation decision as the owner's call with the default being plain, correct strings.
- Root README: add a **Head and metadata** section (title pattern, description, Open Graph, JSON-LD Person, favicon) and an **Image budget** section (hero as `<img>` with `srcset`, size ceilings, no PNG photographs, alt text from captions).
- Root README: add **Signature moments** to the design contract — video posters with click-to-load, and a hero listening excerpt — so the "wow" work has a home in the guideline rather than being bolted on.
- Root README: fix the visible numbering error in the page-order list (currently "4 main sections" listing six items in the old version; the new version already lists six — keep six).
- `docs/design/README.md`: add the new briefs to the build order and the definition of done (metadata present, image budget met, attribution present, links clickable).

## Capabilities

### New Capabilities

None. This change edits documentation and `.gitignore`. It defines no runtime behaviour; the behaviour lives in the three companion changes.

### Modified Capabilities

None.

## Impact

- Files: `README.md`, `.gitignore`, `docs/design/README.md`, `docs/design/refactor-hero.md`, `docs/design/refactor-programme.md`, `docs/design/refactor-listening-room.md`, `docs/design/refactor-contact.md`, `docs/design/visual-system.md`.
- No source code, no dependencies, no deployment impact.
- Downstream: `seo-head-and-semantics`, `conversion-copy-and-contact`, and `signature-moments` assume the revised guideline. Apply this change first.
