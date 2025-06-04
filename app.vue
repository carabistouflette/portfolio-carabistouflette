<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
import { usePageReady } from '~/composables/usePageReady';
import { usePageTransitions } from '~/composables/usePageTransitions';

// Page ready management
usePageReady();

// Page transitions
usePageTransitions();

// Head configuration
useHead({
  htmlAttrs: {
    lang: 'fr',
    class: 'dark'
  },
  bodyAttrs: {
    class: 'bg-base text-text'
  }
});
</script>

<style>
/* Page transition animations */
.page-enter-active,
.page-leave-active {
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.page-enter-from {
  opacity: 0;
  transform: translateY(20px);
  filter: blur(4px);
}

.page-leave-to {
  opacity: 0;
  transform: translateY(-20px);
  filter: blur(4px);
}

/* Layout transition for mobile menu */
.layout-enter-active,
.layout-leave-active {
  transition: all 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.layout-enter-from {
  opacity: 0;
  transform: scale(0.98);
}

.layout-leave-to {
  opacity: 0;
  transform: scale(1.02);
}

/* Fade transition */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Slide up transition */
.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.slide-up-enter-from {
  opacity: 0;
  transform: translateY(30px);
}

.slide-up-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

/* Scale transition */
.scale-enter-active,
.scale-leave-active {
  transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

.scale-enter-from {
  opacity: 0;
  transform: scale(0.9);
}

.scale-leave-to {
  opacity: 0;
  transform: scale(1.1);
}

</style>