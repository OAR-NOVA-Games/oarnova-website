// Asset integrity gate: every file under public/media must be listed in
// assets/asset-manifest.json with a matching SHA-256, and every manifest entry must exist.
import { createHash } from 'node:crypto'
import { readdir, readFile } from 'node:fs/promises'
import { join, relative } from 'node:path'

const manifest = JSON.parse(await readFile('assets/asset-manifest.json', 'utf8'))
const listed = new Map(manifest.assets.map((a) => [a.file, a]))
const errors = []

async function* walk(dir) {
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, e.name)
    if (e.isDirectory()) yield* walk(p)
    else yield p
  }
}

const seen = new Set()
for await (const p of walk('public/media')) {
  const file = relative('.', p).split('\\').join('/')
  seen.add(file)
  const entry = listed.get(file)
  if (!entry) {
    errors.push(`${file}: not in asset manifest`)
    continue
  }
  const sha = createHash('sha256')
    .update(await readFile(p))
    .digest('hex')
  if (sha !== entry.sha256) errors.push(`${file}: sha256 mismatch`)
  for (const k of ['sourceRepo', 'sourceRevision', 'sourcePath', 'sourceSha256', 'status']) if (!entry[k]) errors.push(`${file}: manifest field ${k} missing`)
}
for (const file of listed.keys()) if (!seen.has(file)) errors.push(`${file}: listed but missing`)

if (errors.length) {
  console.error(errors.map((e) => `FAIL ${e}`).join('\n'))
  process.exit(1)
}
console.log(`check-assets: ${seen.size} files match the manifest`)
