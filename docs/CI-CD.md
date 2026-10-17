# CI/CD

## `ci.yml` (pull requests, pushes to `main`, manual)

| Job        | Steps                                                                                                                                                                                                                             |
| ---------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `quality`  | `npm ci` (lockfile) → lint (ESLint + Prettier) → typecheck → unit tests → asset manifest check                                                                                                                                    |
| `build`    | generate → `check:dist` → artifact → **clean rebuild must produce a byte-identical archive** → upload `site` and `release-artifact`                                                                                               |
| `e2e`      | download `site` → Playwright Chromium → full E2E suite → review screenshots → upload report + screenshots                                                                                                                         |
| `caddy`    | run `caddy:2.11.7-alpine` (same digest as production, read-only, uid 10001) with `deploy/Caddyfile` → `scripts/smoke.sh`                                                                                                          |
| `security` | gitleaks (pinned release, checksum-verified, full history) → `npm audit --audit-level=critical` (blocking; high findings reviewed in [SECURITY.md](SECURITY.md)) → full audit report → dependency review on PRs (blocks new high) |

All third-party actions are pinned to commit SHAs. Workflow token is read-only.

## `release.yml` (manual, `workflow_dispatch`)

Input: an existing tag. Re-runs all gates on that tag, builds the artifact and attaches it to a **draft**
GitHub Release. Protected by the `release` environment (configure required reviewers = owner).
It never deploys and holds no server credentials.

## Branch protection (to configure on GitHub)

`main`: require PR, require status checks `quality`, `build`, `e2e`, `caddy`, `security`; require
linear history or merge commits as preferred; disallow force pushes and deletions; require review from owner.

## Dependabot

Weekly npm (grouped Nuxt / testing) and GitHub Actions updates.

## Deployment

Out of scope for this repository by design. See [INFRA-HANDOFF.md](INFRA-HANDOFF.md).
