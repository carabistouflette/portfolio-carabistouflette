<template>
  <section class="relative min-h-screen flex items-center justify-center overflow-hidden bg-crust">
    <!-- Animated Background -->
    <div class="absolute inset-0">
      <!-- Gradient Background -->
      <div class="absolute inset-0 bg-gradient-to-br from-mauve/20 via-base to-pink/20" />
      
      <!-- Animated Orbs -->
      <div class="absolute top-20 left-20 w-72 h-72 bg-mauve rounded-full blur-3xl animate-pulse opacity-40" />
      <div class="absolute bottom-20 right-20 w-96 h-96 bg-pink rounded-full blur-3xl animate-pulse animation-delay-2000 opacity-30" />
      <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-blue rounded-full blur-3xl animate-pulse animation-delay-4000 opacity-30" />
      <div class="absolute top-40 right-1/3 w-64 h-64 bg-lavender rounded-full blur-3xl animate-pulse animation-delay-1000 opacity-40" />
      <div class="absolute bottom-32 left-1/4 w-56 h-56 bg-green rounded-full blur-3xl animate-pulse animation-delay-3000 opacity-30" />
      <div class="absolute top-1/3 left-1/3 w-48 h-48 bg-peach rounded-full blur-3xl animate-pulse animation-delay-5000 opacity-30" />
    </div>
    
    <!-- Grid Pattern Overlay -->
    <div class="absolute inset-0 grid-pattern opacity-50" />
    
    <!-- Content -->
    <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <div class="space-y-6">
        <!-- Title -->
        <h1 class="text-5xl md:text-7xl font-bold mb-6">
          <span class="text-transparent bg-clip-text bg-gradient-to-r from-mauve via-pink to-blue gradient-text-animated">
            Intelligence Artificielle
          </span>
        </h1>
        
        <!-- Subtitle with typing effect -->
        <div class="text-xl md:text-2xl text-subtext0 mb-8 min-h-[3rem]">
          <span class="font-mono typing-cursor">{{ displayedText }}</span>
        </div>
        
        <!-- CTA Buttons -->
        <div class="flex flex-wrap gap-4 justify-center">
          <a
            href="#philosophy"
            class="px-8 py-4 bg-gradient-to-r from-mauve to-pink text-base font-semibold rounded-lg hover:shadow-lg hover:shadow-mauve/25 transform hover:scale-105 transition-all duration-300"
          >
            Explorer ma vision
          </a>
          <a
            href="#technical"
            class="px-8 py-4 bg-surface0 text-text font-semibold rounded-lg hover:bg-surface1 hover:shadow-lg transform hover:scale-105 transition-all duration-300"
          >
            Aspects techniques
          </a>
        </div>
        
        <!-- Stats Pills -->
        <div class="mt-12 flex flex-wrap gap-4 justify-center">
          <div
            v-for="stat in stats"
            :key="stat.label"
            class="px-6 py-3 bg-surface0/30 backdrop-blur-sm rounded-full border border-overlay0/30 
                   hover:border-mauve/50 transition-all duration-300 hover:scale-105"
          >
            <span class="text-mauve font-bold">{{ stat.value }}</span>
            <span class="text-text/70 ml-2">{{ stat.label }}</span>
          </div>
        </div>
        
        <!-- Scroll Indicator -->
        <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <Icon name="heroicons:chevron-down" class="w-6 h-6 text-overlay1" />
        </div>
      </div>
    </div>
    
    <!-- Floating Elements -->
    <div class="absolute inset-0 pointer-events-none">
      <div v-for="i in 5" :key="i" 
        class="absolute floating"
        :style="{
          left: `${20 + i * 15}%`,
          top: `${10 + i * 10}%`,
          animationDelay: `${i * 0.5}s`
        }"
      >
        <div class="w-2 h-2 bg-mauve/30 rounded-full blur-sm" />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useAITyping } from '@/composables/useAITyping'

const subtitle = "Où l'innovation rencontre la responsabilité dans l'ère de l'IA"
const { displayedText, type } = useAITyping(subtitle, 40)

const stats = [
  { value: '2+', label: 'années d\'expérience' },
  { value: '10+', label: 'projets assistés' },
  { value: '50%', label: 'gain de productivité' },
  { value: '100%', label: 'éthique préservée' }
]

onMounted(() => {
  setTimeout(() => {
    type()
  }, 500)
})
</script>

<style scoped>
.animation-delay-1000 {
  animation-delay: 1s;
}

.animation-delay-2000 {
  animation-delay: 2s;
}

.animation-delay-3000 {
  animation-delay: 3s;
}

.animation-delay-4000 {
  animation-delay: 4s;
}

.animation-delay-5000 {
  animation-delay: 5s;
}

.grid-pattern {
  background-image: 
    linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px);
  background-size: 60px 60px;
}
</style>