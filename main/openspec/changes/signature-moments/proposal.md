# Proposal

## Why

The design contract in `README.md` makes the page polished — paper, shadows, slow reveals — but those are what every decent site does now. A pianist's site has one thing a visitor cannot get elsewhere: his sound. Today the first screen is silent, and the first sound is three screens down behind a grey YouTube rectangle. Two moments would make the page memorable without changing its layout: the hero lets you hear him in the first five seconds, and the four video embeds become photographs that play on click.

## What Changes

- **Hero listening excerpt.** A small "Listen" control in the hero (label style, next to the descriptor) plays a local audio excerpt (15–45 s, MP3, ≤ 800 KB). The supplied file is a Bartók sonata, about 45 seconds. Visible playing state (a pulsing mark or thin progress line), tap again to stop, stops at the end, respects reduced motion for the pulse. **Assumption**: the owner provides the excerpt; a placeholder path is wired until then and the control hides itself if the file is missing.
- **Video posters.** Each YouTube embed renders as a still photograph with a play mark on the paper mount. The iframe is created only when the poster is clicked, then autoplays. Posters come from `public/thumbnails/` (one exists: `thumbnail_gershwin.jpg`); missing posters fall back to YouTube's `maxresdefault` thumbnail URL.
- Remove the `react-player` dependency; a plain `iframe` with the embed URL replaces it after click.
- Document both moments in the design contract (handled by `revise-design-guideline`).
- Explicitly not included: a scroll-pinned hero or type-over-photo blend. Those edge toward scroll-jacking the contract forbids; revisit only after the two moments above are live.

## Capabilities

### New Capabilities

- `hero-audio-excerpt`: a user-initiated short audio preview in the hero with visible state and stop behaviour.
- `video-posters`: poster-first video embeds that load the third-party player only on demand.

### Modified Capabilities

None (no existing specs).

## Impact

- Files: `src/header/Hero.tsx`, new `src/header/ListenButton.tsx`, new `src/body/VideoPoster.tsx`, `src/body/Section.tsx`, `src/index.css`, `package.json` (remove `react-player`), `public/audio/` (new), `public/thumbnails/`.
- Performance: removes four YouTube iframes from first load (several hundred KB of script and multiple third-party connections). Adds one audio file fetched only on tap (`preload="none"`).
- Depends on `revise-design-guideline` (contract text) and `seo-head-and-semantics` (`ClientOnly`, image budget, prerender). Apply last of the four.
