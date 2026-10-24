# Design

## Context

`public/favicon.svg` is a walnut rectangle (`#34261e`) with two Playfair outline paths, labelled "KT". `index.html` also links `/favicon.ico` and `/apple-touch-icon.png`. Those two files are not in `public/`. See the proposal for why the mark should be one K. Requirements are in `specs/favicon-mark/spec.md`.

`sharp` is already a dependency. No favicon generator script exists.

## Goals / Non-Goals

**Goals:**

- One drawn K, then the ico and the Apple icon rasterized from that SVG.

**Non-Goals:**

- A new typeface, a photo crop, or a change to the Open Graph image.
- Editing the completed `seo-head-and-semantics` task that recorded the old monogram.

## Decisions

### Draw the K, do not set it in a font

Replace `favicon.svg` with a square view box. A full-bleed rect is walnut. The K is one filled path in paper: a vertical stem and two diagonals, with enough thickness to survive 16 px, and inset so it does not touch the edge. `aria-label` is "K".

Do not use a `<text>` element. A favicon SVG that points at Playfair or a system font does not render the same in every browser, and Playfair's serifs are the thing that fails at this size.

Alternative: keep the Playfair trace and delete the T. Rejected. The request does not require Playfair, and a single Playfair K is still a hairline at tab size.

### Rasterize with sharp, no new dependency

Render the SVG with `sharp` to a 180 px PNG for `apple-touch-icon.png` and a 32 px PNG for the ico. Wrap that 32 px PNG in an ICO file that embeds the PNG. `sharp` does not write ICO; the wrapper is a few dozen bytes of header, not a package.

`index.html` links stay. The contract sentence in `README.md` changes from a "KT" monogram in Playfair to a letter K on walnut. Leave `docs/design/motion.md` and the programme briefs alone. They do not describe the icon.

## Risks / Trade-offs

- [A geometric K feels less like the display face] → It is a 16 px mark. The page type stays Playfair.
- [Browsers cache the old icon] → The files change at the same URLs. A hard reload is the check, not a new filename.

## Open Questions

None.
