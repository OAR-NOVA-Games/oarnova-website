# SEO

- **Prerendered HTML** for all 14 public routes; content does not depend on JavaScript.
- **Per page** (`useSeo`): localized `<title>` and description, `canonical` (self, trailing slash),
  `alternate hreflang` for `en`, `fa`, `x-default` (English), Open Graph (title, description, url,
  image 1200×630, `og:locale` + alternate), Twitter `summary_large_image`, `robots: index, follow`.
- **404 pages**: `noindex, follow`, no canonical, real 404 status from the server.
- **Structured data**: `Organization` on the home page; `VideoGame` (name, alternate Persian name,
  official URL, language, author) on each game page. No ratings, offers, release dates or availability —
  none are factual yet.
- **sitemap.xml**: 14 URLs, each with hreflang alternates (`scripts/postbuild.mjs`).
- **robots.txt**: allow all, sitemap reference.
- **Social images**: `/media/og/{studio,dooma,chista,yarizan}` built from approved assets.
- Headings: exactly one `h1` per page (checked by `check-dist` and E2E), chapters are `h2`.
- Checked by `scripts/check-dist.mjs` and `tests/e2e/static.spec.ts`.
