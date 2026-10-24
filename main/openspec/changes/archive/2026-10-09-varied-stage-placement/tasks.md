# Tasks

## 1. Placement

- [x] 1.1 Replace `rowReverse` with a `place` prop (`top-end`, `top-start`, `side-start`, `side-end`, `bottom`) and set Press, the live-recording Press, Approach, Experiment, and Teaching to those values in that order. Verify `rowReverse` is gone from `Section` and `Body`, and each paired section root carries its place class.
- [x] 1.2 Keep `top-end` and `top-start` as the current top tuck (`4.5rem` below `lg`, `8rem` from `lg`), trailing and leading. Verify at 1440px that the first Press sheet is on the top trailing side, the Experiment sheet is on the top leading side, both overlap the film, and the film is wider than the sheet.
- [x] 1.3 From `lg`, put `side-start` and `side-end` in the same grid cell as the film: sheet at most `36rem` and about 46% wide, vertically centred on the named side, bottom edge at least `3.5rem` above the mount. Below `lg`, those two plus the first Press block keep a top overlap. Verify at 1440px that the live-recording sheet is on the left and Approach is on the right, and at 390px that the first Press sheet still overlaps the top and is not a gap-separated stack.
- [x] 1.4 Place Teaching on the bottom: from `lg`, centred, bottom edge `3.5rem` above the mount; below `lg`, under the film and overlapping the lower edge by `4.5rem`. Verify at 1440px and at 390px that the Teaching sheet overlaps the lower part of the film and is not on the top edge.

## 2. Play target

- [x] 2.1 Move the play disc into the open area: lower area for top placements, the opposite half for side placements, the upper third for Teaching. Verify at 390px and at 1440px that the disc box does not intersect the sheet on all five sections.
- [x] 2.2 Before play, at 1440px, verify the sheet does not intersect the bottom `3.5rem` of a top or side film. Start one film and verify the mount's layout width and height are unchanged, the mount is painted in front of its sheet, and the rest of the page is dimmer while that film plays. Emulate `prefers-reduced-motion: reduce`, start another film, and verify it does not scale and is still in front of its sheet with the dim in place.

## 3. Labels

- [x] 3.1 Move each paired section's `h2` to immediately above its sheet, inside the copy stack, so it follows that sheet's place. Leave the Biography heading in its current text column. Verify at 1440px that Press, Approach, Experiment, and Teaching headings sit on their sheets and not on the page ground above the stage, and that Biography's heading has not moved.

## 4. Contract and check

- [x] 4.1 Update the placement and label sentences in `docs/design/refactor-programme.md` so they name the five places, put paired labels on the sheet, and describe the playing film stepping forward. Verify the file no longer says `rowReverse` chooses the side for every paired section or that every programme label sits above the whole stage.
- [x] 4.2 Check the five sections at 390px and at 1440px against the placement list, including Experiment staying top-left and Teaching on the bottom. Run `npm run lint`.
