# Infrastructure handoff — studio website

Audience: the session/person maintaining `OAR-NOVA-Games/oarnova-infrastructure`.
Status: **proposal**. Nothing in the infrastructure repository, the VPS, the CDN, DNS,
the firewall, Traefik or YariZan has been changed by this project.

Baseline reviewed: `oarnova-infrastructure@3e9d6b0ceb9e2fae4c24623e4f9eb601aa27a031`
(`apps/studio/*`, `infrastructure/traefik/dynamic/{studio,middlewares}.yml`,
`scripts/{deploy,bundle,check-bundle,install-bundle,remote-deploy,validate,acceptance-server,acceptance-external}.sh`,
`docs/runbook.md`, `.github/workflows/ci.yml`).

## 1. What this repository delivers

A versioned static artifact (no server runtime, no database, no new port, no new container):

```
oarnova-website-<version>-<sha7>.tar.gz      site files at the archive root
oarnova-website-<version>-<sha7>.SHA256SUMS  per-file SHA-256 of every site file
oarnova-website-<version>-<sha7>.json        { commit, committedAt, files, archiveSha256, archiveBytes }
```

Produced by `npm ci && npm run generate && npm run check:dist && npm run artifact`, by CI
(`release-artifact` upload on every run) and by the manual **Release artifact** workflow
(draft GitHub Release from a tag). Builds are reproducible: CI rebuilds from scratch and
requires a byte-identical archive.

Contents: `index.html` + `<route>/index.html` for 14 routes (EN at `/`, FA under `/fa/`),
`404.html`, `fa/404.html`, `_nuxt/*` (content-hashed JS/CSS/fonts), `media/*`,
`sitemap.xml`, `robots.txt`, `version.json`, `_payload.json` files.
LF line endings only (checked), no symlinks, no executables.

## 2. Compatibility with the current stack (verified)

| Concern                                                                | Current infra              | Result                                                                                                                                                                                                                                           |
| ---------------------------------------------------------------------- | -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| CSP `csp-static` (`script-src 'self'`, no inline)                      | Traefik middleware         | Compatible without changes: all executable inline scripts are externalized at build time; E2E runs with this exact CSP header and fails on any console/CSP error. JSON data blocks (`application/json`, `application/ld+json`) are not executed. |
| `img-src 'self' data:`                                                 | Traefik                    | Compatible (one `data:` SVG noise texture in CSS).                                                                                                                                                                                               |
| Fonts                                                                  | —                          | Self-hosted woff2 under `/_nuxt/`, `default-src 'self'` suffices.                                                                                                                                                                                |
| Static Caddy, read-only bind mount `./public:/srv:ro`                  | `apps/studio/compose.yaml` | Unchanged.                                                                                                                                                                                                                                       |
| Directory URLs `/games/`                                               | Caddy `file_server`        | Serves `games/index.html`; `/games` → **308** `/games/` (verified with Caddy 2.11.7).                                                                                                                                                            |
| `validate.sh` CRLF / forbidden files                                   | infra CI                   | Output is LF-only; no `.tgz/.pem/.env` etc.                                                                                                                                                                                                      |
| `acceptance-server.sh` `content-matches-repo` (`cmp` of `/`)           | server                     | Still valid: Caddy serves `index.html` byte-for-byte.                                                                                                                                                                                            |
| `acceptance-external.sh` `cdn-content` greps `<h1>OAR NOVA GAMES</h1>` | external                   | **Will fail** — must be updated in the same infra PR (see §4).                                                                                                                                                                                   |
| infra CI `curl … \| cmp - apps/studio/public/index.html`               | infra CI                   | Still valid.                                                                                                                                                                                                                                     |

## 3. Integration — implemented in oarnova-infrastructure PR #24

[OAR-NOVA-Games/oarnova-infrastructure#24](https://github.com/OAR-NOVA-Games/oarnova-infrastructure/pull/24)
(Draft) keeps the existing model: static files in `apps/studio/public/` → PR → CI → merge →
`scripts/deploy.sh studio` with automatic rollback.

| Change                             | Purpose                                                                                                                                                                                                   |
| ---------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `scripts/import-studio-release.sh` | Verifies archive SHA-256, safe tar entries, every per-file checksum, file count and the `version.json` commit, then replaces `apps/studio/public/` and writes `apps/studio/RELEASE.json`. No `jq` needed. |
| `apps/studio/Caddyfile`            | This repository's `deploy/Caddyfile` (real localized 404, bounded HTML cache, immutable hashed `/_nuxt/` bundles, revalidated build manifest and `version.json`).                                         |
| `scripts/acceptance-server.sh`     | EN/FA routes, both 404 bodies, 308 slash redirect, `version.json`, `/healthz` `no-store`, immutable bundle header.                                                                                        |
| `scripts/acceptance-external.sh`   | New `<title>` check replaces the legacy `<h1>`; through-CDN routes, localized 404 bodies (detects CDN substitution), release commit, cache headers.                                                       |
| `.github/workflows/ci.yml`         | Same checks against real Traefik + Caddy in the smoke job; file count vs `RELEASE.json`.                                                                                                                  |
| `scripts/ci-deploy-rollback.sh`    | New scenarios: failed studio cut-over restores the previous site and Caddyfile byte for byte; successful cut-over serves the new site.                                                                    |
| `docs/runbook.md`                  | Import procedure; deploy `host` after `studio` so `oarnova-acceptance-server` matches.                                                                                                                    |

Unchanged: `apps/studio/compose.yaml`, Traefik configuration (routers, CSP, HSTS, `www` → apex), origin
lockdown, monitoring, backups, all YariZan files and routes, `remote-deploy.sh`.

The PR currently carries a **candidate** artifact (`1d79c44`, built by PR CI from GitHub's merge commit)
only so infra CI can test the real site. After Gate B it is replaced with the `v1.0.0` release:

```bash
gh release download v1.0.0 -R OAR-NOVA-Games/oarnova-website -D /tmp/site
scripts/import-studio-release.sh /tmp/site
```

Size: ~3.9 MB compressed (≈3.4 MB brand media), committed to the infrastructure repository, which is also
the documented recovery source for the studio site (`docs/backup-and-dr.md`).

## 4. Cut-over checklist (owner GO required)

- [ ] Gate A — website PR #1 approved (design, copy, assets) and merged; `main` CI green.
- [ ] Gate B — tag `v1.0.0` on that `main` commit; **Release artifact** workflow green; draft release
      holds `.tar.gz`, `.SHA256SUMS`, `.json`; record commit, archive SHA-256 and file count.
- [ ] Gate C — infra PR #24 re-imported from the release (not the candidate), CI green, approved, merged.
- [ ] Gate D — owner, from a clean up-to-date infrastructure checkout:
      `OARNOVA_SSH_KEY="$HOME/.ssh/oarnova_laptop_ed25519" scripts/deploy.sh studio` (server acceptance runs
      inside; automatic rollback on failure), then `scripts/deploy.sh host` (installs the new
      `oarnova-acceptance-server`).
- [ ] `sudo oarnova-acceptance-server` on the server; `ORIGIN_MODE=locked YARIZAN=maintenance scripts/acceptance-external.sh`
      from outside; origin tunnel check where applicable.
- [ ] CDN purge: HTML is `max-age=300`; purge only if stale HTML is observed after five minutes. A whole-zone purge
      (if hostname scope is unavailable) also drops YariZan's cached assets — owner approval required.
- [ ] Browser spot check: `/`, `/fa/`, a game page in each language, a missing URL, console clean.
- [ ] StatusCake: both studio monitors and the SSL monitor green after at least two 5-minute intervals.
- [ ] Mailboxes `info@` / `support@` provisioned (the site shows them; it does not claim they work).

Pre-cutover live baseline (2026-10-17, read-only): `/` 200 legacy page; unknown path 404 with the origin's
empty body (CDN did not substitute an error page); `/healthz` 200 `no-store`.

## 5. Rollback

- **Automatic (tested in infra CI, scenario I):** `remote-deploy.sh studio` snapshots `/opt/oarnova/apps/studio`
  (public/, Caddyfile, compose.yaml) to `/opt/oarnova/infrastructure/backup/releases/<ts>-studio.tgz`; if health or
  acceptance fails it restores the snapshot, recreates the studio container and records `rolled-back`.
- **Manual (post-deploy issue):** revert the infra merge commit on `main`, run `scripts/deploy.sh studio` again
  (restores the Coming Soon page and the previous Caddyfile through the same verified path), purge the CDN if
  needed, re-run both acceptance scripts (the external `cdn-content` check will then expect the new title — run
  the previous revision's script).
- **Emergency (server):** `restore_tree` the latest `<ts>-studio.tgz` as in the runbook, then
  `docker compose up -d --force-recreate` in `/opt/oarnova/apps/studio`.
- None of these touch YariZan, Traefik routing, origin lockdown, database volumes or game infrastructure.

## 6. Explicitly out of scope

No SSH keys or deploy credentials in GitHub Actions. No automatic deployment from any branch,
tag or pull request. No new subdomain, container, port, database, analytics or third-party service.
