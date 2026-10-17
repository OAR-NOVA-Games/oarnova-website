# Accessibility

Target: WCAG 2.1 AA.

| Requirement | Implementation | Verified by |
|---|---|---|
| Skip link | First focusable element, moves to `<main id="main">` | `navigation.spec.ts` |
| Keyboard | All controls are links/buttons; visible `:focus-visible` outline (currentColor, 2px, 4px offset) | `navigation.spec.ts` |
| Mobile menu | `<button aria-expanded aria-controls>`, focus moves into the menu, Tab is trapped, Escape closes and returns focus, closes on navigation, body scroll locked | `navigation.spec.ts` |
| Touch targets | ≥ 44×44 px for menu, language switch, nav, footer links and CTAs (48px min-height) | `navigation.spec.ts` |
| Language | `lang`/`dir` per page; inline `lang` on the switch and Latin wordmark | `pages.spec.ts` |
| Names | Visible text is the accessible name (no mismatched `aria-label`, WCAG 2.5.3) | axe |
| Images | Logos have localized alt text; decorative art `alt=""`/`aria-hidden` | axe |
| Status | Text chip, not colour alone | review |
| External links | New tab announced in visually hidden text | review |
| Contrast | Tokens chosen for ≥ 4.5:1 body text; decorative numerals adjusted where axe flagged | axe (all pages, desktop + mobile) |
| Motion | Reduced motion disables GSAP, transitions and the scroll cue; nothing depends on animation | `motion.spec.ts` |
| Without JS | Full content visible | `motion.spec.ts` |

Automated: `tests/e2e/a11y.spec.ts` runs axe-core (wcag2a/aa, wcag21a/aa) on every EN/FA page and both
404 pages at desktop and mobile widths — 0 violations at the time of writing.

Not yet done: a manual screen-reader pass (NVDA/VoiceOver) in both languages.
