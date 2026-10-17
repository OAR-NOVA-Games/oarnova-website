<script setup lang="ts">
const { t, link, num } = useLocale()
const root = ref<HTMLElement | null>(null)

useMotion(root, ({ gsap, compact, intro }) => {
  const tl = gsap.timeline({ defaults: { ease: 'power4.out' } })
  if (intro)
    tl.fromTo('[data-line] > span', { yPercent: 112 }, { yPercent: 0, duration: 1.25, stagger: 0.11 }, 0.1)
      .fromTo('.orbit-ring', { strokeDashoffset: 1900 }, { strokeDashoffset: 0, duration: 2.2, ease: 'power2.inOut' }, 0)
      .fromTo('.orbit-mark', { opacity: 0, scale: 0.92 }, { opacity: 1, scale: 1, duration: 1.6, ease: 'expo.out' }, 0.5)
      .fromTo('[data-fade]', { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.9, stagger: 0.09, ease: 'power2.out' }, 0.65)

  // One restrained scroll-linked gesture: the orbit turns away as the hero leaves.
  if (!compact) {
    gsap.to('.orbit', {
      rotate: 24,
      scale: 1.12,
      ease: 'none',
      scrollTrigger: { trigger: root.value, start: 'top top', end: 'bottom top', scrub: 0.6 },
    })
    gsap.to('.hero-copy', {
      yPercent: -14,
      ease: 'none',
      scrollTrigger: { trigger: root.value, start: 'top top', end: 'bottom top', scrub: 0.6 },
    })
  }
})
</script>

<template>
  <section ref="root" class="hero" aria-labelledby="hero-title">
    <div class="grain" />
    <div class="orbit" aria-hidden="true">
      <svg viewBox="0 0 760 760" fill="none">
        <circle class="guide" cx="380" cy="380" r="318" />
        <circle class="guide" cx="380" cy="380" r="226" />
        <circle class="orbit-ring" cx="380" cy="380" r="294" />
        <ellipse class="gold" cx="380" cy="380" rx="140" ry="345" transform="rotate(-42 380 380)" />
        <ellipse class="guide" cx="380" cy="380" rx="282" ry="152" transform="rotate(-37 380 380)" />
        <path class="guide" d="M40 380H720M380 40V720" />
        <circle cx="562" cy="146" r="7" fill="var(--color-cyan)" />
        <circle cx="210" cy="582" r="4.5" fill="var(--color-gold)" />
        <circle cx="662" cy="434" r="6" stroke="var(--color-cream)" stroke-opacity=".6" />
      </svg>
      <img class="orbit-mark" data-intro src="/media/studio/oar-nova-logo-512.webp" width="512" height="512" alt="" loading="lazy" />
    </div>

    <div class="hero-copy wrap">
      <p class="eyebrow kicker" data-intro data-fade>{{ t.home.kicker }}</p>
      <h1 id="hero-title" class="display title" :aria-label="t.home.heroLabel">
        <span v-for="(w, i) in t.home.hero" :key="i" class="line" data-line aria-hidden="true">
          <span data-intro>{{ w }}</span>
        </span>
      </h1>
      <p class="accent tagline" data-intro data-fade>{{ t.home.tagline }}</p>
      <div class="lead-row" data-intro data-fade>
        <p class="lead">{{ t.home.lead }}</p>
        <NuxtLink :to="link('/games/')" class="cta"> {{ t.home.explore }} <span class="arrow" aria-hidden="true">↗</span> </NuxtLink>
      </div>
    </div>

    <div class="hero-foot wrap" data-intro data-fade>
      <a href="#work" class="scroll">
        <span class="drop" aria-hidden="true" />
        <span class="meta">{{ t.home.scroll }}</span>
      </a>
      <p class="counter">
        <b>{{ num('03') }}</b>
        <span class="meta">{{ t.home.counter[0] }}<br />{{ t.home.counter[1] }}</span>
      </p>
    </div>
  </section>
</template>

<style scoped>
.hero {
  position: relative;
  isolation: isolate;
  overflow: hidden;
  min-height: max(640px, calc(100svh - var(--header-h)));
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-block: 64px 132px;
  background: radial-gradient(90% 70% at 85% 30%, rgb(168 216 211 / 0.07), transparent 60%), var(--color-ink);
}
.orbit {
  position: absolute;
  z-index: -1;
  width: min(60vw, 860px);
  aspect-ratio: 1;
  inset-inline-end: -12vw;
  top: 50%;
  margin-top: max(-30vw, -430px);
  transform-origin: center;
}
.orbit svg {
  position: absolute;
  inset: 0;
  overflow: visible;
}
.guide {
  stroke: rgb(236 232 221 / 0.14);
  stroke-width: 0.8;
}
.gold {
  stroke: var(--color-gold);
  stroke-opacity: 0.55;
}
.orbit-ring {
  stroke: var(--color-cyan);
  stroke-width: 1.4;
  stroke-dasharray: 1900;
}
.orbit-mark {
  position: absolute;
  width: 34%;
  height: auto;
  left: 33%;
  top: 30%;
  opacity: 0.92;
}
.hero-copy {
  position: relative;
}
.kicker {
  color: var(--color-cyan);
  margin-bottom: 36px;
}
.title {
  font-size: clamp(88px, 13.4vw, 236px);
}
.line {
  display: block;
  width: max-content;
  max-width: 100%;
  overflow: hidden;
  padding-inline-end: 0.06em;
  padding-bottom: 0.02em;
}
.line > span {
  display: block;
}
.line:nth-child(2) {
  padding-inline-start: 0.62em;
}
.line:nth-child(3) {
  color: var(--color-cyan);
  padding-inline-start: 0.3em;
}
html[lang='fa'] .title {
  font-size: clamp(72px, 9.2vw, 160px);
  line-height: 1.12;
}
html[lang='fa'] .line:nth-child(2) {
  padding-inline-start: 1.1em;
}
html[lang='fa'] .line:nth-child(3) {
  padding-inline-start: 0.4em;
}
.tagline {
  margin-top: 28px;
  font-size: clamp(26px, 2.6vw, 42px);
  line-height: 1.15;
  color: var(--color-gold);
  padding-inline-start: 0.12em;
}
html[lang='fa'] .tagline {
  font-size: clamp(22px, 2.1vw, 32px);
  line-height: 1.6;
}
.lead-row {
  margin-top: 36px;
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  gap: 20px 56px;
  max-width: 820px;
}
.lead {
  max-width: 400px;
  color: #c8c5bb;
  font-size: clamp(15px, 1.15vw, 17px);
}
.hero-foot {
  position: absolute;
  inset-inline: 0;
  bottom: 28px;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 20px;
}
.scroll {
  display: flex;
  align-items: center;
  gap: 16px;
  min-height: 48px;
  color: #b6c9c4;
}
.drop {
  width: 1px;
  height: 52px;
  background: rgb(168 216 211 / 0.35);
  position: relative;
  overflow: hidden;
}
.drop::before {
  content: '';
  position: absolute;
  inset-inline: 0;
  height: 18px;
  background: var(--color-cream);
  animation: drop 2.8s var(--ease-out-expo) infinite;
}
@keyframes drop {
  from {
    transform: translateY(-20px);
  }
  to {
    transform: translateY(70px);
  }
}
.counter {
  display: flex;
  align-items: flex-end;
  gap: 18px;
}
.counter b {
  font-stretch: 62%;
  font-weight: 800;
  font-size: 44px;
  line-height: 0.85;
}
.counter .meta {
  color: var(--color-mute);
}

/* Very wide screens: let the orbit come in from the edge and the title keep growing,
   so the composition does not split into two islands. */
@media (min-width: 1920px) {
  .title {
    font-size: clamp(236px, 12.5vw, 320px);
  }
  .orbit {
    width: min(44vw, 1150px);
    inset-inline-end: 3vw;
    margin-top: max(-22vw, -575px);
  }
}
@media (max-width: 1023px) {
  .orbit-mark {
    display: none;
  }
  .orbit {
    width: 86vw;
    inset-inline-end: -34vw;
    margin-top: -60vw;
    opacity: 0.7;
  }
}
@media (max-width: 767px) {
  .hero {
    justify-content: flex-start;
    padding-top: 48px;
    min-height: max(700px, calc(100svh - var(--header-h)));
  }
  .orbit {
    width: 118vw;
    inset-inline-end: -62vw;
    top: 6%;
    margin-top: 0;
    opacity: 0.55;
  }
  .title {
    font-size: clamp(76px, 25vw, 132px);
  }
  html[lang='fa'] .title {
    font-size: clamp(58px, 17vw, 96px);
  }
  .kicker {
    margin-bottom: 26px;
  }
  .counter,
  .orbit-mark {
    display: none;
  }
}
</style>
