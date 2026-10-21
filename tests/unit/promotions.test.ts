import { describe, expect, it } from 'vitest'
import { MAX_PROMOTIONS, parsePromotionsFeed } from '~/content/promotions'

const NOW = Date.parse('2026-12-20T00:00:00Z')
const campaign = (over: Record<string, unknown> = {}) => ({
  id: 'gift-7k3m9q',
  type: 'GIFT_CODE',
  title: { fa: 'هدیهٔ یلدا', en: 'Yalda gift' },
  description: { fa: 'توضیح', en: null },
  startsAt: '2026-12-18T00:00:00.000Z',
  endsAt: '2026-12-23T00:00:00.000Z',
  state: 'ACTIVE',
  code: 'YALDA1405',
  soldOut: false,
  ...over,
})

describe('public CHISTA promotions feed', () => {
  it('keeps the public fields of valid campaigns and derives their state from the dates', () => {
    const [p] = parsePromotionsFeed({ campaigns: [campaign({ startsAt: '2026-12-21T00:00:00.000Z' })] }, NOW)
    expect(p).toEqual({
      id: 'gift-7k3m9q',
      type: 'GIFT_CODE',
      title: { fa: 'هدیهٔ یلدا', en: 'Yalda gift' },
      description: { fa: 'توضیح', en: null },
      startsAt: '2026-12-21T00:00:00.000Z',
      endsAt: '2026-12-23T00:00:00.000Z',
      state: 'SCHEDULED',
      code: 'YALDA1405',
      soldOut: false,
    })
  })

  it('drops unknown fields, ended or malformed campaigns and anything that does not look like a public code', () => {
    const parsed = parsePromotionsFeed(
      {
        campaigns: [
          campaign({ secret: 'x', prizes: [{ weight: 1 }] }),
          campaign({ id: 'javascript:alert(1)' }),
          campaign({ endsAt: '2026-12-19T00:00:00.000Z' }),
          campaign({ title: { fa: '' } }),
          campaign({ type: 'OTHER' }),
          campaign({ code: '<img src=x>' }),
          'not an object',
        ],
      },
      NOW,
    )
    expect(parsed.map((p) => p.code)).toEqual(['YALDA1405', null])
    expect(Object.keys(parsed[0]!)).not.toContain('secret')
    expect(JSON.stringify(parsed)).not.toContain('prizes')
  })

  it('caps text lengths and the number of campaigns; a non-feed answer is empty', () => {
    const long = 'ش'.repeat(500)
    const [p] = parsePromotionsFeed({ campaigns: [campaign({ title: { fa: long, en: null }, description: { fa: long, en: null } })] }, NOW)
    expect(p!.title.fa.length).toBe(80)
    expect(p!.description.fa!.length).toBe(400)
    expect(parsePromotionsFeed({ campaigns: Array.from({ length: 20 }, () => campaign()) }, NOW)).toHaveLength(MAX_PROMOTIONS)
    expect(parsePromotionsFeed(null)).toEqual([])
    expect(parsePromotionsFeed({ campaigns: 'x' })).toEqual([])
  })
})
