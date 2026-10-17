# Known limitations and open decisions

## Owner decisions (merge gates)

1. **Dooma assets** — `images/logo.png` and `images/LoadingBackground.png` are official runtime files
   but not documented as marketing-approved. Confirm, or supply approved marketing art.
2. **Copy** — all English and Persian copy is new editorial copy written for this site; the Persian was
   rewritten for natural phrasing at the owner's request (2026-10-17). The English tagline is
   _Different worlds. One spark._ The Persian tagline currently reads «جهان‌ها گوناگون‌اند؛ جرقه یکی است.»
   (from that rewrite); the brief's provisional version is «جهان‌های متفاوت، یک جرقهٔ مشترک.». Owner to choose.
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
- **Fonts**: only the display face of the page language is preloaded (Archivo latin for EN, Vazirmatn
  arabic for FA); other subsets load on demand with `font-display: swap`.
- **Mobile Lighthouse.** Measured 2026-10-17 with Lighthouse 12.8.2, default mobile emulation (simulated
  slow 4G, 4× CPU), Chrome, against the production Caddyfile with compression. Two transports:
  HTTP/2 over local TLS (how visitors receive the site through the CDN) and HTTP/1.1 (worst case, six
  connections). "Before" is commit `5c60d07`; "after" adds glyph/axis-subset fonts, hero-art preload,
  a 192 px header mark and no Persian webfont on English pages.

  | Page                 | HTTP/2 before   | HTTP/2 after | HTTP/1.1 after |
  | -------------------- | --------------- | ------------ | -------------- |
  | `/`                  | 93 (LCP 2.96 s) | 98 (2.18 s)  | 90 (3.31 s)    |
  | `/fa/`               | 92 (2.94 s)     | 97 (2.34 s)  | 89 (3.46 s)    |
  | `/games/chista/`     | 87 (3.86 s)     | 93 (3.15 s)  | 88 (3.76 s)    |
  | `/fa/games/yarizan/` | 94 (2.85 s)     | 96 (2.57 s)  | 93 (2.89 s)    |
  | `/games/dooma/`      | 91 (3.33 s)     | 96 (2.70 s)  | 89 (3.47 s)    |
  | `/fa/games/chista/`  | 87 (3.86 s)     | 91 (3.35 s)  | —              |

  Accessibility, Best Practices and SEO are 100 on every run; CLS ≤ 0.003; desktop 98–100. Every page is
  ≥ 90 under the production transport. Remaining LCP on the Chista pages is the approved night artwork
  itself (125 KB at phone size); reducing it further would mean visibly lower image quality. Lighthouse is
  not a CI gate because shared-runner results are noisy.

- **Screen-reader pass not performed.** NVDA is not installed on the review machine and no VoiceOver device was
  available. Substitute evidence: the Chrome accessibility tree of the English home page and a Persian game page
  was reviewed (landmarks, single h1, labelled regions, localized names, link purposes), axe passes on every page,
  and keyboard flows are tested. A real NVDA/VoiceOver pass in both languages remains open.
- `/__not-found__/_payload.json` is published (needed by the hydrating 404 page); harmless, `noindex`.
- Studio logo favicon is thin line art and reads weakly at 16–48 px; a dedicated icon would need owner artwork.
