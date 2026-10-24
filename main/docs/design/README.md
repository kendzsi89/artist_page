# Visual refactor — agent index

Read the design contract in the root `README.md` before any of these files. This folder is the work order for making the site feel physical: paper, walnut mounts, warm shadows, and slow motion. It is not a request for a new layout or new copy.

## Read this every time

1. Root `README.md`, section **Design contract**.
2. `visual-system.md` if tokens are not in `src/index.css` yet.
3. `motion.md` if scroll reveal is not in the repo yet.
4. The single section brief you are implementing.

Do one brief per change. Check that brief in the browser, desktop and a 390px-wide viewport, before opening the next file.

## Order

| Step | Brief | Files |
| --- | --- | --- |
| 1 | `visual-system.md` | `src/index.css` |
| 2 | `motion.md` | `src/index.css`, new `src/motion/useReveal.ts` |
| 3 | `refactor-hero.md` | `src/header/Hero.tsx`, `src/header/Icons.tsx`, `src/header/Icon.tsx` |
| 4 | `refactor-programme.md` | `src/body/Section.tsx`, `src/body/Body.tsx` |
| 5 | `refactor-gallery.md` | `src/body/Slider.tsx` |
| 6 | `refactor-listening-room.md` | `src/body/SpotifySection.tsx`, the album intro `Section` in `Body.tsx` |
| 7 | `refactor-contact.md` | `src/footer/Footer.tsx`, `src/body/BodyIcons.tsx` |
| 8 | OpenSpec change `seo-head-and-semantics` (`openspec/changes/seo-head-and-semantics/`) | `index.html`, `public/`, `scripts/`, `src/entry-server.tsx`, `src/main.tsx`, all section files |
| 9 | OpenSpec change `conversion-copy-and-contact` | `src/data/`, `src/header/Hero.tsx`, `src/body/Section.tsx`, `src/body/Body.tsx`, `src/footer/Footer.tsx` |
| 10 | OpenSpec change `signature-moments` | `src/body/VideoPoster.tsx`, `src/header/ListenButton.tsx`, `src/body/Section.tsx`, `package.json` |

Steps 8–10 are run with `/openspec-apply-change <name>`; their specs are the behaviour contract, the root README is the visual contract.

## Definition of done

- Colours, type, shadows, radii, and durations match the contract. No new hex values.
- The listed motion plays, and `prefers-reduced-motion: reduce` leaves the section still readable and still usable.
- Biography, quote texts, captions, and video/album ids are unchanged. Positioning copy is additive.
- Every section begins with a small-caps label that is an `<h2>`; the page has one `h1`.
- Every pull quote shows a source line; a quote without a source is body text.
- Email and phone are `mailto:` / `tel:` links with plain, correct text.
- Metadata is present in the served `<head>`: title, description, canonical, Open Graph, Twitter card, JSON-LD `Person`, favicon set.
- Image budget met: hero as `<img srcset fetchpriority="high">` ≤ 300 KB at 1920; gallery ≤ 250 KB; no PNG photographs; `alt` from captions.
- `npm run lint` passes.
- You looked at the section in a browser: the enter animation, the hover, and the narrow viewport. A screenshot of the first paint is not enough, because the motion happens after load and after scroll.

## How to verify motion

With the dev server running:

- Reload the hero. The photograph should still be scaling after three seconds. The name should have finished rising. The rule under the name should be fully drawn.
- Scroll the programme. Each block should rise once. Scrolling back up should not replay it.
- Drag the gallery. The centred print should be larger and shadowed; the caption under it should be readable with the pointer elsewhere.
- Toggle reduced motion in the OS, or emulate it in devtools (`prefers-reduced-motion: reduce`). Ambient loops stop. Nothing should be invisible because it was waiting on a transform.

## Shared constraints

- No new npm dependencies.
- No new pages, no navbar, no rewritten biography.
- Shadows use the walnut-tinted values in `visual-system.md`.
- `#db2b2b` stays on the drop cap, the focus ring, social glyphs, and text-link hover.
- Nothing plays sound without a tap.
- Remove behaviour that fights the contract when you touch a file: the global red button hover, and `border-radius: 0 !important`.
