import { defineConfig } from '@playwright/test'
import base from '../../playwright.config'

// Review screenshots for human art-direction sign-off (not pixel assertions).
// Output: artifacts/screenshots/<viewport>/<page>.png
export default defineConfig({
  ...base,
  testDir: '.',
  testMatch: 'screenshots.spec.ts',
  reporter: 'list',
  projects: base.projects,
})
