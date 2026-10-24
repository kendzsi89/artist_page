# Contact and close

Files: `src/footer/Footer.tsx`, `src/body/BodyIcons.tsx`.

The close of the page is two beats: social links on paper, then a portrait with a paper card you can actually read. Today the contact lines are near-black type on the photograph, which is the flattest, least reliable part of the page.

## Closing icons

`BodyIcons` is a centered row, `my-20`, three glyphs at `w-12`, `hover:scale-95`.

Replace the scale hover with the disc treatment from `visual-system.md`:

- Disc `56px`, `--paper-raised`, `1px solid rgb(52 38 30 / 0.08)`, shadow `--shadow-sheet`
- Glyph `w-6`, fill `--highlight`
- Hover `translateY(-3px)`, shadow `--shadow-mount`, `240ms` `--ease-out`
- Gap `2.5rem` (the current `gap-15` is `3.75rem`; slightly tighter so the three discs read as a set)

Wrap the row in `useReveal`. Stagger the three discs with `reveal-delay-1` and `reveal-delay-2` on the second and third.

Same links, same order: Spotify album, Instagram, YouTube. LinkedIn stays in the hero only, as it does now.

## Contact portrait

`Footer` is `h-screen`, image `/images/footer.jpeg`, `object-cover`, and a `opacity-40` black gradient. The heading “Contact” is white; the email, phone, and invitation are `#0a0505`.

Keep the full-viewport photograph and the image `src` / `alt`. Replace the overlay with the same vignette as the hero, flipped toward the top where the type sits:

- Linear: `bg-gradient-to-b from-(--walnut) via-transparent to-transparent`, opacity `0.78`
- Radial: `radial-gradient(ellipse at center, transparent 45%, rgb(52 38 30 / 0.4) 100%)`

No ken burns on this photograph. The hero already moved. This one is still, so the card is easy to read.

## Contact type

“Contact” stays outside the card, Playfair, `--paper-raised`, `text-5xl` / `lg:text-7xl`, `leading-none`. It is the section's `<h2>`, carries `id="contact"` on its `<section>` so the hero's "Get in touch" link and external `#contact` URLs land here, and has `tabIndex={-1}` so focus can be moved to it. It uses the load-independent reveal: `useReveal` on the footer content, heading with no delay.

Under it, a `.sheet` at `max-w-md`:

- Email and phone as two lines, Playfair, `text-xl` / `lg:text-2xl`, colour `--ink`. They are real links, not headings.
  - Email: `<a href="mailto:akendzsi@gmail.com">akendzsi@gmail.com</a>`.
  - Phone: `<a href="tel:+4550394351">+45 50 39 43 51</a>`. The `href` is E.164; the visible text is spaced for reading and contains only digits, spaces, and the plus.
  - The current `(@)` and the letter `o` standing in for a zero go away. Obfuscating the display text is the owner's call; the default is plain, correct strings, and the `href` is never obfuscated. If the owner wants display obfuscation back, change only the display constant, not the link target.
- The invitation (“Let's have a chat…”) under a `.rule`, Lato, `--ink-body`, `leading-[1.7]`, `text-lg`.
- Shadow `--shadow-sheet`, padding `2rem` / `lg:2.5rem`.

The sheet reveals with `reveal-delay-1`.

Hover on the two links: colour `--highlight`, `240ms`. No underline at rest; underline on hover. Focus ring `2px solid var(--highlight)`, offset `3px`.

Stack from the top: padding `12vh 8vw 0`. Delete the `top-40`, `mt-30`, and `text-[#0a0505]` utilities.

## Done when

- The three closing icons are paper discs on the paper ground, they rise once as a staggered set, and hover lifts them without shrinking (`scale-95` is gone).
- “Contact” is light type on the darkened top of the portrait.
- Email, phone, and the invitation sit on a paper card with a walnut shadow. Ink is `--ink` / `--ink-body` on `--paper-raised`, so contrast no longer depends on the photograph.
- Email and phone are tappable. Tapping the email opens a mail client to `akendzsi@gmail.com`; tapping the phone dials `+45 50 39 43 51`. The visible phone text matches `^\+[\d ]+$`.
- The portrait does not zoom or pan.
- Reduced motion: card and icons are visible immediately, portrait still.
