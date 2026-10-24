# Listening room

Files: `src/body/SpotifySection.tsx`, and the album-introduction `Section` immediately above it in `src/body/Body.tsx`.

This block is the pause in the programme: a sentence on paper, then a photograph with the player mounted in the middle. The photograph moves. The player floats. The sentence does not.

## Album introduction

The `Section` whose paragraph starts “Give a listen to our album…” stays a bare paragraph on `--paper` (no sheet), `firstLetter={false}`, measure `lg:max-w-150`. After `refactor-programme.md` that is already the rule for a paragraph-only section. Confirm it, and add `useReveal` if that brief’s reveal is not already on every `Section`.

Above the sentence, the section label: `<h2 id="listen">Listen</h2>` in label style (Lato, `11px`, `tracking-[0.14em]`, uppercase, `--olive`), with the album sentence and the Spotify stage both inside the same `<section aria-labelledby="listen">`. The label is the only heading here; the sentence remains the introduction. No album title as a display heading.

## Stage

`SpotifySection` is an `80vh` band with `bg-[url('../src/assets/images/celeste-background.jpeg')]`.

Keep the image, the `80vh` height, and the Spotify `link`. Change the presentation:

- `background-size: cover`
- Pan with a class `ambient spotify-pan`:

```css
@keyframes spotify-pan {
  from { background-position: 0% 50%; }
  to { background-position: 100% 50%; }
}

.spotify-pan {
  animation: spotify-pan 24s ease-in-out infinite alternate;
}
```

- A walnut scrim over the photograph so the player separates from the picture: `absolute inset-0`, `background: linear-gradient(to top, rgb(52 38 30 / 0.55), rgb(52 38 30 / 0.25))`, `pointer-events: none`. The embed stays `relative z-10`.

## Player

Wrap the `Spotify` component in a `.mount`:

- Paper mat, `12px` padding, radius `2px`, shadow `--shadow-mount`
- Width: the embed stays `w-4/5` and `lg:w-2/5`, `min-h-115`. Put those width classes on the mount, and let the embed fill the mount (`w-full`).
- The embed’s own `rounded-xl!` can remain inside the mat. The mat is `2px`. Do not fight Spotify’s internal corner with `!important` on our side.

Drift, on the mount, class `ambient`:

```css
@keyframes float-y {
  from { transform: translateY(0); }
  to { transform: translateY(-6px); }
}

.float-y {
  animation: float-y 7s ease-in-out infinite alternate;
}
```

`6px` is the whole travel. No rotation, no scale pulse.

Both `spotify-pan` and `float-y` carry the class `ambient`, so `prefers-reduced-motion` (see `motion.md`) freezes them. The player stays visible and usable.

## Reveal

The mount uses `useReveal` (rise `20px`, `800ms`). The background pan is independent and starts on load. If reduced motion is on, `useReveal` shows the mount immediately and both ambients are off.

## Done when

- A small uppercase "Listen" label sits above the album sentence and is an `<h2>`; the sentence and the Spotify stage share one `<section>` labelled by it.
- The album sentence is body type on paper, no card, same words.
- The photograph behind the player creeps sideways. After you have looked at it for a few seconds the position has changed.
- The player sits on a paper mat with the level-2 shadow and drifts up and down by about `6px`.
- The scrim is dark enough that the mat’s edge reads against the photograph.
- Reduced motion: still photograph, still player, embed still plays.
- The Spotify album link is unchanged (`1EGlTgldbnDa9VkMBnsroS`).
