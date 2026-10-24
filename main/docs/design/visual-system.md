# Visual system

Implement this in `src/index.css` before restyling components. Later briefs assume these custom properties exist.

## Tokens

Replace the current `:root` block. Keep the font imports in `index.html` as they are (Playfair Display and Lato, full weight ranges).

```css
:root {
  --playfair: "Playfair Display", serif;
  --lato: "Lato", sans-serif;

  --paper: #f3eee6;
  --paper-raised: #faf7f2;
  --ink: #2a211c;
  --ink-body: #3f362f;
  --ink-muted: #5c5148;
  --walnut: #34261e;
  --olive: #716446;
  --clay: #947262;
  --highlight: #db2b2b;

  --shadow-sheet:
    0 1px 2px rgb(52 38 30 / 0.06),
    0 16px 40px -20px rgb(52 38 30 / 0.28);
  --shadow-mount:
    0 2px 4px rgb(52 38 30 / 0.08),
    0 28px 56px -18px rgb(52 38 30 / 0.38);

  --ease-out: cubic-bezier(0.22, 1, 0.36, 1);
  --duration-hover: 240ms;
  --duration-enter: 800ms;

  --radius-sheet: 2px;

  color-scheme: light;
  font-family: var(--lato);
  font-weight: 400;
  line-height: 1.5;
  background-color: var(--paper);
  color: var(--ink-body);
  font-synthesis: none;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
```

Delete these current rules. They are why the page looks like default HTML:

- `border-radius: 0 !important` on `:root`. Radius is `2px` on sheets and mounts only, set on those elements.
- `button:hover { background-color: var(--highlight); }` and the matching `button` transition. Gallery dots and any future controls must not turn solid red.
- `color: #0a0505` and `background-color: #ffffff` on `:root`.
- `color-scheme: light dark`. This site is light only.

Keep `p { margin: 0; padding: 0; font-family: var(--lato); }` and the `overflow-x: hidden` on `html`. Body stays a full-width column: drop `place-items: center` if it shrinks the page, and keep horizontal overflow hidden.

## Tailwind usage

Tailwind v4 reads these properties. In class names, prefer the tokens over raw hex:

- Page wrappers: `bg-(--paper)`, not `bg-white`.
- Cards: `bg-(--paper-raised) text-(--ink-body) shadow-(--shadow-sheet) rounded-(--radius-sheet)`.
- Mounted media: `shadow-(--shadow-mount) rounded-(--radius-sheet)`.
- Headings and quotes: `font-(family-name:--playfair) text-(--ink)`.
- Muted lines: `text-(--ink-muted)`.
- Labels: `font-(family-name:--lato) text-[11px] tracking-[0.14em] uppercase text-(--olive)`.

If a Tailwind arbitrary shadow does not pick up the comma-separated custom property, set `box-shadow: var(--shadow-sheet)` in a class in `index.css` named `.sheet` and `.mount`, and use those classes. Do not fall back to `shadow-lg` or `shadow-xl`.

## Surfaces

| Class | Surface | Shadow | Where |
| --- | --- | --- | --- |
| page | `--paper` | none | `Body` root, `html` / `body` |
| `.sheet` | `--paper-raised`, padding `1.75rem` on small screens and `2.5rem` from `lg` | `--shadow-sheet` | Pull quotes, a biography block only when it sits beside a video, the contact card |
| `.mount` | transparent mat of `12px` in `--paper-raised` around the media, or padding on a wrapper | `--shadow-mount` | YouTube frame, Spotify player |
| photograph | the image itself, radius `2px` | `--shadow-mount` when it is the active print | Gallery |

A paragraph that is the only child of a section (the long biography, the thank-you) stays on the page ground. Do not wrap every paragraph in a card. Sheets are for blocks that sit next to an image or need to be readable on top of a photograph.

Hairline:

```css
.rule {
  height: 1px;
  width: 4.5rem;
  background: rgb(113 100 70 / 0.55);
  transform-origin: left center;
}
```

## Type scale

| Element | Family | Size | Line height | Colour |
| --- | --- | --- | --- | --- |
| Hero name | Playfair | `text-5xl` / `lg:text-7xl` | `0.95` | `--paper-raised` |
| Contact heading | Playfair | `text-5xl` / `lg:text-7xl` | `1` | `--paper-raised` |
| Pull quote | Playfair italic | `text-2xl` / `lg:text-3xl` | `1.45` | `--ink` |
| Body | Lato 400 | `text-base` / `lg:text-lg` | `1.7` | `--ink-body` |
| Contact details | Playfair | `text-xl` / `lg:text-2xl` | `1.4` | `--ink` on the sheet |
| Label | Lato 400 | `11px`, tracking `0.14em`, uppercase | `1.3` | `--olive` or paper at 80% |

The first letter of the opening biography stays: Playfair, `--highlight`, about `3.75rem`, line height `0.8`. Later paragraphs keep `firstLetter={false}`.

## Social glyphs

`Icon` fills with `var(--highlight)`. On the hero (over a photograph) and in the closing row (on paper), wrap the link in a `40px` disc on the hero and a `56px` disc in the closing row:

- Hero disc: `background: rgb(250 247 242 / 0.88)`, shadow `--shadow-sheet`.
- Closing disc: `background: var(--paper-raised)`, shadow `--shadow-sheet`, border `1px solid rgb(52 38 30 / 0.08)`.

Hover: `translateY(-3px)` and `--shadow-mount`, `240ms` `--ease-out`. The glyph colour does not change.

Focus: `outline: 2px solid var(--highlight); outline-offset: 3px`.

## Text links

Inline text links (contact email and phone, "Get in touch", the photo credit, a quote's publication) have no underline at rest. On hover and focus they take colour `--highlight` and an underline with `text-decoration-color: var(--highlight)`, `240ms` `--ease-out`. Focus ring as above. This is the one place besides the drop cap and the glyphs where signal red appears.

## Done when

- The page ground is `#f3eee6` with no white bands between sections.
- Inspecting a quote sheet and a video mount shows the walnut shadows above, not `rgba(0, 0, 0, …)` from Tailwind defaults.
- Hovering a gallery dot does not turn it red.
- A corner on a sheet is `2px`, and no ancestor forces `0` with `!important`.
- Devtools shows `font-family` Lato on a paragraph that has no extra class, and Playfair on the hero name.
