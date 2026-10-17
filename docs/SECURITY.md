# Security

## Surface

The site is static: HTML, CSS, JavaScript and images served read-only by Caddy. There is no server
code, no form, no cookie, no authentication, no third-party script, font or analytics, and no
outbound request from the browser except to this origin. External links are the three permanent
game sites and `mailto:` addresses (checked by `check-dist` and E2E).

## Headers (production, from Traefik)

`csp-static` (`default-src 'self'; script-src 'self'; …; frame-ancestors 'none'`), HSTS, `nosniff`,
`frame-deny`, `strict-origin-when-cross-origin`, restrictive `Permissions-Policy`. The build is
written to run under this CSP without `'unsafe-inline'` scripts; E2E applies the same CSP and fails on
any violation.

## Repository hygiene

- gitleaks scans the full history in CI (pinned release, checksum verified). Local run on
  2026-10-17: 14 commits scanned, **no leaks found**.
- No `.env`, keys or credentials are needed to build. GitHub Actions has a read-only token
  (`contents: write` only in the manual release workflow) and no deployment secrets.
- Brand assets are limited to the approved, public-safe set in `assets/asset-manifest.json`;
  development screenshots with prices or phone numbers were deliberately excluded.

## Dependency audit (2026-10-17)

`npm audit` reports two **high** advisories, both in build/dev tooling only:

| Package            | Path                                              | Advisory                                                                    | Shipped to visitors?                                   |
| ------------------ | ------------------------------------------------- | --------------------------------------------------------------------------- | ------------------------------------------------------ |
| `braces@3.0.3`     | `nuxt → nitropack → globby → micromatch → braces` | GHSA-vfj7-8cjw-p6xm (ReDoS-style stack exhaustion on crafted glob patterns) | No — used while building to match file globs we author |
| `node-forge@1.4.0` | `nuxt → nitropack → listhen → node-forge`         | GHSA-86w9-cpqp-85rv (RSA signature verification)                            | No — used only by the dev server for self-signed HTTPS |

Both list every version as affected (no patched release). `npm audit fix` changes nothing; the
suggested `--force` path downgrades Nuxt to 4.1.3 and is not a fix. CI therefore blocks on
**critical** advisories, prints the full report, and blocks newly introduced high-severity
dependencies in pull requests via dependency review. Dependabot will raise updates when patches exist.
