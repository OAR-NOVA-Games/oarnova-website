import { describe, expect, it } from 'vitest'
import { copy } from '~/content/copy'

type Json = string | number | boolean | null | Json[] | { [k: string]: Json }

function shape(v: Json): Json {
  if (Array.isArray(v)) return v.map(shape)
  if (v && typeof v === 'object')
    return Object.fromEntries(
      Object.keys(v)
        .sort()
        .map((k) => [k, shape(v[k] as Json)]),
    )
  return typeof v
}

function strings(v: Json, path = ''): [string, string][] {
  if (typeof v === 'string') return [[path, v]]
  if (Array.isArray(v)) return v.flatMap((x, i) => strings(x, `${path}[${i}]`))
  if (v && typeof v === 'object') return Object.entries(v).flatMap(([k, x]) => strings(x as Json, path ? `${path}.${k}` : k))
  return []
}

describe('localized copy', () => {
  it('has the same structure in English and Persian', () => {
    expect(shape(copy.fa as unknown as Json)).toEqual(shape(copy.en as unknown as Json))
  })

  it('has no empty strings (except the deliberately empty Persian connective)', () => {
    for (const lang of ['en', 'fa'] as const) {
      const empty = strings(copy[lang] as unknown as Json)
        .filter(([, s]) => !s.trim())
        .map(([p]) => p)
      expect(empty).toEqual(lang === 'fa' ? ['home.work[2]'] : [])
    }
  })

  it('writes Persian copy in Persian script', () => {
    const latinOnly = strings(copy.fa as unknown as Json)
      .filter(([, s]) => s.trim() && !/[؀-ۿ]/.test(s))
      .map(([p]) => p)
    // The only Persian-page string written in Latin script is the switch to English.
    expect(latinOnly).toEqual(['switchTo'])
  })

  it('makes no unverifiable claims', () => {
    const banned = /\b(award|downloads?|million|testimonial|founded in|available now|download now|#1|best[- ]selling)\b/i
    for (const lang of ['en', 'fa'] as const) {
      for (const [p, s] of strings(copy[lang] as unknown as Json)) {
        if (p.endsWith('.note')) continue // the notes say what is *not* available
        expect(s, p).not.toMatch(banned)
      }
    }
  })
})
