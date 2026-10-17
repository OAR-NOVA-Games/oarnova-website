# Architecture

## Shape

One Nuxt 4 application rendered entirely at build time (`nuxt generate`, Nitro `static` preset).
The output in `.output/public` is served by Caddy behind Traefik and the Pars Pack CDN.
There is no runtime API, no server code, no client-side data fetching beyond Nuxt's own
prerendered `_payload.json` files for client-side navigation.

```
content (typed TS)  ─┐
copy EN/FA          ─┼─> Vue pages/components ─> nuxt generate ─> scripts/postbuild.mjs ─> .output/public ─> artifact
media + manifest    ─┘                                               (404s, CSP, sitemap)
```

## Routing

- Pages live once in `app/pages/`. The `pages:extend` hook in `nuxt.config.ts` clones every route
  under `/fa/` (`fa-<name>`). Locale is derived from the path (`useLocale`), never from a cookie or
  `Accept-Language`, so URLs are stable and shareable.
- All routes are listed in `scripts/routes.mjs` (shared by Nuxt prerender, sitemap, checks and tests).
  Canonical URLs use a trailing slash.
- Unknown paths: `app/pages/[...slug].vue` (static server) and `app/error.vue` (client navigation)
  render the same `NotFound` view. Build-time copies become `/404.html` and `/fa/404.html`.

## Post-build (`scripts/postbuild.mjs`)

1. Publishes the prerendered not-found views as `404.html` / `fa/404.html`; removes Nuxt's SPA shell `200.html`.
2. Moves each executable inline `<script>` into `/_nuxt/inline.<sha256>.js` (production CSP is
   `script-src 'self'`; Nuxt's import map is disabled via `experimental.entryImportMap: false`).
3. Writes `sitemap.xml` (with hreflang alternates) and `version.json` (package version, commit, commit time).

## Determinism

`buildId` is the git commit SHA, `version.json` uses commit time, and `scripts/artifact.mjs` creates a
sorted, owner-0, fixed-mtime tar compressed with `gzip -n`. CI builds twice and compares the archive hash.

## Client JavaScript

Vue hydration + router for instant page transitions; GSAP and ScrollTrigger are dynamically imported
on the client only (separate chunk) by `useMotion`. The site is complete without JavaScript.

## Decisions

- **No `@nuxtjs/i18n`.** Two languages, path prefix only: a 15-line hook plus typed dictionaries is
  smaller and gives exact control over static routes, `lang`/`dir` and hreflang.
- **No `@nuxt/image`.** Derivatives are produced once by `scripts/import-assets.mjs` (sharp) and
  committed with checksums; nothing is transformed at build or request time.
- **No CMS / database.** Content changes are code review changes.
