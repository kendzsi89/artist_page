# Tasks

## 1. Stage

- [x] 1.1 In `VideoPoster`, drop the mount's `max-w-[480px]` and let the stage set the width. In `Section`, when `video` is set, put the label in normal flow and the mount plus the sheet in one relative stage (mount behind, sheet in front). Verify at a 1440px viewport that each paired mount is wider than both 480px and its sheet.
- [x] 1.2 Overlap the sheet on the upper part of the mount, at most `36rem` wide, trailing side by default and leading side when `rowReverse` is set. Keep the sheet's bottom edge at least `3.5rem` above the mount's bottom. Verify the sheet's box intersects the mount, the intersection stays out of that bottom band, and the sheet's shadow paints over the photograph.
- [x] 1.3 Below `lg`, keep the overlap (about `4.5rem` into the top of the mount) and keep the mount wider than the sheet. Remove `colReverse` from the first Press section and from `Section` if nothing else passes it. Verify at 390px that the first Press quote still leads, the mount is still behind the sheet, and the two are not a gap-separated stack.
- [x] 1.4 Leave sections with no video on the page ground. Verify Biography has no mount behind the paragraph, and that the hero, the gallery, and the Listen room are unchanged.

## 2. Play target

- [x] 2.1 Place the play disc in the centre of the area the sheet does not cover, above the bottom chrome. Verify at 390px and at 1440px, on all five paired sections, that the disc's box does not intersect the sheet.
- [x] 2.2 Activate one poster and confirm the iframe replaces the still in the same box. Verify the mount's width and height are unchanged, and that the sheet does not intersect the bottom `3.5rem` of the player.

## 3. Contract and check

- [x] 3.1 Update the layout and video-mount sentences in `docs/design/refactor-programme.md` so they describe the stage instead of a 480px row. Verify those sentences no longer cap the mount at 480px or require a side-by-side row for a paired section.
- [x] 3.2 Check the five paired sections at 390px and at 1440px: each film is its own backdrop, each label sits on the page ground outside the mount and the sheet, and `rowReverse` sections (the second Press block and Teaching) overlap the opposite side from the previous paired section. Emulate `prefers-reduced-motion: reduce` and verify the overlap is still visible. Run `npm run lint`.
