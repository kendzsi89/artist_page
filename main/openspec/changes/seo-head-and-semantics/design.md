# Design

## Context

See `proposal.md` — Why. Constraints that shape the approach:

- Vite 7, React 19, Tailwind v4, deployed as static files on Cloudflare Pages. No server runtime.
- `index.html` is static and hand-edited; there is no head-management library and no router.
- Gallery images are imported with `import.meta.glob` from `src/assets/slider`, so Vite hashes them. Hero and footer images live in `public/images` and are referenced by URL.
- `ReactPlayer` and `react-spotify-embed` touch `window` on render; they will not render on a server without a guard.
- The design contract requires the hero ken-burns effect, which today relies on the hero being a CSS background on the frame element.

## Goals / Non-Goals

**Goals:**

- Metadata, headings, and body text present in the served HTML.
- Hero as a prioritised, responsive `<img>` with the animation preserved.
- All photographs within the size budget, with a repeatable way to re-process new ones.
- Zero runtime dependencies added; at most one dev dependency.

**Non-Goals:**

- Multi-language or `hreflang`.
- A CMS or dynamic metadata. Everything is static strings in `index.html`.
- Changing the YouTube player (owned by `signature-moments`).
- Analytics or Search Console wiring (owner does this outside the repo).

## Decisions

### 1. Static metadata in `index.html`, not a head library

All `<meta>`, `<link>`, and the JSON-LD block are literal HTML in `index.html`. The page has one URL and one set of metadata; a head library would add a dependency to manage a constant.

Alternative considered: `react-helmet-async` — rejected, adds runtime weight and still needs prerendering to be visible to scrapers.

### 2. Prerender with Vite's own SSR build; hydrate on the client

Add `src/entry-server.tsx` exporting a `render()` that calls `renderToString(<App />)`. Extend `npm run build` to: `vite build` (client) → `vite build --ssr src/entry-server.tsx --outDir dist-ssr` → a small `scripts/prerender.mjs` that loads the SSR bundle, renders the app, and replaces `<div id="root"></div>` in `dist/index.html` with the markup. `main.tsx` switches from `createRoot` to `hydrateRoot`.

Components that cannot render on the server (`ReactPlayer`, Spotify embed, the gallery's measured transforms) are wrapped in a `ClientOnly` component that returns a sized placeholder until mounted. The placeholder keeps the same box dimensions so hydration does not shift layout.

Alternatives considered:
- `vite-plugin-prerender` / puppeteer-based snapshotting — rejected: heavy, slow, flaky in CI.
- `vite-react-ssg` — viable, but it wants to own routing and the entry; more surface than needed for one page.
- No prerender, rely on Google's JS rendering — rejected: link scrapers never run JS, and the proposal's "content without JavaScript" requirement would be unmet.

### 3. Hero as `<img>` inside the overflow frame

The frame `div` keeps `w-screen h-screen overflow-hidden relative`. Inside it, `<img class="absolute inset-0 w-full h-full object-cover kenburns ambient" fetchpriority="high" srcset=... sizes="100vw" alt=...>`. The animation moves to the `img` (transform scale), so the vignette overlays above it are unaffected. `<link rel="preload" as="image" imagesrcset imagesizes>` goes in `index.html`.

Alternative: keep the CSS background and use `image-set()` — rejected: no `fetchpriority`, no `alt`, awkward preload.

### 4. One dev dependency for images: `sharp`, driven by `scripts/images.mjs`

The script reads `assets-src/` (new folder for originals, gitignored or LFS-free but kept small), writes:
- `public/images/hero-{960,1440,1920,2560}.jpg` (quality ~78, progressive)
- `public/images/og.jpg` 1200×630 centre-crop of the hero
- `public/images/footer-1920.jpg`, `src/assets/images/celeste-1920.jpg`
- `src/assets/slider/*.jpg` at 1600 px wide, the PNG screenshot converted to JPEG

Add `"images": "node scripts/images.mjs"` to `package.json`. Outputs are committed so Cloudflare does not need `sharp` at build time; the script is run locally when photos change.

Alternative: one-off manual `sips` conversion — rejected because the next photo would be dropped in unprocessed, which is how the 2.8 MB PNG got there.

### 5. Headings as the design's labels

The `h2` for each section is the small uppercase label the visual system already defines ("Press", "Biography", "Gallery", "Listen", "Teaching", "Contact"). `Section` gains a required `label` prop that renders `<h2 id=…>`; the wrapping `section` uses `aria-labelledby`. The gallery and listening room render their own `h2`. This is how one change satisfies both the design contract and the heading hierarchy.

### 6. Crawler files are plain files in `public/`

Cloudflare Pages serves existing static files before the SPA fallback, so `public/robots.txt` and `public/sitemap.xml` ship with correct content types without configuration.

## Risks / Trade-offs

- [Hydration mismatch from `ClientOnly` placeholders] → Placeholders render identically on server and first client pass; the real component mounts in an effect. Test with React's hydration warnings enabled in dev.
- [`import.meta.glob` in SSR produces hashed URLs that must match the client build] → Both builds run in the same `vite build` invocation set with the same config; verify the rendered `src` attributes resolve in `dist/`.
- [Prerendered gallery markup renders before measurement, so slide transforms are `0`] → Gallery track is inside `ClientOnly`; the server renders the `h2` and the first image as a static placeholder of the same height.
- [Hero `srcset` candidate on a 3× phone could still be 2560 px] → Acceptable: 2560 at ~78 quality is under 450 KB; `sizes="100vw"` is honest. Revisit if LCP > 2.5 s on a mid-range device.
- [Favicon needs an asset that does not exist] → Default to an SVG monogram "KT" in Playfair on `--walnut`; the owner can replace the files later without code changes.
- [Owner-supplied strings (description, OG copy) are not in the repo] → Design provides defaults in tasks; owner edits `index.html` text if they prefer different wording.

## Migration Plan

1. Land image processing first (new files, nothing referenced yet).
2. Switch hero to `<img>` and point gallery/footer at processed files. Verify visually.
3. Add semantics and headings. Verify with an accessibility tree.
4. Add metadata, favicons, crawler files. Verify with `curl`.
5. Add SSR entry, prerender script, `hydrateRoot`, `ClientOnly`. Verify `dist/index.html` contains text and the live page hydrates without warnings.

Rollback: each step is a separate commit; step 5 can be reverted alone by restoring `createRoot` and removing the prerender from the build script.

## Open Questions

- Final favicon artwork (monogram vs. photo crop). Default: monogram.
- Exact description wording. Default provided in tasks; owner may edit.
