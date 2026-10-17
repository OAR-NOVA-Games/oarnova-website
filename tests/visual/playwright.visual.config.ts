import { fileURLToPath } from 'node:url'
import { defineConfig } from '@playwright/test'
import base from '../../playwright.config'

// Review screenshots for human art-direction sign-off (not pixel assertions).
// Output: artifacts/screenshots/<viewport>/<page>.png
// The web server must start from the repository root, not from this config's directory.
const root = fileURLToPath(new URL('../..', import.meta.url))

export default defineConfig({
  ...base,
  testDir: '.',
  testMatch: 'screenshots.spec.ts',
  reporter: 'list',
  webServer: { ...(base.webServer as object), cwd: root } as typeof base.webServer,
  projects: base.projects,
})
