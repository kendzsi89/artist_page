# Design

## Context

See `proposal.md` — Why. Shaping constraints:

- Videos are referenced in `Body.tsx` as full YouTube URLs (`youtu.be/<id>?si=…` and `youtu.be/<id>`). `react-player` currently parses them.
- `public/thumbnails/thumbnail_gershwin.jpg` exists; the other three videos have no local poster.
- Browsers block audio without a user gesture; the excerpt must be tap-to-play.
- The page is prerendered (`seo-head-and-semantics`); audio and iframe logic must be client-side without hydration mismatch.
- The design contract's hero is already carrying name, rule, descriptor, "Get in touch", icons, and credit. The Listen control has to fit as one more label-sized item.

## Goals / Non-Goals

**Goals:**

- Zero third-party requests until a visitor opts in.
- The hero can make sound within one tap.
- No new dependencies; one removed (`react-player`).

**Non-Goals:**

- Background music or autoplay of any kind.
- A full audio player (seek, volume). One excerpt, play/stop.
- Hosting video locally.
- Scroll-pinned hero, blend-mode type, or other scroll-driven set pieces.

## Decisions

### 1. `VideoPoster` replaces `ReactPlayer`; videos become data

Add `src/data/videos.ts`:

```ts
type Video = { id: string; title: string; poster?: string };
```

`Body.tsx` passes `video={videos.gershwin}` objects instead of URL strings. `VideoPoster` renders a `button` wrapping an `img` (poster or `https://i.ytimg.com/vi/<id>/maxresdefault.jpg`) and a play mark; on activation it sets `playing` and renders `<iframe src="https://www.youtube-nocookie.com/embed/<id>?autoplay=1&rel=0" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen title=…>` in the same `aspect-ratio: 16/9` box. `react-player` and its URL parsing go.

Alternative: keep `react-player` with its `light` prop — rejected: still ships the library, and we want control over poster, mount, and accessibility.

### 2. Poster image fallback uses `maxresdefault` with `hqdefault` as a second try

`maxresdefault` does not exist for every video. The `img` has an `onError` that swaps to `hqdefault.jpg` once. Local posters are preferred and processed by the image pipeline from `seo-head-and-semantics` (`scripts/images.mjs` gains a `thumbnails` target at 960 wide).

### 3. The play mark is CSS, not an icon library

A `56px` paper disc (same as the closing social discs) with a walnut triangle drawn via `clip-path`. Hover scales the disc to `1.06` and deepens the mount shadow. Keeps the icon vocabulary consistent and avoids reviving Font Awesome, which is installed but unused.

### 4. `ListenButton` owns a single `HTMLAudioElement`

`ListenButton.tsx` creates the element lazily on first tap (`new Audio(src)`, `preload="none"` semantics by construction), plays, tracks `timeupdate` for a thin progress line under the label, and resets on `ended` or second tap. Before the first tap, a `HEAD` is not sent; instead the component is rendered only if `EXCERPT` in `src/data/audio.ts` is non-null, and if `play()` rejects or `error` fires it unmounts itself. That satisfies "graceful absence" without a preflight request.

Placement: in the hero's label row, after "Pianist" and before "Get in touch" — three label items separated by hairline dots. Label text "Listen" → "Stop" while playing; accessible name includes the piece and duration from `audio.ts`.

Alternative: Web Audio API with a waveform — rejected: more code, same outcome; the thin progress line reads as "playing" just as clearly.

### 5. Pulse under reduced motion

The playing indicator is two parts: a progress line (width transition, informative) and a soft opacity pulse on the disc (decorative, class `ambient`). Reduced motion disables the pulse via the existing `.ambient` rule and keeps the line.

### 6. Client-only boundaries

Both components render deterministic static markup on the server (poster `img` + button; Listen button idle state). State changes only after mount, so no `ClientOnly` wrapper is needed and no hydration mismatch occurs. The `Audio` element is created in an event handler, never during render.

## Risks / Trade-offs

- [Autoplay after click may be blocked on some mobile browsers for the iframe] → The click is a user gesture on the same document; YouTube's embed honours `autoplay=1` in that case. If a device still shows the YouTube play button, that is acceptable: the poster did its job.
- [Excerpt supplied over the original 35 s / 600 KB cap] → The owner asked to keep `public/audio/Bartók-sonata_Kendzsi_Jonas.mp3` as recorded (44.6 s, 768 KB by `du -k`). The budget is 15–45 s and 800 KB. `EXCERPT` points at that file.
- [`maxresdefault` fallback image may be a different crop than the local poster] → Only affects the three videos without local posters until the owner supplies them; `object-cover` keeps the box filled.
- [Hero density at 390 px] → Three label items plus the name must fit above the credit. Task includes an explicit mobile check; if it does not fit, "Listen" wraps to its own line before anything else does.
- [Removing `react-player` changes the `Section` API] → `Section` keeps a `video` prop but of type `Video`; the compiler catches every call site.

## Migration Plan

1. Add `videos.ts`, `VideoPoster`, swap `Section` and `Body`. Verify all four videos play.
2. Remove `react-player` from `package.json`, run `npm install`, build.
3. Add `audio.ts` with `EXCERPT = null`, `ListenButton`, hero row. Verify hidden state.
4. Owner supplies excerpt; set `EXCERPT`; verify play/stop/end.

Rollback: steps 3–4 are independent of 1–2; either can be reverted alone.

## Open Questions

- The piece is the supplied Bartók sonata. No open choice remains.
- Local posters for the three remaining videos. Fallback covers them meanwhile.
