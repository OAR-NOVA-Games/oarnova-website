// Local static server for E2E and preview. It mirrors the behaviour proposed for the
// production Caddy container (docs/INFRA-HANDOFF.md) and the Traefik CSP:
//  - /dir      -> 308 /dir/ when dir/index.html exists (Caddy file_server canonical redirect)
//  - /dir/     -> dir/index.html
//  - missing   -> 404 with /fa/404.html under /fa/, else /404.html
//  - headers   -> CSP (csp-static), nosniff, cache policy for hashed assets vs HTML
// Usage: node scripts/serve.mjs [port] [root]
import { createServer } from 'node:http'
import { readFile, stat } from 'node:fs/promises'
import { extname, join, normalize } from 'node:path'

const port = Number(process.argv[2] ?? process.env.PORT ?? 4173)
const root = process.argv[3] ?? '.output/public'

export const CSP =
  "default-src 'self'; img-src 'self' data:; style-src 'self' 'unsafe-inline'; script-src 'self'; object-src 'none'; base-uri 'self'; frame-ancestors 'none'; form-action 'self'"

const types = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json',
  '.xml': 'application/xml',
  '.txt': 'text/plain; charset=utf-8',
  '.webp': 'image/webp',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.woff2': 'font/woff2',
  '.svg': 'image/svg+xml',
}

// Same policy as deploy/Caddyfile.
function cacheControl(path, ext) {
  if (path.startsWith('/_nuxt/builds/') || path === '/version.json') return 'no-cache'
  if (path.startsWith('/_nuxt/')) return 'public, max-age=31536000, immutable'
  if (ext === '.html' || path.endsWith('/_payload.json') || path === '/sitemap.xml' || path === '/robots.txt') return 'public, max-age=300'
  return 'public, max-age=86400'
}

const isFile = async (p) => (await stat(p).catch(() => null))?.isFile() ?? false

createServer(async (req, res) => {
  const url = new URL(req.url ?? '/', 'http://local')
  const path = normalize(decodeURIComponent(url.pathname)).replace(/\\/g, '/')
  if (path.includes('..')) return void res.writeHead(400).end()

  const send = async (file, status = 200) => {
    const ext = extname(file)
    res.writeHead(status, {
      'Content-Type': types[ext] ?? 'application/octet-stream',
      'Content-Security-Policy': CSP,
      'X-Content-Type-Options': 'nosniff',
      'Cache-Control': cacheControl(path, ext),
    })
    res.end(req.method === 'HEAD' ? undefined : await readFile(file))
  }

  const target = join(root, path)
  if (path.endsWith('/') && (await isFile(join(target, 'index.html')))) return send(join(target, 'index.html'))
  if (!path.endsWith('/') && (await isFile(target))) return send(target)
  if (!path.endsWith('/') && (await isFile(join(target, 'index.html')))) {
    res.writeHead(308, { Location: `${path}/${url.search}` })
    return void res.end()
  }
  const fa = path === '/fa' || path.startsWith('/fa/')
  return send(join(root, fa ? 'fa/404.html' : '404.html'), 404)
}).listen(port, () => console.log(`serving ${root} on http://localhost:${port}`))
