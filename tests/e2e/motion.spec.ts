import { expect, test } from '@playwright/test'
import { AT_REST, hiddenIntro, scrollThrough, watchErrors } from './helpers'

test.describe('GSAP motion', () => {
  test('runs on the home page and settles every animated element', async ({ page }) => {
    const errors = watchErrors(page)
    await page.goto('/', { waitUntil: 'networkidle' })
    await page.waitForFunction(() => (window.__oarMotion?.contexts ?? 0) >= 5)
    await expect(page.locator('html')).toHaveClass(/motion-ready/)
    // The hero lines were driven by GSAP (inline transform) and came to rest.
    const first = page.locator('#hero-title [data-line] > span').first()
    await expect(first).toHaveAttribute('style', /transform/)
    await expect.poll(() => first.evaluate((el) => getComputedStyle(el).transform)).toMatch(AT_REST)
    await scrollThrough(page)
    await page.waitForTimeout(2200)
    for (const sel of ['#dooma-title > span', '#chista-title > span', '#yarizan-title > span']) {
      const el = page.locator(sel).first()
      await expect(el).toHaveAttribute('style', /transform/)
      await expect.poll(() => el.evaluate((e) => getComputedStyle(e).transform)).toMatch(AT_REST)
    }
    expect(await hiddenIntro(page)).toBe(0)
    expect(errors).toEqual([])
  })

  test('ScrollTriggers are destroyed on client-side navigation', async ({ page }, info) => {
    test.skip(info.project.name === 'mobile', 'covered by desktop and tablet')
    await page.goto('/', { waitUntil: 'networkidle' })
    await page.waitForFunction(() => (window.__oarMotion?.contexts ?? 0) >= 5)
    expect(await page.evaluate(() => window.__oarMotion!.triggers())).toBeGreaterThan(0)
    await page
      .locator('header')
      .getByRole('link', { name: /^about$/i })
      .click()
    await expect(page).toHaveURL('/about/')
    await page.waitForTimeout(800)
    expect(await page.evaluate(() => window.__oarMotion!.orphans())).toBe(0)
    await page.getByRole('link', { name: 'فارسی', exact: true }).click()
    await expect(page).toHaveURL('/fa/about/')
    await page.waitForTimeout(800)
    expect(await page.evaluate(() => window.__oarMotion!.orphans())).toBe(0)
  })

  test('does not hijack or pin scrolling', async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle' })
    await page.evaluate(() => window.scrollTo(0, 1500))
    await page.waitForTimeout(300)
    expect(await page.evaluate(() => Math.round(window.scrollY))).toBe(1500)
    expect(await page.locator('.pin-spacer').count()).toBe(0)
  })
})

test.describe('reduced motion', () => {
  test.use({ reducedMotion: 'reduce' })

  test('skips GSAP and shows final states immediately', async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle' })
    await page.waitForTimeout(500)
    expect(await page.evaluate(() => window.__oarMotion)).toBeUndefined()
    await expect(page.locator('html')).not.toHaveClass(/(^|\s)motion(\s|$)/)
    expect(await hiddenIntro(page)).toBe(0)
    await expect(page.locator('#hero-title')).toBeVisible()
  })
})

test.describe('without JavaScript', () => {
  test.use({ javaScriptEnabled: false })

  test('content is complete and visible', async ({ page }) => {
    await page.goto('/')
    await expect(page.locator('#hero-title')).toBeVisible()
    for (const id of ['#dooma-title', '#chista-title', '#yarizan-title']) await expect(page.locator(id)).toBeAttached()
    expect(await hiddenIntro(page)).toBe(0)
    await expect(page.locator('a[href="mailto:info@oarnova.games"]').first()).toBeAttached()
  })
})

test.describe('motion gate fallback', () => {
  test('reveals content when the app bundle never loads', async ({ page }) => {
    await page.route(/\/_nuxt\/.*\.js(\?.*)?$/, (route) => route.abort())
    await page.goto('/')
    await page.waitForTimeout(3400)
    await expect(page.locator('html')).not.toHaveClass(/(^|\s)motion(\s|$)/)
    expect(await hiddenIntro(page)).toBe(0)
  })
})
