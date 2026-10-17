# Changelog

## 1.0.0 — unreleased

First implementation of the studio website (Worlds in Motion).

- Bilingual static site: EN at `/`, FA at `/fa/`; Home, Games, Dooma, Chista, YariZan, About, Contact, 404.
- Homepage chapters with distinct compositions for Dooma, Chista and YariZan using approved brand assets.
- GSAP + ScrollTrigger motion system with lifecycle cleanup, reduced-motion, no-JS and failure fallbacks.
- Typed game manifest with permanent URLs; official contact addresses as `mailto:` links.
- SEO: canonical, hreflang, Open Graph, JSON-LD, sitemap, robots, real 404 pages.
- CSP-compatible output (`script-src 'self'`), reproducible versioned artifact.
- Unit, static-output, E2E (3 viewports × 2 languages), axe accessibility and Caddy smoke tests; CI and release workflows.
- Asset provenance manifest and infrastructure handoff.
- Natural Persian copy across all pages; controller-symbol favicon.
- Performance: subset fonts, hero-art preload, smaller header mark (mobile Lighthouse ≥ 91 over HTTP/2).
- Layout audit at eight unusual widths; fixes for 320 px headline/header and ≥ 1920 px hero balance.
- Release workflow: tag must be a version tag on `main` matching `package.json`; reproducibility proven in the run.
