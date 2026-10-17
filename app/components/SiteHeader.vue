<script setup lang="ts">
const { t, link, switchPath, other, num } = useLocale()
const route = useRoute()

const open = ref(false)
const button = ref<HTMLButtonElement | null>(null)
const panel = ref<HTMLElement | null>(null)

const items = computed(() => [
  { to: link('/games/'), label: t.value.nav.games, base: '/games/' },
  { to: link('/about/'), label: t.value.nav.about, base: '/about/' },
  { to: link('/contact/'), label: t.value.nav.contact, base: '/contact/' },
])
const current = (base: string) => basePath(route.path).startsWith(base)

async function toggle(next = !open.value) {
  open.value = next
  if (next) {
    await nextTick()
    panel.value?.querySelector<HTMLElement>('a')?.focus()
  } else {
    button.value?.focus()
  }
}

function onKey(e: KeyboardEvent) {
  if (!open.value) return
  if (e.key === 'Escape') toggle(false)
  // Keep Tab inside the open menu (button + panel links).
  if (e.key === 'Tab' && panel.value && button.value) {
    const nodes = [button.value, ...panel.value.querySelectorAll<HTMLElement>('a')]
    const i = nodes.indexOf(document.activeElement as HTMLElement)
    const next = e.shiftKey ? (i <= 0 ? nodes.length - 1 : i - 1) : (i + 1) % nodes.length
    e.preventDefault()
    nodes[next]?.focus()
  }
}

watch(
  () => route.fullPath,
  () => (open.value = false),
)
watch(open, (v) => import.meta.client && document.documentElement.classList.toggle('menu-open', v))
onMounted(() => window.addEventListener('keydown', onKey))
onBeforeUnmount(() => {
  window.removeEventListener('keydown', onKey)
  document.documentElement.classList.remove('menu-open')
})
</script>

<template>
  <header class="header" :class="{ open }">
    <NuxtLink :to="link('/')" class="identity">
      <img src="/media/studio/oar-nova-logo-512.webp" width="512" height="512" alt="" class="mark" />
      <span class="word" lang="en">
        <b>OAR NOVA</b>
        <span>Games Studio</span>
      </span>
    </NuxtLink>

    <nav class="nav" :aria-label="t.navLabel">
      <NuxtLink v-for="item in items" :key="item.base" :to="item.to" class="nav-link" :aria-current="current(item.base) ? 'page' : undefined">
        {{ item.label }}
      </NuxtLink>
    </nav>

    <div class="actions">
      <NuxtLink :to="switchPath" class="lang" :hreflang="other" :lang="other" :title="t.switchLabel">
        {{ t.switchTo }}
      </NuxtLink>
      <button
        ref="button"
        type="button"
        class="menu-btn"
        :aria-expanded="open"
        aria-controls="mobile-menu"
        :aria-label="open ? t.menuClose : t.menuOpen"
        @click="toggle()"
      >
        <span class="bars" aria-hidden="true"><i /><i /></span>
      </button>
    </div>

    <div id="mobile-menu" ref="panel" class="panel" :hidden="!open">
      <nav :aria-label="t.menu">
        <NuxtLink v-for="(item, i) in items" :key="item.base" :to="item.to" class="panel-link" :aria-current="current(item.base) ? 'page' : undefined">
          <span class="meta">{{ num(`0${i + 1}`) }}</span>
          <span class="display">{{ item.label }}</span>
        </NuxtLink>
      </nav>
      <p class="meta panel-foot">OAR NOVA Games Studio</p>
    </div>
  </header>
</template>

<style scoped>
.header {
  position: relative;
  z-index: 40;
  height: var(--header-h);
  display: flex;
  align-items: center;
  gap: 24px;
  padding-inline: var(--gutter);
  background: var(--color-ink);
  border-bottom: 1px solid var(--color-line);
}
.identity {
  display: flex;
  align-items: center;
  gap: 12px;
  min-height: 48px;
  margin-inline-end: auto;
}
.mark {
  width: 46px;
  height: 46px;
}
.word {
  display: flex;
  flex-direction: column;
  line-height: 1;
  direction: ltr;
}
.word b {
  font-stretch: 75%;
  font-weight: 800;
  font-size: 16px;
  letter-spacing: 0.08em;
}
.word span {
  margin-top: 5px;
  font-size: 8.5px;
  letter-spacing: 0.32em;
  text-transform: uppercase;
  color: var(--color-mute);
}
.nav {
  display: flex;
  gap: clamp(20px, 2.6vw, 44px);
}
.nav-link {
  position: relative;
  padding-block: 14px;
  font-size: 12px;
  font-weight: 650;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}
html[dir='rtl'] .nav-link {
  font-size: 15px;
  letter-spacing: 0;
}
.nav-link::after {
  content: '';
  position: absolute;
  inset-inline: 0;
  bottom: 8px;
  height: 1px;
  background: var(--color-cyan);
  transform: scaleX(0);
  transform-origin: var(--o, right);
  transition: transform 0.5s var(--ease-out-expo);
}
html[dir='rtl'] .nav-link::after {
  --o: left;
}
.nav-link:hover::after,
.nav-link[aria-current='page']::after {
  transform: scaleX(1);
  transform-origin: var(--o2, left);
}
html[dir='rtl'] .nav-link:hover::after,
html[dir='rtl'] .nav-link[aria-current='page']::after {
  --o2: right;
}
.actions {
  display: flex;
  align-items: center;
  gap: 8px;
}
.lang {
  display: inline-grid;
  place-items: center;
  min-width: 64px;
  min-height: 44px;
  padding-inline: 12px;
  border: 1px solid var(--color-line);
  font-size: 13px;
  font-weight: 600;
  transition:
    border-color 0.3s,
    color 0.3s;
}
.lang[lang='fa'] {
  font-family: var(--font-fa);
}
.lang[lang='en'] {
  font-family: var(--font-sans);
  letter-spacing: 0.08em;
  font-size: 12px;
  text-transform: uppercase;
}
.lang:hover {
  border-color: var(--color-cyan);
  color: var(--color-cyan);
}
.menu-btn {
  display: none;
  width: 48px;
  height: 48px;
  border: 1px solid var(--color-line);
  background: none;
  color: inherit;
  cursor: pointer;
}
.bars {
  display: grid;
  gap: 7px;
  width: 20px;
  margin: auto;
}
.bars i {
  display: block;
  height: 1.5px;
  background: currentColor;
  transition: transform 0.45s var(--ease-out-expo);
}
.open .bars i:first-child {
  transform: translateY(4.25px) rotate(45deg);
}
.open .bars i:last-child {
  transform: translateY(-4.25px) rotate(-45deg);
}
.panel {
  position: fixed;
  inset: var(--header-h) 0 0;
  background: var(--color-ink);
  padding: 32px var(--gutter);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow-y: auto;
}
.panel[hidden] {
  display: none;
}
.panel-link {
  display: flex;
  align-items: baseline;
  gap: 18px;
  padding-block: 14px;
  border-bottom: 1px solid var(--color-line);
}
.panel-link .display {
  font-size: clamp(56px, 17vw, 96px);
}
.panel-link[aria-current='page'] .display {
  color: var(--color-cyan);
}
.panel-foot {
  color: var(--color-mute);
  padding-top: 24px;
}

@media (max-width: 767px) {
  :root {
    --header-h: 72px;
  }
  .nav {
    display: none;
  }
  .menu-btn {
    display: block;
  }
  .mark {
    width: 40px;
    height: 40px;
  }
}
</style>

<style>
html.menu-open {
  overflow: hidden;
}
</style>
