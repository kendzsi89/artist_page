# Gallery

File: `src/body/Slider.tsx` only.

The gallery is a short strip of mounted prints. The centred photograph comes forward, the neighbours peek in close, and the caption belongs to the print in front. The page behind the strip stays paper.

## Keep

- Image loading via `import.meta.glob` on `src/assets/slider`.
- The `captions` array, same strings, same order.
- Drag and touch: threshold `50px`, `translateX` follow, index clamped to the ends.
- The track transition `duration-300 ease-out` while not dragging. While `isDragging` is true, drop the transition so the strip follows the pointer 1:1 (today the `300ms` ease fights the drag).
- Centering math: `centerOffset - current * step() + translateX`.
- Click a peeking print, the arrow keys, or a dot to change the index. A drag past `50px` is a swipe, not a click.

## Prints

Each slide is `w-[min(42rem,78vw)]` with a `1.25rem` gap. On top of that:

| State | Scale | Opacity | Shadow |
| --- | --- | --- | --- |
| Active (`i === current`) | `1` | `1` | `--shadow-mount` |
| Inactive | `0.94` | `0.82` | none |

Transition those three over `600ms` with `--ease-out`. Transform origin is center. Apply scale and opacity on the `img`, and the shadow on the slide wrapper, so the caption (below) does not scale. A fine pointer lifts a peeking print `4px`. The front print does not lift.

The image keeps `object-cover`. Height is `22rem`. Radius `2px`.

During drag, do not snap the active style to a neighbour until `handleDragEnd` commits the index. The centred slide is still `current` until the pointer releases. That matches the current index logic.

## Caption

The caption for `i === current` is always visible. Hover can still set `hoveredIndex`, but visibility no longer depends on it.

Place the caption under the image, not over it:

- Lato, `text-sm` / `md:text-base`, colour `--ink`
- `padding-top: 0.75rem`
- Max width of the text `36rem`, aligned to the end on `lg` and centered below `lg` (same alignment intent as the current overlay)
- It occupies flow height. The old `absolute bottom-0 bg-black/60 max-h-10` overlay goes away, including the `max-h-10` clip that was cutting lines.

Inactive slides do not show their captions. One caption at a time, the one in front.

## Dots

The buttons are `w-8 h-2`. Resting colour `rgb(148 114 98 / 0.45)` (clay, partial). Active colour `--walnut`. Transition background-color `240ms`.

No red hover. The global red `button:hover` should already be gone after `visual-system.md`; do not reintroduce a hover fill here. A hover may set the inactive dot to `--clay` at full opacity.

`rounded-none` may stay; these are ticks, not pills.

## Reveal

Do not put `useReveal` on the strip. The scale change and the caption fade are the motion. There is no page veil.

## Done when

- On a desktop width, the centred photo is full size and shadowed; the photos on either side are smaller, dimmer, and flat.
- Moving with a drag or a dot takes about `600ms` for the scale change and `300ms` for the slide. While the pointer is down, the strip follows without easing lag.
- The active caption is readable with the mouse in the page margin, in `--ink` on `--paper`, and it is not sliced by `max-h-10`.
- Dots never turn `#db2b2b`.
- The page behind the gallery stays paper while the strip is on screen.
- Touch drag still changes slides.
