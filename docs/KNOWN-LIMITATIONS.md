# Known limitations and open decisions

## Owner decisions (resolved at Gate A, 2026-10-17)

1. **Assets** — studio, Chista and YariZan branding and the Dooma logo and loading background are approved for
   publication ([ASSET-PROVENANCE.md](ASSET-PROVENANCE.md)). The Dooma banner and YariZan product screenshots
   stay excluded.
2. **Copy** — design and bilingual editorial content approved for v1.0.0. Taglines: _Different worlds. One spark._ /
   «جهان‌ها گوناگون‌اند؛ جرقه یکی است.» (the earlier provisional Persian line is not used).
3. **Game statuses** — Dooma "In development", Chista "In development", YariZan "Coming soon". No CTA promises
   availability; external links go only to the permanent game sites.

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

- **Screen-reader pass not performed** (tracked in [issue #2](https://github.com/OAR-NOVA-Games/oarnova-website/issues/2)). NVDA is not installed on the review machine and no VoiceOver device was
  available. Substitute evidence: the Chrome accessibility tree of the English home page and a Persian game page
  was reviewed (landmarks, single h1, labelled regions, localized names, link purposes), axe passes on every page,
  and keyboard flows are tested. A real NVDA/VoiceOver pass in both languages remains open.
- `/__not-found__/_payload.json` is published (needed by the hydrating 404 page); harmless, `noindex`.
- Studio logo favicon is thin line art and reads weakly at 16–48 px; a dedicated icon would need owner artwork.
