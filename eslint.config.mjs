// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt(
  { ignores: ['.output/**', 'public/**', 'artifacts/**', 'test-results/**', 'playwright-report/**', 'scripts/.*.tmp.mjs'] },
  // Prettier owns formatting (it writes void elements as <img />).
  { rules: { 'vue/html-self-closing': 'off' } },
)
