// Packs .output/public into a reproducible, versioned release artifact:
//   artifacts/oarnova-website-<version>-<sha7>.tar.gz   site files at the archive root
//   artifacts/oarnova-website-<version>-<sha7>.SHA256SUMS  per-file checksums of the site
//   artifacts/oarnova-website-<version>-<sha7>.json      build info + archive checksum
// Determinism: sorted entries, fixed mtime (commit time), numeric owner 0, gzip -n.
// Requires GNU tar (ubuntu runners, Git for Windows).
import { createHash } from 'node:crypto'
import { execFileSync } from 'node:child_process'
import { mkdir, readdir, readFile, writeFile } from 'node:fs/promises'
import { join, relative } from 'node:path'

const site = '.output/public'
const pkg = JSON.parse(await readFile('package.json', 'utf8'))
const info = JSON.parse(await readFile(join(site, 'version.json'), 'utf8'))
if (!/^[0-9a-f]{40}$/.test(info.commit)) throw new Error('version.json has no commit: build from a git checkout')

const name = `oarnova-website-${pkg.version}-${info.commit.slice(0, 7)}`
await mkdir('artifacts', { recursive: true })

async function* walk(dir) {
  for (const e of (await readdir(dir, { withFileTypes: true })).sort((a, b) => a.name.localeCompare(b.name))) {
    const p = join(dir, e.name)
    if (e.isDirectory()) yield* walk(p)
    else yield p
  }
}

const sha = (buf) => createHash('sha256').update(buf).digest('hex')
const sums = []
for await (const p of walk(site)) sums.push(`${sha(await readFile(p))}  ${relative(site, p).split('\\').join('/')}`)
await writeFile(join('artifacts', `${name}.SHA256SUMS`), sums.join('\n') + '\n')

const tarball = join('artifacts', `${name}.tar.gz`)
const tar = execFileSync(
  'tar',
  [
    '--sort=name',
    `--mtime=${info.committedAt}`,
    '--owner=0',
    '--group=0',
    '--numeric-owner',
    '--mode=u+rwX,go+rX,go-w',
    '--format=gnu',
    '-C',
    site,
    '-cf',
    '-',
    '.',
  ],
  { maxBuffer: 1 << 30 },
)
const gz = execFileSync('gzip', ['-n', '-9'], { input: tar, maxBuffer: 1 << 30 })
await writeFile(tarball, gz)

const build = {
  name,
  version: pkg.version,
  commit: info.commit,
  committedAt: info.committedAt,
  files: sums.length,
  archive: `${name}.tar.gz`,
  archiveSha256: sha(gz),
  archiveBytes: gz.length,
}
await writeFile(join('artifacts', `${name}.json`), JSON.stringify(build, null, 2) + '\n')
console.log(JSON.stringify(build, null, 2))
