# Design

## Context

A sourced quote in `Section.tsx` is a `blockquote.sheet`. The words are Playfair italic `text-2xl` / `lg:text-3xl`. Above them, `.quote-mark` is a Playfair `“` at `text-6xl` in `--clay`. `.quote-mark` already fades from opacity `0.4` and scale `0.92` to rest when its parent `.reveal` is shown. See the proposal for why that reads as too big, and why the mark is the wrong colour. Requirements are in `specs/pull-quote-type/spec.md`.

The root `README.md` Design contract, `docs/design/README.md`, `docs/design/visual-system.md`, and `docs/design/refactor-programme.md` all require that clay mark and the larger italic. `docs/design/README.md` also says `#db2b2b` stays off everything except the drop cap, the focus ring, social glyphs, and text-link hover.

## Goals / Non-Goals

**Goals:**

- One class change on the quote and one on the mark, then the four contract files say the same thing.

**Non-Goals:**

- New quotation-mark artwork, or icons beside the paragraph.
- Restyling body, hero, contact, or labels.
- Changing quote strings or attribution.

## Decisions

### Step the italic down one size

Replace `text-2xl` / `lg:text-3xl` with `text-xl` / `lg:text-2xl`. Leading stays `leading-[1.45]`. Italic, Playfair, and `--ink` stay.

That is the same step the contract already uses for contact details, so a testimony and a contact line share a size, and both stay above body (`text-base` / `lg:text-lg`).

Alternative: drop the quote to body size. Rejected. The contract's point that a pull quote is larger than a paragraph still holds. The problem is the two-step jump, not the italic.

### Recolour the mark that is already there

Change the mark from `text-(--clay)` and `text-6xl` to `text-(--highlight)` and `text-4xl`. Leave the glyph, the `aria-hidden` paragraph, and the `.quote-mark` settle animation.

`text-6xl` is `3.75rem`, the same size as the drop cap, which would still tower over a `text-xl` quote. `text-4xl` (`2.25rem`) stays a mark, not a headline.

Alternative: put two red `Icon` paths back beside the paragraph. Rejected. Those paths are not in the repo, and the contract's line that a pull quote is not a paragraph with an icon beside it stays true.

### Change the contract in the same change

Update only the sentences that name the quote size or the mark colour:

- `README.md`: pull quotes are `text-xl` / `lg:text-2xl`. The motion item says the mark is signal red, not clay. The Signal row includes the pull-quote mark. The Clay row no longer says "quote-mark colour".
- `docs/design/README.md`: the shared `#db2b2b` list includes the pull-quote mark.
- `docs/design/visual-system.md`: the type-scale row, and the sentence that lists where signal red may appear.
- `docs/design/refactor-programme.md`: the pull-quote size, the mark colour and size, and the done-when line that says the mark is clay.

Do not rewrite the historical "Current state" paragraph in the programme brief. It describes the page before this system.

`docs/design/motion.md` describes the settle and does not name clay or a size. Leave it.

## Risks / Trade-offs

- [Red on a paper sheet reads louder than clay] → It is one glyph at `text-4xl`, the same token as the drop cap, not a filled button.
- [A later brief restores `text-3xl`] → The four contract files change in this same change, and the spec checks them.

## Open Questions

None.
