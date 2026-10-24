# Design

## Context

`Slider.tsx` is a measured horizontal strip: `ClientOnly` around the track, a resize listener for `centerOffset`, mouse and touch drag with a `50px` threshold, dots, and arrow keys on the focused section. Prints are `42rem x 22rem` with `object-cover`. The seven photographs are landscape, 1600 px wide, between 3:2 and 4:3 (one is 1600 x 1200, one 1600 x 1000). Captions are a parallel string array indexed with the glob order. See proposal.md for why the strip goes, and `specs/gallery-browse/spec.md` for the requirements.

Constraints carried in from elsewhere:

- `docs/design/motion.md`: `--ease-out`, `--duration-hover` (240ms), `--duration-enter` (800ms), entrances are opacity plus `translateY(20px)`, loops carry `.ambient`, and reduced motion must not be implemented with a global `animation-duration` override.
- `seo-head-and-semantics` (in progress): the section keeps `<section aria-labelledby="gallery">` and its `h2`; gallery images are `loading="lazy"`, under 250 KB, and must not shift layout; gallery `alt` equals the visible caption.
- The page is prerendered (`entry-server.tsx`, `scripts/prerender.mjs`) and hydrated.

## Goals / Non-Goals

**Goals:**

- A pile that renders on the server without measurement, so it needs no `ClientOnly` placeholder.
- One shared index between pile and viewer, so the top print is always the last photograph viewed.
- A grow-from-pile open and shrink-to-pile close that never stretch the image.
- No new runtime dependency.

**Non-Goals:**

- A general lightbox component for other sections (video posters keep their own behaviour).
- Deep links (`#gallery/3`). The history entry carries no photograph index in the URL.
- Pinch zoom inside the viewer. The browser's own page zoom still works.

## Decisions

### Split into a pile, a viewer, and a data module

- `src/data/gallery.ts` exports `{ src, place, description }[]` in the current glob order. `alt` is derived as `` `${description}, ${place}` ``. The typo "compeition" is fixed. Places: Vilnius, Budapest, Nairobi, Nairobi, Copenhagen, Nairobi, Copenhagen.
- `Slider.tsx` becomes the gallery section: it owns `index` and `open`, renders the heading, the pile, and (when open) the viewer. Splitting the pile and the viewer into `GalleryPile.tsx` and `GalleryViewer.tsx` beside it is expected; the file name `Slider.tsx` may stay so `Body.tsx` is untouched.

Alternative: keep everything in `Slider.tsx`. Rejected; the pile and the viewer share only `index`, and the viewer carries most of the gesture code.

### The pile

- A single `<button>` with an accessible name such as "Open gallery, 7 photographs", containing the top four prints (top = `index`, then the following three, wrapping). The label "7 photographs" sits under it.
- Each print is a `.mount` (paper border, `--shadow-mount`) around an image with `aspect-ratio: 3 / 2` and `object-fit: contain` on a paper ground, so 4:3 and 16:10 photographs show whole without stretching. Pile width `min(28rem, 78vw)`. The fixed aspect ratio reserves height, so there is no layout shift.
- Resting rotations around `-3deg` to `+3deg` with small offsets, set per stack position (not per photograph) so the pile looks the same whatever is on top.
- Hover (`@media (hover: hover)`): positions spread to roughly double their rotation and offset, the top print lifts `4px`, over `--duration-hover`.
- Touch (`@media (hover: none)`): a one-shot `IntersectionObserver` (threshold `0.4`) adds a class that plays a single shuffle keyframe, about `900ms`. It is not `.ambient` because it does not loop; it is disabled under reduced motion.
- Images keep `loading="lazy"`, `decoding="async"`, and `alt` from the data module, so the prerendered page still exposes captions as `alt`.

Alternative: render all seven prints in the pile. Rejected; three or four read as "several" and keep the hint small.

### The viewer is a native `<dialog>`

Opened with `showModal()`. This gives top-layer stacking, inert page content, focus containment, and Escape for free. `::backdrop` carries the dark warm ground, a new token near `rgb(30 22 17 / 0.94)` (darkened walnut). While open, `html` gets `overflow: hidden` so the page does not scroll behind it.

The `cancel` event (Escape) is prevented and routed through the same close function as every other close path, so all closes animate the same way.

Layout, top to bottom: a bar with the counter ("3 / 7", label style) and the close button; the photograph, `max-height: ~78vh`, width-bound on portrait screens, `object-fit: contain`; place (small caps, label style) and description (Lato, paper at about 85% opacity); the thumbnail row (seven `3:2` thumbnails about `44px` wide, current at full opacity with a `2px` paper outline, others at about 45%). Nothing is positioned over the photograph. On fine pointers, the left and right halves of the photograph are previous and next targets with a chevron at each edge; on touch, there are no chevrons.

Alternative: a custom overlay `div` plus a focus-trap library. Rejected; it adds a dependency and re-implements what `<dialog>` already does.

### Open and close use the View Transitions API, with a fade fallback

Open calls `document.startViewTransition(() => flushSync(() => setOpen(true)))`. Names (`view-transition-name`) pair elements across the two states:

- The top pile print's image and the viewer's main image share `gallery-photo-<index>`.
- Each other pile print's image shares `gallery-photo-<n>` with thumbnail `n`. Thumbnails whose photograph is not in the pile fade in.
- The pile mount border is not named, so it cross-fades out instead of scaling into a giant paper frame.

Rules that keep the image from stretching or snapping:

- Pile images and viewer images both use the photograph's natural aspect inside a `3:2` box with `contain`, so old and new snapshots have matching proportions. If a stretch still shows, set `object-fit: contain` on `::view-transition-old/new(gallery-photo-*)`.
- Rotation lives on the named element itself, not a parent, so the transition interpolates from tilted to straight.
- The backdrop fades in over about `400ms` and the photograph grows over `600ms` with `--ease-out`, so the photograph rises out of the dark. Other prints into thumbnails start `40ms` apart. Counter, caption, and close fade and rise `20px` from about `350ms`.

Close is the reverse at about `400ms`. Before the snapshot of the closed state, `index` is already the photograph being shown, so the pile re-renders with it on top and the shrink lands on the right print. Focus returns to the pile button.

Without `document.startViewTransition`, or under reduced motion, the dialog and backdrop cross-fade (about `240ms`) and the pile updates in place.

React's `<ViewTransition>` component is not used; it is not in the stable React 19.1 release this project pins.

Alternative: a hand-written FLIP animation. Kept only as a fallback idea if the top-layer spike (see risks) fails; it is more code and harder to keep in sync with the thumbnails.

### Browsing inside the viewer: a three-slot track and pointer events

The viewer renders previous, current, and next photographs in a horizontal track. Pointer events with pointer capture replace the separate mouse and touch handlers.

- After about `10px` of movement, the gesture locks to an axis.
- Horizontal: the track follows the pointer 1:1 with no transition. Release past `50px` commits one photograph in the direction of travel; otherwise it springs back. The commit animates over `600ms` with `--ease-out`.
- Vertical (downward only): the photograph follows the pointer, and the backdrop opacity falls with distance (to about half at `300px`). Release past `100px` closes through the normal close path, so the shrink starts from the dragged position. A shorter drag springs back.
- The photograph area sets `touch-action: none` so the browser does not scroll or navigate during the gesture.
- A click after a drag past the threshold is ignored, as today.
- Index changes wrap with modulo. Keys: ArrowLeft and ArrowRight, Home and End. Thumbnail activation jumps directly without a slide across the photographs in between.

Under reduced motion, commits cross-fade instead of sliding, and drags do not follow the pointer; a release past the threshold still changes the photograph.

### Announcements

A visually hidden `aria-live="polite"` region inside the dialog reads "Photo 3 of 7: Rehearsing Ravel Trio at the Radio, Budapest" on each change. The dialog has `aria-label="Gallery"`. Thumbnails keep the "Show photo N of M" names and `aria-current="true"` that the SEO change set on dots.

### Back button closes the viewer

Opening pushes a history entry (`history.pushState({ gallery: true }, "")`). A `popstate` while open closes the viewer. Closing by any other path calls `history.back()` and lets that `popstate` run the close, so there is one close path and no leftover entry. If the page loads with `{ gallery: true }` already in `history.state` (reload while open), it is replaced on mount and the viewer stays closed.

### Loading

The pile's four images load lazily with the section. Opening preloads the previous and next photographs with `new Image()`, and each change preloads the new neighbours. The existing 1600 px files under the 250 KB budget are used for both the pile and the viewer. No new size variants.

### Docs

- `docs/design/refactor-gallery.md`: rewrite around the pile and the viewer so a later pass does not restore the strip, dots, or `22rem` crop.
- `docs/design/motion.md`: the "Scroll listeners" paragraph still says the gallery fades a veil, and "Done when" still checks gallery dragging. Update both to the viewer.
- `openspec/changes/seo-head-and-semantics/tasks.md` 5.3: change "gallery drag" to "gallery viewer open, swipe, and close".

## Risks / Trade-offs

- [View transitions and a top-layer `<dialog>` interact badly in some engines, for example the dialog flashing above the transition overlay] → Spike this first in Chrome, Safari, and Firefox. If it fails, keep the dialog and animate the grow with FLIP on a cloned image.
- [Engines without the View Transitions API] → The fade fallback is complete on its own; no behaviour depends on the grow.
- [Diagonal swipes trigger the wrong gesture] → Axis lock after `10px`; only downward vertical drags close.
- [History handling double-closes or strands an entry] → One close path driven by `popstate`; test Escape, close button, swipe down, and back in sequence.
- [Hiding six photographs behind a gesture reduces how many visitors see them] → The top print shows whole on the page, the label states the count, and the hover and one-time shuffle advertise the pile.
- [1600 px files look soft on large high-density screens in the viewer] → Accepted for now; adding a larger variant is a later image-pipeline change.
- [Captions now differ from the archived change's "same caption strings" rule] → Intentional; the modified "Same photographs" requirement records it.

## Migration Plan

Ships as one deploy. The old strip, dots, resize listener, and `ClientOnly` wrapper for the gallery are removed in the same change. Rollback is a revert of the change; no data or URLs depend on it.

## Open Questions

- Exact resting and hover angles of the pile, the final darkness of the viewer ground, and the thumbnail stagger. Tune by eye in the browser; none of them change the specs or the structure.
