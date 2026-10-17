<script setup lang="ts">
const { t } = useLocale()
</script>

<template>
  <div class="site">
    <a class="skip" href="#main">{{ t.skip }}</a>
    <SiteHeader />
    <main id="main" tabindex="-1">
      <slot />
    </main>
    <SiteFooter />
  </div>
</template>

<style scoped>
.skip {
  position: absolute;
  z-index: 100;
  inset-inline-start: 16px;
  top: -100px;
  background: var(--color-cream);
  color: var(--color-ink);
  padding: 14px 20px;
  font-weight: 700;
}
.skip:focus {
  top: 12px;
}
main:focus {
  outline: none;
}
</style>
