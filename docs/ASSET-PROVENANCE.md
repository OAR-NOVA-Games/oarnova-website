# Asset provenance

Every binary under `public/media/` comes from an owner repository at a recorded revision.
The machine-readable record is [`assets/asset-manifest.json`](../assets/asset-manifest.json)
(full SHA-256 of source and output, dimensions, bytes, transform, purpose, status).
`npm run check:assets` fails CI if a file is added, changed or removed without a manifest entry.

Assets are imported with `node scripts/import-assets.mjs <export-root>`, where `<export-root>`
holds read-only exports of the source repositories (`<export-root>/<chista|dooma|yarizan>/<path>`).
Source revisions used for this release:

| Repository              | Revision                                   |
| ----------------------- | ------------------------------------------ |
| `OAR-NOVA-Games/Chista` | `418bf4d4ffdb58773f84626f82828d2e8cdc752e` |
| `OAR-NOVA-Games/Dooma`  | `914d20b8c4312666e0258071781bef22026cb50a` |
| `osameh15/YariZan`      | `30ffa0580f6f743ee4d5241585b584d1dad6ef1a` |

## Rules applied

- Logos are never redrawn, traced, recoloured, stretched, cropped or rotated. They are either
  byte-identical copies or lossless WebP re-encodes/resizes of the official raster.
- Artwork derivatives are proportional resizes; the only crop is the Chista Open Graph card
  (centre cover crop of the approved Default Night splash).
- Open Graph cards and icons place an official mark, unchanged, on a flat background.
- Nothing is hotlinked from GitHub; all media is served from this site.

## Published assets

Full 64-character checksums are in `assets/asset-manifest.json`.

| Published file                             | Source repo @ revision            | Source path                                                                                         | Source SHA-256  | Output SHA-256  | Transform                                                                                                    | Status                                                               |
| ------------------------------------------ | --------------------------------- | --------------------------------------------------------------------------------------------------- | --------------- | --------------- | ------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------- |
| `/media/studio/oar-nova-logo-512.webp`     | OAR-NOVA-Games/Chista @ `418bf4d` | `apps/web/public/assets/chista/studio/oar-nova-games-logo-512w.webp`                                | `7ffb7a816373…` | `7ffb7a816373…` | byte-identical copy                                                                                          | approved                                                             |
| `/media/studio/oar-nova-logo-192.webp`     | OAR-NOVA-Games/Chista @ `418bf4d` | `docs/brand/studio/oar-nova-games-logo-1024.png`                                                    | `7ded70bab5d9…` | `726a69f3cd9f…` | resize width 192, webp lossless                                                                              | approved                                                             |
| `/media/studio/oar-nova-logo-1024.webp`    | OAR-NOVA-Games/Chista @ `418bf4d` | `apps/web/public/assets/chista/studio/oar-nova-games-logo-1024w.webp`                               | `5f9dbae60c98…` | `5f9dbae60c98…` | byte-identical copy                                                                                          | approved                                                             |
| `/media/dooma/logo-512.webp`               | OAR-NOVA-Games/Dooma @ `914d20b`  | `images/logo.png`                                                                                   | `449f472ab96e…` | `5d6a6f58bdf1…` | resize width 512, webp lossless                                                                              | approved by owner for marketing use 2026-10-17                       |
| `/media/dooma/logo-1024.webp`              | OAR-NOVA-Games/Dooma @ `914d20b`  | `images/logo.png`                                                                                   | `449f472ab96e…` | `aeffeacbbecd…` | webp lossless                                                                                                | approved by owner for marketing use 2026-10-17                       |
| `/media/dooma/field-480.webp`              | OAR-NOVA-Games/Dooma @ `914d20b`  | `images/LoadingBackground.png`                                                                      | `78f783782b13…` | `4192d6b2bc40…` | resize width 480, webp q82                                                                                   | approved by owner for marketing use 2026-10-17                       |
| `/media/dooma/field-941.webp`              | OAR-NOVA-Games/Dooma @ `914d20b`  | `images/LoadingBackground.png`                                                                      | `78f783782b13…` | `4a10ca2b8228…` | webp q82                                                                                                     | approved by owner for marketing use 2026-10-17                       |
| `/media/chista/logo-400.webp`              | OAR-NOVA-Games/Chista @ `418bf4d` | `apps/web/public/assets/chista/brand/logo-horizontal-400w.webp`                                     | `0ae29596b086…` | `0ae29596b086…` | byte-identical copy                                                                                          | approved                                                             |
| `/media/chista/logo-800.webp`              | OAR-NOVA-Games/Chista @ `418bf4d` | `apps/web/public/assets/chista/brand/logo-horizontal-800w.webp`                                     | `76002b3cd52c…` | `76002b3cd52c…` | byte-identical copy                                                                                          | approved                                                             |
| `/media/chista/night-1920.webp`            | OAR-NOVA-Games/Chista @ `418bf4d` | `apps/web/public/assets/chista/splash/default-night/default-night-desktop-landscape-1920x1080.webp` | `f52ef1efa939…` | `f52ef1efa939…` | byte-identical copy                                                                                          | approved                                                             |
| `/media/chista/night-960.webp`             | OAR-NOVA-Games/Chista @ `418bf4d` | `apps/web/public/assets/chista/splash/default-night/default-night-desktop-landscape-1920x1080.webp` | `f52ef1efa939…` | `dcc67c00133a…` | resize width 960, webp q80                                                                                   | approved                                                             |
| `/media/chista/night-portrait-540.webp`    | OAR-NOVA-Games/Chista @ `418bf4d` | `apps/web/public/assets/chista/splash/default-night/default-night-mobile-portrait-1080x1920.webp`   | `95318ba778d9…` | `6d687115d5dc…` | resize width 540, webp q80                                                                                   | approved                                                             |
| `/media/chista/night-portrait-720.webp`    | OAR-NOVA-Games/Chista @ `418bf4d` | `apps/web/public/assets/chista/splash/default-night/default-night-mobile-portrait-1080x1920.webp`   | `95318ba778d9…` | `beab9dca5510…` | resize width 720, webp q74                                                                                   | approved                                                             |
| `/media/yarizan/logo-horizontal-1600.webp` | osameh15/YariZan @ `30ffa05`      | `docs/YariZan_Brand_Kit_v1/05_Web/YariZan_Horizontal_1600w.webp`                                    | `708ad4ca30e6…` | `708ad4ca30e6…` | byte-identical copy                                                                                          | approved                                                             |
| `/media/yarizan/logo-horizontal-800.webp`  | osameh15/YariZan @ `30ffa05`      | `docs/YariZan_Brand_Kit_v1/05_Web/YariZan_Horizontal_1600w.webp`                                    | `708ad4ca30e6…` | `0f20fdeabf16…` | resize width 800, webp lossless                                                                              | approved                                                             |
| `/media/yarizan/logo-primary-1024.webp`    | osameh15/YariZan @ `30ffa05`      | `docs/YariZan_Brand_Kit_v1/05_Web/YariZan_Primary_1024w.webp`                                       | `f9ba20588da2…` | `f9ba20588da2…` | byte-identical copy                                                                                          | approved                                                             |
| `/media/yarizan/logo-primary-512.webp`     | osameh15/YariZan @ `30ffa05`      | `docs/YariZan_Brand_Kit_v1/05_Web/YariZan_Primary_1024w.webp`                                       | `f9ba20588da2…` | `519ba3984597…` | resize width 512, webp lossless                                                                              | approved                                                             |
| `/media/og/studio.png`                     | OAR-NOVA-Games/Chista @ `418bf4d` | `apps/web/public/assets/chista/studio/oar-nova-games-logo-1024w.webp`                               | `5f9dbae60c98…` | `fdb7ffffa5c8…` | logo scaled to height 420, centred on #10100f 1200x630                                                       | derived from approved                                                |
| `/media/og/dooma.png`                      | OAR-NOVA-Games/Dooma @ `914d20b`  | `images/logo.png`                                                                                   | `449f472ab96e…` | `079d385c8e44…` | logo scaled to height 560, centred on #0a1720 1200x630                                                       | derived from owner-approved 2026-10-17                               |
| `/media/og/chista.jpg`                     | OAR-NOVA-Games/Chista @ `418bf4d` | `apps/web/public/assets/chista/splash/default-night/default-night-desktop-landscape-1920x1080.webp` | `f52ef1efa939…` | `8ae62b501f6d…` | cover crop 1200x630, jpeg q84                                                                                | derived from approved                                                |
| `/media/og/yarizan.png`                    | osameh15/YariZan @ `30ffa05`      | `docs/YariZan_Brand_Kit_v1/05_Web/YariZan_Horizontal_1600w.webp`                                    | `708ad4ca30e6…` | `fd521a4649c4…` | logo scaled to height 360, centred on #f3ecdc 1200x630                                                       | derived from approved                                                |
| `/media/icons/symbol-white-32.png`         | OAR-NOVA-Games/Chista @ `418bf4d` | `docs/brand/studio/oar-nova-games-logo-1024.png`                                                    | `7ded70bab5d9…` | `54aaa79c68a8…` | controller symbol only (wordmark removed), transparent margins trimmed, contained in 32px transparent square | derived from approved; symbol-only crop approved by owner 2026-10-17 |
| `/media/icons/symbol-white-64.png`         | OAR-NOVA-Games/Chista @ `418bf4d` | `docs/brand/studio/oar-nova-games-logo-1024.png`                                                    | `7ded70bab5d9…` | `cfe78bf83b6d…` | controller symbol only (wordmark removed), transparent margins trimmed, contained in 64px transparent square | derived from approved; symbol-only crop approved by owner 2026-10-17 |
| `/media/icons/apple-touch-icon.png`        | OAR-NOVA-Games/Chista @ `418bf4d` | `docs/brand/studio/oar-nova-games-logo-1024.png`                                                    | `7ded70bab5d9…` | `e300869514cc…` | controller symbol only, logo on #10100f square 180px                                                         | derived from approved; symbol-only crop approved by owner 2026-10-17 |

## Reviewed and deliberately NOT published

| Candidate                                                                         | Reason                                                                                                                                         | Needed to use it                                                                         |
| --------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| Dooma `images/Banner.png`                                                         | Carries a "download now" call to action and Google Play / Cafe Bazaar badges. Publishing it would claim availability that does not exist.      | A marketing render without store badges, or explicit owner approval once the game ships. |
| Dooma `images/Loading Screen.png`, `images/Logo Variants.png`                     | Composition studies; the Dooma visual identity kit is "ready for Art Director review, not artistically approved".                              | Art Director approval.                                                                   |
| YariZan `docs/Images/phase4-premium/*` (incl. `20-home-1440.png`)                 | Development screenshots of the storefront showing prices and phone numbers; the brief marks them "development capture, owner review required". | Owner-approved, customer-safe screenshots.                                               |
| YariZan `docs/YariZan_Brand_Kit_v1/07_Banner/Persian Kids Learning Adventure.png` | Not listed in the brand kit README (folders 01–06 are documented); contains product claims.                                                    | Owner confirmation that the banner is approved for public marketing.                     |
| Chista Core asset                                                                 | Marked provisional in `docs/brand/README.md`.                                                                                                  | Final Core pack.                                                                         |

## Status values

- `approved` — documented as approved in the source repository (Chista brand README, YariZan brand kit v1,
  studio logo) and approved by the owner for publication on this public site (2026-10-17).
- `approved by owner for marketing use 2026-10-17` — Dooma `images/logo.png` (byte-identical to
  `Frontend/.../Brand/Runtime/DoomaLogo.png`) and `images/LoadingBackground.png`, approved explicitly by the
  owner at Gate A for the studio's public marketing presentation, including optimized derivatives.
- `derived from approved` / `derived from owner-approved …` — generated from an approved source as described
  in the transform column.

## Owner decision log

| Date       | Decision                                                                                                                                                                                                                                                                                            | Source              |
| ---------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------- |
| 2026-10-17 | Build the studio website with the real brand assets from the Chista, Dooma and YariZan repositories (intended use).                                                                                                                                                                                 | Owner mission brief |
| 2026-10-17 | Favicons and the touch icon use the controller symbol of the studio logo without the wordmark (crop above the wordmark, lines unchanged).                                                                                                                                                           | Owner, in session   |
| 2026-10-17 | White favicon on a transparent background (no dark tile).                                                                                                                                                                                                                                           | Owner, in session   |
| 2026-10-17 | Dooma `images/logo.png` and `images/LoadingBackground.png` approved for the studio's public marketing presentation, including optimized derivatives. Only these two files; no experimental, confidential, rejected or unrelated Dooma assets. The Dooma banner with download claims stays excluded. | Owner, Gate A       |
| 2026-10-17 | Publication of the existing official OAR NOVA Games Studio, Chista and YariZan branding on the public studio website approved. Unapproved YariZan product screenshots, personal information and unconfirmed commercial content stay excluded.                                                       | Owner, Gate A       |
| 2026-10-17 | Taglines kept: _Different worlds. One spark._ / «جهان‌ها گوناگون‌اند؛ جرقه یکی است.» Status labels approved: Dooma and Chista "In development", YariZan "Coming soon".                                                                                                                              | Owner, Gate A       |

## Public repository note

This repository is public. Every file in `public/media` has been pushed and remains in Git history even if
later removed from the tree; removing an asset from the current tree does not unpublish it. If an owner decision
revokes any asset, treat it as already public and decide separately whether history rewriting (which needs
explicit approval) is warranted.

The owner's authorization assumes the studio holds the publication rights for these assets.
