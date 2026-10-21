// Public CHISTA promotions shown on the Chista page. The feed is read at runtime from this site's own origin
// (`/feeds/chista/promotions.json`, routed by the edge proxy to CHISTA's public, read-only feed), so the production
// CSP `default-src 'self'` stays unchanged and a new campaign needs no website release. Everything in the feed is
// treated as untrusted text: unknown fields are dropped, lengths are capped and codes must look like codes.

export const PROMOTIONS_FEED_PATH = '/feeds/chista/promotions.json'

export interface PublicPromotion {
  id: string
  type: 'GIFT_CODE' | 'DISCOUNT_CODE' | 'SHOP_SALE'
  title: { fa: string; en: string | null }
  description: { fa: string | null; en: string | null }
  startsAt: string
  endsAt: string | null
  state: 'ACTIVE' | 'SCHEDULED'
  /** A shared code the owner allowed to publish; never a one-time code. */
  code: string | null
  soldOut: boolean
}

const TYPES = ['GIFT_CODE', 'DISCOUNT_CODE', 'SHOP_SALE'] as const
const isRecord = (v: unknown): v is Record<string, unknown> => typeof v === 'object' && v !== null && !Array.isArray(v)
const text = (v: unknown, max: number): string | null => (typeof v === 'string' && v.trim() ? v.trim().slice(0, max) : null)
const date = (v: unknown): string | null => (typeof v === 'string' && !Number.isNaN(Date.parse(v)) ? new Date(v).toISOString() : null)

/** At most this many campaigns are shown, whatever the feed lists. */
export const MAX_PROMOTIONS = 6

/** The feed's campaigns that are safe to show, running or upcoming, ended ones left out. Anything malformed is skipped. */
export function parsePromotionsFeed(input: unknown, now = Date.now()): PublicPromotion[] {
  if (!isRecord(input) || !Array.isArray(input.campaigns)) return []
  const out: PublicPromotion[] = []
  for (const c of input.campaigns) {
    if (!isRecord(c) || !isRecord(c.title) || !isRecord(c.description)) continue
    const id = typeof c.id === 'string' && /^[a-z]+-[a-z0-9]{4,12}$/.test(c.id) ? c.id : null
    const type = TYPES.find((t) => t === c.type)
    const titleFa = text(c.title.fa, 80)
    const startsAt = date(c.startsAt)
    const endsAt = c.endsAt === null ? null : date(c.endsAt)
    if (!id || !type || !titleFa || !startsAt || (c.endsAt !== null && !endsAt)) continue
    if (endsAt && Date.parse(endsAt) <= now) continue
    const code = typeof c.code === 'string' && /^[A-Z0-9]{4,24}$/.test(c.code) ? c.code : null
    out.push({
      id,
      type,
      title: { fa: titleFa, en: text(c.title.en, 80) },
      description: { fa: text(c.description.fa, 400), en: text(c.description.en, 400) },
      startsAt,
      endsAt,
      state: Date.parse(startsAt) > now ? 'SCHEDULED' : 'ACTIVE',
      code,
      soldOut: c.soldOut === true,
    })
    if (out.length >= MAX_PROMOTIONS) break
  }
  return out
}
