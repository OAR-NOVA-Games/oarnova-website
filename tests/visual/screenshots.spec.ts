import { test } from '@playwright/test'
import { allRoutes } from '../../scripts/routes.mjs'

const name = (route: string) => (route === '/' ? 'home' : route.replace(/^\/|\/$/g, '').replace(/\//g, '-')) || 'home'

for (const route of [...allRoutes, '/missing-page/', '/fa/missing-page/']) {
  test(`capture ${route}`, async ({ page }, info) => {
    await page.goto(route, { waitUntil: 'networkidle' })
    // Let every scroll-driven reveal play, then capture the composed final state.
    const h = await page.evaluate(() => document.documentElement.scrollHeight)
    for (let y = 0; y <= h; y += 500) {
      await page.evaluate((y) => window.scrollTo(0, y), y)
      await page.waitForTimeout(120)
    }
    await page.waitForTimeout(1500)
    // Full-page captures render areas the viewport never reached; make sure every image is decoded.
    await page.evaluate(async () => {
      const imgs = [...document.images]
      for (const i of imgs) i.loading = 'eager'
      await Promise.all(imgs.map((i) => i.decode().catch(() => null)))
    })
    await page.evaluate(() => {
      // Scrubbed effects follow scroll position; pin them at rest for a full-page capture.
      window.scrollTo(0, 0)
      document.querySelectorAll<HTMLElement>('[style*="clip-path"], .c-scene img, .orbit, .hero-copy').forEach((el) => {
        el.style.clipPath = 'none'
        el.style.transform = 'none'
      })
    })
    await page.waitForTimeout(300)
    const fa = route.startsWith('/fa/')
    const file = `${fa ? 'fa' : 'en'}-${name(fa ? route.slice(3) : route)}`
    await page.screenshot({ path: `artifacts/screenshots/${info.project.name}/${file}.png`, fullPage: true })
  })
}
