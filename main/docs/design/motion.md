# Motion

Tokens and surfaces from `visual-system.md` come first. This file adds the two motions every later brief uses: a one-shot scroll reveal, and the reduced-motion switch.

Ambient loops (hero ken burns, Spotify pan, player drift) are specified in the section briefs. They all share the reduced-motion rule below.

## Easing and distance

```css
:root {
  --ease-out: cubic-bezier(0.22, 1, 0.36, 1);
  --duration-hover: 240ms;
  --duration-enter: 800ms;
}
```

An entering element starts at `opacity: 0` and `transform: translateY(20px)`, then moves to `opacity: 1` and `transform: none`. It does not also scale, blur, or rotate, except the two cases called out in the briefs:

- Hero photograph: scale only, no fade (the photo is the page).
- Pull-quote mark: scale `0.92` to `1` together with the opacity, no extra translation beyond the parent’s reveal.

Hover lift is `translateY(-4px)` on mounts and `translateY(-3px)` on icon discs, over `--duration-hover`.

## Scroll reveal

Add `src/motion/useReveal.ts`. One observer, one shot.

```ts
import { useEffect, useRef, useState } from "react";

export function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setShown(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return { ref, shown };
}
```

CSS in `src/index.css`:

```css
.reveal {
  opacity: 0;
  transform: translateY(20px);
  transition:
    opacity var(--duration-enter) var(--ease-out),
    transform var(--duration-enter) var(--ease-out);
}

.reveal.is-shown {
  opacity: 1;
  transform: none;
}

.reveal-delay-1 { transition-delay: 90ms; }
.reveal-delay-2 { transition-delay: 180ms; }
.reveal-delay-3 { transition-delay: 270ms; }
```

Usage: `className={shown ? "reveal is-shown" : "reveal"}` on the element that should enter. Put `reveal-delay-*` on its children when a brief asks for stagger. The parent must not also be `overflow: hidden` in a way that clips the shadow during the lift.

The hero does not use this hook. Its entrance is a load animation, specified in `refactor-hero.md`, because it is on screen at first paint. `IntersectionObserver` would fire immediately and skip the intended delay.

## Reduced motion

```css
@media (prefers-reduced-motion: reduce) {
  .reveal {
    opacity: 1;
    transform: none;
    transition: none;
  }

  .ambient {
    animation: none !important;
  }
}
```

Every looping or long camera animation uses the class `ambient` in addition to its animation class, so this query can stop it. Hover transitions may remain; they are short and tied to a pointer.

Do not set `animation-duration: 0.01ms !important` on `*`. The gallery viewer already swaps its slides and view transitions for short fades under reduced motion (see `refactor-gallery.md`); a global override would also break the fades that remain.

## Scroll listeners

There are no scroll listeners. Do not add one for reveals; the observer covers programme, listening room, closing icons, and contact. The gallery uses a one-shot observer for the touch shuffle and never dims the page on scroll.

## Done when

- A programme block below the fold is invisible-then-rising as it enters, and stays put when you scroll away and back.
- With reduced motion emulated, that block is visible immediately, and the hero photograph is still.
- Opening the gallery grows the top print into the viewer and closing shrinks it back onto the pile; with reduced motion emulated, both are plain fades.
