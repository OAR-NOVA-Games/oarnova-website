// Loaded synchronously in <head> (external file: production CSP is script-src 'self').
// Marks the document as "motion expected" so intro elements can wait for GSAP.
// Fails open: reduced motion opts out, and the mark is removed after 3 s if GSAP
// never reported readiness (blocked script, slow device, runtime error).
;(function () {
  var d = document.documentElement
  try {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  } catch (e) {
    return
  }
  d.classList.add('motion')
  window.setTimeout(function () {
    if (!d.classList.contains('motion-ready')) d.classList.remove('motion')
  }, 3000)
})()
