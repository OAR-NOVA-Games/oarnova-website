import { describe, expect, it } from 'vitest'
import { basePath, localeOf, localizePath } from '~/composables/useLocale'

describe('locale routing helpers', () => {
  it('detects the locale from the path prefix only', () => {
    expect(localeOf('/')).toBe('en')
    expect(localeOf('/games/')).toBe('en')
    expect(localeOf('/fa')).toBe('fa')
    expect(localeOf('/fa/')).toBe('fa')
    expect(localeOf('/fa/games/dooma/')).toBe('fa')
    expect(localeOf('/faq/')).toBe('en')
  })

  it('strips the locale and normalizes the trailing slash', () => {
    expect(basePath('/fa/')).toBe('/')
    expect(basePath('/fa')).toBe('/')
    expect(basePath('/fa/games/chista')).toBe('/games/chista/')
    expect(basePath('/about')).toBe('/about/')
    expect(basePath('/games/yarizan/')).toBe('/games/yarizan/')
  })

  it('round-trips every page between languages', () => {
    for (const p of ['/', '/games/', '/games/dooma/', '/about/', '/contact/']) {
      const fa = localizePath(p, 'fa')
      expect(fa).toBe(p === '/' ? '/fa/' : `/fa${p}`)
      expect(localizePath(basePath(fa), 'en')).toBe(p)
    }
  })
})
