# Localization

|            | English                      | Persian                                              |
| ---------- | ---------------------------- | ---------------------------------------------------- |
| Prefix     | `/`                          | `/fa/`                                               |
| `<html>`   | `lang="en" dir="ltr"`        | `lang="fa" dir="rtl"`                                |
| Copy       | `app/content/copy.ts` → `en` | same file → `fa` (typed as `Copy`, must match shape) |
| Game facts | `games.ts` → `facts.en`      | `facts.fa`                                           |
| Font       | Archivo / Instrument Serif   | Vazirmatn                                            |
| Digits     | Latin                        | Persian (`useLocale().num`)                          |

- Every page exists in both languages and is prerendered (`scripts/routes.mjs`).
- The language switch links to the same page in the other language (`switchPath`); from a missing page
  it links to the other language's home. It is a real link (crawlable, works without JS) with `hreflang`
  and `lang` attributes and a `title` hint.
- No automatic redirect by browser language or IP.
- RTL is handled with logical CSS properties (`inset-inline`, `padding-inline-start`, …). Directional
  arrows switch (`→`/`←`); logos, the orbit and Dooma geometry are not mirrored.
- Latin strings inside Persian (e-mail addresses, game hosts, the studio wordmark) carry `dir="ltr"`/`lang="en"`.
- Tests: `tests/unit/copy.test.ts` (shape parity, no empty strings, Persian script, banned claims),
  `tests/e2e/navigation.spec.ts` (switch preserves page, back/forward), `pages.spec.ts` (lang/dir per route).

## Editing copy

Change both languages in the same commit. Product facts must be verifiable in the product repositories;
dates, availability, prices, downloads and store links are not published until the owner confirms them.
