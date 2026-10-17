# Known limitations and open decisions

## Owner decisions (merge gates)

1. **Dooma assets** — `images/logo.png` and `images/LoadingBackground.png` are official runtime files
   but not documented as marketing-approved. Confirm, or supply approved marketing art.
2. **Copy** — all English and Persian copy is new editorial copy written for this site. The tagline
   _Different worlds. One spark._ / «جهان‌های متفاوت، یک جرقهٔ مشترک.» is provisional.
3. **Game statuses** — Dooma "In development" (repo: initialization phase), Chista "In development"
   (web, Android planned), YariZan "Coming soon" (new edition in preparation; a legacy 1.1.0 Windows
   release exists on GitHub and is intentionally not linked). Confirm the labels.
4. **YariZan imagery** — no product screenshot is shown; candidates contain prices/phone numbers or
   lack documented approval ([ASSET-PROVENANCE.md](ASSET-PROVENANCE.md)).

## Technical

- **Mailboxes** `info@` / `support@oarnova.games` are displayed and linked but not provisioned yet.
  The site makes no delivery or response-time promise.
- **Game subdomains** may not resolve yet; links are permanent by design and need no rebuild later.
- **CDN 404 bodies**: unless "Show Origin Server Errors" is enabled on the CDN, visitors may see the
  CDN's error page instead of the site's 404 page (status remains 404).
- **Persian line breaking** of very large display type is tuned for the tested widths (390/820/1440);
  unusual widths may produce less balanced line breaks.
- **Font preloading** is not used (Fontsource splits by unicode-range; preloading all subsets would
  waste bytes). First paint may show the system fallback briefly (`font-display: swap`).
- **Lighthouse** is measured manually (see the PR report); it is not a CI gate because results on shared
  runners are noisy.
- **Screen-reader pass** (NVDA/VoiceOver, EN and FA) not yet performed.
- `/__not-found__/_payload.json` is published (needed by the hydrating 404 page); harmless, `noindex`.
- Studio logo favicon is thin line art and reads weakly at 16–48 px; a dedicated icon would need owner artwork.
