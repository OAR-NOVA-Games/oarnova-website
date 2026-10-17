import { expect, type Page } from '@playwright/test'
import { allRoutes } from '../../scripts/routes.mjs'

export { allRoutes }
export const enRoutes = allRoutes.filter((r) => !r.startsWith('/fa/'))

/** Collects console errors (incl. CSP violations) and uncaught page errors. */
export function watchErrors(page: Page) {
  const errors: string[] = []
  page.on('console', (m) => {
    if (m.type() === 'error' && !/status of 404/.test(m.text())) errors.push(m.text())
  })
  page.on('pageerror', (e) => errors.push(e.message))
  return errors
}

export async function expectNoHorizontalOverflow(page: Page) {
  const { sw, iw } = await page.evaluate(() => ({ sw: document.documentElement.scrollWidth, iw: window.innerWidth }))
  expect(sw, 'document wider than viewport').toBeLessThanOrEqual(iw)
}

/** Scrolls the whole page so every ScrollTrigger and lazy image gets a chance to run. */
export async function scrollThrough(page: Page) {
  const h = await page.evaluate(() => document.documentElement.scrollHeight)
  const step = page.viewportSize()!.height * 0.8
  for (let y = 0; y <= h; y += step) {
    await page.evaluate((y) => window.scrollTo(0, y), y)
    await page.waitForTimeout(80)
  }
}

/** Count of [data-intro] elements that are not fully visible. */
export const hiddenIntro = (page: Page) =>
  page.locator('[data-intro]').evaluateAll((els) => els.filter((e) => parseFloat(getComputedStyle(e).opacity) < 0.5).length)

export const AT_REST = /^(none|matrix\(1, 0, 0, 1, 0, 0\))$/
