# SEO

- **Prerendered HTML** for all 14 public routes; content does not depend on JavaScript.
- **Per page** (`useSeo`): localized `<title>` and description, `canonical` (self, trailing slash),
  `alternate hreflang` for `en`, `fa`, `x-default` (English), Open Graph (title, description, url,
  image 1200×630, `og:locale` + alternate), Twitter `summary_large_image`, `robots: index, follow`.
- **404 pages**: `noindex, follow`, no canonical, real 404 status from the server.
- **Structured data**: `Organization` + `WebSite` (`inLanguage` en, fa) graph on the home page; `VideoGame` (name, alternate Persian name,
  official URL, language, author) on each game page. No ratings, offers, release dates or availability —
  none are factual yet.
- **sitemap.xml**: 14 URLs, each with hreflang alternates and `<lastmod>` = release commit date (`scripts/postbuild.mjs`).
- **robots.txt**: allow all, sitemap reference.
- **Social images**: `/media/og/{studio,dooma,chista,yarizan}` built from approved assets.
- Headings: exactly one `h1` per page (checked by `check-dist` and E2E), chapters are `h2`.
- Checked by `scripts/check-dist.mjs` and `tests/e2e/static.spec.ts`.

## Launch: getting indexed (owner steps, after the production cut-over)

Indexing only makes sense once the new site is live; submitting earlier would index the Coming Soon page.
Verification needs either a DNS record or a file on the live site, so these steps belong to the owner
(or are done with the owner's explicit authorization for each DNS/production change).

1. **Google Search Console — Domain property (recommended).** Add property `oarnova.games` (type _Domain_).
   It covers apex, `www` and every game subdomain. Add the TXT record Google shows at the DNS provider
   for `oarnova.games`, wait for propagation, click _Verify_. Alternative without DNS: a _URL-prefix_
   property for `https://oarnova.games/` verified with Google's HTML file, which then has to be added to
   `public/` and shipped in a release.
2. **Submit the sitemap:** _Sitemaps_ → `https://oarnova.games/sitemap.xml` (14 URLs, EN + FA with hreflang).
3. **Request indexing** for `https://oarnova.games/` and `https://oarnova.games/fa/` with _URL inspection_;
   the rest is discovered from the sitemap and internal links.
4. **Bing Webmaster Tools:** _Import from Google Search Console_ (same verification), which also covers
   DuckDuckGo and Yahoo results.
5. **Check after 3–7 days:** _Pages_ report (indexed vs. excluded), _Enhancements_ (structured data), and
   that `site:oarnova.games` shows English and Persian results. The legacy placeholder has no other URLs,
   so no redirects or removals are needed.

The site already allows crawling (`robots.txt`), emits canonical/hreflang/Open Graph/JSON-LD and returns
real 404s, so no code change is needed for indexing.
