// Post-processing of `nuxt generate` output (.output/public):
//  1. Publish the prerendered not-found views as /404.html and /fa/404.html.
//  2. Move executable inline <script> blocks into hashed external files, so pages
//     run under the production CSP `script-src 'self'` without 'unsafe-inline'.
//  3. Write sitemap.xml (with hreflang alternates) and version.json.
import { createHash } from 'node:crypto'
import { execSync } from 'node:child_process'
import { readdir, readFile, rename, rm, writeFile, mkdir } from 'node:fs/promises'
import { join } from 'node:path'
import { siteRoutes, siteUrl } from './routes.mjs'

const out = '.output/public'

async function* files(dir, test) {
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, e.name)
    if (e.isDirectory()) yield* files(p, test)
    else if (test(e.name)) yield p
  }
}
const htmlFiles = (dir) => files(dir, (n) => n.endsWith('.html'))

const git = (cmd) => {
  try {
    return execSync(`git ${cmd}`, { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }).trim()
  } catch {
    return 'unknown'
  }
}

// 0. Reproducibility: Nuxt stamps the wall clock into build metadata and every payload
//    (`prerenderedAt`). Pin those to the commit time so one commit always builds the same bytes.
const commitMs = Number(git('log -1 --format=%ct')) * 1000 || 0
// Payloads are devalue arrays: [ {…, prerenderedAt: <index>}, …, <timestamp>, … ].
// Only the referenced number is rewritten, in place, so the escaping Nuxt applied is untouched.
const pinPayload = (raw) => {
  const arr = JSON.parse(raw)
  const i = arr?.[0]?.prerenderedAt
  if (typeof i !== 'number' || typeof arr[i] !== 'number') return raw
  return raw.replace(new RegExp(`([,\\[])${arr[i]}(?=[,\\]])`), `$1${commitMs}`)
}
for await (const f of files(join(out, '_nuxt/builds'), (n) => n.endsWith('.json'))) {
  const meta = JSON.parse(await readFile(f, 'utf8'))
  if ('timestamp' in meta) meta.timestamp = commitMs
  await writeFile(f, JSON.stringify(meta))
}
for await (const f of files(out, (n) => n === '_payload.json')) await writeFile(f, pinPayload(await readFile(f, 'utf8')))
for await (const f of htmlFiles(out)) {
  const html = await readFile(f, 'utf8')
  const next = html.replace(
    /(<script type="application\/json"[^>]*id="__NUXT_DATA__"[^>]*>)([\s\S]*?)(<\/script>)/,
    (_m, a, body, b) => a + pinPayload(body) + b,
  )
  if (next !== html) await writeFile(f, next)
}

// 1. 404 pages. Nuxt's own 200.html/404.html are SPA shells; replace them.
await rm(join(out, '200.html'), { force: true })
for (const [from, to] of [
  ['__not-found__', '404.html'],
  ['fa/__not-found__', 'fa/404.html'],
]) {
  // The directory keeps its _payload.json: the hydrating 404 page requests it.
  await rename(join(out, from, 'index.html'), join(out, to))
}

// 2. Externalize inline classic/module scripts. Data blocks (JSON, JSON-LD) are not
//    executed and stay inline; any other typed inline script is caught by check-dist.
const inlineScript = /<script(?![^>]*\bsrc=)(?![^>]*\btype="(?!module"|text\/javascript")[^"]*")([^>]*)>([\s\S]*?)<\/script>/g
await mkdir(join(out, '_nuxt'), { recursive: true })
let moved = 0
for await (const file of htmlFiles(out)) {
  const html = await readFile(file, 'utf8')
  const scripts = []
  const next = html.replace(inlineScript, (_m, attrs, body) => {
    if (!body.trim()) return _m
    const hash = createHash('sha256').update(body).digest('hex').slice(0, 16)
    scripts.push([hash, body])
    return `<script${attrs} src="/_nuxt/inline.${hash}.js"></script>`
  })
  for (const [hash, body] of scripts) await writeFile(join(out, '_nuxt', `inline.${hash}.js`), body)
  if (next !== html) {
    await writeFile(file, next)
    moved += scripts.length
  }
}

// 3. sitemap.xml + version.json
const url = (p) => `${siteUrl}${p}`
const sitemap = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">',
  ...siteRoutes.flatMap((p) =>
    [p, `/fa${p}`].map(
      (loc) =>
        `  <url><loc>${url(loc)}</loc>` +
        `<xhtml:link rel="alternate" hreflang="en" href="${url(p)}"/>` +
        `<xhtml:link rel="alternate" hreflang="fa" href="${url(`/fa${p}`)}"/>` +
        `<xhtml:link rel="alternate" hreflang="x-default" href="${url(p)}"/></url>`,
    ),
  ),
  '</urlset>',
  '',
].join('\n')
await writeFile(join(out, 'sitemap.xml'), sitemap)

const pkg = JSON.parse(await readFile('package.json', 'utf8'))
await writeFile(
  join(out, 'version.json'),
  JSON.stringify({ name: pkg.name, version: pkg.version, commit: git('rev-parse HEAD'), committedAt: git('log -1 --format=%cI') }, null, 2) + '\n',
)

console.log(`postbuild: 404 pages published, ${moved} inline scripts externalized, ${siteRoutes.length * 2} sitemap URLs`)
