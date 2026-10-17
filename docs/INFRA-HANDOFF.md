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
`sitemap.xml`, `robots.txt`, `version.json`, `motion-gate.js`, `_payload.json` files.
LF line endings only (checked), no symlinks, no executables.

## 2. Compatibility with the current stack (verified)

| Concern | Current infra | Result |
|---|---|---|
| CSP `csp-static` (`script-src 'self'`, no inline) | Traefik middleware | Compatible without changes: all executable inline scripts are externalized at build time; E2E runs with this exact CSP header and fails on any console/CSP error. JSON data blocks (`application/json`, `application/ld+json`) are not executed. |
| `img-src 'self' data:` | Traefik | Compatible (one `data:` SVG noise texture in CSS). |
| Fonts | — | Self-hosted woff2 under `/_nuxt/`, `default-src 'self'` suffices. |
| Static Caddy, read-only bind mount `./public:/srv:ro` | `apps/studio/compose.yaml` | Unchanged. |
| Directory URLs `/games/` | Caddy `file_server` | Serves `games/index.html`; `/games` → **308** `/games/` (verified with Caddy 2.11.7). |
| `validate.sh` CRLF / forbidden files | infra CI | Output is LF-only; no `.tgz/.pem/.env` etc. |
| `acceptance-server.sh` `content-matches-repo` (`cmp` of `/`) | server | Still valid: Caddy serves `index.html` byte-for-byte. |
| `acceptance-external.sh` `cdn-content` greps `<h1>OAR NOVA GAMES</h1>` | external | **Will fail** — must be updated in the same infra PR (see §4). |
| infra CI `curl … \| cmp - apps/studio/public/index.html` | infra CI | Still valid. |

## 3. Recommended integration (keeps the existing deploy and rollback model)

The runbook already defines the studio flow: *static files in `apps/studio/public/` → PR →
CI → merge → `scripts/deploy.sh studio`* with automatic rollback when acceptance fails.
Keep it. One reviewed infrastructure PR:

1. **Import the artifact** into `apps/studio/public/`, replacing the Coming Soon page:
   ```bash
   # in an oarnova-infrastructure checkout, on a new branch
   ver=oarnova-website-1.0.0-<sha7>
   gh release download v1.0.0 -R OAR-NOVA-Games/oarnova-website -p "$ver.*"   # or the CI artifact
   test "$(sha256sum "$ver.tar.gz" | cut -d' ' -f1)" = "$(jq -r .archiveSha256 "$ver.json")"
   rm -rf apps/studio/public && mkdir apps/studio/public
   tar -xzf "$ver.tar.gz" -C apps/studio/public --no-same-owner
   (cd apps/studio/public && sha256sum -c --quiet "../../../$ver.SHA256SUMS")
   cp "$ver.json" apps/studio/RELEASE.json   # provenance: which website commit is deployed
   ```
2. **Replace `apps/studio/Caddyfile`** with [`deploy/Caddyfile`](../deploy/Caddyfile) (real 404 status
   with localized bodies, cache rule for directory URLs, immutable cache for `/_nuxt/*`).
   `remote-deploy.sh` already restarts the container when the Caddyfile changes.
3. **Update acceptance checks**:
   - `scripts/acceptance-external.sh`: replace the `cdn-content` grep with
     `grep -q '<title>OAR NOVA Games Studio — Worlds in Motion</title>'` and add
     `chk 200 …/fa/`, `chk 404 …/no-such-page-$R`, and a `version.json` commit check against
     `apps/studio/RELEASE.json`.
   - `scripts/acceptance-server.sh`: keep `cmp` of `/`; optionally add `cmp` of `/fa/` and a 404 status check.
   - infra CI: add the same `/fa/` and 404 checks next to the existing `cmp`.
4. Leave `infrastructure/traefik/dynamic/studio.yml`, `middlewares.yml` (CSP), the YariZan
   routers, CDN, DNS, firewall and origin lockdown **unchanged**. None of them need to change.
5. Merge after review, then deploy with the existing `scripts/deploy.sh studio`.

Alternative (not recommended now): fetch the artifact on the server at deploy time. It adds
a network dependency and a second trust path to the deploy; the current `git archive` bundle
already gives an auditable, SHA-verified record of exactly what is live.

Size note: the artifact is ~5 MB (≈4.2 MB of approved brand media). Committing it to the
infrastructure repo is acceptable at this size; revisit if media grows substantially.

## 4. Cut-over checklist (owner GO required)

- [ ] Owner approves website PR (art direction, copy, assets marked "owner confirmation requested").
- [ ] Release tag created; Release workflow produced the artifact; checksums recorded.
- [ ] Infrastructure PR (§3) reviewed, CI green, merged.
- [ ] `scripts/deploy.sh studio` from up-to-date `main`; server acceptance passes (auto-rollback otherwise).
- [ ] Purge Pars Pack CDN cache (whole zone if hostname-scoped purge is unavailable). HTML max-age is 300 s.
- [ ] External acceptance (`ORIGIN_MODE=locked`) passes, including new `/fa/`, 404 and version checks.
- [ ] **CDN error pages:** confirm the CDN setting "Show Origin Server Errors" is enabled for the
      apex, otherwise the CDN replaces the site's 404 page with its own (runbook B13 notes the same
      for YariZan).
- [ ] Spot-check `https://oarnova.games/`, `/fa/`, `/games/chista/`, a missing URL, `www` → apex redirect.
- [ ] Game subdomains and YariZan unaffected (`acceptance-external.sh` YariZan section).
- [ ] Mailboxes `info@` / `support@oarnova.games` provisioned (the site shows them; it does not
      claim they are operational).

## 5. Rollback

- **Automatic:** `remote-deploy.sh studio` snapshots `apps/studio` to
  `/opt/oarnova/infrastructure/backup/releases/<ts>-studio.tgz` and restores it if acceptance fails.
- **Manual:** revert the infrastructure merge commit and run `scripts/deploy.sh studio` again
  (restores the previous `public/` and Caddyfile), then purge the CDN.
- **Emergency (on server):** `restore_tree` from the latest `<ts>-studio.tgz` as documented in the runbook,
  then `docker compose up -d --force-recreate` in `/opt/oarnova/apps/studio`.
- No data, schema or DNS change is involved; rollback is complete once the previous files are served
  and the CDN cache is purged.

## 6. Explicitly out of scope

No SSH keys or deploy credentials in GitHub Actions. No automatic deployment from any branch,
tag or pull request. No new subdomain, container, port, database, analytics or third-party service.
