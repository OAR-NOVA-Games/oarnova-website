import { expect, test } from '@playwright/test'
import { allRoutes, expectNoHorizontalOverflow, scrollThrough, watchErrors } from './helpers'

for (const route of allRoutes) {
  test(`renders ${route}`, async ({ page }) => {
    const errors = watchErrors(page)
    const res = await page.goto(route, { waitUntil: 'networkidle' })
    expect(res?.status()).toBe(200)

    const fa = route.startsWith('/fa/')
    await expect(page.locator('html')).toHaveAttribute('lang', fa ? 'fa' : 'en')
    await expect(page.locator('html')).toHaveAttribute('dir', fa ? 'rtl' : 'ltr')
    await expect(page.locator('h1')).toHaveCount(1)
    await expect(page.locator('h1')).toBeVisible()
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', `https://oarnova.games${route}`)

    await scrollThrough(page)
    await expectNoHorizontalOverflow(page)

    // Every image actually decodes: no broken, blocked or missing media.
    const broken = await page.evaluate(async () => {
      const imgs = [...document.images]
      for (const i of imgs) i.loading = 'eager'
      await Promise.all(imgs.map((i) => i.decode().catch(() => null)))
      return imgs.filter((i) => !i.naturalWidth).map((i) => i.currentSrc || i.src)
    })
    expect(broken).toEqual([])
    expect(errors).toEqual([])
  })
}
