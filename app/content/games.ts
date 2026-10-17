// Single source of truth for the studio's games.
// External URLs are permanent and canonical from day one: they are never probed,
// rewritten or conditionally built. A subdomain going live needs no website change.

export type Locale = 'en' | 'fa'
export type Localized<T = string> = Record<Locale, T>

export const gameSlugs = ['dooma', 'chista', 'yarizan'] as const
export type GameSlug = (typeof gameSlugs)[number]

export type GameStatus = 'in-development' | 'coming-soon'

export interface Image {
  src: string
  width: number
  height: number
  /** Optional higher-density rendition for srcset. */
  src2x?: string
}

export interface Game {
  slug: GameSlug
  index: string
  name: Localized
  url: string
  host: string
  status: GameStatus
  logo: Image
  logoAlt: Localized
  ogImage: string
  /** Facts verified against the product repository README at the revisions in assets/asset-manifest.json. */
  facts: Localized<{ label: string; value: string }[]>
}

export const games: Record<GameSlug, Game> = {
  dooma: {
    slug: 'dooma',
    index: '01',
    name: { en: 'Dooma', fa: 'دوما' },
    url: 'https://dooma.oarnova.games',
    host: 'dooma.oarnova.games',
    status: 'in-development',
    logo: { src: '/media/dooma/logo-512.webp', src2x: '/media/dooma/logo-1024.webp', width: 512, height: 512 },
    logoAlt: { en: 'Dooma logo', fa: 'لوگوی دوما' },
    ogImage: '/media/og/dooma.png',
    facts: {
      en: [
        { label: 'Genre', value: 'Knowledge-based 1v1 strategy' },
        { label: 'Language', value: 'Persian' },
        { label: 'Target platforms', value: 'iOS, Android and web (planned)' },
        { label: 'Stage', value: 'Early development' },
      ],
      fa: [
        { label: 'سبک', value: 'راهبردی و دانشی، دونفره' },
        { label: 'زبان', value: 'فارسی' },
        { label: 'سکوهای هدف', value: 'iOS، اندروید و وب (در برنامه)' },
        { label: 'مرحله', value: 'آغاز ساخت' },
      ],
    },
  },
  chista: {
    slug: 'chista',
    index: '02',
    name: { en: 'Chista', fa: 'چیستا' },
    url: 'https://chista.oarnova.games',
    host: 'chista.oarnova.games',
    status: 'in-development',
    logo: { src: '/media/chista/logo-400.webp', src2x: '/media/chista/logo-800.webp', width: 400, height: 225 },
    logoAlt: { en: 'Chista logo', fa: 'لوگوی چیستا' },
    ogImage: '/media/og/chista.jpg',
    facts: {
      en: [
        { label: 'Genre', value: 'Competitive mind game' },
        { label: 'Language', value: 'Persian-first' },
        { label: 'Platforms', value: 'Web; Android planned' },
        { label: 'Stage', value: 'In development' },
      ],
      fa: [
        { label: 'سبک', value: 'فکری و رقابتی' },
        { label: 'زبان', value: 'فارسی' },
        { label: 'سکوها', value: 'وب؛ اندروید در برنامه' },
        { label: 'مرحله', value: 'در دست ساخت' },
      ],
    },
  },
  yarizan: {
    slug: 'yarizan',
    index: '03',
    name: { en: 'YariZan', fa: 'یاریزان' },
    url: 'https://yarizan.oarnova.games',
    host: 'yarizan.oarnova.games',
    status: 'coming-soon',
    logo: { src: '/media/yarizan/logo-horizontal-800.webp', src2x: '/media/yarizan/logo-horizontal-1600.webp', width: 800, height: 302 },
    logoAlt: { en: 'YariZan logo', fa: 'لوگوی یاریزان' },
    ogImage: '/media/og/yarizan.png',
    facts: {
      en: [
        { label: 'Genre', value: 'Educational mini-game collection' },
        { label: 'Audience', value: 'Primary school, grade by grade' },
        { label: 'Language', value: 'Persian' },
        { label: 'Platform', value: 'Windows PC' },
      ],
      fa: [
        { label: 'سبک', value: 'مجموعه بازی‌های آموزشی' },
        { label: 'مخاطب', value: 'دانش‌آموزان دبستان، به تفکیک پایه' },
        { label: 'زبان', value: 'فارسی' },
        { label: 'سکو', value: 'رایانه با ویندوز' },
      ],
    },
  },
}

export const gameList: Game[] = gameSlugs.map((s) => games[s])

export const contact = {
  info: 'info@oarnova.games',
  support: 'support@oarnova.games',
} as const

export const siteUrl = 'https://oarnova.games'
