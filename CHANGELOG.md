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
