# Motion specification

Motion supports reading order and the identity of each world. It is never the only carrier of
meaning, never hijacks scrolling, never pins sections and never loops (except the 2.8 s scroll cue line,
which is CSS and stops under reduced motion).

## Lifecycle (`app/composables/useMotion.ts`)

- GSAP + ScrollTrigger are imported dynamically on the client after mount (separate chunk, never
  during prerender).
- Each component's choreography runs inside one `gsap.context(…, root)`; `ctx.revert()` on unmount
  kills its tweens and ScrollTriggers and restores inline styles. Route changes and language switches
  therefore never leak triggers (E2E asserts `orphans() === 0` after navigation).
- `prefers-reduced-motion: reduce` → nothing is created; content is in its final state.
- Below 768 px (`compact`) scrubbed parallax is skipped and offsets are reduced.
- After `document.fonts.ready`, `ScrollTrigger.refresh()` recomputes positions once.

## No-JS and failure fallback

`public/motion-gate.js` (external, CSP-safe) adds `html.motion` only when motion is expected. CSS hides
`[data-intro]` elements only while `html.motion` is set and `html.motion-ready` is not. If GSAP has not
reported ready within 3 s (blocked bundle, error, slow device) the gate removes `motion` and everything
shows. Without JavaScript nothing is ever hidden. Only above-the-fold intro elements use the gate;
below-the-fold reveals are created by GSAP itself when it runs.

## Choreography

| Section | Mechanism | Rule |
|---|---|---|
| Hero | timeline: masked line rise (`yPercent 112→0`, 1.25 s, `power4.out`, 0.11 s stagger), orbit ring stroke draw, mark fade-scale, metadata fade | Once on load |
| Hero exit | orbit rotate 24° + scale 1.12; copy drifts −14% (scrub 0.6) | Desktop/tablet only |
| Work (paper cut) | line-by-line `clip-path` wipe + rise; index fades | Once at 72% |
| Dooma | field cut open on a diagonal (`clip-path` polygon), grid lines drawn (`stroke-dashoffset`), diamond nodes pop, logo lands (no rotation — identity rule) ; field parallax ±4% | Once at 62%; parallax scrub |
| Chista | frame opens like a window (`clip-path` inset 10–14% → 0, scrub), scene settles (scale 1.16 → 1), title rises, gold rule drawn | Scrub + once |
| YariZan | sheets rise then fan like a book opening, grade tabs slide out (`back.out`), logo settles | Once at 75% |
| Belief | lines rise, underline under the key word drawn last | Once |
| Contact | lines rise | Once |
| Inner pages | masked title rise + fades; games index rows wipe in; detail art clip reveal + parallax; step list slides from reading start (RTL aware) | Once |
| Micro-interactions | nav underline origin follows reading direction; CTA rule contracts and arrow nudges; menu bars morph | CSS transitions |
| Page transitions | CSS opacity/translate (`page` transition, out-in) | Disabled by reduced motion |

Animated properties are transforms, opacity and clip-path only; images have intrinsic sizes, so motion
causes no layout shift.
