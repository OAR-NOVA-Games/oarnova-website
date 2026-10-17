#!/usr/bin/env bash
# HTTP smoke test of a running static server (Caddy in CI, or scripts/serve.mjs).
# Usage: scripts/smoke.sh http://127.0.0.1:8080
set -euo pipefail
base=${1:?usage: smoke.sh <base-url>}
fail=0
c() { curl -s --max-time 10 "$@"; }
chk() { if [ "$2" = "$1" ]; then echo "PASS $3 ($2)"; else echo "FAIL $3 (want '$1' got '$2')"; fail=1; fi; }

for p in / /games/ /games/dooma/ /games/chista/ /games/yarizan/ /about/ /contact/ \
         /fa/ /fa/games/ /fa/games/dooma/ /fa/games/chista/ /fa/games/yarizan/ /fa/about/ /fa/contact/; do
  chk 200 "$(c -o /dev/null -w '%{http_code}' "$base$p")" "status $p"
done

chk 404 "$(c -o /dev/null -w '%{http_code}' "$base/no/such/page")" "404 status (en)"
c "$base/no/such/page" | grep -Eq '<html +lang="en" dir="ltr"' && echo "PASS 404 body (en)" || { echo "FAIL 404 body (en)"; fail=1; }
chk 404 "$(c -o /dev/null -w '%{http_code}' "$base/fa/no/such/page")" "404 status (fa)"
c "$base/fa/no/such/page" | grep -Eq '<html +lang="fa" dir="rtl"' && echo "PASS 404 body (fa)" || { echo "FAIL 404 body (fa)"; fail=1; }

redir=$(c -o /dev/null -w '%{http_code} %{redirect_url}' "$base/games/dooma")
case "$redir" in 30[178]\ */games/dooma/) echo "PASS trailing-slash redirect ($redir)" ;; *) echo "FAIL trailing-slash redirect ($redir)"; fail=1 ;; esac

asset=$(c "$base/" | grep -o '/_nuxt/[^"]*\.js' | head -1)
c -D - -o /dev/null "$base$asset" | grep -qi '^cache-control: public, max-age=31536000, immutable' && echo "PASS immutable $asset" || { echo "FAIL immutable $asset"; fail=1; }
c -D - -o /dev/null "$base/games/" | grep -qi '^cache-control: public, max-age=300' && echo "PASS html cache /games/" || { echo "FAIL html cache /games/"; fail=1; }
for p in /_nuxt/builds/latest.json /version.json; do
  c -D - -o /dev/null "$base$p" | grep -qi '^cache-control: no-cache' && echo "PASS revalidated $p" || { echo "FAIL revalidated $p"; fail=1; }
done
for p in /_payload.json /fa/games/_payload.json /sitemap.xml; do
  c -D - -o /dev/null "$base$p" | grep -qi '^cache-control: public, max-age=300' && echo "PASS short cache $p" || { echo "FAIL short cache $p"; fail=1; }
done
chk 200 "$(c -o /dev/null -w '%{http_code}' "$base/sitemap.xml")" "sitemap"
chk 200 "$(c -o /dev/null -w '%{http_code}' "$base/robots.txt")" "robots"
c "$base/version.json" | grep -q '"commit"' && echo "PASS version.json" || { echo "FAIL version.json"; fail=1; }

exit "$fail"
