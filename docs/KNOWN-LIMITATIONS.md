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
- **Fonts**: only the display face of the page language is preloaded (Archivo latin for EN, Vazirmatn
  arabic for FA); other subsets load on demand with `font-display: swap`.
- **Mobile Lighthouse performance below 90 on some pages** (exception, measured 2026-10-17, Lighthouse
  12.8.2, default mobile emulation = simulated slow 4G + 4× CPU, served by Caddy 2.11.7 with
  compression on localhost):

  | Page                 | Mobile perf | LCP    | Desktop perf |
  | -------------------- | ----------- | ------ | ------------ |
  | `/`                  | 87          | 3.65 s | 100          |
  | `/fa/`               | 85          | 3.77 s | 99           |
  | `/games/`            | 90          | 3.46 s | 100          |
  | `/games/chista/`     | 83          | 4.38 s | 99           |
  | `/fa/games/yarizan/` | 87          | 3.62 s | 99           |
  | `/about/`            | 94          | 2.85 s | 100          |
  | `/fa/contact/`       | 92          | 2.86 s | 100          |

  Accessibility, Best Practices and SEO are 100 on all 14 runs; CLS ≤ 0.023; TBT ≤ 27 ms.
  The LCP element is the display headline (or the Chista art), and its render waits for the 90 KB
  variable display font (two axes) under the simulated 1.6 Mbit/s link. Not hidden by animation on
  phones. Remaining options, each an owner trade-off: subset the display font to the glyphs used
  (~-50 %, adds a font build step), switch the display face to `font-display: optional` (first visit
  may render the fallback face), or reduce hero type to a static instance. Lighthouse is not a CI gate
  because shared-runner results are noisy.

- **Screen-reader pass** (NVDA/VoiceOver, EN and FA) not yet performed.
- `/__not-found__/_payload.json` is published (needed by the hydrating 404 page); harmless, `noindex`.
- Studio logo favicon is thin line art and reads weakly at 16–48 px; a dedicated icon would need owner artwork.
