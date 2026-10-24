# Tasks

## 1. Leave playback

- [x] 1.1 Make `VideoPoster` follow `Section`'s `playing` flag instead of its own, so `playing` false renders the poster and `playing` true renders the iframe. Verify starting a film still mounts the iframe, and setting the flag false removes the iframe and shows the poster button again.
- [x] 1.2 Let a click on the scrim or on the playing section's sheet set `playing` false, and do the same for Escape while that film is playing. A click on the film does not. Verify a click on the dimmed page and a click on the sheet each restore the poster, put the sheet back in front of the still, and remove that section's scrim, and that a click on the film leaves the iframe in place.

## 2. Sheet fade

- [x] 2.1 While a stage is playing, set its sheet to opacity `0.6` and a `4px` blur, transitioning over `--duration-enter` and `--ease-out`. Under reduced motion, set that transition to `none` and keep the existing rule that skips the mount scale. Verify a started film's sheet reports that opacity and blur, and that ending playback returns opacity `1` and no blur.

## 3. Bottom play control

- [x] 3.1 Place the bottom play disc's centre `3rem` from the top of the film. Verify at `1440px` and at `390px`, on both the live-recording Press block and Teaching, that the disc does not intersect the sheet and the gap is at least `2rem`.
- [x] 3.2 Update the playback sentences in `docs/design/refactor-programme.md` so a click away or Escape restores the sheet and clears that film's dim, and the sheet fades while the film plays. Verify those sentences are in the file, and that it does not still say the scrim ignores clicks.

## 4. Check

- [x] 4.1 Start two films, end one, and verify the other stays in front of its sheet with its scrim still up. Emulate `prefers-reduced-motion: reduce`, start a film, and verify the sheet fade has no transition and the mount does not scale. Run `npm run lint`.
