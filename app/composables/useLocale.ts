import { copy } from '~/content/copy'
import type { Locale } from '~/content/games'

export const localeOf = (path: string): Locale => (path === '/fa' || path.startsWith('/fa/') ? 'fa' : 'en')

/** Path without the locale prefix, always with a trailing slash ("/fa/games/" -> "/games/"). */
export function basePath(path: string): string {
  let p = localeOf(path) === 'fa' ? path.slice(3) || '/' : path
  if (!p.startsWith('/')) p = `/${p}`
  return p.endsWith('/') ? p : `${p}/`
}

export const localizePath = (path: string, locale: Locale): string => (locale === 'fa' ? `/fa${path}` : path)

export function useLocale() {
  const route = useRoute()
  const locale = computed(() => localeOf(route.path))
  const t = computed(() => copy[locale.value])
  const dir = computed(() => (locale.value === 'fa' ? 'rtl' : 'ltr'))
  const other = computed<Locale>(() => (locale.value === 'fa' ? 'en' : 'fa'))
  const link = (path: string) => localizePath(path, locale.value)
  /** Same page in the other language; unknown routes fall back to that language's home. */
  const switchPath = computed(() => localizePath(route.meta.notFound ? '/' : basePath(route.path), other.value))
  /** Persian digits in Persian pages; brand names and e-mail addresses are never passed through this. */
  const num = (v: string | number) => (locale.value === 'fa' ? String(v).replace(/\d/g, (d) => '۰۱۲۳۴۵۶۷۸۹'[+d]!) : String(v))
  return { locale, t, dir, other, link, switchPath, num }
}
