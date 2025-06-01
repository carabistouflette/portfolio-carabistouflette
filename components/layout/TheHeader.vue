<template>
  <header
    class="sticky top-0 z-50 backdrop-blur-md transition-all duration-500 ease-out"
    :class="[
      scrolled 
        ? 'bg-base/95 border-b border-surface0 shadow-lg py-2' 
        : 'bg-base/80 border-b border-transparent py-4'
    ]"
  >
    <div class="container-custom flex items-center justify-between transition-all duration-300">
      <!-- Logo -->
      <NuxtLink to="/" class="flex items-center space-x-3 group relative">
        <div class="relative w-12 h-12 rounded-xl bg-gradient-to-br from-mauve to-blue overflow-hidden group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 ease-out shadow-lg">
          <div class="absolute inset-0 bg-gradient-to-br from-mauve/20 to-blue/20 group-hover:from-mauve/40 group-hover:to-blue/40 transition-all duration-300"></div>
          <div class="relative w-full h-full flex items-center justify-center text-crust font-bold text-lg">
            AR
          </div>
          <div class="absolute inset-0 rounded-xl ring-2 ring-transparent group-hover:ring-mauve/30 transition-all duration-300"></div>
        </div>
        <div class="hidden sm:block">
          <span class="font-bold text-xl text-text group-hover:text-mauve transition-colors duration-300">Alexis Robin</span>
          <div class="text-xs text-subtext0 font-medium tracking-wide">Développeur Full Stack</div>
        </div>
      </NuxtLink>

      <!-- Desktop Navigation -->
      <nav class="hidden md:flex items-center space-x-8">
        <TheNavigation />
        
        <!-- Terminal Toggle Button -->
        <button
          class="group relative p-2.5 rounded-xl bg-surface0/50 hover:bg-surface0 text-text hover:text-green transition-all duration-300 hover:scale-105 active:scale-95"
          @click="toggleTerminalHandler"
          aria-label="Toggle terminal"
        >
          <Icon name="heroicons:command-line" class="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
          <div class="absolute inset-0 rounded-xl bg-gradient-to-r from-green/20 to-teal/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </button>
      </nav>

      <!-- Mobile Actions -->
      <div class="flex items-center space-x-2 md:hidden">
        <!-- Terminal Toggle Button (Mobile) -->
        <button
          class="group p-2.5 rounded-xl bg-surface0/50 hover:bg-surface0 text-text hover:text-green transition-all duration-300"
          @click="toggleTerminalHandler"
          aria-label="Toggle terminal"
        >
          <Icon name="heroicons:command-line" class="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
        </button>
        
        <!-- Mobile Menu Button -->
        <button
          class="group p-2.5 rounded-xl bg-surface0/50 hover:bg-surface0 text-text transition-all duration-300"
          :class="{ 'text-red hover:text-red': isMobileMenuOpen }"
          @click="toggleMobileMenu"
          aria-label="Toggle menu"
        >
          <Icon
            :name="isMobileMenuOpen ? 'heroicons:x-mark' : 'heroicons:bars-3'"
            class="w-5 h-5 transition-all duration-300"
            :class="{ 'rotate-180': isMobileMenuOpen }"
          />
        </button>
      </div>
    </div>

    <!-- Mobile Navigation -->
    <Transition name="mobile-menu">
      <div
        v-if="isMobileMenuOpen"
        class="md:hidden absolute top-full left-0 right-0 bg-base/98 backdrop-blur-xl border-b border-surface0 shadow-2xl"
      >
        <div class="container-custom py-6">
          <TheNavigation mobile @navigate="closeMobileMenu" />
          <div class="mt-6 pt-4 border-t border-surface0">
            <div class="text-xs text-subtext0 text-center font-medium">
              Développeur Full Stack • Portfolio
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </header>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, inject } from 'vue'
import type { Ref } from 'vue'
import TheNavigation from './TheNavigation.vue'

// Injected state/functions
const toggleTerminal = inject<() => void>('toggleTerminal')

// Header state
const scrolled: Ref<boolean> = ref(false)
const isMobileMenuOpen: Ref<boolean> = ref(false)

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
/* Mobile menu animations */
.mobile-menu-enter-active {
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  transform-origin: top;
}

.mobile-menu-leave-active {
  transition: all 0.3s cubic-bezier(0.55, 0.085, 0.68, 0.53);
  transform-origin: top;
}

.mobile-menu-enter-from {
  transform: translateY(-20px) scale(0.95);
  opacity: 0;
}

.mobile-menu-leave-to {
  transform: translateY(-10px) scale(0.98);
  opacity: 0;
}

/* Header scroll effects */
.header-compact {
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
}

/* Gradient animations */
@keyframes gradientShift {
  0%, 100% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
}

/* Smooth focus states */
*:focus-visible {
  outline: 2px solid var(--mauve);
  outline-offset: 2px;
  border-radius: 0.5rem;
}
</style>