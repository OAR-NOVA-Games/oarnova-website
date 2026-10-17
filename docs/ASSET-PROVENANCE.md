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

| Published file                             | Source repo @ revision            | Source path                                                                                         | Source SHA-256  | Transform                                              | Status                                               |
| ------------------------------------------ | --------------------------------- | --------------------------------------------------------------------------------------------------- | --------------- | ------------------------------------------------------ | ---------------------------------------------------- |
| `/media/studio/oar-nova-logo-512.webp`     | OAR-NOVA-Games/Chista @ `418bf4d` | `apps/web/public/assets/chista/studio/oar-nova-games-logo-512w.webp`                                | `7ffb7a816373…` | byte-identical copy                                    | approved                                             |
| `/media/studio/oar-nova-logo-1024.webp`    | OAR-NOVA-Games/Chista @ `418bf4d` | `apps/web/public/assets/chista/studio/oar-nova-games-logo-1024w.webp`                               | `5f9dbae60c98…` | byte-identical copy                                    | approved                                             |
| `/media/dooma/logo-512.webp`               | OAR-NOVA-Games/Dooma @ `914d20b`  | `images/logo.png`                                                                                   | `449f472ab96e…` | resize width 512, webp lossless                        | official-runtime-asset; owner confirmation requested |
| `/media/dooma/logo-1024.webp`              | OAR-NOVA-Games/Dooma @ `914d20b`  | `images/logo.png`                                                                                   | `449f472ab96e…` | webp lossless                                          | official-runtime-asset; owner confirmation requested |
| `/media/dooma/field-480.webp`              | OAR-NOVA-Games/Dooma @ `914d20b`  | `images/LoadingBackground.png`                                                                      | `78f783782b13…` | resize width 480, webp q82                             | official-runtime-asset; owner confirmation requested |
| `/media/dooma/field-941.webp`              | OAR-NOVA-Games/Dooma @ `914d20b`  | `images/LoadingBackground.png`                                                                      | `78f783782b13…` | webp q82                                               | official-runtime-asset; owner confirmation requested |
| `/media/chista/logo-400.webp`              | OAR-NOVA-Games/Chista @ `418bf4d` | `apps/web/public/assets/chista/brand/logo-horizontal-400w.webp`                                     | `0ae29596b086…` | byte-identical copy                                    | approved                                             |
| `/media/chista/logo-800.webp`              | OAR-NOVA-Games/Chista @ `418bf4d` | `apps/web/public/assets/chista/brand/logo-horizontal-800w.webp`                                     | `76002b3cd52c…` | byte-identical copy                                    | approved                                             |
| `/media/chista/night-1920.webp`            | OAR-NOVA-Games/Chista @ `418bf4d` | `apps/web/public/assets/chista/splash/default-night/default-night-desktop-landscape-1920x1080.webp` | `f52ef1efa939…` | byte-identical copy                                    | approved                                             |
| `/media/chista/night-960.webp`             | OAR-NOVA-Games/Chista @ `418bf4d` | `apps/web/public/assets/chista/splash/default-night/default-night-desktop-landscape-1920x1080.webp` | `f52ef1efa939…` | resize width 960, webp q80                             | approved                                             |
| `/media/chista/night-portrait-540.webp`    | OAR-NOVA-Games/Chista @ `418bf4d` | `apps/web/public/assets/chista/splash/default-night/default-night-mobile-portrait-1080x1920.webp`   | `95318ba778d9…` | resize width 540, webp q80                             | approved                                             |
| `/media/chista/night-portrait-720.webp`    | OAR-NOVA-Games/Chista @ `418bf4d` | `apps/web/public/assets/chista/splash/default-night/default-night-mobile-portrait-1080x1920.webp`   | `95318ba778d9…` | resize width 720, webp q74                             | approved                                             |
| `/media/yarizan/logo-horizontal-1600.webp` | osameh15/YariZan @ `30ffa05`      | `docs/YariZan_Brand_Kit_v1/05_Web/YariZan_Horizontal_1600w.webp`                                    | `708ad4ca30e6…` | byte-identical copy                                    | approved                                             |
| `/media/yarizan/logo-horizontal-800.webp`  | osameh15/YariZan @ `30ffa05`      | `docs/YariZan_Brand_Kit_v1/05_Web/YariZan_Horizontal_1600w.webp`                                    | `708ad4ca30e6…` | resize width 800, webp lossless                        | approved                                             |
| `/media/yarizan/logo-primary-1024.webp`    | osameh15/YariZan @ `30ffa05`      | `docs/YariZan_Brand_Kit_v1/05_Web/YariZan_Primary_1024w.webp`                                       | `f9ba20588da2…` | byte-identical copy                                    | approved                                             |
| `/media/yarizan/logo-primary-512.webp`     | osameh15/YariZan @ `30ffa05`      | `docs/YariZan_Brand_Kit_v1/05_Web/YariZan_Primary_1024w.webp`                                       | `f9ba20588da2…` | resize width 512, webp lossless                        | approved                                             |
| `/media/og/studio.png`                     | OAR-NOVA-Games/Chista @ `418bf4d` | `apps/web/public/assets/chista/studio/oar-nova-games-logo-1024w.webp`                               | `5f9dbae60c98…` | logo scaled to height 420, centred on #10100f 1200x630 | derived from approved                                |
| `/media/og/dooma.png`                      | OAR-NOVA-Games/Dooma @ `914d20b`  | `images/logo.png`                                                                                   | `449f472ab96e…` | logo scaled to height 560, centred on #0a1720 1200x630 | derived; owner confirmation requested                |
| `/media/og/chista.jpg`                     | OAR-NOVA-Games/Chista @ `418bf4d` | `apps/web/public/assets/chista/splash/default-night/default-night-desktop-landscape-1920x1080.webp` | `f52ef1efa939…` | cover crop 1200x630, jpeg q84                          | derived from approved                                |
| `/media/og/yarizan.png`                    | osameh15/YariZan @ `30ffa05`      | `docs/YariZan_Brand_Kit_v1/05_Web/YariZan_Horizontal_1600w.webp`                                    | `708ad4ca30e6…` | logo scaled to height 360, centred on #f3ecdc 1200x630 | derived from approved                                |
| `/media/icons/apple-touch-icon.png`        | OAR-NOVA-Games/Chista @ `418bf4d` | `docs/brand/studio/oar-nova-games-logo-1024.png`                                                    | `7ded70bab5d9…` | logo on #10100f square 180px                           | derived from approved                                |
| `/media/icons/favicon-48.png`              | OAR-NOVA-Games/Chista @ `418bf4d` | `docs/brand/studio/oar-nova-games-logo-1024.png`                                                    | `7ded70bab5d9…` | logo on #10100f square 48px                            | derived from approved                                |

## Reviewed and deliberately NOT published

| Candidate                                                                         | Reason                                                                                                                                         | Needed to use it                                                                         |
| --------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| Dooma `images/Banner.png`                                                         | Carries a "download now" call to action and Google Play / Cafe Bazaar badges. Publishing it would claim availability that does not exist.      | A marketing render without store badges, or explicit owner approval once the game ships. |
| Dooma `images/Loading Screen.png`, `images/Logo Variants.png`                     | Composition studies; the Dooma visual identity kit is "ready for Art Director review, not artistically approved".                              | Art Director approval.                                                                   |
| YariZan `docs/Images/phase4-premium/*` (incl. `20-home-1440.png`)                 | Development screenshots of the storefront showing prices and phone numbers; the brief marks them "development capture, owner review required". | Owner-approved, customer-safe screenshots.                                               |
| YariZan `docs/YariZan_Brand_Kit_v1/07_Banner/Persian Kids Learning Adventure.png` | Not listed in the brand kit README (folders 01–06 are documented); contains product claims.                                                    | Owner confirmation that the banner is approved for public marketing.                     |
| Chista Core asset                                                                 | Marked provisional in `docs/brand/README.md`.                                                                                                  | Final Core pack.                                                                         |

## Status values

- `approved` — documented as approved in the source repository (Chista brand README, YariZan brand kit v1, studio logo).
- `official-runtime-asset; owner confirmation requested` — the file ships in the product (Dooma `images/logo.png`
  is byte-identical to `Frontend/.../Brand/Runtime/DoomaLogo.png`; `LoadingBackground.png` is the in-game loading
  background) but no document explicitly approves it for marketing. **Owner confirmation is a merge gate.**
- `derived from approved` — generated from an approved source as described in the transform column.
