<template>
  <div class="min-h-screen flex flex-col bg-base text-text">
    <TheHeader />
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