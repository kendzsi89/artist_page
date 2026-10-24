# Tasks

## 1. Make the contract reach the repo

- [x] 1.1 Remove the `# Readme` block (`README.md`) from `.gitignore`; verify with `git check-ignore README.md` returning nothing and `git status` showing `README.md` as untracked or modified.

## 2. Resolve the contradictions in the briefs

- [x] 2.1 `docs/design/refactor-hero.md`: replace the "Do not add a tagline" rule with a required descriptor line under the name (text "Pianist", label style from `visual-system.md`, colour `rgb(250 247 242 / 0.8)`, enters with the name). Verify the brief's Done-when list includes the descriptor and no longer forbids it.
- [x] 2.2 `docs/design/refactor-programme.md`: add a required section label rendered as `<h2>` in label style above each programme block (press quote → "Press", biography → "Biography", teaching → "Teaching"); require an attribution line under every pull quote (Playfair, `text-sm`, `--ink-muted`, em dash, source and publication or role); state that a quote whose source is unknown is rendered as a body paragraph, not a pull quote. Verify Done-when includes "every pull quote shows a source".
- [x] 2.3 `docs/design/refactor-listening-room.md`: replace "Do not add a heading" with a required `<h2>` label "Listen" in label style above the album sentence. Verify Done-when includes the label.
- [x] 2.4 `docs/design/refactor-contact.md`: make email and phone real `mailto:` / `tel:` links with plain, correct visible strings (`akendzsi@gmail.com`, `+45 50 39 43 51`); remove the instruction to preserve `(@)` and the letter `o`; add a one-line note that obfuscation is the owner's call and the default is plain. Verify Done-when says the strings are tappable and correct.

## 3. Extend the root contract

- [x] 3.1 `README.md`: add a **Head and metadata** section to the design contract: title pattern `Kendzsi Tanaka — Pianist`, a 150–160 character description, Open Graph (`og:title`, `og:description`, `og:image` using a 1200×630 crop of the hero, `og:url`, `og:type profile`), Twitter card `summary_large_image`, JSON-LD `Person` with `jobTitle`, `image`, `url`, `sameAs` for Spotify/YouTube/Instagram/LinkedIn, canonical, favicon set replacing `vite.svg`. Verify each item is a sentence an agent can check in devtools.
- [x] 3.2 `README.md`: add an **Image budget** section: hero delivered as `<img fetchpriority="high">` with `srcset` at 960/1440/1920/2560 widths and ≤ 300 KB at 1920; gallery images ≤ 250 KB each, no PNG photographs; alt text equals the caption; `loading="lazy"` on everything below the fold. Verify the numbers match `seo-head-and-semantics` design.
- [x] 3.3 `README.md`: add a **Signature moments** subsection to Motion: (a) YouTube embeds render as poster photographs with a play mark and load the iframe on click; (b) the hero offers a "Listen" affordance that plays a short local audio excerpt on tap, with a visible playing state and a stop. Verify both are described with the same duration/easing vocabulary as the rest of the contract.
- [x] 3.4 `README.md`: add `mailto:`/`tel:` links, quote attribution, and the descriptor to the **Leave these alone** / contract text so it agrees with 2.1–2.4. Verify no sentence in `README.md` contradicts any sentence in `docs/design/*.md` (read both end to end).

## 4. Update the agent index

- [x] 4.1 `docs/design/README.md`: extend the Definition of done with "metadata present in `<head>`", "image budget met", "every pull quote attributed", "contact details clickable"; add the three companion changes to the Order table after step 7. Verify the table and the root README build sequence list the same steps in the same order.
