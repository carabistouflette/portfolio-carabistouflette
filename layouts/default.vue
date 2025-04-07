<template>
  <div class="min-h-screen flex flex-col bg-base text-text">
    <TheHeader @toggle-terminal="toggleTerminal" /> <!-- Pass toggle function or use provide/inject -->
    <main class="flex-grow">
      <slot />
    </main>
    <TheFooter
      :social-links="{
        linkedin: 'https://linkedin.com/in/alexis-robin-41703a2ab',
        email: 'mailto:alexis.robin@etu.umontpellier.fr',
        phone: 'tel:+33761460496'
      }"
    />
    <!-- Cursor Spotlight Element -->
    <div ref="spotlight" class="cursor-spotlight"></div>
    <!-- Terminal Panel -->
    <TerminalPanel :is-visible="isTerminalVisible" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, provide } from 'vue'
import TerminalPanel from '~/components/terminal/TerminalPanel.vue' // Import the terminal component
// Layout setup
useHead({
  htmlAttrs: {
    lang: 'fr'
  },
  bodyAttrs: {
    class: 'bg-base text-text overflow-x-hidden' // Keep existing classes
  }
})

// Terminal State
const isTerminalVisible = ref(false)
const toggleTerminal = () => {
  isTerminalVisible.value = !isTerminalVisible.value
}

// Provide state and toggle function to children
provide('isTerminalVisible', isTerminalVisible) // Provide the ref directly
provide('toggleTerminal', toggleTerminal)

// Cursor Spotlight Logic
const spotlight = ref<HTMLElement | null>(null)

const updateSpotlight = (e: MouseEvent) => {
  if (spotlight.value) {
    // Use clientX/clientY for viewport-relative coordinates
    spotlight.value.style.left = `${e.clientX}px`
    spotlight.value.style.top = `${e.clientY}px`
  }
}

onMounted(() => {
  window.addEventListener('mousemove', updateSpotlight)
  // Optional: Hide default cursor if the spotlight is prominent enough
  // document.body.style.cursor = 'none';
})

onUnmounted(() => {
  window.removeEventListener('mousemove', updateSpotlight)
  // Optional: Restore default cursor on unmount
  // document.body.style.cursor = 'auto';
})
</script>