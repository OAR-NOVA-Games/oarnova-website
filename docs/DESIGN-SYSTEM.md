# Design system — Worlds in Motion

Thesis: one restrained studio identity framing three different vocabularies of play.
The studio surface stays near-neutral; each game chapter changes material, light and geometry.
Product palettes are local to their chapters and never promoted to studio-wide accents.

## Tokens (`app/assets/css/main.css`, Tailwind `@theme`)

| Token             | Value                                                            | Use                                                                 |
| ----------------- | ---------------------------------------------------------------- | ------------------------------------------------------------------- |
| `ink`             | `#10100f`                                                        | Studio surface (header, hero, contact, footer)                      |
| `cream`           | `#ece8dd`                                                        | Text on ink                                                         |
| `mute`            | `#a9a69c`                                                        | Secondary text on ink (≥ 7:1)                                       |
| `cyan`            | `#a8d8d3`                                                        | Single studio accent: hero word, focus, active nav                  |
| `gold`            | `#e2b673`                                                        | Tagline, one orbit line                                             |
| `paper` / `stone` | `#e9e4d9` / `#d5d0c4`                                            | Editorial light sections (work, belief, principles)                 |
| `moss`            | `#355e55`                                                        | Key word on light sections                                          |
| `dooma*`          | navy `#0a1720`, edge `#5cc8d8`                                   | Dooma chapter (strategic matte + cyan edge, per Dooma identity kit) |
| `chista*`         | `#071526`, gold `#f1d49f`                                        | Chista chapter (approved night art, lapis + gold)                   |
| `yz-*`            | paper `#f3ecdc`, petrol `#063f73`, teal `#0b6f71`, yellow, coral | YariZan chapter (brand kit palette, text teal darkened for AA)      |

## Typography

| Role        | Latin                                                                            | Persian                                            |
| ----------- | -------------------------------------------------------------------------------- | -------------------------------------------------- |
| Display     | Archivo (variable) at `font-stretch: 62%`, weight 850, uppercase, tight tracking | Vazirmatn 900, no case transform, line-height 1.22 |
| Accent      | Instrument Serif italic                                                          | Vazirmatn 500 (no faux italics in Persian)         |
| Body / UI   | Archivo 100% width                                                               | Vazirmatn, line-height 1.95                        |
| Meta labels | Archivo 600, tracked uppercase 11px                                              | Vazirmatn 12.5px, no tracking                      |

All fonts are OFL, self-hosted via Fontsource, split by `unicode-range`, `font-display: swap`.

## Composition rules

- Asymmetric editorial grids; text and art share the frame but DOM order stays logical.
- Each chapter has its own structure, not a shared card: Dooma — 3×3 board with a single 45° cut;
  Chista — full-bleed night scene with bottom-anchored title; YariZan — warm paper, stacked sheets and grade tabs.
- One CTA style site-wide (`.cta`: uppercase label + drawn rule). External game links show their real host.
- Status is always a labelled chip (`In development`, `Coming soon`), never colour alone.
- Persian is composed, not mirrored: logical properties everywhere, separate type scale, decorative
  geometry is not flipped, Persian digits in Persian pages, Latin brand/e-mail strings isolated with `dir="ltr"`.
- Mobile layouts are re-composed (art first, logo overlapping the art edge, title below), not shrunk.

## Brand assets

Studio mark: white line art, only on dark surfaces, never recoloured. Game logos appear unchanged on their
own chapter colours with clear space. See [ASSET-PROVENANCE.md](ASSET-PROVENANCE.md).
