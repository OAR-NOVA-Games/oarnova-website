# Testing

| Layer              | Command                                                                 | What it proves                                                                                                                                                                                                                   |
| ------------------ | ----------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Unit (Vitest)      | `npm test`                                                              | Permanent game URLs and contact addresses; route list in sync; EN/FA copy shape parity, no empty strings, Persian script, no unverifiable claims; locale path helpers                                                            |
| Asset integrity    | `npm run check:assets`                                                  | Every file in `public/media` is in the manifest with matching SHA-256 and provenance fields                                                                                                                                      |
| Static output      | `npm run generate && npm run check:dist`                                | All routes + both 404s exist; lang/dir, title, description, single h1, canonical, hreflang, og:image; no executable inline scripts; every local reference resolves; only allowed external URLs and mailto; LF only; sitemap size |
| E2E (Playwright)   | `npm run test:e2e`                                                      | Runs against `.output/public` through `scripts/serve.mjs` (production CSP header, 308 slash redirect, real 404s) in three projects: desktop 1440×900, tablet 820×1180, mobile 390×844                                            |
| Caddy smoke        | `bash scripts/smoke.sh <url>`                                           | Same checks against the real Caddy image with `deploy/Caddyfile` (CI job `caddy`)                                                                                                                                                |
| Review screenshots | `npx playwright test --config tests/visual/playwright.visual.config.ts` | Full-page EN/FA captures of every page at three widths → `artifacts/screenshots/` (for human review; not pixel assertions)                                                                                                       |

E2E suites:

- `pages.spec.ts` — every EN/FA route: 200, lang/dir, one visible h1, canonical, no horizontal overflow after
  scrolling through, every image decodes, no console/CSP errors.
- `navigation.spec.ts` — language switch preserves the page (all routes), missing-page fallback,
  back/forward, skip link, header keyboard order, mobile menu (focus, trap, Escape, navigation), touch targets.
- `links.spec.ts` — game CTAs use exactly `https://{dooma,chista,yarizan}.oarnova.games` (new tab, noopener),
  no other external links, contact `mailto:` links visible, no forms, footer addresses.
- `static.spec.ts` — EN/FA 404 status and content, unknown game slug, 308 redirect, robots/sitemap,
  page-specific OG and JSON-LD, cache headers.
- `motion.spec.ts` — GSAP actually runs (contexts, `motion-ready`, inline transforms that settle at rest),
  ScrollTriggers destroyed on client navigation and language switch, no scroll hijacking/pinning,
  reduced-motion path, no-JS path, gate fallback when bundles are blocked.
- `a11y.spec.ts` — axe WCAG 2.1 A/AA on all pages, desktop + mobile; heading names keep word boundaries.
- `widths.spec.ts` — every page at 320, 360, 600, 768, 1024, 1280, 1920 and 2560 px: no page overflow, no
  heading outside the viewport, no text cut by a heading's line mask.

Browsers: CI installs Playwright Chromium. Locally, if the Playwright CDN is unreachable, set
`PW_CHANNEL=chrome` (or `msedge`) to use an installed browser.

Regression policy: every defect fixed during development got a check (e.g. CSP inline scripts →
`check-dist`; 404 payload fetch → `pages`/`static` console-error assertions; label-in-name → axe).
