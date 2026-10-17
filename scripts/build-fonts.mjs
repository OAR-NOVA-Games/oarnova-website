// Builds the two display/text faces the site preloads, trimmed to what the design uses:
//  - glyphs: the scripts the copy is written in (Latin; Persian/Arabic + Latin for Vazirmatn)
//  - variation axes: only the ranges the CSS uses (Archivo wdth 62–100 %, wght 400–850;
//    Vazirmatn wght 400–900). Letterforms inside those ranges are unchanged.
// Output is committed (app/assets/fonts) so builds stay offline and reproducible.
// Both fonts are SIL OFL 1.1 without Reserved Font Names; licences are copied alongside.
// Usage: node scripts/build-fonts.mjs
import { copyFile, mkdir, readFile, writeFile } from 'node:fs/promises'
import subsetFont from 'subset-font'

const range = (a, b) => Array.from({ length: b - a + 1 }, (_, i) => String.fromCodePoint(a + i)).join('')
const latin = range(0x20, 0x7e) + range(0xa0, 0xff) + '–—‘’“”•…←↑→↗×'
const persian = range(0x600, 0x6ff) + range(0x750, 0x77f) + range(0x200c, 0x200f) + range(0xfb50, 0xfdff) + range(0xfe70, 0xfeff) + '«»'

const fonts = [
  {
    out: 'archivo-display.woff2',
    src: 'node_modules/@fontsource-variable/archivo/files/archivo-latin-wdth-normal.woff2',
    license: 'node_modules/@fontsource-variable/archivo/LICENSE',
    text: latin,
    axes: { wdth: { min: 62, max: 100 }, wght: { min: 400, max: 850 } },
  },
  {
    out: 'vazirmatn-text.woff2',
    src: 'node_modules/@fontsource-variable/vazirmatn/files/vazirmatn-arabic-wght-normal.woff2',
    license: 'node_modules/@fontsource-variable/vazirmatn/LICENSE',
    text: persian + range(0x20, 0x7e),
    axes: { wght: { min: 400, max: 900 } },
  },
]

await mkdir('app/assets/fonts', { recursive: true })
for (const f of fonts) {
  const src = await readFile(f.src)
  const buf = await subsetFont(src, f.text, { targetFormat: 'woff2', variationAxes: f.axes })
  await writeFile(`app/assets/fonts/${f.out}`, buf)
  await copyFile(f.license, `app/assets/fonts/${f.out.replace('.woff2', '')}.LICENSE.txt`)
  console.log(`${f.out}: ${src.length} -> ${buf.length} bytes`)
}
