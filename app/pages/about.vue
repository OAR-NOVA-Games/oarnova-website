<script setup lang="ts">
const { t, link, num } = useLocale()
const root = ref<HTMLElement | null>(null)

useSeo(() => ({ title: t.value.seo.about.title, description: t.value.seo.about.description, path: '/about/' }))

useMotion(root, ({ gsap }) => {
  gsap.utils.toArray<HTMLElement>('.principle').forEach((el) => {
    const st = { trigger: el, start: 'top 85%', once: true }
    gsap.fromTo(el.querySelector('.rule'), { scaleX: 0 }, { scaleX: 1, duration: 1, ease: 'expo.out', scrollTrigger: st })
    gsap.fromTo(
      el.querySelectorAll('.p-body > *'),
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.08, ease: 'power2.out', scrollTrigger: { ...st } },
    )
  })
  gsap.fromTo(
    '.mark',
    { opacity: 0, scale: 0.94 },
    { opacity: 1, scale: 1, duration: 1.4, ease: 'expo.out', scrollTrigger: { trigger: '.closing', start: 'top 80%', once: true } },
  )
})
</script>

<template>
  <div ref="root">
    <PageIntro :label="t.about.label" :lines="t.about.title" :lede="t.about.intro" />

    <section class="principles wrap" aria-labelledby="principles-title">
      <h2 id="principles-title" class="eyebrow label">{{ t.about.principlesLabel }}</h2>
      <ol class="list">
        <li v-for="(p, i) in t.about.principles" :key="i" class="principle">
          <i class="rule" aria-hidden="true" />
          <span class="display n" aria-hidden="true">{{ num(`0${i + 1}`) }}</span>
          <div class="p-body">
            <h3 class="p-title">{{ p.title }}</h3>
            <p>{{ p.body }}</p>
          </div>
        </li>
      </ol>
    </section>

    <section class="closing wrap">
      <img
        class="mark"
        src="/media/studio/oar-nova-logo-1024.webp"
        srcset="/media/studio/oar-nova-logo-512.webp 512w, /media/studio/oar-nova-logo-1024.webp 1024w"
        sizes="(max-width: 900px) 240px, 380px"
        width="1024"
        height="1024"
        alt="OAR NOVA Games"
        loading="lazy"
        decoding="async"
      />
      <div>
        <p class="closing-text">{{ t.about.closing }}</p>
        <NuxtLink :to="link('/contact/')" class="cta">{{ t.about.closingCta }} <span class="arrow" aria-hidden="true">↗</span></NuxtLink>
      </div>
    </section>
  </div>
</template>

<style scoped>
.principles {
  background: var(--color-paper);
  color: #171914;
  padding-block: clamp(80px, 9vw, 140px);
}
.label {
  color: #4a5049;
  margin-bottom: 40px;
}
.list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 56px 8%;
}
.principle {
  position: relative;
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 24px;
  padding-top: 28px;
}
.rule {
  position: absolute;
  inset-inline: 0;
  top: 0;
  height: 1px;
  background: #171914;
  transform-origin: var(--o, left);
}
html[dir='rtl'] .rule {
  --o: right;
}
.n {
  font-size: 56px;
  color: var(--color-moss);
}
.p-title {
  font-size: clamp(22px, 2vw, 30px);
  line-height: 1.25;
  font-weight: 700;
  margin-bottom: 12px;
}
html[lang='fa'] .p-title {
  line-height: 1.6;
}
.p-body p {
  color: #3a3f38;
  max-width: 460px;
}
.closing {
  display: grid;
  grid-template-columns: 380px 1fr;
  gap: 8%;
  align-items: center;
  padding-block: clamp(80px, 9vw, 140px);
}
.mark {
  width: 100%;
  height: auto;
}
.closing-text {
  font-size: clamp(22px, 2.4vw, 36px);
  line-height: 1.35;
  max-width: 720px;
  margin-bottom: 28px;
}
html[lang='fa'] .closing-text {
  line-height: 1.8;
}
@media (max-width: 900px) {
  .list,
  .closing {
    grid-template-columns: 1fr;
  }
  .mark {
    max-width: 240px;
  }
}
</style>
