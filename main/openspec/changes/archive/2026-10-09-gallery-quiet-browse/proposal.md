# Proposal

## Why

The gallery is a heavy strip: prints are about thirty rem tall, separated by a wide gap, and a black veil dims the whole page while the strip is on screen. A neighbour cannot be chosen with a click, and nothing on the print itself invites the next picture. Browsing should feel closer and quieter.

## What Changes

- Keep the seven photographs, their captions, their order, and one caption under the print that is in front.
- Retire the fixed black veil. The page stays paper.
- One print is forward. The previous and next prints peek in from the sides, closer than today's gap, slightly smaller and slightly dimmer.
- A visitor moves with a click on a peeking print, the arrow keys, a dot, or a horizontal swipe. A swipe still advances one print. While the pointer is down, the strip follows without an easing lag.
- Motion stays small: the existing ease on scale and opacity, a short lift when a fine pointer rests on a peek, and the caption arriving with the print. No ambient loop. Reduced motion still changes prints, without those transitions.
- Dots stay walnut and clay. They do not turn signal red.

Assumption: this is a browse of the same strip, not a lightbox and not a new set of photographs.

## Capabilities

### New Capabilities

- `gallery-browse`: how a visitor moves through the gallery prints, and the motion that invites that move.

### Modified Capabilities

None. There is no archived gallery spec.

## Impact

- Files: `src/body/Slider.tsx`, gallery rules in `src/index.css` (`.print`, `.slide`, `.tick`), and the veil and drag sentences in `docs/design/refactor-gallery.md`.
- Image files, caption strings, and the Gallery heading stay. No new dependency. Hero, programme stages, and the Listen room are untouched.
