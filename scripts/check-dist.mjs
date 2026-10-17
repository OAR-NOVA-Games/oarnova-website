// Static output gate for .output/public. Fails (exit 1) when:
//  - a required route, 404 page, sitemap or robots file is missing
//  - a page lacks lang/dir, title, description, canonical or hreflang alternates
//  - an executable inline <script> remains (production CSP is script-src 'self')
//  - a local href/src/srcset does not resolve to a file
//  - an external URL other than the permanent game sites appears in a page
import { readdir, readFile, stat } from 'node:fs/promises'
import { join } from 'node:path'
import { allRoutes, siteUrl } from './routes.mjs'

const out = process.argv[2] ?? '.output/public'
const allowedExternal = new Set(['https://dooma.oarnova.games', 'https://chista.oarnova.games', 'https://yarizan.oarnova.games'])
const errors = []
const fail = (msg) => errors.push(msg)
const exists = async (p) => (await stat(p).catch(() => null))?.isFile() ?? false

const pages = [...allRoutes.map((r) => [r, join(out, r, 'index.html')]), ['/404.html', join(out, '404.html')], ['/fa/404.html', join(out, 'fa/404.html')]]

for (const f of ['sitemap.xml', 'robots.txt', 'version.json']) if (!(await exists(join(out, f)))) fail(`missing ${f}`)

for (const [route, file] of pages) {
  if (!(await exists(file))) {
    fail(`${route}: missing ${file}`)
    continue
  }
  const html = await readFile(file, 'utf8')
  const fa = route.startsWith('/fa/')
  const is404 = route.endsWith('404.html')

  if (
    !html.includes(`<html lang="${fa ? 'fa' : 'en'}" dir="${fa ? 'rtl' : 'ltr'}"`) &&
    !new RegExp(`<html\\s+lang="${fa ? 'fa' : 'en'}" dir="${fa ? 'rtl' : 'ltr'}"`).test(html)
  )
    fail(`${route}: wrong or missing lang/dir`)
  if (!/<title>[^<]{10,}<\/title>/.test(html)) fail(`${route}: missing title`)
  if (!/<meta name="description" content="[^"]{20,}"/.test(html)) fail(`${route}: missing description`)
  if (!(html.match(/<h1[\s>]/g)?.length === 1)) fail(`${route}: expected exactly one <h1>`)

  if (is404) {
    if (!html.includes('content="noindex, follow"')) fail(`${route}: 404 must be noindex`)
  } else {
    const canonical = `${siteUrl}${route}`
    if (!html.includes(`<link rel="canonical" href="${canonical}">`)) fail(`${route}: canonical != ${canonical}`)
    for (const lang of ['en', 'fa', 'x-default']) if (!html.includes(`hreflang="${lang}"`)) fail(`${route}: missing hreflang ${lang}`)
    if (!html.includes('property="og:image"')) fail(`${route}: missing og:image`)
  }

  for (const m of html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/g)) {
    const [, attrs, body] = m
    if (/\bsrc=/.test(attrs)) continue
    if (/type="application\/(ld\+)?json"/.test(attrs)) continue
    if (body.trim()) fail(`${route}: executable inline script: ${body.slice(0, 60)}`)
  }

  const refs = new Set()
  for (const m of html.matchAll(/\s(?:href|src)="([^"#]+)"/g)) refs.add(m[1])
  for (const m of html.matchAll(/\ssrcset="([^"]+)"/g)) for (const part of m[1].split(',')) refs.add(part.trim().split(/\s+/)[0])
  for (const ref of refs) {
    if (ref.startsWith('mailto:')) {
      if (!['mailto:info@oarnova.games', 'mailto:support@oarnova.games'].includes(ref)) fail(`${route}: unexpected ${ref}`)
      continue
    }
    if (/^https?:\/\//.test(ref)) {
      if (ref.startsWith(siteUrl) || allowedExternal.has(ref)) continue
      fail(`${route}: unexpected external URL ${ref}`)
      continue
    }
    if (!ref.startsWith('/')) continue
    const path = ref.split('?')[0]
    const target = path.endsWith('/') ? join(out, path, 'index.html') : join(out, path)
    if (!(await exists(target))) fail(`${route}: broken local reference ${ref}`)
  }
}

// oarnova-infrastructure/scripts/validate.sh rejects CRLF in tracked files.
async function* textFiles(dir) {
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, e.name)
    if (e.isDirectory()) yield* textFiles(p)
    else if (/\.(html|js|css|json|xml|txt)$/.test(e.name)) yield p
  }
}
for await (const f of textFiles(out)) if ((await readFile(f)).includes(13)) fail(`${f}: contains CR (CRLF line endings)`)

const sitemap = await readFile(join(out, 'sitemap.xml'), 'utf8').catch(() => '')
const locs = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1])
if (locs.length !== allRoutes.length) fail(`sitemap has ${locs.length} URLs, expected ${allRoutes.length}`)

if (errors.length) {
  console.error(errors.map((e) => `FAIL ${e}`).join('\n'))
  process.exit(1)
}
console.log(`check-dist: ${pages.length} pages OK`)
