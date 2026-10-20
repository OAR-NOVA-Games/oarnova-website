import { describe, expect, it } from 'vitest'
import { contact, gameList, gameSlugs, games, siteUrl } from '~/content/games'
import * as routes from '../../scripts/routes.mjs'

describe('game manifest', () => {
  it('keeps the permanent external destinations exactly', () => {
    expect(games.dooma.url).toBe('https://dooma.oarnova.games')
    expect(games.chista.url).toBe('https://chista.oarnova.games')
    expect(games.yarizan.url).toBe('https://yarizan.oarnova.games')
  })

  it('derives the displayed host from the URL', () => {
    for (const g of gameList) expect(new URL(g.url).host).toBe(g.host)
  })

  it('has the three games in a stable order with matching slugs', () => {
    expect(gameList.map((g) => g.slug)).toEqual(['dooma', 'chista', 'yarizan'])
    for (const s of gameSlugs) expect(games[s].slug).toBe(s)
  })

  it('declares facts in both languages with the same number of rows', () => {
    for (const g of gameList) {
      expect(g.facts.en.length).toBeGreaterThan(0)
      expect(g.facts.fa.length).toBe(g.facts.en.length)
    }
  })

  it('references only local, existing-looking media paths', () => {
    for (const g of gameList) {
      expect(g.logo.src).toMatch(/^\/media\//)
      expect(g.ogImage).toMatch(/^\/media\/og\//)
    }
  })

  it('publishes the official contact addresses', () => {
    expect(contact).toEqual({ info: 'info@oarnova.games', support: 'support@oarnova.games', phone: '+989369642754', phoneDisplay: '0936-964-2754' })
    expect(siteUrl).toBe('https://oarnova.games')
  })

  it('keeps scripts/routes.mjs in sync with the manifest', () => {
    expect(routes.gameSlugs).toEqual([...gameSlugs])
    expect(routes.siteUrl).toBe(siteUrl)
    expect(routes.allRoutes).toHaveLength(14)
    for (const r of routes.allRoutes) expect(r.endsWith('/')).toBe(true)
  })
})
