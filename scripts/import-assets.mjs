// Imports approved brand assets from local exports of the source repositories
// into public/media and records provenance in assets/asset-manifest.json.
//
// Usage: node scripts/import-assets.mjs <export-root>
//   <export-root>/<repo-key>/<path inside source repo>
// Source files are read only; nothing outside public/media and the manifest is written.
import { createHash } from 'node:crypto'
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import sharp from 'sharp'

const root = process.argv[2]
if (!root) {
  console.error('usage: node scripts/import-assets.mjs <export-root>')
  process.exit(2)
}

const sources = {
  chista: { repo: 'OAR-NOVA-Games/Chista', revision: '418bf4d4ffdb58773f84626f82828d2e8cdc752e' },
  dooma: { repo: 'OAR-NOVA-Games/Dooma', revision: '914d20b8c4312666e0258071781bef22026cb50a' },
  yarizan: { repo: 'osameh15/YariZan', revision: '30ffa0580f6f743ee4d5241585b584d1dad6ef1a' },
}

const INK = '#10100f'

// copy: byte-identical; webp: re-encode (lossless keeps every logo pixel); compose: OG/favicon cards.
const jobs = [
  // Studio mark — approved raster, white line art on transparent.
  {
    out: 'studio/oar-nova-logo-512.webp',
    src: 'chista',
    path: 'apps/web/public/assets/chista/studio/oar-nova-games-logo-512w.webp',
    op: 'copy',
    purpose: 'Header and footer studio mark',
    status: 'approved',
  },
  {
    out: 'studio/oar-nova-logo-1024.webp',
    src: 'chista',
    path: 'apps/web/public/assets/chista/studio/oar-nova-games-logo-1024w.webp',
    op: 'copy',
    purpose: 'Large studio mark (About, 404)',
    status: 'approved',
  },

  // Dooma — official logo (identical to Runtime/DoomaLogo.png) and runtime loading background.
  {
    out: 'dooma/logo-512.webp',
    src: 'dooma',
    path: 'images/logo.png',
    op: 'webp',
    width: 512,
    lossless: true,
    purpose: 'Dooma logo on chapter and detail page',
    status: 'official-runtime-asset; owner confirmation requested',
  },
  {
    out: 'dooma/logo-1024.webp',
    src: 'dooma',
    path: 'images/logo.png',
    op: 'webp',
    lossless: true,
    purpose: 'Dooma logo, high density',
    status: 'official-runtime-asset; owner confirmation requested',
  },
  {
    out: 'dooma/field-480.webp',
    src: 'dooma',
    path: 'images/LoadingBackground.png',
    op: 'webp',
    width: 480,
    quality: 82,
    purpose: 'Dooma chapter field (mobile)',
    status: 'official-runtime-asset; owner confirmation requested',
  },
  {
    out: 'dooma/field-941.webp',
    src: 'dooma',
    path: 'images/LoadingBackground.png',
    op: 'webp',
    quality: 82,
    purpose: 'Dooma chapter field (desktop)',
    status: 'official-runtime-asset; owner confirmation requested',
  },

  // Chista — approved raster v1 logo/emblem and Default Night splash.
  {
    out: 'chista/logo-400.webp',
    src: 'chista',
    path: 'apps/web/public/assets/chista/brand/logo-horizontal-400w.webp',
    op: 'copy',
    purpose: 'Chista logo',
    status: 'approved',
  },
  {
    out: 'chista/logo-800.webp',
    src: 'chista',
    path: 'apps/web/public/assets/chista/brand/logo-horizontal-800w.webp',
    op: 'copy',
    purpose: 'Chista logo, high density',
    status: 'approved',
  },
  {
    out: 'chista/night-1920.webp',
    src: 'chista',
    path: 'apps/web/public/assets/chista/splash/default-night/default-night-desktop-landscape-1920x1080.webp',
    op: 'copy',
    purpose: 'Chista chapter art (desktop)',
    status: 'approved',
  },
  {
    out: 'chista/night-960.webp',
    src: 'chista',
    path: 'apps/web/public/assets/chista/splash/default-night/default-night-desktop-landscape-1920x1080.webp',
    op: 'webp',
    width: 960,
    quality: 80,
    purpose: 'Chista chapter art (tablet)',
    status: 'approved',
  },
  {
    out: 'chista/night-portrait-540.webp',
    src: 'chista',
    path: 'apps/web/public/assets/chista/splash/default-night/default-night-mobile-portrait-1080x1920.webp',
    op: 'webp',
    width: 540,
    quality: 80,
    purpose: 'Chista chapter art (phone)',
    status: 'approved',
  },
  {
    out: 'chista/night-portrait-720.webp',
    src: 'chista',
    path: 'apps/web/public/assets/chista/splash/default-night/default-night-mobile-portrait-1080x1920.webp',
    op: 'webp',
    width: 720,
    quality: 74,
    purpose: 'Chista chapter art (phone, high density)',
    status: 'approved',
  },

  // YariZan — approved brand kit v1 web exports.
  {
    out: 'yarizan/logo-horizontal-1600.webp',
    src: 'yarizan',
    path: 'docs/YariZan_Brand_Kit_v1/05_Web/YariZan_Horizontal_1600w.webp',
    op: 'copy',
    purpose: 'YariZan horizontal logo, high density',
    status: 'approved',
  },
  {
    out: 'yarizan/logo-horizontal-800.webp',
    src: 'yarizan',
    path: 'docs/YariZan_Brand_Kit_v1/05_Web/YariZan_Horizontal_1600w.webp',
    op: 'webp',
    width: 800,
    lossless: true,
    purpose: 'YariZan horizontal logo',
    status: 'approved',
  },
  {
    out: 'yarizan/logo-primary-1024.webp',
    src: 'yarizan',
    path: 'docs/YariZan_Brand_Kit_v1/05_Web/YariZan_Primary_1024w.webp',
    op: 'copy',
    purpose: 'YariZan primary logo, high density',
    status: 'approved',
  },
  {
    out: 'yarizan/logo-primary-512.webp',
    src: 'yarizan',
    path: 'docs/YariZan_Brand_Kit_v1/05_Web/YariZan_Primary_1024w.webp',
    op: 'webp',
    width: 512,
    lossless: true,
    purpose: 'YariZan primary logo',
    status: 'approved',
  },

  // Social cards and icons — official marks placed unchanged on flat backgrounds.
  {
    out: 'og/studio.png',
    src: 'chista',
    path: 'apps/web/public/assets/chista/studio/oar-nova-games-logo-1024w.webp',
    op: 'card',
    bg: INK,
    logoHeight: 420,
    purpose: 'Open Graph card (studio pages)',
    status: 'derived from approved',
  },
  {
    out: 'og/dooma.png',
    src: 'dooma',
    path: 'images/logo.png',
    op: 'card',
    bg: '#0a1720',
    logoHeight: 560,
    purpose: 'Open Graph card (Dooma)',
    status: 'derived; owner confirmation requested',
  },
  {
    out: 'og/chista.jpg',
    src: 'chista',
    path: 'apps/web/public/assets/chista/splash/default-night/default-night-desktop-landscape-1920x1080.webp',
    op: 'crop',
    width: 1200,
    height: 630,
    purpose: 'Open Graph card (Chista)',
    status: 'derived from approved',
  },
  {
    out: 'og/yarizan.png',
    src: 'yarizan',
    path: 'docs/YariZan_Brand_Kit_v1/05_Web/YariZan_Horizontal_1600w.webp',
    op: 'card',
    bg: '#f3ecdc',
    logoHeight: 360,
    purpose: 'Open Graph card (YariZan)',
    status: 'derived from approved',
  },
  {
    out: 'icons/favicon-white-32.png',
    src: 'chista',
    path: 'docs/brand/studio/oar-nova-games-logo-1024.png',
    op: 'icon-transparent',
    size: 32,
    purpose: 'Favicon (dark browser UI), white mark on transparent',
    status: 'derived from approved',
  },
  {
    out: 'icons/favicon-white-64.png',
    src: 'chista',
    path: 'docs/brand/studio/oar-nova-games-logo-1024.png',
    op: 'icon-transparent',
    size: 64,
    purpose: 'Favicon high density (dark browser UI)',
    status: 'derived from approved',
  },
  {
    out: 'icons/apple-touch-icon.png',
    src: 'chista',
    path: 'docs/brand/studio/oar-nova-games-logo-1024.png',
    op: 'icon',
    size: 180,
    purpose: 'Apple touch icon',
    status: 'derived from approved',
  },
]

const sha256 = (buf) => createHash('sha256').update(buf).digest('hex')

async function render(job, input) {
  switch (job.op) {
    case 'copy':
      return { buf: input, transform: 'byte-identical copy' }
    case 'webp': {
      let img = sharp(input)
      if (job.width) img = img.resize({ width: job.width })
      const buf = await img.webp(job.lossless ? { lossless: true, effort: 6 } : { quality: job.quality, effort: 6 }).toBuffer()
      return { buf, transform: `${job.width ? `resize width ${job.width}, ` : ''}webp ${job.lossless ? 'lossless' : `q${job.quality}`}` }
    }
    case 'crop': {
      const buf = await sharp(input).resize(job.width, job.height, { fit: 'cover', position: 'centre' }).jpeg({ quality: 84, mozjpeg: true }).toBuffer()
      return { buf, transform: `cover crop ${job.width}x${job.height}, jpeg q84` }
    }
    case 'card': {
      const logo = await sharp(input).resize({ height: job.logoHeight }).toBuffer()
      const buf = await sharp({ create: { width: 1200, height: 630, channels: 3, background: job.bg } })
        .composite([{ input: logo, gravity: 'centre' }])
        .png({ compressionLevel: 9 })
        .toBuffer()
      return { buf, transform: `logo scaled to height ${job.logoHeight}, centred on ${job.bg} 1200x630` }
    }
    case 'icon-transparent': {
      // Empty transparent margins are trimmed so the mark fills the tab; the artwork itself is untouched.
      const logo = await sharp(input).trim().toBuffer()
      const buf = await sharp(logo)
        .resize(job.size, job.size, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
        .png({ compressionLevel: 9 })
        .toBuffer()
      return { buf, transform: `transparent margins trimmed, contained in ${job.size}px transparent square` }
    }
    case 'icon': {
      const pad = Math.round(job.size * 0.08)
      const logo = await sharp(input)
        .resize(job.size - pad * 2, job.size - pad * 2)
        .toBuffer()
      const buf = await sharp({ create: { width: job.size, height: job.size, channels: 3, background: INK } })
        .composite([{ input: logo, gravity: 'centre' }])
        .png({ compressionLevel: 9 })
        .toBuffer()
      return { buf, transform: `logo on ${INK} square ${job.size}px` }
    }
  }
  throw new Error(`unknown op ${job.op}`)
}

const entries = []
for (const job of jobs) {
  const input = await readFile(join(root, job.src, job.path))
  const { buf, transform } = await render(job, input)
  const dest = join('public/media', job.out)
  await mkdir(dirname(dest), { recursive: true })
  await writeFile(dest, buf)
  const meta = await sharp(buf).metadata()
  entries.push({
    file: `public/media/${job.out}`,
    sha256: sha256(buf),
    bytes: buf.length,
    width: meta.width,
    height: meta.height,
    sourceRepo: sources[job.src].repo,
    sourceRevision: sources[job.src].revision,
    sourcePath: job.path,
    sourceSha256: sha256(input),
    transform,
    purpose: job.purpose,
    status: job.status,
  })
  console.log(`${job.out}  ${buf.length} B  ${transform}`)
}

await writeFile('assets/asset-manifest.json', JSON.stringify({ generatedBy: 'scripts/import-assets.mjs', assets: entries }, null, 2) + '\n')
console.log(`${entries.length} assets written`)
