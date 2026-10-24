# Tasks

## 1. Mark

- [ ] 1.1 Replace `public/favicon.svg` with a square walnut tile and one drawn capital K in paper. Do not use a font, and do not keep the KT paths. Verify the file's label is "K", the ground is `#34261e`, the letter is `#faf7f2`, and the text KT is gone.

## 2. Set and contract

- [ ] 2.1 Render that SVG with `sharp` to `public/apple-touch-icon.png` at 180 px and to a 32 px PNG wrapped as `public/favicon.ico`. Verify both files exist, the PNG is 180×180, and a request for each of `/favicon.svg`, `/favicon.ico`, and `/apple-touch-icon.png` returns 200 with an image content type.
- [ ] 2.2 Update the favicon sentence in `README.md` so it describes a letter K and does not require a "KT" monogram or Playfair. Verify that sentence and that `index.html` still links the same three icon paths.
