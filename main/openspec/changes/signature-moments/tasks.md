# Tasks

## 1. Video posters

- [x] 1.1 Create `src/data/videos.ts` with the four videos (`id`, `title`, optional `poster`), extracting ids from the URLs in `Body.tsx` (`CFD0RGI-iBo`, `Rk6ekMRKa_Q`, `nEvbK84KEUI`, `wGovALom5O0`) and pointing the Gershwin entry at `/thumbnails/thumbnail_gershwin.jpg`. Verify each id opens the intended video at `youtube.com/watch?v=<id>`.
- [x] 1.2 Create `src/body/VideoPoster.tsx`: a `button` ("Play video: <title>") containing the poster `img` (local or `maxresdefault`, `onError` → `hqdefault`, descriptive `alt`, `loading="lazy"`), a CSS play disc, and on activation an `iframe` to `youtube-nocookie.com/embed/<id>?autoplay=1&rel=0` in the same 16:9 box. Verify clicking a poster swaps to a playing iframe, the mount's size is unchanged, and other posters stay images.
- [x] 1.3 Change `Section`'s `video` prop to `Video` and render `VideoPoster` inside the existing `.mount`; update `Body.tsx` call sites. Verify `tsc -b` passes and all four videos play from their posters.
- [x] 1.4 Remove `react-player` from `package.json`, run `npm install`, and delete its import. Verify `npm run build` succeeds, `grep -r react-player src` is empty, and loading the page without clicking shows zero requests to `youtube.com`, `ytimg.com` (other than poster fallbacks), or `googlevideo.com`.
- [x] 1.5 Add `public/thumbnails` to `scripts/images.mjs` at 960 wide, ≤ 250 KB. Verify `npm run images` processes the existing thumbnail within budget.

## 2. Hero listening excerpt

- [x] 2.1 Create `src/data/audio.ts` exporting `EXCERPT: { src, piece, seconds } | null`, initially `null`, with an encoding recipe comment (`ffmpeg -i in.wav -t 25 -c:a aac -b:a 128k public/audio/excerpt.m4a`). Verify `tsc -b` passes.
- [x] 2.2 Create `src/header/ListenButton.tsx`: renders nothing when `EXCERPT` is null; otherwise a `button` (label "Listen", accessible name "Listen: <piece>, <seconds> seconds") that lazily creates an `Audio` on first tap, toggles play/stop, resets on `ended`, shows a progress line from `timeupdate`, pulses the disc with class `ambient`, and unmounts itself if `play()` rejects or `error` fires. Verify with a temporary local file: no audio request before tap, play within a second, label flips to "Stop", second tap stops and resets, natural end resets, Space and Enter toggle.
- [x] 2.3 Add `ListenButton` to the hero label row between "Pianist" and "Get in touch", separated by hairline dots, entering with `rise` at the same delay as the row. Verify at 390 px the name, rule, label row, icons, and credit all fit without overlap; if not, let "Listen" wrap first.
- [x] 2.4 Emulate `prefers-reduced-motion: reduce` and play. Verify the pulse is off, the progress line still moves, and the label still flips.
- [x] 2.5 Owner supplied `public/audio/Bartók-sonata_Kendzsi_Jonas.mp3`. Set `EXCERPT` to that file, piece "Bartók sonata", 45 seconds. Verify duration is 15–45 s and `du -k` is ≤ 800.

## 3. Integration check

- [ ] 3.1 Load the page cold with the network panel open, scroll to the bottom without clicking. Verify no video-host iframes, no audio request, and total transferred bytes are lower than before this change (record both numbers in the task note).
- [x] 3.2 Run `npm run lint`, `npm run build`, and check `dist/index.html` renders posters and the idle Listen button (if `EXCERPT` is set) in the prerendered markup with no hydration warnings on load.
