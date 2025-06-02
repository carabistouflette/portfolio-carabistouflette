<template>
  <header
    ref="headerRef"
    class="sticky top-0 z-50 backdrop-blur-md transition-all duration-500 ease-out group"
    :class="[
      scrolled 
        ? 'bg-base/95 border-b border-surface0 shadow-lg py-2' 
        : 'bg-base/80 border-b border-transparent py-4'
    ]"
    @mousemove="handleHeaderMouseMove"
  >
    <!-- Animated background particles -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
      <div 
        v-for="i in 5" 
        :key="i"
        class="header-particle absolute w-2 h-2 bg-gradient-to-r from-mauve to-pink rounded-full"
        :style="getParticleStyle(i)"
      ></div>
    </div>
    <div class="container-custom flex items-center justify-between transition-all duration-300">
      <!-- Logo -->
      <NuxtLink to="/" class="flex items-center space-x-3 group relative">
        <div class="relative w-12 h-12 rounded-xl bg-gradient-to-br from-crust to-mantle border-2 border-surface2 overflow-hidden group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 ease-out shadow-lg hover:shadow-mauve/25">
          <div class="absolute inset-0 bg-gradient-to-br from-mauve/10 to-blue/10 group-hover:from-mauve/20 group-hover:to-blue/20 transition-all duration-300"></div>
          <div class="relative w-full h-full flex items-center justify-center text-white font-black text-lg group-hover:text-mauve transition-colors duration-300 drop-shadow-sm">
            AR
          </div>
          <div class="absolute inset-0 rounded-xl ring-2 ring-transparent group-hover:ring-mauve/50 transition-all duration-300"></div>
          <!-- Glow effect on hover -->
          <div class="absolute inset-0 rounded-xl bg-gradient-to-br from-mauve/0 to-blue/0 group-hover:from-mauve/15 group-hover:to-blue/15 blur-lg transition-all duration-500"></div>
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
          class="group relative p-2.5 rounded-xl bg-surface0/50 hover:bg-surface0 text-text hover:text-green transition-all duration-300 hover:scale-105 active:scale-95 hover:shadow-lg hover:shadow-green/25"
          @click="toggleTerminalHandler"
          aria-label="Toggle terminal"
        >
          <Icon name="heroicons:command-line" class="w-5 h-5 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3" />
          <div class="absolute inset-0 rounded-xl bg-gradient-to-r from-green/20 to-teal/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <!-- Pulse effect on hover -->
          <div class="absolute inset-0 rounded-xl border border-green/0 group-hover:border-green/50 group-hover:animate-pulse transition-all duration-300"></div>
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
const headerRef: Ref<HTMLElement | null> = ref(null)
const mousePosition = ref({ x: 0, y: 0 })

// Particle animation - using deterministic values to avoid hydration mismatch
const particles = ref(Array.from({ length: 5 }, (_, i) => ({
  id: i,
  x: (i * 20 + 10) % 100,
  y: ((i * 30 + 15) % 100),
  baseX: (i * 20 + 10) % 100,
  baseY: ((i * 30 + 15) % 100),
  speed: 0.5 + (i * 0.1)
})))

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

// Header mouse move for parallax
const handleHeaderMouseMove = (e: MouseEvent) => {
  if (!headerRef.value) return
  
  const rect = headerRef.value.getBoundingClientRect()
  mousePosition.value = {
    x: ((e.clientX - rect.left) / rect.width) * 100,
    y: ((e.clientY - rect.top) / rect.height) * 100
  }
}

// Get particle style with parallax effect
const getParticleStyle = (index: number) => {
  const particle = particles.value[index - 1]
  if (!particle) return {}
  
  const parallaxX = (mousePosition.value.x - 50) * 0.1 * particle.speed
  const parallaxY = (mousePosition.value.y - 50) * 0.1 * particle.speed
  
  return {
    left: `${particle.baseX + parallaxX}%`,
    top: `${particle.baseY + parallaxY}%`,
    animationDelay: `${index * 0.5}s`,
    animationDuration: `${3 + index}s`
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

/* Header particle animations */
.header-particle {
  animation: headerParticleFloat linear infinite;
  filter: blur(1px);
  opacity: 0.6;
}

@keyframes headerParticleFloat {
  0%, 100% {
    transform: translateY(0) rotate(0deg);
    opacity: 0.3;
  }
  50% {
    transform: translateY(-20px) rotate(180deg);
    opacity: 0.8;
  }
}

/* Enhanced header background */
.group:hover .header-particle {
  animation-duration: 2s;
  opacity: 0.9;
  filter: blur(0px);
}

/* Smooth focus states */
*:focus-visible {
  outline: 2px solid var(--mauve);
  outline-offset: 2px;
  border-radius: 0.5rem;
}
</style>