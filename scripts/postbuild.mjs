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

async function* htmlFiles(dir) {
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, e.name)
    if (e.isDirectory()) yield* htmlFiles(p)
    else if (e.name.endsWith('.html')) yield p
  }
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

const git = (cmd) => {
  try {
    return execSync(`git ${cmd}`, { encoding: 'utf8' }).trim()
  } catch {
    return 'unknown'
  }
}
const pkg = JSON.parse(await readFile('package.json', 'utf8'))
await writeFile(
  join(out, 'version.json'),
  JSON.stringify({ name: pkg.name, version: pkg.version, commit: git('rev-parse HEAD'), committedAt: git('log -1 --format=%cI') }, null, 2) + '\n',
)

console.log(`postbuild: 404 pages published, ${moved} inline scripts externalized, ${siteRoutes.length * 2} sitemap URLs`)
