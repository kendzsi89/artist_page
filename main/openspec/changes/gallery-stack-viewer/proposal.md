# Proposal

## Why

The gallery is a passive strip. A visitor scrolls past it without choosing anything, and the strip crops every 3:2 photograph to about 1.9:1. The page should invite a small gesture, then give the photographs a dark, uncropped room of their own once the visitor asks for it.

## What Changes

- **BREAKING** Retire the on-page carousel (centred print, peeking neighbours, dots, drag on the page).
- On the page, the gallery becomes a neat pile of three or four mounted 3:2 prints with a short "7 photographs" label. A fine pointer resting on the pile fans it out. On touch, the pile shuffles once when it first enters the viewport. The top print is the photograph the visitor last viewed.
- Activating the pile opens a photo viewer. The top print grows out of the pile into the viewer, and the other prints slide into a thumbnail row. Closing reverses it onto the pile.
- The viewer is a dark, warm ground that the visitor opens on purpose. It shows one uncropped photograph at a time with a place line, a caption, a counter, and thumbnails. The page itself still never dims while scrolling.
- Inside the viewer, a visitor moves with a directional slide that follows the finger, the arrow keys, the photo halves, or a thumbnail. Browsing wraps at the ends. Escape, the close button, the browser back button, or a swipe down close it.
- Each caption becomes a place and a shorter description (for example "Budapest" and "Rehearsing Ravel Trio at the Radio"). The "compeition" typo is fixed. Files and order stay.
- Reduced motion turns every transition into a plain cross-fade, with no shuffle. Nothing loops.

Out of scope: new photographs, deep links to a single photograph, and a peel or drag gesture on the pile.

## Capabilities

### New Capabilities

None.

### Modified Capabilities

- `gallery-browse`: the on-page strip is replaced by a pile that opens a viewer; the veil rule is scoped to the page; browsing controls move into the viewer; motion rules cover open, close, and slide; captions gain a place line.

## Impact

- Files: `src/body/Slider.tsx` (rewritten, likely split into the pile and the viewer), the gallery rules in `src/index.css` (`.print`, `.slide`, `.tick`, `.gallery-caption`), the caption data, and `docs/design/refactor-gallery.md`.
- `seo-head-and-semantics` (in progress): gallery `alt` must still equal the visible caption, so `alt` combines description and place. The "Show photo N of M" labels and `aria-current` move from dots to viewer thumbnails. Task 5.3 checks "gallery drag" after hydration and needs to read as "gallery viewer".
- No new dependency. Hero, programme sections, and the Listen room are untouched.
