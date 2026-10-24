# Artist website for pianist

Frontend-only portfolio for pianist Kendzsi Tanaka. Visitors read a short biography, watch performance videos, browse photographs, listen to a selected album, and get in touch by email or phone.

## Stack and deployment

Vite + React + Tailwind CSS v4. No router, no backend, no animation library.

Deployed on Cloudflare Pages from the `main` branch of the GitHub repo, on a custom domain.

Workflow: local edits → push to `main` → Cloudflare builds and deploys.

## Page order

The page is one scroll. Keep this order. Do not add a navbar or new routes. The only additions are the two blocks named under **Positioning copy** below ("Upcoming" after the first programme block, "Engagements" before Contact); they live inside this order, they do not extend it.

1. **Hero** — full-viewport headshot, name, social links. `src/header/Hero.tsx`, `src/header/Icons.tsx`
2. **Programme** — biography, press quotes, and YouTube embeds, alternating. `src/body/Body.tsx`, `src/body/Section.tsx`
3. **Gallery** — drag/scroll photograph strip that darkens the page while it is in view. `src/body/Slider.tsx`
4. **Listening room** — album introduction, then a Spotify embed on a full-bleed photograph. `src/body/SpotifySection.tsx`
5. **Close** — teaching and other work, a thank-you line, social links again. `src/body/Body.tsx`, `src/body/BodyIcons.tsx`
6. **Contact** — full-viewport portrait with email and phone. `src/footer/Footer.tsx`

Biography, quotes, captions, and the video and album ids stay as they are. Image files are re-encoded to the **Image budget**; contact details become links per **Positioning copy**.

## Design contract

The page should feel like a printed recital programme that has physical depth: warm paper, ink, walnut-mounted photographs, and a camera that moves slowly. It should not feel like an unstyled HTML document, and it should not feel like a startup landing page.

Agents doing visual work read `docs/design/README.md` first, then the brief for the section they are changing. The rules below are the contract. The briefs say how to apply them in each file.

### What is flat today

These are the causes. Fix the causes, not a single component in isolation.

- `src/index.css` sets `background-color: #ffffff`, `border-radius: 0 !important`, and `button:hover { background-color: var(--highlight) }`. Every corner is forced square, and every button — including gallery dots — turns solid red on hover.
- `:root` sets `font-family: system-ui`. Playfair Display and Lato only appear where a component remembers to set them.
- Colour intent lives in this README and almost nowhere in CSS. Only `--playfair`, `--lato`, and `--highlight` are tokens.
- There is no `box-shadow` anywhere. Media, quotes, and text sit on the same white plane.
- Motion is two keyframes, `zoomout` and `appear`, both used only on the hero, both finished within two seconds. After that the page is static.
- `Section` is a flex row of a bare player and a paragraph. Quotes use the same body style as biography.
- Gallery frames are unbordered rectangles. Captions exist only while the pointer is over an image.
- Contact type is `#0a0505` painted directly on a photograph, and the email and phone are plain text, not links.
- The `<head>` has a title and nothing else; the hero is a 3.3 MB CSS background; every element is a `div`; "pianist" does not appear on the first screen; the quotes have no source.

### Colour

Sampled from the hero photograph. Use these exact values. Put them on `:root` as the custom properties in `docs/design/visual-system.md` before restyling components.

| Role | Token | Value | Use |
| --- | --- | --- | --- |
| Paper | `--paper` | `#f3eee6` | Page ground. Replaces pure white. |
| Paper raised | `--paper-raised` | `#faf7f2` | Cards, quote blocks, the contact panel. |
| Ink | `--ink` | `#2a211c` | Headings on paper. |
| Ink body | `--ink-body` | `#3f362f` | Paragraphs. Replaces `#444`. |
| Ink muted | `--ink-muted` | `#5c5148` | Captions, photo credit, secondary lines. |
| Walnut | `--walnut` | `#34261e` | Frames, rules, icon discs on paper, the listening-room field. |
| Olive | `--olive` | `#716446` | Hairline rules, small labels. |
| Clay | `--clay` | `#947262` | Secondary rules, quote-mark colour. |
| Signal | `--highlight` | `#db2b2b` | Drop cap, focus ring, the social-icon glyph, and text-link hover (contact details, "Get in touch"). Nowhere else. |

Signal red is a wax seal, not a fill. Do not paint buttons, dots, or hover states solid `#db2b2b`.

Text on photographs uses `--paper-raised`, not ink. Ink on a photograph is reserved for the contact card, which has its own paper surface.

### Type

- Display type — the hero name, the "Contact" heading, pull quotes, attribution, contact details, and the drop cap: **Playfair Display**.
- Body, captions, labels, and UI: **Lato**. Section `<h2>` labels are Lato because they are labels; only the two display headings (`h1` name, `h2` Contact) are Playfair.
- Pull quotes are Playfair italic, larger than body, with a looser line-height (`1.45`). They are not body paragraphs with a quotation icon beside them.
- Small labels (section labels, photo credit, the hero descriptor row) are Lato, 11–12px, `letter-spacing: 0.14em`, uppercase, colour `--olive` on paper or `--paper` at 80% opacity on photographs. Section labels are `<h2>` elements; they are the page's heading structure, dressed as kickers.
- Attribution under a pull quote: Playfair upright, `text-sm`, `--ink-muted`, em dash first.
- Body measure stays narrow: 34–40rem. Do not stretch biography to the viewport.
- The existing drop cap stays: signal red, Playfair, about `3.75rem`, on the first biography paragraph only.

### Depth

Depth comes from a warm shadow and a change of surface, not from blur, glass, or a thick border.

Three elevations. Shadows are tinted with walnut `rgb(52 38 30)`, never Tailwind’s default cool gray.

| Level | Name | Use |
| --- | --- | --- |
| 0 | Page | `--paper` ground. No shadow. |
| 1 | Sheet | Quote cards, biography sheets, contact card. |
| 2 | Mount | Video frames, the active gallery print, the Spotify player. |

Level 1 shadow:

```css
0 1px 2px rgb(52 38 30 / 0.06), 0 16px 40px -20px rgb(52 38 30 / 0.28)
```

Level 2 shadow:

```css
0 2px 4px rgb(52 38 30 / 0.08), 0 28px 56px -18px rgb(52 38 30 / 0.38)
```

Hover on a mounted object lifts it `4px` (`translateY(-4px)`) and swaps in the level-2 shadow over `240ms`. It does not scale past `1.02`.

Media mounts are a `--paper-raised` mat of `12px` (videos, Spotify) or `0` (gallery prints, which cast a shadow directly). Corner radius is `2px` on paper sheets and `2px` on photographs. Remove `border-radius: 0 !important`. Do not introduce pills or `rounded-2xl` cards. `rounded-full` is for the three discs only: social-icon hit targets, the video play disc, and the hero listen disc.

Hairline rules are `1px solid rgb(113 100 70 / 0.45)` (`--olive` at partial opacity). One rule under the hero name, one above each pull quote, one above the invitation in the contact card. Not a box around every block.

### Motion

Motion is slow and weighted, like a seat in a hall. One transform per element. Animate `transform` and `opacity` only.

| Kind | Duration | Easing | Example |
| --- | --- | --- | --- |
| Hover | `240ms` | `cubic-bezier(0.22, 1, 0.36, 1)` | Icon lift, mounted video |
| Enter | `800ms` | same easing | Scroll reveal, hero type |
| Ambient | `18s`–`24s` | `ease-in-out`, alternate | Hero ken burns, Spotify background pan |

Enter distance is `translateY(20px)` plus opacity `0 → 1`. Stagger siblings by `90ms`. Play each enter once.

Required motions, in the order an agent should build them:

1. **Hero photograph** keeps moving after load. Scale from `1.08` to `1` over `22s`, once, `ease-out`. The current `zoomout` lasts `2s` and then the picture is dead.
2. **Hero type and icons** enter upward, icons staggered. A `1px` olive rule under the name draws from the left (`scaleX(0 → 1)`, origin left, `700ms`).
3. **Programme blocks** reveal on scroll, once, when about 20% visible. Children stagger: frame, then text.
4. **Pull quotes** use a clay quotation mark that settles from `scale(0.92)` / opacity `0.4` to rest, over the enter duration.
5. **Gallery** — the active print is scale `1` with a level-2 shadow. Neighbours are scale `0.9`, opacity `0.72`, no shadow. Transition `600ms`. The caption of the active slide is visible without hover.
6. **Listening room** — the background photograph pans very slowly (`background-position`, `24s`, alternate). The Spotify embed sits on a paper mat with a level-2 shadow and may drift `6px` vertically over `7s`. The drift stops under reduced motion.
7. **Contact card** enters upward over the portrait. The portrait itself does not zoom.

`prefers-reduced-motion: reduce` disables transform animations and ambient loops. Opacity fades of `200ms` or instant appearance are fine. Gallery drag must still work.

Do not add Framer Motion, GSAP, or another animation dependency. A small `IntersectionObserver` hook is enough for scroll reveals. Do not animate on every scroll event except the gallery’s existing viewport fade.

#### Signature moments

The motions above make the page polished. These two make it memorable, because they are about the one thing a pianist's site has that others do not: his sound. Both are user-initiated. Nothing plays by itself.

1. **Video posters.** Each YouTube embed renders as a still photograph on its paper mount with a `56px` paper play disc (walnut triangle). No iframe exists until the poster is clicked; then the player is inserted in the same 16:9 box and autoplays. Hover lifts the mount `4px` over `240ms` with `--ease-out` and scales the disc to `1.06`. Local posters live in `public/thumbnails/`; a missing poster falls back to the video host's high-resolution thumbnail. Net effect: the programme reads as photographs, and first load makes zero third-party requests.
2. **Hero listening excerpt.** A "Listen" control in the hero descriptor row plays a 15–45 second local excerpt (≤ 800 KB, `public/audio/`) on tap. While playing, the label reads "Stop", a `1px` progress line in `--paper-raised` grows under it over the excerpt's duration, and the disc pulses at `0.85 → 1` opacity over `1.6s` alternating (class `ambient`, so reduced motion keeps the line and drops the pulse). Tap again or reach the end to stop and reset. The control is a `button`, keyboard-operable, and is not rendered when no excerpt file is configured.

Not in scope, and not to be added without a new decision: a scroll-pinned hero, type blended over the photograph, parallax layers. They edge into scroll-jacking and break on phones.

### Head and metadata

The served HTML carries everything a search engine or a link scraper needs. These are static strings in `index.html`; there is one page and one set of metadata.

- `<title>Kendzsi Tanaka — Pianist</title>`.
- `<meta name="description">` of 150–160 characters naming the artist, "pianist", and "Copenhagen". Default: "Kendzsi Tanaka is a Japanese-Hungarian classical pianist based in Copenhagen. Recordings, performance videos, concert photography, teaching, and contact."
- `<link rel="canonical" href="https://kendzsi.com/">`.
- Open Graph: `og:title`, `og:description`, `og:url`, `og:type` `profile`, `og:image` pointing at an absolute URL for a 1200×630 crop of the hero (`/images/og.jpg`). Twitter: `twitter:card` `summary_large_image`.
- One JSON-LD `Person`: `name`, `jobTitle` "Pianist", `url`, `image`, and `sameAs` listing the Spotify, YouTube, Instagram, and LinkedIn URLs that the hero icons link to. Nothing else in `sameAs`.
- Favicon set: `favicon.ico`, `favicon.svg` (a "KT" monogram in Playfair on `--walnut`), `apple-touch-icon.png` at 180 px. `vite.svg` is deleted.
- `public/robots.txt` allowing all agents and naming the sitemap; `public/sitemap.xml` with the root URL and a `lastmod`. Both served as their own content types, not the SPA fallback.
- The headings, biography, and quotes are present in the HTML before JavaScript runs (the build prerenders the page). Check with `curl`, not a browser.

### Image budget

Photography is the design, so it has to arrive fast.

- The hero is an `<img>` inside the overflow frame, not a CSS background: `srcset` at 960, 1440, 1920, and 2560 px wide, `sizes="100vw"`, `fetchpriority="high"`, preloaded from `index.html`. The ken-burns transform runs on the `img`. ≤ 300 KB at 1920.
- Gallery images ≤ 250 KB each, 1600 px wide. Footer portrait and listening-room background ≤ 250 KB at 1920.
- Photographs are JPEG, WebP, or AVIF. No PNG photographs. The 2.8 MB screenshot in the gallery is the reason this line exists.
- Every image below the fold has `loading="lazy"` and `decoding="async"`.
- Every image declares dimensions or an aspect ratio so nothing shifts when it loads.
- `alt` is real text: gallery `alt` equals the caption; the hero `alt` names the artist and the photographer. Never `Slide 1`.
- Originals go in `assets-src/`; `npm run images` writes the processed files. Commit the outputs so the deploy build needs no image tooling.

### Positioning copy

The visuals carry the mood. These few lines carry the booking.

- "Pianist" under the name in the hero, with a "Get in touch" link to `#contact` beside it. Label style, nothing larger.
- A credentials row above the first biography paragraph: Royal Academy of Music, London · Royal Danish Academy of Music, Copenhagen · 2nd Prize, International Stasys Vainiūnas Piano Competition, Vilnius. Three items, label style.
- Every pull quote is attributed. No source, no pull quote (it becomes body text).
- An "Engagements" sheet before Contact: solo recital, chamber music, masterclass, piano tuition. Four lines, no prices.
- An "Upcoming" block driven by `src/data/concerts.json`, shown only when it has future dates.
- Email and phone are real `mailto:` and `tel:` links with plain, correct text.
- Each section's small-caps label is its `<h2>`. The page outline is one `h1` followed by `h2`s.

### Build sequence

Work in this order so later sections inherit tokens instead of inventing colours:

1. `docs/design/visual-system.md` — tokens, type, elevation in `src/index.css`
2. `docs/design/motion.md` — easing, reveal hook, reduced motion
3. `docs/design/refactor-hero.md`
4. `docs/design/refactor-programme.md`
5. `docs/design/refactor-gallery.md`
6. `docs/design/refactor-listening-room.md`
7. `docs/design/refactor-contact.md`
8. OpenSpec change `seo-head-and-semantics` — head, landmarks, image pipeline, prerender
9. OpenSpec change `conversion-copy-and-contact` — descriptor, credentials, attribution, engagements, upcoming, contact links
10. OpenSpec change `signature-moments` — video posters, hero listening excerpt

Each brief lists the files to touch, the target look, and how to know it is done. Finish one brief and check it in the browser before starting the next. Steps 8–10 are tracked as OpenSpec changes under `openspec/changes/`; their specs are the contract for behaviour, this README is the contract for look.

### Leave these alone

- Biography paragraphs, quote texts, and gallery captions, word for word. Positioning copy is added around them, never in place of them
- The YouTube video ids and the Spotify album link
- Section order (the "Upcoming" and "Engagements" blocks slot in at the places named above; nothing else moves)
- The gallery’s drag behaviour (pointer and touch). Visual treatment changes; the drag model stays
- Tailwind v4. Style with Tailwind utilities plus the tokens in `src/index.css`. Do not add a CSS-in-JS library
- No dark theme, no glassmorphism, no gradient text, no marquee, no particle field, no custom cursor, no scroll-jacking, no autoplaying sound
