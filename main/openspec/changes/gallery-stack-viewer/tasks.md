# Tasks

## 1. Caption data

- [x] 1.1 Add `src/data/gallery.ts` exporting `{ src, place, description, alt }[]` in the current `import.meta.glob` order, with places Vilnius, Budapest, Nairobi, Nairobi, Copenhagen, Nairobi, Copenhagen, the trailing "in <place>" removed from each description, "compeition" fixed, and `alt` as `` `${description}, ${place}` ``. Verify `npm run build` passes and entry 2 reads place "Budapest", description "Rehearsing Ravel Trio at the Radio", alt "Rehearsing Ravel Trio at the Radio, Budapest", and entry 6 is the `Kenya_Masterclass` file.

## 2. The pile on the page

- [x] 2.1 Rewrite `src/body/Slider.tsx` as the gallery section that owns `index` (start `0`) and `open`, keeps `<section aria-labelledby="gallery">` and the "Gallery" `h2`, and removes the strip, dots, resize listener, drag handlers, and `ClientOnly` wrapper. Verify `npm run build` and `npm run lint` pass and `Body.tsx` needs no change.
- [x] 2.2 Add `src/body/GalleryPile.tsx`: one `<button aria-label="Open gallery, 7 photographs">` holding the top four prints (from `index`, wrapping) as `.mount` frames around `aspect-ratio: 3 / 2`, `object-fit: contain` images with `loading="lazy"`, `decoding="async"`, and data `alt`, width `min(28rem, 78vw)`, plus a "7 photographs" label under it. Verify in the browser that four prints show as a pile, the first photograph is on top and uncropped, and the 4:3 and 16:10 photographs are not stretched.
- [x] 2.3 Add pile CSS in `src/index.css`: resting rotations about -3deg to +3deg with small offsets per stack position, a hover spread with a `4px` top-print lift over `--duration-hover` under `@media (hover: hover)`, and remove the now-unused `.slide`, `.print`, `.gallery-caption`, and `.tick` rules. Verify by hovering that the prints fan out and settle back, and that `rg "\.tick|\.slide|gallery-caption" src` finds nothing.
- [x] 2.4 Add the one-shot touch shuffle: an `IntersectionObserver` (threshold `0.4`) that adds a class playing a single shuffle keyframe of about `900ms`, only under `(hover: none)` and not under reduced motion. Verify with touch emulation that the pile shuffles once on first scroll into view and not on later scrolls, and that it stays still with reduced motion emulated.
- [x] 2.5 Rewrite the top of `docs/design/refactor-gallery.md` around the pile (files, data module, mounts, aspect box, angles, hover, shuffle), removing the strip, `22rem` crop, dots, and drag rules. Verify `rg -n "22rem|dots|translateX|centerOffset" docs/design/refactor-gallery.md` finds nothing.

## 3. The viewer shell

- [x] 3.1 Add `src/body/GalleryViewer.tsx` as a native `<dialog aria-label="Gallery">` opened with `showModal()` when the pile is activated, showing the current photograph uncropped (`max-height: ~78vh`, `object-fit: contain`), the counter "N / 7", a close button, the place line and description below, and seven thumbnails with "Show photo N of M" names and `aria-current="true"` on the current one; nothing overlaps the photograph. Verify in the browser that clicking the pile and pressing Enter on the focused pile both open it on the top photograph, focus is inside, and the page behind does not respond to clicks.
- [x] 3.2 Style the viewer: a `::backdrop` warm dark ground token near `rgb(30 22 17 / 0.94)`, the place line in the section label style, the description in Lato at paper colour about 85% opacity, thumbnails about `44px` wide at 45% with a `2px` paper outline on the current one, and `overflow: hidden` on `html` while open. Verify at 1440 px and 375 px widths that the photograph, caption, and seven thumbnails fit without overlap and the page does not scroll behind the viewer.
- [x] 3.3 Add a visually hidden `aria-live="polite"` region that announces "Photo N of 7: <alt>" on each change. Verify in the accessibility tree (or VoiceOver) that moving from photo 2 to 3 announces "Photo 3 of 7: Performing Brahms Trio with amazing musicians, Nairobi".
- [x] 3.4 Add a viewer section to `docs/design/refactor-gallery.md` (dialog, ground token, layout, caption type, thumbnails, announcements). Verify the doc names the ground token that `src/index.css` defines.

## 4. Browsing inside the viewer

- [x] 4.1 Add keyboard and click browsing with wrap-around: ArrowLeft and ArrowRight, Home and End, a thumbnail click jumping straight to its photograph, and on fine pointers the left and right halves of the photograph as previous and next with an edge chevron. Verify that ArrowRight on photo 7 shows photo 1, End shows photo 7, clicking the right half shows the next photograph, and touch emulation shows no chevrons.
- [x] 4.2 Add a three-slot (previous, current, next) track driven by pointer events with pointer capture, `touch-action: none` on the photograph area, a `10px` axis lock, 1:1 follow with no transition while dragging, a commit past `50px` that slides one photograph in the direction of travel over `600ms` `--ease-out`, a spring back below it, and ignored clicks after a drag. Verify with touch emulation that a slow drag follows the finger, a release past 50 px slides in the neighbour from the side the finger left, a short drag springs back, and one swipe never advances more than one photograph.
- [x] 4.3 Preload the previous and next photographs with `new Image()` on open and on each change. Verify in the network panel that opening on photo 1 requests photos 2 and 7 before they are shown.
- [x] 4.4 Under reduced motion, make commits cross-fade and stop drags from following the pointer, while a release past the threshold still changes the photograph. Verify with reduced motion emulated that a swipe changes the photograph with a fade and no sliding.
- [x] 4.5 Document browsing (controls, axis lock, thresholds, wrap) in `docs/design/refactor-gallery.md`, and change task 5.3 in `openspec/changes/seo-head-and-semantics/tasks.md` from "gallery drag" to "gallery viewer open, swipe, and close". Verify `rg -n "gallery drag" openspec/changes/seo-head-and-semantics/tasks.md` finds nothing.

## 5. Opening and closing

- [ ] 5.1 Spike: in Chrome, Safari, and Firefox, open and close a `showModal()` dialog inside `document.startViewTransition` with one named image shared between the pile and the dialog. Verify there is no flash of the dialog above the transition overlay; if any engine fails, record the result under Risks in `design.md` and use a FLIP clone for the grow in task 5.2 instead.
- [x] 5.2 Implement the open: `document.startViewTransition(() => flushSync(...))`, `view-transition-name: gallery-photo-<n>` on the top pile print and the viewer photograph, on other pile prints and their thumbnails, rotation on the named element, an unnamed mount that cross-fades, the backdrop over about `400ms` and the photograph over `600ms` `--ease-out`, thumbnails staggered `40ms`, and counter, caption, and close rising `20px` from about `350ms`. Verify in Chrome that the top print grows and straightens from the pile into the viewer without stretching, and the other pile prints fly into their thumbnails.
- [x] 5.3 Implement the close as the reverse in about `400ms`, with the pile re-rendered with the current photograph on top before the closed-state snapshot, and focus returned to the pile button. Verify that closing on photo 5 shrinks it onto the top of the pile, photo 5 is then the top print, and focus is on the pile.
- [x] 5.4 Add the fallback: without `document.startViewTransition`, or under reduced motion, the dialog and backdrop cross-fade over about `240ms` and the pile updates in place. Verify with reduced motion emulated that opening and closing are plain fades with nothing growing.
- [x] 5.5 Update `docs/design/motion.md`: replace the "Scroll listeners" paragraph about the gallery veil, and replace the gallery dragging line under "Done when" with the viewer open and close. Verify `rg -n "veil|Dragging the gallery" docs/design/motion.md` finds nothing.

## 6. Every way to close

- [x] 6.1 Route all closes through one function: the close button, Escape (via a prevented `cancel` event), and `popstate`. Opening pushes `{ gallery: true }` onto history; non-back closes call `history.back()`; a page load that already has `{ gallery: true }` in `history.state` replaces it and stays closed. Verify that Escape, the close button, and the browser back button each close the viewer with the shrink animation, the visitor stays on the page at the gallery, and after each close one back press leaves the page's previous history entry rather than reopening the viewer.
- [x] 6.2 Add swipe down to close on the vertical axis lock: the photograph follows the pointer downward, the backdrop fades to about half at `300px`, a release past `100px` closes through the shared close path from the dragged position, and a shorter drag springs back; upward drags do nothing. Verify with touch emulation that a long swipe down closes onto the pile, a short one springs back, and a diagonal swipe that starts horizontal browses instead of closing.
- [x] 6.3 Document the close paths and history behaviour in `docs/design/refactor-gallery.md`. Verify the doc lists Escape, the close button, back, and swipe down.

## 7. Integration check

- [x] 7.1 Run `npm run build` (including prerender) and `npm run lint`. Verify both pass, `grep -c "Open gallery, 7 photographs" dist/index.html` returns 1, and `npm run preview` shows no hydration warnings in the console.
- [x] 7.2 Walk the `gallery-browse` spec scenarios in the browser at 1440 px and at 375 px with touch emulation, plus once with reduced motion. Verify each scenario passes, the page never dims while scrolling past the gallery, and nothing animates on a loop.
- [x] 7.3 Run `openspec validate gallery-stack-viewer --strict`. Verify it reports the change as valid.

## Workflow follow-up

- Tune the pile angles, viewer ground darkness, and thumbnail stagger by eye.
- Archive the change with `/openspec-archive-change` after review.
