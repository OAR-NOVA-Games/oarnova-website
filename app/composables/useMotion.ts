import type { gsap as Gsap } from 'gsap'
import type { ScrollTrigger as ST } from 'gsap/ScrollTrigger'
import type { Ref } from 'vue'

export interface MotionKit {
  gsap: typeof Gsap
  ScrollTrigger: typeof ST
  root: HTMLElement
  /** True below 768px: compositions animate less on phones. */
  compact: boolean
  /**
   * True when the CSS intro gate (main.css) is holding [data-intro] elements for an entrance,
   * or on later client-side navigations. False on phones and once the 3 s failsafe has
   * revealed content: it then stays where it is and must not be animated in.
   */
  intro: boolean
}

declare global {
  interface Window {
    __oarMotion?: { contexts: number; triggers: () => number; orphans: () => number }
  }
}

/**
 * Scoped GSAP choreography for one component.
 * - GSAP is loaded lazily on the client only (never during prerender).
 * - Everything created in `setup` lives in one gsap.context and is reverted on
 *   unmount, so ScrollTriggers never leak across route or locale changes.
 * - With prefers-reduced-motion nothing runs: content is already in its final state.
 */
export function useMotion(root: Ref<HTMLElement | null>, setup: (kit: MotionKit) => void) {
  let ctx: gsap.Context | undefined
  let alive = true

  onMounted(async () => {
    const html = document.documentElement
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const [{ gsap }, { ScrollTrigger }] = await Promise.all([import('gsap'), import('gsap/ScrollTrigger')])
    if (!alive || !root.value) return
    gsap.registerPlugin(ScrollTrigger)
    const el = root.value
    const compact = window.matchMedia('(max-width: 767px)').matches
    const intro = !compact && (html.classList.contains('motion-ready') || performance.now() < 2800)
    ctx = gsap.context(() => setup({ gsap, ScrollTrigger, root: el, compact, intro }), el)
    html.classList.add('motion-ready')
    // Test hook (read-only): proves GSAP ran and that no trigger outlives its element.
    window.__oarMotion = {
      contexts: (window.__oarMotion?.contexts ?? 0) + 1,
      triggers: () => ScrollTrigger.getAll().length,
      orphans: () => ScrollTrigger.getAll().filter((st) => !(st.trigger as Element | undefined)?.isConnected).length,
    }
    // Late font swaps change text metrics; recompute trigger positions once.
    document.fonts?.ready.then(() => alive && ScrollTrigger.refresh())
  })

  onBeforeUnmount(() => {
    alive = false
    ctx?.revert()
    ctx = undefined
  })
}
