<script setup lang="ts">
const { t } = useLocale()
const root = ref<HTMLElement | null>(null)

// One still statement. Lines rise once; the underline under the key word is drawn last.
useMotion(root, ({ gsap }) => {
  const tl = gsap.timeline({ scrollTrigger: { trigger: root.value, start: 'top 65%', once: true } })
  tl.fromTo('.b-line > span', { yPercent: 108 }, { yPercent: 0, duration: 1.1, stagger: 0.1, ease: 'power4.out' }).fromTo(
    '.b-rule',
    { scaleX: 0 },
    { scaleX: 1, duration: 0.9, ease: 'expo.out' },
    0.7,
  )
})
</script>

<template>
  <section ref="root" class="belief wrap" aria-labelledby="belief-title">
    <div class="grid">
      <p class="eyebrow label">{{ t.home.beliefLabel }}</p>
      <h2 id="belief-title" class="display title">
        <span v-for="(l, i) in t.home.belief" :key="i" class="b-line">
          <span :class="{ 'b-key': i === 2 }">{{ l }}<i v-if="i === 2" class="b-rule" aria-hidden="true" /></span>
        </span>
      </h2>
    </div>
    <div class="foot">
      <p>{{ t.home.beliefBody }}</p>
      <p class="meta note">{{ t.home.beliefNote[0] }}<br />{{ t.home.beliefNote[1] }}</p>
    </div>
  </section>
</template>

<style scoped>
.belief {
  background: var(--color-stone);
  color: #121512;
  padding-block: clamp(96px, 10vw, 150px);
}
.grid {
  display: grid;
  grid-template-columns: 1fr 2.4fr;
  gap: 6%;
}
.label {
  color: #2c3e37;
  margin-top: 20px;
}
.title {
  font-size: clamp(70px, 10.8vw, 190px);
}
html[lang='fa'] .title {
  font-size: clamp(58px, 8vw, 140px);
}
.b-line {
  display: block;
  overflow: hidden;
  padding-bottom: 0.03em;
}
.b-line > span {
  display: inline-block;
}
.b-key {
  color: var(--color-moss);
  position: relative;
}
.b-rule {
  display: block;
  position: absolute;
  inset-inline: 0;
  bottom: -0.04em;
  height: 0.045em;
  background: currentColor;
  transform-origin: var(--o, left);
}
html[dir='rtl'] .b-rule {
  --o: right;
  bottom: 0.02em;
}
.foot {
  margin-top: clamp(64px, 9vw, 130px);
  padding-top: 28px;
  border-top: 1px solid rgb(0 0 0 / 0.26);
  display: flex;
  justify-content: space-between;
  gap: 40px;
}
.foot p:first-child {
  font-size: clamp(17px, 1.5vw, 21px);
  line-height: 1.55;
  max-width: 460px;
}
.note {
  color: #3c4f48;
  max-width: 280px;
  line-height: 1.8;
}
@media (max-width: 767px) {
  .grid {
    display: block;
  }
  .label {
    margin: 0 0 32px;
  }
  .title {
    font-size: clamp(56px, 17vw, 96px);
  }
  html[lang='fa'] .title {
    font-size: clamp(48px, 14vw, 76px);
  }
  .foot {
    display: block;
  }
  .note {
    margin-top: 24px;
  }
}
</style>
