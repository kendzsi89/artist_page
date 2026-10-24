# Gallery

Files: `src/body/Slider.tsx` (section, shared state, open and close), `src/body/GalleryPile.tsx`, `src/body/GalleryViewer.tsx`, `src/data/gallery.ts`, and the gallery rules in `src/index.css`.

On the page the gallery is a small pile of mounted prints. Activating it opens a dark viewer that shows one photograph at a time. The page itself never dims; only the viewer the visitor opened is dark.

## Data

`src/data/gallery.ts` loads the photographs with `import.meta.glob` on `src/assets/slider` and pairs them, in glob order, with a place and a description. `alt` is `` `${description}, ${place}` `` and is used on every image of that photograph. Keep the files, the order, and the place/description pairs together; a new photograph needs both.

`pileDepth` (4) and `photoName(index)` (`gallery-photo-<index>`) live there too, because the pile and the viewer both rely on them.

## Pile

- One `<button aria-label="Open gallery, 7 photographs">` holding the top four prints. The top print is the shared `index`, the others follow it, wrapping. The label "7 photographs" sits under the button.
- Each print is a `.pile-print`: `--paper-raised` mat of `10px`, `--shadow-sheet` (the top print `--shadow-mount`), radius `2px`. The image is `aspect-ratio: 3 / 2` with `object-fit: contain`, so the 4:3 and 16:10 photographs show whole on the mat. Width `min(28rem, 78vw)`; the aspect ratio reserves height, so there is no layout shift.
- Position, not photograph, sets the angle. Each `data-pos` defines `--rest` (about -3deg to +3deg with small offsets) and `--spread` (roughly double). Under `@media (hover: hover)`, hover or `:focus-visible` on the button moves every print to `--spread`, and the top print rises `4px`, over `--duration-hover`.
- On `(hover: none)`, a one-shot `IntersectionObserver` (threshold `0.4`) adds `.is-shuffling` the first time the pile enters the viewport. That plays `pile-shuffle` once (`900ms`, rest to spread to rest). It never repeats and does not run under reduced motion.
- The pile renders on the server. There is no `ClientOnly` wrapper and no measuring.

## Viewer

- A native `<dialog aria-label="Gallery">` opened with `showModal()`, which gives the top layer, an inert page, and focus containment. While it is open, `html` has `overflow: hidden`.
- Its contents mount only while open, so gesture state starts fresh each time and the prerendered page carries no hidden duplicate images.
- The ground is a `.viewer-ground` layer filling the dialog with `--viewer-ground` (`rgb(30 22 17 / 0.96)`, darkened walnut). `::backdrop` stays transparent so the ground can fade during a swipe down.
- Layout, top to bottom: the counter ("3 / 7") and the close button; the stage; the place line and the description; the thumbnails. Nothing sits on top of the photograph.
- The photograph is `width: min(100cqw - 2.5rem, 72rem, 150cqh)` with `aspect-ratio: 3 / 2` and `object-fit: contain`, sized against the stage container.
- Type on the dark ground: the counter and place use the section label style in paper at 60%; the description is Lato `1rem` in paper at 85%.
- Thumbnails: seven `3:2` images, `min(44px, (100vw - 5rem) / 7)` wide so all seven fit a 375px screen. They sit at 45% opacity; the current one is full opacity with a `2px` paper outline. Each is labelled "Show photo N of M", and the current one has `aria-current="true"`.
- A visually hidden `aria-live="polite"` line reads "Photo N of 7: <alt>" on each change.

## Browsing

- Keys: ArrowLeft and ArrowRight, Home and End. Fine pointers also get the left and right halves of the stage as previous and next buttons, each with a chevron at the edge; they are hidden on `(hover: none)`. A thumbnail jumps straight to its photograph.
- Browsing wraps: next from 7 is 1, previous from 1 is 7.
- The stage is a three-slot track (previous, current, next), keyed by photograph. The shared `index` moves to the target as soon as a move starts, and the slot showing `index` carries the view-transition name. A close during a slide therefore shrinks the photograph the visitor is moving to.
- Pointer events, with capture taken only once a gesture locks to an axis (`10px`). `touch-action: none` on the stage.
- Horizontal: the track follows the pointer 1:1 with no transition. Past `50px`, release slides one photograph in the direction of travel over `600ms` `--ease-out`; otherwise it springs back. A click that ends a drag is ignored.
- Reduced motion: the track does not follow the pointer and nothing slides. A release past the threshold still changes the photograph, and the new photograph fades in over `240ms`.

## Opening and closing

- Open runs `document.startViewTransition`, with `flushSync` setting `open`. It then waits up to `300ms` for the viewer photograph to decode before the new snapshot.
- The top pile image and the viewer photograph share `gallery-photo-<index>`. The other pile images share their names with their thumbnails, and those thumbnails fly in staggered `40ms` by pile position (a `<style>` block in `Slider.tsx`). The paper mats are unnamed, so they fade with the page instead of scaling.
- The page and the dark ground cross-fade over `400ms` while the photograph grows over `600ms`. The counter and caption rise `20px` from `350ms`.
- Close is the same transition in reverse (groups `400ms`, page `300ms`). The pile always renders the current photograph on top, so the shrink lands on it. Focus returns to the pile button.
- `html[data-gallery-vt="open" | "close"]` is set only while a transition runs and scopes those durations.
- Without `document.startViewTransition`, or under reduced motion, the dialog fades in (`.is-fading-in`) and out (`.is-fading-out`) over `240ms`.

## Closing paths

All of them end in the same close function in `Slider.tsx`.

- **Escape**: handled on the viewer's keydown; the dialog's `cancel` event is also prevented and routed there.
- **Close button.**
- **Browser back**: opening pushes `{ gallery: true }`. A `popstate` while open closes the viewer, and every other path calls `history.back()` so no entry is left behind. A page that loads with `{ gallery: true }` already in `history.state` replaces it and stays closed.
- **Swipe down**: on the vertical axis, the photograph follows the pointer down and the ground fades to half at `300px`. Releasing past `100px` closes from the dragged position; a shorter drag springs back. Upward drags do nothing.

## Done when

- The pile shows four prints with the last viewed photograph on top, uncropped, and fans out on hover.
- Opening grows the top print into the viewer without stretching. Closing shrinks the current photograph back onto the pile.
- Every browse and close path above works at 1440px and at 375px with touch, and degrades to fades under reduced motion.
- The page behind the gallery stays paper while scrolling; nothing loops.
