import { expect, test } from '@playwright/test'

const sites = {
  dooma: 'https://dooma.oarnova.games',
  chista: 'https://chista.oarnova.games',
  yarizan: 'https://yarizan.oarnova.games',
}

for (const route of ['/', '/games/', '/fa/', '/fa/games/']) {
  test(`game links point at the permanent sites on ${route}`, async ({ page }) => {
    await page.goto(route)
    for (const [slug, url] of Object.entries(sites)) {
      const link = page.locator(`a[data-game-url="${slug}"]`).first()
      await expect(link).toHaveAttribute('href', url)
      await expect(link).toHaveAttribute('target', '_blank')
      await expect(link).toHaveAttribute('rel', /noopener/)
    }
    const hrefs = await page.locator('a[href^="http"]').evaluateAll((as) => as.map((a) => a.getAttribute('href')))
    for (const h of hrefs) expect(Object.values(sites)).toContain(h)
  })
}

for (const [slug, url] of Object.entries(sites)) {
  test(`detail page ${slug} links to ${url}`, async ({ page }) => {
    for (const prefix of ['', '/fa']) {
      await page.goto(`${prefix}/games/${slug}/`)
      await expect(page.locator(`a[data-game-url="${slug}"]`)).toHaveAttribute('href', url)
    }
  })
}

for (const route of ['/contact/', '/fa/contact/']) {
  test(`contact addresses are visible mailto links on ${route}`, async ({ page }) => {
    await page.goto(route)
    for (const email of ['info@oarnova.games', 'support@oarnova.games']) {
      const link = page.locator('main').locator(`a[href="mailto:${email}"]`)
      await expect(link).toBeVisible()
      await expect(link).toContainText(email)
    }
    const phone = page.locator('main').locator('a[href="tel:+989369642754"]')
    await expect(phone).toBeVisible()
    await expect(phone).toContainText(route.startsWith('/fa/') ? '۰۹۳۶-۹۶۴-۲۷۵۴' : '0936-964-2754')
    await expect(page.locator('form')).toHaveCount(0)
  })
}

test('footer carries both addresses and the phone number', async ({ page }) => {
  for (const route of ['/', '/games/chista/', '/fa/about/']) {
    await page.goto(route)
    await expect(page.locator('footer a[href="mailto:info@oarnova.games"]')).toHaveCount(1)
    await expect(page.locator('footer a[href="mailto:support@oarnova.games"]')).toHaveCount(1)
    await expect(page.locator('footer a[href="tel:+989369642754"]')).toHaveCount(1)
  }
})
