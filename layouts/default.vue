<template>
  <!-- Temporarily disable PageLoader for debugging -->
  <div v-if="!isProjectPage">
    <PageLoader>
      <div class="min-h-screen flex flex-col bg-base text-text relative">
      <!-- Skip to content link for accessibility -->
      <a href="#main-content" class="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 bg-mauve text-base px-4 py-2 rounded-md font-medium">
        Aller au contenu principal
      </a>
      <!-- Animated background pattern -->
      <div class="fixed inset-0 overflow-hidden pointer-events-none">
        <div class="absolute w-full h-full">
          <!-- Floating particles -->
          <div class="particle particle-1"></div>
          <div class="particle particle-2"></div>
          <div class="particle particle-3"></div>
          <div class="particle particle-4"></div>
          
          <!-- Gradient mesh -->
          <div class="absolute inset-0 opacity-20">
            <div class="noise-pattern"></div>
          </div>
        </div>
      </div>
      
      <TheHeader class="relative z-20" />
      <main id="main-content" class="flex-grow relative z-10" tabindex="-1">
        <slot />
      </main>
      <TheFooter
        class="relative z-10"
        :social-links="{
          linkedin: 'https://linkedin.com/in/alexis-robin-41703a2ab',
          email: 'mailto:alexis.robin@etu.umontpellier.fr',
          phone: 'tel:+33761460496'
        }"
      />
      
      <!-- Terminal Toggle Button -->
      <button
        @click="toggleTerminal"
        class="fixed bottom-4 right-4 z-[9999] bg-surface0 hover:bg-surface1 text-text p-3 rounded-lg shadow-lg transition-all duration-200 hover:scale-105 group focus:outline-none focus:ring-2 focus:ring-mauve focus:ring-offset-2 focus:ring-offset-base"
        :class="{ 'bg-surface1': isTerminalVisible }"
        :aria-label="isTerminalVisible ? 'Fermer le terminal' : 'Ouvrir le terminal'"
        :aria-expanded="isTerminalVisible"
        aria-controls="terminal-panel"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        <span class="absolute -top-8 right-0 bg-surface2 text-text text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
          Terminal (Ctrl+`)
        </span>
      </button>
      
      <!-- Simple Cursor -->
      <ClientOnly>
        <Teleport to="body">
          <SimpleCursor :enabled="true" />
        </Teleport>
      </ClientOnly>
      
      <!-- Terminal Panel -->
      <ClientOnly>
        <Teleport to="body">
          <TerminalPanel 
            :is-visible="isTerminalVisible" 
            @close="isTerminalVisible = false"
          />
        </Teleport>
      </ClientOnly>
    </div>
    </PageLoader>
  </div>
  <!-- Direct rendering for project pages -->
  <div v-else class="min-h-screen flex flex-col bg-base text-text relative">
    <!-- Skip to content link for accessibility -->
    <a href="#main-content" class="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 bg-mauve text-base px-4 py-2 rounded-md font-medium">
      Aller au contenu principal
    </a>
    <!-- Animated background pattern -->
    <div class="fixed inset-0 overflow-hidden pointer-events-none">
      <div class="absolute w-full h-full">
        <!-- Floating particles -->
        <div class="particle particle-1"></div>
        <div class="particle particle-2"></div>
        <div class="particle particle-3"></div>
        <div class="particle particle-4"></div>
        
        <!-- Gradient mesh -->
        <div class="absolute inset-0 opacity-20">
          <div class="noise-pattern"></div>
        </div>
      </div>
    </div>
    
    <TheHeader class="relative z-20" />
    <main id="main-content" class="flex-grow relative z-10" tabindex="-1">
      <slot />
    </main>
    <TheFooter
      class="relative z-10"
      :social-links="{
        linkedin: 'https://linkedin.com/in/alexis-robin-41703a2ab',
        email: 'mailto:alexis.robin@etu.umontpellier.fr',
        phone: 'tel:+33761460496'
      }"
    />
    
    <!-- Terminal Toggle Button -->
    <button
      @click="toggleTerminal"
      class="fixed bottom-4 right-4 z-[9999] bg-surface0 hover:bg-surface1 text-text p-3 rounded-lg shadow-lg transition-all duration-200 hover:scale-105 group focus:outline-none focus:ring-2 focus:ring-mauve focus:ring-offset-2 focus:ring-offset-base"
      :class="{ 'bg-surface1': isTerminalVisible }"
      :aria-label="isTerminalVisible ? 'Fermer le terminal' : 'Ouvrir le terminal'"
      :aria-expanded="isTerminalVisible"
      aria-controls="terminal-panel"
    >
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
      <span class="absolute -top-8 right-0 bg-surface2 text-text text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
        Terminal (Ctrl+`)
      </span>
    </button>
    
    <!-- Simple Cursor -->
    <ClientOnly>
      <Teleport to="body">
        <SimpleCursor :enabled="true" />
      </Teleport>
    </ClientOnly>
    
    <!-- Terminal Panel -->
    <ClientOnly>
      <Teleport to="body">
        <TerminalPanel 
          :is-visible="isTerminalVisible" 
          @close="isTerminalVisible = false"
        />
      </Teleport>
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
import { ref, provide, onMounted, onUnmounted, computed } from 'vue'
import { useRoute } from '#app'
import TerminalPanel from '~/components/terminal/TerminalPanel.vue'
import PageLoader from '~/components/layout/PageLoader.vue'
import SimpleCursor from '~/components/ui/SimpleCursor.vue'
import { useScrollRevealList } from '~/composables/useScrollReveal'
import { usePageTransitions } from '~/composables/usePageTransitions'

// Check if we're on a project page
const route = useRoute()
const isProjectPage = computed(() => route.path.includes('/projects/'))

// Terminal state
const isTerminalVisible = ref(false)
const terminalHeight = ref(300) // Default terminal height

// Initialize enhanced interactions
const { setupScrollRevealAnimations } = usePageTransitions()
const { registerElements } = useScrollRevealList({
  threshold: 0.15,
  distance: '40px',
  duration: 800,
  stagger: 150
})

// Custom cursor will be handled by the CustomCursor component

// Toggle terminal function
const toggleTerminal = () => {
  isTerminalVisible.value = !isTerminalVisible.value
}

// Keyboard shortcut handler
const handleKeydown = (event: KeyboardEvent) => {
  // Ctrl+` or Cmd+` to toggle terminal
  if ((event.ctrlKey || event.metaKey) && event.key === '`') {
    event.preventDefault()
    toggleTerminal()
  }
  // Escape to close terminal
  else if (event.key === 'Escape' && isTerminalVisible.value) {
    event.preventDefault()
    isTerminalVisible.value = false
  }
}

// Set up keyboard listeners and enhanced features
onMounted(() => {
  window.addEventListener('keydown', handleKeydown)
  
  // Load saved terminal height
  const savedHeight = localStorage.getItem('terminal-height')
  if (savedHeight) {
    terminalHeight.value = parseInt(savedHeight, 10)
  }
  
  // Setup enhanced scroll animations
  setupScrollRevealAnimations()
  
  // Register elements for scroll reveal
  registerElements('.particle, .noise-pattern')
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown)
})

// Provide toggleTerminal function to descendants
provide('toggleTerminal', toggleTerminal)

// Layout setup
useHead({
  htmlAttrs: {
    lang: 'fr'
  },
  bodyAttrs: {
    class: 'bg-base text-text overflow-x-hidden' // Keep existing classes
  }
})
</script>

<style scoped>
/* Floating particles */
.particle {
  position: absolute;
  width: 6px;
  height: 6px;
  background: linear-gradient(to bottom, rgba(203, 166, 247, 0.6), rgba(137, 180, 250, 0.4));
  border-radius: 50%;
  filter: blur(1px);
  box-shadow: 0 0 10px rgba(203, 166, 247, 0.3);
}

/* Respect user's motion preferences */
@media (prefers-reduced-motion: reduce) {
  .particle {
    animation: none !important;
  }
  
  .noise-pattern {
    animation: none !important;
  }
  
  button {
    transition: none !important;
  }
}

.particle-1 {
  top: 20%;
  left: 10%;
  animation: float-1 20s infinite ease-in-out;
}

.particle-2 {
  top: 60%;
  left: 80%;
  animation: float-2 25s infinite ease-in-out;
}

.particle-3 {
  top: 80%;
  left: 20%;
  animation: float-3 30s infinite ease-in-out;
}

.particle-4 {
  top: 30%;
  left: 70%;
  animation: float-4 22s infinite ease-in-out;
}

@keyframes float-1 {
  0%, 100% {
    transform: translate(0, 0) rotate(0deg);
    opacity: 0.5;
  }
  33% {
    transform: translate(100px, -100px) rotate(120deg);
    opacity: 0.8;
  }
  66% {
    transform: translate(-100px, 100px) rotate(240deg);
    opacity: 0.3;
  }
}

@keyframes float-2 {
  0%, 100% {
    transform: translate(0, 0) rotate(0deg);
    opacity: 0.6;
  }
  33% {
    transform: translate(-150px, 100px) rotate(-120deg);
    opacity: 0.4;
  }
  66% {
    transform: translate(150px, -100px) rotate(120deg);
    opacity: 0.8;
  }
}

@keyframes float-3 {
  0%, 100% {
    transform: translate(0, 0) scale(1);
    opacity: 0.4;
  }
  50% {
    transform: translate(200px, -200px) scale(1.5);
    opacity: 0.7;
  }
}

@keyframes float-4 {
  0%, 100% {
    transform: translate(0, 0) scale(1);
    opacity: 0.7;
  }
  50% {
    transform: translate(-200px, 150px) scale(0.8);
    opacity: 0.4;
  }
}

/* Noise pattern for texture */
.noise-pattern {
  position: absolute;
  width: 100%;
  height: 100%;
  background-image: 
    repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(255, 255, 255, 0.01) 35px, rgba(255, 255, 255, 0.01) 70px),
    repeating-linear-gradient(-45deg, transparent, transparent 35px, rgba(255, 255, 255, 0.01) 35px, rgba(255, 255, 255, 0.01) 70px);
  animation: noise-shift 60s linear infinite;
}

@keyframes noise-shift {
  0% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(50px, 50px);
  }
}
</style>
