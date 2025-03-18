<template>
  <div class="min-h-screen flex flex-col bg-base text-text">
    <TheHeader />
    <main class="flex-grow">
      <slot />
    </main>
    <TheFooter />
  </div>
</template>

<script setup>
import TheHeader from '../components/layout/TheHeader.vue'
import TheFooter from '../components/layout/TheFooter.vue'

// Layout setup
useHead({
  htmlAttrs: {
    lang: 'fr',
    class: 'dark-mode'
  },
  bodyAttrs: {
    class: 'overflow-x-hidden'
  }
})
</script>