<template>
  <header
    class="sticky top-0 z-50 backdrop-blur-md bg-base/80 border-b border-surface0 transition-all duration-300"
    :class="{ 'shadow-md': scrolled }"
  >
    <div class="container-custom py-4 flex items-center justify-between">
      <!-- Logo -->
      <NuxtLink to="/" class="flex items-center space-x-2 group">
        <div class="w-10 h-10 rounded-full bg-mauve text-crust flex items-center justify-center font-bold group-hover:scale-110 transition-transform duration-300">
          AR
        </div>
        <span class="font-bold text-xl hidden sm:block">Alexis Robin</span>
      </NuxtLink>

      <!-- Desktop Navigation -->
      <nav class="hidden md:flex items-center space-x-6">
        <TheNavigation />
        <!-- Terminal Toggle Button (Desktop) -->
        <button
          class="hidden md:inline-flex text-text p-2 rounded-lg hover:bg-surface0 transition-colors"
          @click="toggleTerminalHandler"
          aria-label="Toggle terminal"
        >
          <Icon name="heroicons:command-line" class="w-5 h-5" />
        </button>
      </nav>

      <!-- Right side icons (Mobile) -->
      <div class="flex items-center space-x-2 md:hidden">
        <!-- Terminal Toggle Button (Mobile) -->
        <button
          class="text-text p-2 rounded-lg hover:bg-surface0 transition-colors"
          @click="toggleTerminalHandler"
          aria-label="Toggle terminal"
        >
          <Icon name="heroicons:command-line" class="w-6 h-6" />
        </button>
        <!-- Mobile Menu Button -->
      <button
        class="md:hidden text-text p-2 rounded-lg hover:bg-surface0 transition-colors"
        @click="toggleMobileMenu"
        aria-label="Toggle menu"
      >
        <Icon
          :name="isMobileMenuOpen ? 'heroicons:x-mark' : 'heroicons:bars-3'"
          class="w-6 h-6"
        />
      </button>
      </div>
    </div>

    <!-- Mobile Navigation -->
    <Transition name="slide-down">
      <div
        v-if="isMobileMenuOpen"
        class="md:hidden absolute top-full left-0 right-0 bg-base/95 backdrop-blur-lg border-b border-surface0 shadow-lg"
      >
        <div class="container-custom py-4">
          <TheNavigation mobile @navigate="closeMobileMenu" />
        </div>
      </div>
    </Transition>
  </header>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, inject } from 'vue' // Added inject and lang="ts"
import type { Ref } from 'vue' // Added type import
import TheNavigation from './TheNavigation.vue'

// Injected state/functions
const toggleTerminal = inject<() => void>('toggleTerminal')

// Header state
const scrolled: Ref<boolean> = ref(false) // Added type
const isMobileMenuOpen: Ref<boolean> = ref(false) // Added type

// Scroll handler
const handleScroll = () => {
  scrolled.value = window.scrollY > 10
}

// Toggle mobile menu
const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

// Close mobile menu
const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
}

// Terminal toggle handler
const toggleTerminalHandler = () => {
  if (toggleTerminal) {
    toggleTerminal()
    closeMobileMenu() // Close mobile menu if open when terminal is toggled
  } else {
    console.warn('toggleTerminal function not provided')
  }
}

// Lifecycle hooks
onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  handleScroll() // Initial check
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
.slide-down-enter-active,
.slide-down-leave-active {
  transition: transform 0.3s ease, opacity 0.3s ease;
  transform-origin: top;
}

.slide-down-enter-from,
.slide-down-leave-to {
  transform: translateY(-10px);
  opacity: 0;
}
</style>