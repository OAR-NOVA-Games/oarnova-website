import tailwindcss from '@tailwindcss/vite'
import type { NuxtPage } from 'nuxt/schema'
import { execSync } from 'node:child_process'
import { siteRoutes } from './scripts/routes.mjs'

// Every page exists twice: English at the root, Persian under /fa/.
// Locale is derived from the path (see app/composables/useLocale.ts).
function addPersianRoutes(pages: NuxtPage[]) {
  const fa = pages.map((page): NuxtPage => {
    return {
      ...page,
      name: page.name ? `fa-${page.name}` : undefined,
      path: page.path === '/' ? '/fa/' : `/fa${page.path}`,
    }
  })
  pages.push(...fa)
}

// Deterministic build id (commit SHA) keeps repeated builds of one commit byte-identical.
const buildId =
  process.env.BUILD_ID ||
  (() => {
    try {
      return execSync('git rev-parse HEAD', { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }).trim()
    } catch {
      return 'dev'
    }
  })()

export default defineNuxtConfig({
  compatibilityDate: '2026-10-01',
  devtools: { enabled: false },
  buildId,
  modules: ['@nuxt/eslint'],
  css: ['~/assets/css/main.css'],
  vite: { plugins: [tailwindcss()] },

  app: {
    head: {
      htmlAttrs: { lang: 'en', dir: 'ltr' },
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1, viewport-fit=cover' },
        { name: 'theme-color', content: '#10100f' },
        { name: 'color-scheme', content: 'dark light' },
      ],
      link: [
        { rel: 'icon', type: 'image/png', sizes: '48x48', href: '/media/icons/favicon-48.png' },
        { rel: 'apple-touch-icon', href: '/media/icons/apple-touch-icon.png' },
      ],
      // External (CSP script-src 'self') motion gate; see public/motion-gate.js.
      script: [{ src: '/motion-gate.js', tagPosition: 'head' }],
    },
    pageTransition: { name: 'page', mode: 'out-in' },
  },

  router: { options: { scrollBehaviorType: 'auto' } },

  hooks: { 'pages:extend': addPersianRoutes },

  // Fully static: every route is prerendered, no server runtime is shipped.
  ssr: true,
  nitro: {
    preset: 'static',
    prerender: {
      crawlLinks: false,
      failOnError: true,
      routes: [
        ...siteRoutes,
        ...siteRoutes.map((p) => `/fa${p}`),
        // Rendered through the catch-all page, then moved to /404.html and /fa/404.html by scripts/postbuild.mjs.
        '/__not-found__/',
        '/fa/__not-found__/',
      ],
    },
  },

  // No inline importmap: production CSP allows only same-origin scripts.
  experimental: { payloadExtraction: true, entryImportMap: false },
  typescript: { strict: true, typeCheck: false },
})
