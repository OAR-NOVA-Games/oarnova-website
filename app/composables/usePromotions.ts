import { parsePromotionsFeed, PROMOTIONS_FEED_PATH, type PublicPromotion } from '~/content/promotions'

export type PromotionsState = { status: 'loading' } | { status: 'ready'; items: PublicPromotion[] } | { status: 'unavailable' }

/**
 * Reads the public CHISTA promotions after the page has rendered (the static HTML never depends on it). A slow or
 * failing feed degrades to `unavailable` after a short timeout (a missing feed, 404, is simply "no campaigns"); no
 * retry loop, no query parameters, no analytics.
 */
export function usePromotions() {
  const state = ref<PromotionsState>({ status: 'loading' })
  onMounted(async () => {
    const controller = new AbortController()
    const timer = setTimeout(() => controller.abort(), 6000)
    try {
      const response = await fetch(PROMOTIONS_FEED_PATH, { signal: controller.signal, credentials: 'omit', headers: { accept: 'application/json' } })
      // No feed route (404) means no public campaign: show nothing. Other failures show the fallback note.
      if (response.status === 404) {
        state.value = { status: 'ready', items: [] }
        return
      }
      if (!response.ok) throw new Error(`HTTP ${response.status}`)
      state.value = { status: 'ready', items: parsePromotionsFeed(await response.json()) }
    } catch {
      state.value = { status: 'unavailable' }
    } finally {
      clearTimeout(timer)
    }
  })
  return state
}
