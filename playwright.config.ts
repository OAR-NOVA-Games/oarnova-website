import { defineConfig, devices } from '@playwright/test'

// E2E runs against the generated static output served by scripts/serve.mjs, which mirrors
// the production Caddy/Traefik behaviour (trailing-slash redirects, 404 pages, CSP).
// Locally, PW_CHANNEL=chrome uses an installed Chrome instead of the bundled Chromium.
const channel = process.env.PW_CHANNEL || undefined
const port = Number(process.env.PORT ?? 4173)

export default defineConfig({
  testDir: 'tests/e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? [['list'], ['html', { open: 'never' }]] : 'list',
  use: { baseURL: `http://localhost:${port}`, channel, trace: 'retain-on-failure' },
  webServer: { command: `node scripts/serve.mjs ${port}`, port, reuseExistingServer: !process.env.CI },
  projects: [
    { name: 'desktop', use: { ...devices['Desktop Chrome'], channel, viewport: { width: 1440, height: 900 } } },
    { name: 'tablet', use: { ...devices['Desktop Chrome'], channel, viewport: { width: 820, height: 1180 }, hasTouch: true } },
    { name: 'mobile', use: { ...devices['Pixel 7'], channel, viewport: { width: 390, height: 844 } } },
  ],
})
