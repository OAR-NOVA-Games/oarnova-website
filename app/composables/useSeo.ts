import { siteUrl } from '~/content/games'

interface SeoInput {
  title: string
  description: string
  /** Locale-neutral path with trailing slash, e.g. "/games/dooma/". Omit for pages that must not be indexed. */
  path?: string
  image?: string
  jsonLd?: Record<string, unknown>
}

export function useSeo(input: () => SeoInput) {
  const { locale } = useLocale()

  useHead(() => {
    const s = input()
    const abs = (p: string) => `${siteUrl}${p}`
    const link = s.path
      ? [
          { rel: 'canonical' as const, href: abs(localizePath(s.path, locale.value)) },
          { rel: 'alternate' as const, hreflang: 'en', href: abs(s.path) },
          { rel: 'alternate' as const, hreflang: 'fa', href: abs(localizePath(s.path, 'fa')) },
          { rel: 'alternate' as const, hreflang: 'x-default', href: abs(s.path) },
        ]
      : []
    return {
      htmlAttrs: { lang: locale.value, dir: locale.value === 'fa' ? 'rtl' : 'ltr' },
      title: s.title,
      link,
      script: s.jsonLd ? [{ type: 'application/ld+json', innerHTML: JSON.stringify(s.jsonLd), key: 'jsonld' }] : [],
    }
  })

  useSeoMeta({
    description: () => input().description,
    ogTitle: () => input().title,
    ogDescription: () => input().description,
    ogType: 'website',
    ogSiteName: 'OAR NOVA Games Studio',
    ogLocale: () => (locale.value === 'fa' ? 'fa_IR' : 'en_US'),
    ogLocaleAlternate: () => (locale.value === 'fa' ? 'en_US' : 'fa_IR'),
    ogUrl: () => {
      const p = input().path
      return p ? `${siteUrl}${localizePath(p, locale.value)}` : undefined
    },
    ogImage: () => `${siteUrl}${input().image ?? '/media/og/studio.png'}`,
    ogImageWidth: 1200,
    ogImageHeight: 630,
    twitterCard: 'summary_large_image',
    robots: () => (input().path ? 'index, follow' : 'noindex, follow'),
  })
}
