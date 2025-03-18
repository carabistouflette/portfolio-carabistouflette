<template>
  <div class="min-h-screen flex flex-col bg-base text-text">
    <TheHeader />
    <main class="flex-grow">
      <slot />
    </main>
    <TheFooter />
  </div>
</template>

<script setup lang="ts">
// Layout setup
useHead({
  htmlAttrs: {
    lang: 'fr'
  },
  bodyAttrs: {
    class: 'bg-base text-text overflow-x-hidden'
  }
})
</script>