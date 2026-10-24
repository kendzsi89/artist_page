# Proposal

## Why

The tab icon is a "KT" monogram traced from Playfair. At favicon size the two letters and the hairline serifs do not read. The mark should be a single K, and it does not need to be Playfair.

## What Changes

- `favicon.svg` becomes one capital K on the walnut ground, in paper. The letter is a simple drawn mark, not a Playfair outline.
- `favicon.ico` and `apple-touch-icon.png` are the same K. `index.html` already requests both, and neither file is in `public/` today, so the tab and the home-screen icon would not match the SVG.
- The design contract sentence that calls the icon a "KT" monogram in Playfair changes with the file.

## Capabilities

### New Capabilities

- `favicon-mark`: The favicon artwork is a single letter K, shared by the SVG, the ico, and the Apple touch icon.

### Modified Capabilities

- None. `openspec/specs/` has no archived capabilities. The unarchived `page-metadata` requirement still only says the icon comes from the artist's identity and is not the Vite logo. A K still meets that. This change names the glyph.

## Impact

- `public/favicon.svg`, plus new `public/favicon.ico` and `public/apple-touch-icon.png`.
- `README.md` Head and metadata: the favicon sentence. Do not rewrite the completed `seo-head-and-semantics` task that recorded the old monogram.
- `index.html` icon links stay as they are.
- Assumption: the K is drawn as strokes, not set in Playfair. Playfair's thin serifs disappear at 16px, and the request does not require that face.
- Assumption: the tile stays walnut (`#34261e`) and the letter stays paper (`#faf7f2`), the colours already on the current icon.
