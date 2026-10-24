# Proposal

## Why

The two press testimonies are set in italic Playfair at `text-2xl` / `lg:text-3xl` under a `text-6xl` quotation mark, which is a jump past the rest of the sheet. The mark is clay. The red quotation mark the page used to show is gone, and the design contract is what removed it.

## What Changes

- A sourced pull quote steps down to Playfair italic `text-xl` / `lg:text-2xl`, still larger than body, with the same `1.45` line-height.
- The opening quotation mark returns to signal red (`--highlight`) and steps down from `text-6xl` to `text-4xl`. It stays one Playfair glyph above the words. It still settles from scale `0.92` and opacity `0.4`.
- The design contract changes with the page. Today it requires the large italic, a clay mark, and signal red only on the drop cap, the focus ring, social glyphs, and text-link hover. Those sentences would put this change back.

## Capabilities

### New Capabilities

- `pull-quote-type`: The size of a sourced testimony and the colour and size of its opening quotation mark.

### Modified Capabilities

- None. `openspec/specs/` has no archived capabilities. Quote wording and attribution stay as the unarchived `press-sources` and `press-quotes` deltas already describe them.

## Impact

- `src/body/Section.tsx`: the quote paragraph and the `.quote-mark` classes. Quote strings, attribution, and the sheet do not change.
- `README.md` (Design contract): the type line for pull quotes, the motion line that says the mark is clay, and the Signal row so the quotation mark is an allowed use of `#db2b2b`. Clay stays a token; it is no longer named as the quote-mark colour.
- `docs/design/README.md`, `docs/design/visual-system.md`, and `docs/design/refactor-programme.md`: the same three facts, so a later brief does not restore `text-3xl` or a clay mark.
- Assumption: "the original red quote marks" means the signal-red opening mark, not a pair of quotation icons beside the paragraph. Those icons were retired on purpose, and their paths are not in this repo. The sentence that a pull quote is not a body paragraph with an icon beside it stays.
- Assumption: body, hero, contact, and label sizes are already the contract sizes. This change does not restyle them.
