import AxeBuilder from '@axe-core/playwright'
import { expect, test, type Page } from '@playwright/test'
import { hydrated, watchErrors } from './helpers'

// The Chista page reads the public CHISTA promotions feed from its own origin after rendering. The preview server has
// no feed (404 = no campaigns); these tests answer the feed request themselves, as the edge proxy will in production.
const FEED = '**/feeds/chista/promotions.json'
const feed = {
  generatedAt: '2026-10-21T08:00:00.000Z',
  gameUrl: 'https://chista.oarnova.games',
  campaigns: [
    {
      id: 'gift-7k3m9q',
      type: 'GIFT_CODE',
      title: { fa: 'هدیهٔ یلدا', en: 'Yalda gift' },
      description: { fa: 'برای همهٔ بازیکنان', en: 'For every player' },
      startsAt: '2026-10-01T00:00:00.000Z',
      endsAt: '2099-12-23T00:00:00.000Z',
      state: 'ACTIVE',
      code: 'YALDA1405',
      soldOut: false,
    },
    {
      id: 'sale-2bh8wx',
      type: 'SHOP_SALE',
      title: { fa: 'حراج گوهر', en: null },
      description: { fa: null, en: null },
      startsAt: '2099-01-01T00:00:00.000Z',
      endsAt: null,
      state: 'SCHEDULED',
      code: null,
      soldOut: false,
    },
  ],
}
const serve = (page: Page, body: unknown, status = 200) =>
  page.route(FEED, (route) => route.fulfill({ status, contentType: 'application/json', body: JSON.stringify(body) }))

test('shows the public campaigns with a copyable code and a link to the game (English)', async ({ page, context }) => {
  await context.grantPermissions(['clipboard-read', 'clipboard-write'])
  const errors = watchErrors(page)
  await serve(page, feed)
  await page.goto('/games/chista/')
  await hydrated(page)
  const section = page.getByTestId('chista-promotions')
  await expect(section).toBeVisible()
  const gift = page.getByTestId('promotion-gift-7k3m9q')
  await expect(gift).toContainText('Yalda gift')
  await expect(gift).toContainText('Active now')
  await expect(page.getByTestId('promotion-code-gift-7k3m9q')).toHaveText('YALDA1405')
  await page.getByTestId('promotion-copy-gift-7k3m9q').click()
  await expect(page.getByTestId('promotion-copy-gift-7k3m9q')).toHaveText('Copied')
  expect(await page.evaluate(() => navigator.clipboard.readText())).toBe('YALDA1405')
  await expect(page.getByTestId('promotion-open-gift-7k3m9q')).toHaveAttribute('href', 'https://chista.oarnova.games')
  // No English title: the Persian one is shown and marked as Persian; a scheduled sale has no code.
  const sale = page.getByTestId('promotion-sale-2bh8wx')
  await expect(sale.locator('h3')).toHaveAttribute('lang', 'fa')
  await expect(sale).toContainText('Starting soon')
  await expect(page.getByTestId('promotion-code-sale-2bh8wx')).toHaveCount(0)
  expect(errors).toEqual([])
})

test('Persian page: Persian texts, Jalali dates and the redeem hint', async ({ page }) => {
  await serve(page, feed)
  await page.goto('/fa/games/chista/')
  await hydrated(page)
  const gift = page.getByTestId('promotion-gift-7k3m9q')
  await expect(gift).toContainText('هدیهٔ یلدا')
  await expect(gift).toContainText('فعال')
  await expect(gift).toContainText('«نمایه › کد هدیه»')
  await expect(page.getByTestId('promotion-open-gift-7k3m9q')).toHaveText('ورود به چیستا')
})

test('no feed route (404) shows nothing; a failing feed shows the fallback note; other pages never fetch it', async ({ page }) => {
  await page.goto('/games/chista/')
  await hydrated(page)
  await page.waitForTimeout(300)
  await expect(page.getByTestId('chista-promotions')).toHaveCount(0)

  await serve(page, { error: 'down' }, 503)
  await page.goto('/games/chista/')
  await hydrated(page)
  await expect(page.getByTestId('promotions-unavailable')).toBeVisible()
  await expect(page.getByTestId('promotions-unavailable').locator('a')).toHaveAttribute('href', 'https://chista.oarnova.games')

  let fetched = false
  await page.route(FEED, (route) => {
    fetched = true
    return route.abort()
  })
  await page.goto('/games/dooma/')
  await hydrated(page)
  expect(fetched).toBe(false)
})

test('the promotions section passes axe (WCAG 2.1 AA) in both languages', async ({ page }, info) => {
  test.skip(info.project.name === 'tablet', 'desktop and mobile cover the layouts')
  await serve(page, feed)
  for (const path of ['/games/chista/', '/fa/games/chista/']) {
    await page.goto(path)
    await hydrated(page)
    await expect(page.getByTestId('chista-promotions')).toBeVisible()
    const results = await new AxeBuilder({ page }).include('[data-testid="chista-promotions"]').withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']).analyze()
    expect(results.violations.map((v) => `${v.id}: ${v.nodes.length}`)).toEqual([])
  }
})
