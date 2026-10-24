# Tasks

## 1. Image pipeline

- [x] 1.1 Add `sharp` as a dev dependency and create `scripts/images.mjs` that reads originals from `assets-src/` and writes hero variants (960/1440/1920/2560, progressive JPEG q≈78), `og.jpg` 1200×630, footer and celeste at 1920, and slider images at 1600 wide with the PNG converted to JPEG. Verify `npm run images` runs clean and every output is under the budget in `specs/image-delivery` (`du -k public/images src/assets/slider`).
- [x] 1.2 Move the current originals into `assets-src/`, commit the processed outputs, and delete the unprocessed files (`public/images/hero.jpg`, the slider PNG, the duplicate `src/assets/images/hero.jpg` and `footer.jpeg`). Verify no photograph over 300 KB remains in `public/` or `src/assets/` and `npm run build` succeeds.
- [x] 1.3 Add `assets-src/` handling to `.gitignore` only if the originals exceed a reasonable repo size; otherwise commit them. Verify the decision is written as a comment at the top of `scripts/images.mjs`.

## 2. Hero as a prioritised image

- [x] 2.1 In `Hero.tsx`, replace the background utility with an `<img>` (`srcset`, `sizes="100vw"`, `fetchpriority="high"`, `decoding="async"`, descriptive `alt`) absolutely positioned inside the overflow frame, and move the ken-burns class onto the `img`. Verify the photograph still scales from 1.08 to 1 after load and no horizontal scrollbar appears at 390 px and 1440 px widths.
- [x] 2.2 Add `<link rel="preload" as="image" imagesrcset imagesizes fetchpriority="high">` for the hero in `index.html`. Verify in the network panel that the hero is the first image requested and the selected candidate matches the viewport.
- [x] 2.3 Point `Footer.tsx` at `footer-1920.jpg` with `loading="lazy"` and `decoding="async"`, and `SpotifySection.tsx` at the processed celeste image. Verify neither is requested on initial load before scrolling.

## 3. Semantics and headings

- [x] 3.1 In `App.tsx`, wrap `Hero` in `<header>`, `Body` in `<main>`, `Footer` in `<footer>`. Verify `document.querySelectorAll('header, main, footer').length === 3`.
- [x] 3.2 Add a required `label` prop to `Section` that renders `<h2 id>` in the label style, wrap each section's content in `<section aria-labelledby>`, and pass labels from `Body.tsx` ("Press", "Biography", "Teaching"; the thank-you and album sentences reuse the nearest section rather than adding new labels). Verify the heading outline is one `h1` followed only by `h2`s in order.
- [x] 3.3 Add an `h2` "Gallery" to `Slider.tsx` and "Listen" to the listening-room block; change the contact `h3`s to a paragraph and two links (link targets belong to `conversion-copy-and-contact`; here they may remain text). Verify no `h3` exists on the page.
- [x] 3.4 Set gallery `alt` to the slide caption and add `aria-label="Show photo N of M"` plus `aria-current` on dots; add `aria-label` to every `Icon` link via a new optional `label` prop set from `Icons.tsx` and `BodyIcons.tsx`. Verify no `img` has `alt` matching `Slide N` and every icon link has an accessible name.

## 4. Metadata and crawler files

- [x] 4.1 In `index.html`, set `<title>Kendzsi Tanaka — Pianist</title>`, add a description (default: "Kendzsi Tanaka is a Japanese-Hungarian classical pianist based in Copenhagen. Recordings, performance videos, concert photography, teaching, and contact."), canonical, Open Graph (`og:type` `profile`, `og:image` absolute URL to `/images/og.jpg`), and `twitter:card summary_large_image`. Verify with `curl -s https://localhost-preview | grep -c 'og:'` ≥ 5 on `npm run preview` and the Facebook Sharing Debugger (or an OG checker) shows the image after deploy.
- [x] 4.2 Add a JSON-LD `Person` script (`name`, `jobTitle` "Pianist", `url`, `image`, `sameAs` with the four social URLs from `Icons.tsx`). Verify Google's Rich Results Test or the schema.org validator reports one `Person` with no errors.
- [x] 4.3 Create favicon files (`favicon.ico`, `favicon.svg` monogram "KT" in Playfair on `--walnut`, `apple-touch-icon.png` 180 px) in `public/`, reference them in `index.html`, and delete `vite.svg`. Verify no 404 for `/vite.svg` and the tab shows the monogram.
- [x] 4.4 Add `public/robots.txt` and `public/sitemap.xml` per `specs/page-metadata`. Verify `curl -I` on both returns their own content types, not `text/html`, after `npm run build && npm run preview`.

## 5. Prerender

- [x] 5.1 Add `src/components/ClientOnly.tsx` (renders a sized placeholder until mounted) and wrap `ReactPlayer`, the Spotify embed, and the gallery track in it, preserving box dimensions. Verify the page looks identical before and after mount with no layout jump.
- [x] 5.2 Add `src/entry-server.tsx` exporting `render()` via `renderToString`, switch `main.tsx` to `hydrateRoot`, and add `scripts/prerender.mjs` that injects the markup into `dist/index.html`. Update `build` to `tsc -b && vite build && vite build --ssr src/entry-server.tsx --outDir dist-ssr && node scripts/prerender.mjs`. Verify `grep -c "Born in Hungary" dist/index.html` returns 1 and `dist-ssr` is gitignored.
- [ ] 5.3 Run `npm run preview` with the dev build's hydration warnings visible and load the page. Verify the console shows no hydration mismatch and all interactive parts (gallery drag, embeds) work after hydration.

## 6. Integration check

- [ ] 6.1 Run Lighthouse (mobile) against `npm run preview`. Verify Performance ≥ 85, SEO = 100, Accessibility ≥ 95, CLS < 0.1, and LCP element is the hero `img`.
- [ ] 6.2 After deploy, fetch `https://kendzsi.com/` with `curl` and verify the title, description, OG image URL (resolving 200), JSON-LD, `h1`, and first biography paragraph are present in the raw HTML; verify `/robots.txt` and `/sitemap.xml` content types.
