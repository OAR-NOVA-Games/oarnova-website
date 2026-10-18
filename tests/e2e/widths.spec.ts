import { expect, test } from '@playwright/test'
import { allRoutes } from './helpers'

// Unusual widths between and beyond the three design breakpoints. Large display type
// (especially Persian) must never overflow the page or be cut by its own masks.
const widths = [320, 360, 600, 768, 1024, 1280, 1920, 2560]

test.describe('layout at unusual widths', () => {
  test.use({ reducedMotion: 'reduce' }) // final composition, no mid-animation transforms
  test.beforeEach(({ page: _ }, info) => test.skip(info.project.name !== 'desktop', 'widths are set explicitly'))

  for (const route of [...allRoutes, '/missing-page/', '/fa/missing-page/']) {
    test(route, async ({ page }) => {
      await page.goto(route, { waitUntil: 'networkidle' })
      for (const width of widths) {
        await page.setViewportSize({ width, height: 900 })
        await page.evaluate(() => document.fonts.ready)
        const problems = await page.evaluate(() => {
          const out: string[] = []
          const vw = document.documentElement.clientWidth
          if (document.documentElement.scrollWidth > window.innerWidth)
            out.push(`page scrollWidth ${document.documentElement.scrollWidth} > ${window.innerWidth}`)
          for (const h of document.querySelectorAll<HTMLElement>('h1, h2, h3')) {
            const r = h.getBoundingClientRect()
            if (r.width === 0) continue
            if (r.left < -1 || r.right > vw + 1)
              out.push(`${h.tagName} "${h.textContent?.trim().slice(0, 30)}" spans ${Math.round(r.left)}..${Math.round(r.right)} of ${vw}`)
            // Text cut by an overflow:hidden line mask inside the heading.
            for (const el of h.querySelectorAll<HTMLElement>('*')) {
              const cs = getComputedStyle(el)
              if (cs.overflow === 'hidden' && el.scrollWidth > el.clientWidth + 2)
                out.push(`mask clips "${el.textContent?.trim().slice(0, 30)}" (${el.scrollWidth} > ${el.clientWidth})`)
            }
          }
          return out
        })
        expect(problems, `width ${width}`).toEqual([])
      }
    })
  }
})

// The YariZan logo sits on the book's front sheet. On phones the column layout once
// pushed it toward the grade tabs (right in EN, left in FA); it must stay centred.
test.describe('YariZan logo on the book', () => {
  test.use({ reducedMotion: 'reduce' })
  test.beforeEach(({ page: _ }, info) => test.skip(info.project.name !== 'desktop', 'widths are set explicitly'))

  for (const route of ['/', '/fa/']) {
    test(route, async ({ page }) => {
      await page.goto(route, { waitUntil: 'networkidle' })
      for (const width of [320, 360, 390, 414, 600, 768, 1024, 1440]) {
        await page.setViewportSize({ width, height: 900 })
        await page.evaluate(() => document.fonts.ready)
        const m = await page.evaluate(() => {
          const b = document.querySelector('#yarizan .y-sheet.s3')!.getBoundingClientRect()
          const l = document.querySelector('#yarizan .y-logo')!.getBoundingClientRect()
          const tabs = [...document.querySelectorAll('#yarizan .y-tab')].map((t) => t.getBoundingClientRect())
          return {
            dx: Math.round(l.left + l.width / 2 - (b.left + b.width / 2)),
            dy: Math.round(l.top + l.height / 2 - (b.top + b.height / 2)),
            inside: l.left >= b.left && l.right <= b.right && l.top >= b.top && l.bottom <= b.bottom,
            onTabs: tabs.some((t) => !(t.right <= l.left || t.left >= l.right || t.bottom <= l.top || t.top >= l.bottom)),
          }
        })
        expect(m, `width ${width}`).toEqual({ dx: expect.any(Number), dy: expect.any(Number), inside: true, onTabs: false })
        expect(Math.abs(m.dx), `width ${width}: horizontal offset`).toBeLessThanOrEqual(2)
        expect(Math.abs(m.dy), `width ${width}: vertical offset`).toBeLessThanOrEqual(2)
      }
    })
  }
})
