<script setup lang="ts">
// Shared editorial page opener: eyebrow, masked multi-line display title, lede.
defineProps<{ label: string; lines: string[]; lede?: string }>()
const root = ref<HTMLElement | null>(null)

useMotion(root, ({ gsap }) => {
  gsap
    .timeline({ defaults: { ease: 'power4.out' } })
    .fromTo('.p-line > span', { yPercent: 110 }, { yPercent: 0, duration: 1.15, stagger: 0.1 }, 0.1)
    .fromTo('[data-fade]', { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.8, stagger: 0.08, ease: 'power2.out' }, 0.5)
})
</script>

<template>
  <header ref="root" class="intro wrap">
    <p class="eyebrow label" data-intro data-fade>{{ label }}</p>
    <h1 class="display title">
      <span v-for="(l, i) in lines" :key="i" class="p-line"
        ><span data-intro>{{ l }}</span></span
      >
    </h1>
    <p v-if="lede" class="lede" data-intro data-fade>{{ lede }}</p>
  </header>
</template>

<style scoped>
.intro {
  padding-block: clamp(72px, 9vw, 140px) clamp(56px, 6vw, 96px);
}
.label {
  color: var(--color-cyan);
  margin-bottom: 36px;
}
.title {
  font-size: clamp(72px, 11vw, 200px);
}
html[lang='fa'] .title {
  font-size: clamp(56px, 8vw, 144px);
}
.p-line {
  display: block;
  overflow: hidden;
  padding-bottom: 0.03em;
}
.p-line > span {
  display: block;
}
.p-line:last-child {
  color: var(--color-cyan);
}
.lede {
  margin-top: 40px;
  max-width: 600px;
  color: #c8c5bb;
  font-size: clamp(17px, 1.4vw, 20px);
  line-height: 1.6;
}
@media (max-width: 767px) {
  .title {
    font-size: clamp(60px, 18vw, 100px);
  }
  html[lang='fa'] .title {
    font-size: clamp(48px, 13.5vw, 76px);
  }
}
</style>
