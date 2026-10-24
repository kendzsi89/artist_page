# Hero

Files: `src/header/Hero.tsx`, `src/header/Icons.tsx`, `src/header/Icon.tsx`.

Read `visual-system.md` and `motion.md` first. The hero is the first impression: a photograph that is still moving, type that settles, icons that sit on paper discs.

## Current state

`Hero` is a full-viewport div with `bg-[url('/images/hero.jpg')]`, a flat `opacity-50` black gradient, and two animations that end within `2s`:

- `animate-[zoomout_2s_ease]` scales from `1.2` to `1` and stops.
- `animate-[appear_2s_ease]` fades the name and the icons, with long stretches at opacity `0`.

The name is `#0a0505` (near-black) in the lower right, which fights the photograph. Icons are raw red SVGs, `w-5`, pinned `top-3 right-5`, with `hover:scale-110` only. The photo credit is a tiny underlined link in the same near-black.

## Target

### Photograph

Keep the image as a CSS background on a full-viewport frame (`w-screen h-screen overflow-hidden`). Replace `zoomout` with a class `ambient kenburns`:

```css
@keyframes kenburns {
  from { transform: scale(1.08); }
  to { transform: scale(1); }
}

.kenburns {
  animation: kenburns 22s var(--ease-out) forwards;
}
```

`22s`, once, no loop. After it rests, the picture is still. It does not zoom back in.

The overlay is a vignette, not a flat 50% black wash. Two layers inside the frame, both `absolute inset-0 pointer-events-none`:

1. `bg-gradient-to-t from-(--walnut) via-transparent to-transparent`, opacity `0.72`. This protects the name at the bottom.
2. A radial vignette: `background: radial-gradient(ellipse at center, transparent 40%, rgb(52 38 30 / 0.45) 100%)`.

Delete the `from-black via-black to-transparent opacity-50` overlay.

### Name

Playfair, `--paper-raised`, `text-5xl` up to `lg:text-7xl`, `leading-[0.95]`, `tracking-[-0.02em]`. Keep the line break between Kendzsi and Tanaka.

Place the block on the bottom left with padding about `8vw` from the left and `12vh` from the bottom, on top of the dark end of the gradient. The current `text-[#0a0505]` and `bottom-30` / `lg:bottom-50` placement goes away.

Under the name, a `.rule` (see `visual-system.md`) that draws on load:

```css
@keyframes draw-rule {
  from { transform: scaleX(0); }
  to { transform: scaleX(1); }
}

.rule-draw {
  animation: draw-rule 700ms var(--ease-out) 500ms both;
}
```

The name itself uses a load enter, not `useReveal`:

```css
@keyframes rise {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: none; }
}

.rise {
  animation: rise var(--duration-enter) var(--ease-out) 200ms both;
}
```

### Descriptor row

Under the rule, one row in label style (Lato, `11px`, uppercase, `tracking-[0.14em]`), colour `rgb(250 247 242 / 0.8)`. It is required: the word "Pianist" must be on the first screen for anyone who does not know the name, and for search engines.

- Left: `<p>Pianist</p>`.
- Right: `<a href="#contact">Get in touch</a>`, same style, no underline at rest, underline and `--highlight` colour on hover and focus.
- Items are separated by a hairline dot (`·`) in `--clay` at 60% opacity when they sit on one line; below `md` they may stack with `gap-2`.
- Enters with `rise` at a `450ms` delay, after the rule has started drawing.
- When `signature-moments` is applied, the "Listen" control sits in this row between "Pianist" and "Get in touch". Leave room for it: do not pin either item to the viewport edge.

This is the only extra copy the hero carries. Still no second sentence, no role list, no scroll indicator.

### Icons

In `Icon.tsx`, add an optional disc via the existing `aStyles` prop rather than a new boolean API. From `Icons.tsx`, pass classes for a `40px` circle, paper at 88% opacity, `.sheet` shadow, grid centering, and:

`transition-transform duration-240 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-[3px]`

Keep `fill-(--highlight)` on the svg. Size the svg at `w-4`, not `w-5`, so the glyph sits inside the disc with even padding.

Stagger the four links with `rise` and delays `300ms`, `390ms`, `480ms`, `570ms`. A modifier class per delay is fine; do not add a library.

Position: top right, `top-6 right-6` on small screens and `lg:right-10`, `gap-3`. They stay above the vignette (`z-20`).

### Photo credit

Keep the wording and the link to `https://www.schlichtkrull.com`. Style it as a label: Lato, `11px`, uppercase, tracking `0.14em`, colour `rgb(250 247 242 / 0.8)`, no underline except on hover (`text-decoration-color: var(--highlight)`). Park it at the bottom right, `1rem` from the edges, so it no longer collides with the name.

## Do not

- Add anything to the hero beyond the name, rule, descriptor row, icons, and credit. No sentence-length tagline, no scroll indicator.
- Loop the ken burns.
- Put the name in `--ink` or `--highlight`.
- Scale the whole hero on hover.

## Done when

- Three seconds after load, the photograph is still scaling down. At about twenty seconds it has settled at scale `1`.
- The name is light on the darkened lower part of the portrait and remains readable. The rule is full width (`4.5rem`) and started drawing after the name began to rise.
- "Pianist" and "Get in touch" are visible under the rule, in label style, within the first viewport at both 390 px and 1440 px wide. "Get in touch" scrolls to the contact section.
- Each icon is a paper disc with a red glyph. Hover lifts the disc `3px` and deepens the shadow. The glyph does not turn into a red rectangle.
- With reduced motion, the photograph is scale `1` immediately (`.ambient` is disabled), and the name and icons are visible without waiting on `rise`.
- The credit link still opens Agnete Schlichtkrull in a new tab.
