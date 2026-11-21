<script setup lang="ts">
import { nextTick, onMounted, onUnmounted, watch } from 'vue'
import { useRoute } from 'vitepress'

const route = useRoute()
const BAR_HEIGHT = 16

let nav: HTMLElement | null = null
let bar: HTMLDivElement | null = null
let observer: MutationObserver | null = null
let frame = 0

function ensureBar(): HTMLDivElement | null {
  nav = document.querySelector<HTMLElement>('.VPSidebar .nav')
  if (!nav) return null
  bar = nav.querySelector<HTMLDivElement>('.pf-sidebar-indicator')
  if (!bar) {
    bar = document.createElement('div')
    bar.className = 'pf-sidebar-indicator'
    nav.appendChild(bar)
  }
  return bar
}

function update() {
  const el = ensureBar()
  if (!el || !nav) return

  const active = nav.querySelector<HTMLElement>('.VPSidebarItem.is-active > .item')
  if (!active) {
    el.style.opacity = '0'
    return
  }

  const navRect = nav.getBoundingClientRect()
  const itemRect = active.getBoundingClientRect()
  el.style.top = `${itemRect.top - navRect.top + (itemRect.height - BAR_HEIGHT) / 2}px`
  el.style.opacity = '1'
}

function scheduleUpdate() {
  cancelAnimationFrame(frame)
  frame = requestAnimationFrame(update)
}

onMounted(async () => {
  await nextTick()
  update()

  window.addEventListener('resize', scheduleUpdate)
  observer = new MutationObserver(scheduleUpdate)
  const sidebar = document.querySelector('.VPSidebar')
  if (sidebar) {
    observer.observe(sidebar, {
      subtree: true,
      childList: true,
      attributes: true,
      attributeFilter: ['class']
    })
  }
})

onUnmounted(() => {
  window.removeEventListener('resize', scheduleUpdate)
  observer?.disconnect()
  cancelAnimationFrame(frame)
})

watch(
  () => route.path,
  () => nextTick(scheduleUpdate)
)
</script>

<template>
  <span style="display: none" />
</template>
