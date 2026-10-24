# Proposal

## Why

The live page at `kendzsi.com` ships a `<head>` containing only a title, a Vite favicon, and font links. No description, no Open Graph image, no structured data: a shared link shows a bare URL, search engines have nothing beyond the name, and the content is only reachable after JavaScript runs. The hero photograph is a 3.3 MB, 4000-px CSS background, the gallery includes a 2.8 MB PNG screenshot, and every element is a `<div>` with `alt="Slide 1"` on the photographs. The site already ranks first for the artist's name; the gap is link previews, descriptive queries ("pianist Copenhagen", "piano teacher"), rich results, and mobile load time.

## What Changes

- Add page metadata: title pattern, meta description, canonical, Open Graph and Twitter card tags with a 1200×630 hero crop, a favicon set replacing `vite.svg`, and a JSON-LD `Person` block with `sameAs` links to Spotify, YouTube, Instagram, and LinkedIn.
- Serve a real `robots.txt` and `sitemap.xml` from `public/` instead of the SPA fallback returning HTML.
- Replace the all-`div` structure with landmarks (`header`, `main`, `section`, `footer`) and a heading hierarchy: one `h1` (the name), an `h2` label per section, `h3` only inside the contact card.
- Deliver the hero as an `<img>` with `srcset`, `sizes`, and `fetchpriority="high"` inside the existing overflow frame, so the ken-burns effect from the design contract still works. Preload it.
- Resize and recompress all photographs to the image budget: hero ≤ 300 KB at 1920 wide (plus 960/1440/2560 variants), gallery ≤ 250 KB each, no PNG photographs. Lazy-load everything below the fold.
- Gallery `alt` text becomes the caption; the hero `alt` names the subject and photographer.
- Prerender the page at build time so the biography, quotes, and headings are in the HTML before JavaScript runs. No runtime server. **Assumption**: adding `sharp` as a dev dependency for a repeatable image pipeline is acceptable; processed images are committed so the deploy build stays dependency-free.

## Capabilities

### New Capabilities

- `page-metadata`: what the document `<head>` and crawler files (`robots.txt`, `sitemap.xml`) expose to search engines and link-preview scrapers.
- `document-semantics`: landmark structure, heading hierarchy, and image alternative text for the single page.
- `image-delivery`: how photographs are sized, encoded, prioritised, and lazy-loaded, including the hero.

### Modified Capabilities

None (the project has no existing specs).

## Impact

- Files: `index.html`, `vite.config.ts`, `package.json` (build script, one dev dependency for images), new `scripts/`, new `src/entry-server.tsx`, `src/main.tsx`, `public/` (favicons, `robots.txt`, `sitemap.xml`, resized images), `src/App.tsx`, `src/header/Hero.tsx`, `src/body/Body.tsx`, `src/body/Section.tsx`, `src/body/Slider.tsx`, `src/body/SpotifySection.tsx`, `src/footer/Footer.tsx`.
- Depends on `revise-design-guideline` for the label style used by `h2`s and for the image budget text.
- Overlaps with `signature-moments` on `Section.tsx` (video posters remove iframes from first load; this change does not touch the player). Apply this one first.
- Deployment unchanged: Cloudflare Pages builds `dist/`. Prerender runs inside `npm run build`.
