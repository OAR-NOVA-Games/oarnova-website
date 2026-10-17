import { expect, test } from '@playwright/test'

test.describe('static hosting behaviour', () => {
  test.beforeEach(({ page: _ }, info) => test.skip(info.project.name !== 'desktop', 'server behaviour is viewport independent'))

  test('unknown English path returns the English 404 page with status 404', async ({ page }) => {
    const res = await page.goto('/no/such/page')
    expect(res?.status()).toBe(404)
    await expect(page.locator('html')).toHaveAttribute('lang', 'en')
    await expect(page.locator('h1')).toContainText('This world')
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', /noindex/)
  })

  test('unknown Persian path returns the Persian 404 page', async ({ page }) => {
    const res = await page.goto('/fa/no/such/page')
    expect(res?.status()).toBe(404)
    await expect(page.locator('html')).toHaveAttribute('dir', 'rtl')
    await expect(page.locator('h1')).toContainText('این جهان')
  })

  test('unknown game slug is a 404', async ({ page }) => {
    const res = await page.goto('/games/unknown/')
    expect(res?.status()).toBe(404)
  })

  test('directory without trailing slash redirects to the canonical URL', async ({ request }) => {
    const res = await request.get('/games/dooma', { maxRedirects: 0 })
    expect(res.status()).toBe(308)
    expect(res.headers()['location']).toBe('/games/dooma/')
  })

  test('robots.txt and sitemap.xml are served', async ({ request }) => {
    const robots = await (await request.get('/robots.txt')).text()
    expect(robots).toContain('Sitemap: https://oarnova.games/sitemap.xml')
    const sitemap = await (await request.get('/sitemap.xml')).text()
    expect(sitemap.match(/<loc>/g)).toHaveLength(14)
    expect(sitemap).toContain('hreflang="fa" href="https://oarnova.games/fa/games/yarizan/"')
  })

  test('social metadata is page specific', async ({ page }) => {
    await page.goto('/games/chista/')
    await expect(page.locator('meta[property="og:image"]')).toHaveAttribute('content', 'https://oarnova.games/media/og/chista.jpg')
    await expect(page.locator('meta[property="og:title"]')).toHaveAttribute('content', /Chista/)
    const ld = JSON.parse((await page.locator('script[type="application/ld+json"]').textContent())!)
    expect(ld['@type']).toBe('VideoGame')
    expect(ld.url).toBe('https://chista.oarnova.games')
  })

  test('hashed assets are cacheable immutably, HTML is short-lived', async ({ request, page }) => {
    await page.goto('/')
    const src = await page.locator('script[type="module"]').first().getAttribute('src')
    const asset = await request.get(src!)
    expect(asset.headers()['cache-control']).toContain('immutable')
    const html = await request.get('/')
    expect(html.headers()['cache-control']).toBe('public, max-age=300')
  })
})
