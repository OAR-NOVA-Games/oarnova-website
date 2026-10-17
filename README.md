# OAR NOVA GAMES STUDIO — website

Official website of **OAR NOVA Games Studio**: a bilingual (English / Persian), fully static,
art-directed site for the studio and its games **Dooma**, **Chista** and **YariZan**.
Creative direction: **Worlds in Motion** — *Different worlds. One spark.*

- English: `https://oarnova.games/` · Persian: `https://oarnova.games/fa/`
- Nuxt 4 · Vue 3 · TypeScript (strict) · Tailwind CSS 4 · GSAP + ScrollTrigger · Vitest · Playwright
- Output is plain HTML/CSS/JS/media served by the existing Caddy container. No Node.js server,
  database, form backend, analytics or third-party runtime service.

> Status: pre-release. Nothing here is deployed automatically. Production cut-over is a separate,
> owner-approved change in `oarnova-infrastructure` — see [docs/INFRA-HANDOFF.md](docs/INFRA-HANDOFF.md).

## Quick start

```bash
npm ci                     # Node 24
npm run dev                # http://localhost:3000 (dev server, not production behaviour)
npm run generate           # static site -> .output/public (+ 404 pages, sitemap, CSP-safe scripts)
npm run preview            # serve .output/public like production (http://localhost:4173)
```

## Quality gates

```bash
npm run lint               # ESLint + Prettier
npm run typecheck          # vue-tsc, strict
npm test                   # Vitest unit tests
npm run check:assets       # media files == provenance manifest (SHA-256)
npm run generate && npm run check:dist   # routes, metadata, CSP, links, line endings
npm run test:e2e           # Playwright: EN/FA × desktop/tablet/mobile, GSAP, a11y (axe), 404s
npm run artifact           # reproducible release archive in artifacts/
```

Playwright downloads Chromium; where that is unavailable, use an installed browser:
`PW_CHANNEL=chrome npm run test:e2e`.

## Where things live

| Path | Purpose |
|---|---|
| `app/content/games.ts` | **Single source of truth** for games: permanent URLs, status, facts, logos |
| `app/content/copy.ts` | All English and Persian copy (type-checked parity) |
| `app/composables/` | `useLocale` (routing/locale), `useSeo` (meta, hreflang, JSON-LD), `useMotion` (GSAP lifecycle) |
| `app/components/home/` | Homepage chapters: hero, work, Dooma, Chista, YariZan, belief, contact |
| `app/pages/` | Pages; Persian twins are generated under `/fa/` by `nuxt.config.ts` |
| `app/assets/css/main.css` | Design tokens and base typography |
| `public/media/` | Approved brand assets (see `assets/asset-manifest.json`) |
| `scripts/` | Asset import, post-build, checks, artifact, local server, smoke test |
| `deploy/Caddyfile` | Proposed studio Caddyfile for the infrastructure repository |
| `tests/unit`, `tests/e2e`, `tests/visual` | Vitest, Playwright, review screenshots |

## Documentation

[Architecture](docs/ARCHITECTURE.md) · [Design system](docs/DESIGN-SYSTEM.md) ·
[Motion](docs/MOTION.md) · [Asset provenance](docs/ASSET-PROVENANCE.md) ·
[Localization](docs/LOCALIZATION.md) · [SEO](docs/SEO.md) · [Accessibility](docs/ACCESSIBILITY.md) ·
[Testing](docs/TESTING.md) · [CI/CD](docs/CI-CD.md) · [Infrastructure handoff](docs/INFRA-HANDOFF.md) ·
[Known limitations](docs/KNOWN-LIMITATIONS.md) · [Changelog](CHANGELOG.md)

## Rights

Source code and content © OAR NOVA Games Studio. Game names, logos and artwork belong to their
respective OAR NOVA products and are used here with their documented approval status
([asset provenance](docs/ASSET-PROVENANCE.md)). Fonts: Archivo, Instrument Serif and Vazirmatn
(SIL Open Font License 1.1, via Fontsource). No open-source licence is granted for the brand assets.
