<script setup lang="ts">
const { t, link } = useLocale()
useSeo(() => ({ title: t.value.seo.notFound.title, description: t.value.seo.notFound.description }))
</script>

<template>
  <section class="nf wrap" aria-labelledby="nf-title">
    <p class="code display" aria-hidden="true">{{ t.notFound.code }}</p>
    <h1 id="nf-title" class="display title">
      <span v-for="(l, i) in t.notFound.title" :key="i">{{ l }}</span>
    </h1>
    <p class="body">{{ t.notFound.body }}</p>
    <div class="links">
      <NuxtLink :to="link('/')" class="cta">{{ t.notFound.home }} <span class="arrow" aria-hidden="true">↗</span></NuxtLink>
      <NuxtLink :to="link('/games/')" class="cta">{{ t.notFound.games }} <span class="arrow" aria-hidden="true">↗</span></NuxtLink>
    </div>
  </section>
</template>

<style scoped>
.nf {
  position: relative;
  overflow: hidden;
  min-height: calc(100svh - var(--header-h));
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-block: 80px;
}
.code {
  position: absolute;
  inset-inline-end: -0.04em;
  bottom: -0.12em;
  font-size: clamp(220px, 40vw, 640px);
  color: transparent;
  -webkit-text-stroke: 1px rgb(236 232 221 / 0.18);
  pointer-events: none;
  line-height: 1;
}
.title {
  position: relative;
  font-size: clamp(64px, 9vw, 160px);
}
html[lang='fa'] .title {
  font-size: clamp(52px, 7vw, 120px);
}
.title span {
  display: block;
}
.title span:last-child {
  color: var(--color-cyan);
}
.body {
  position: relative;
  margin-top: 32px;
  max-width: 460px;
  color: #c8c5bb;
}
.links {
  position: relative;
  margin-top: 24px;
  display: flex;
  flex-wrap: wrap;
  gap: 8px 40px;
}
</style>
