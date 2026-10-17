import AxeBuilder from '@axe-core/playwright'
import { expect, test } from '@playwright/test'
import { allRoutes } from './helpers'

test.describe('accessibility (axe, WCAG 2.1 A/AA)', () => {
  test.use({ reducedMotion: 'reduce' }) // audit final states, not mid-animation frames

  for (const route of [...allRoutes, '/missing-page/', '/fa/missing-page/']) {
    test(route, async ({ page }, info) => {
      test.skip(info.project.name === 'tablet', 'desktop and mobile cover the layouts')
      await page.goto(route, { waitUntil: 'networkidle' })
      const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']).analyze()
      const summary = results.violations.map((v) => `${v.id}: ${v.nodes.map((n) => n.target.join(' ')).join(', ')}`)
      expect(summary).toEqual([])
    })
  }
})
