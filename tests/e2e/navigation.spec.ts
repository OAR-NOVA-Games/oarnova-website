import { expect, test } from '@playwright/test'
import { enRoutes, watchErrors } from './helpers'

test.describe('language switch', () => {
  for (const route of enRoutes) {
    test(`preserves the page: ${route}`, async ({ page }) => {
      await page.goto(route)
      const fa = route === '/' ? '/fa/' : `/fa${route}`
      await page.getByRole('link', { name: 'فارسی', exact: true }).click()
      await expect(page).toHaveURL(fa)
      await expect(page.locator('html')).toHaveAttribute('dir', 'rtl')
      await page.getByRole('link', { name: 'English', exact: true }).click()
      await expect(page).toHaveURL(route)
      await expect(page.locator('html')).toHaveAttribute('lang', 'en')
    })
  }

  test('falls back to the other home page from a missing route', async ({ page }) => {
    await page.goto('/does-not-exist/')
    await expect(page.getByRole('link', { name: 'فارسی', exact: true })).toHaveAttribute('href', '/fa/')
  })

  test('browser back/forward restores language and content', async ({ page }) => {
    await page.goto('/games/')
    await page.getByRole('link', { name: 'فارسی', exact: true }).click()
    await expect(page.locator('html')).toHaveAttribute('lang', 'fa')
    await page.goBack()
    await expect(page).toHaveURL('/games/')
    await expect(page.locator('html')).toHaveAttribute('lang', 'en')
    await page.goForward()
    await expect(page).toHaveURL('/fa/games/')
    await expect(page.locator('html')).toHaveAttribute('dir', 'rtl')
  })
})

test.describe('keyboard', () => {
  test('skip link is the first stop and moves focus to main', async ({ page }, info) => {
    test.skip(info.project.name === 'mobile', 'no hardware keyboard on the phone profile')
    await page.goto('/')
    await page.keyboard.press('Tab')
    const skip = page.getByRole('link', { name: 'Skip to content' })
    await expect(skip).toBeFocused()
    await expect(skip).toBeInViewport()
    await page.keyboard.press('Enter')
    await expect(page).toHaveURL(/#main$/)
  })

  test('header controls are reachable by keyboard', async ({ page }, info) => {
    test.skip(info.project.name !== 'desktop', 'desktop navigation is replaced by the menu button on small screens')
    await page.goto('/')
    const order: string[] = []
    for (let i = 0; i < 6; i++) {
      await page.keyboard.press('Tab')
      order.push(await page.evaluate(() => (document.activeElement as HTMLElement).innerText?.trim() || ''))
    }
    for (const label of ['GAMES', 'ABOUT', 'CONTACT', 'فارسی']) expect(order.join('|').toUpperCase()).toContain(label)
  })
})

test.describe('mobile menu', () => {
  test.beforeEach(({ page: _ }, info) => test.skip(info.project.name !== 'mobile'))

  test('opens, traps focus, closes on Escape and returns focus', async ({ page }) => {
    const errors = watchErrors(page)
    await page.goto('/')
    const button = page.getByRole('button', { name: 'Open menu' })
    await expect(button).toHaveAttribute('aria-expanded', 'false')
    await button.click()
    const close = page.getByRole('button', { name: 'Close menu' })
    await expect(close).toHaveAttribute('aria-expanded', 'true')
    const menu = page.getByRole('navigation', { name: 'Menu' })
    await expect(menu).toBeVisible()
    await expect(menu.getByRole('link').first()).toBeFocused()
    for (let i = 0; i < 6; i++) await page.keyboard.press('Tab')
    expect(await page.evaluate(() => !!document.activeElement?.closest('header'))).toBe(true)
    await page.keyboard.press('Escape')
    await expect(menu).toBeHidden()
    await expect(page.getByRole('button', { name: 'Open menu' })).toBeFocused()
    expect(errors).toEqual([])
  })

  test('navigates and closes after choosing a link', async ({ page }) => {
    await page.goto('/fa/')
    await page.getByRole('button', { name: 'باز کردن منو' }).click()
    await page
      .getByRole('navigation', { name: 'منو' })
      .getByRole('link', { name: /دربارهٔ ما/ })
      .click()
    await expect(page).toHaveURL('/fa/about/')
    await expect(page.getByRole('navigation', { name: 'منو' })).toBeHidden()
  })

  test('touch targets are at least 44px', async ({ page }) => {
    await page.goto('/')
    for (const loc of [page.getByRole('button', { name: 'Open menu' }), page.getByRole('link', { name: 'فارسی', exact: true })]) {
      const box = (await loc.boundingBox())!
      expect(box.width).toBeGreaterThanOrEqual(44)
      expect(box.height).toBeGreaterThanOrEqual(44)
    }
  })
})
