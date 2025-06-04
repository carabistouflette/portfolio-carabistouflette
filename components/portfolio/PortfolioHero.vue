<template>
  <section class="section-padding bg-gradient-to-br from-base to-mantle relative overflow-hidden">
    <div class="container-custom relative z-10">
      <div class="text-center max-w-4xl mx-auto">
        <h1 
          ref="heroTitle"
          class="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-mauve to-pink bg-clip-text text-transparent"
        >
          {{ title }}
        </h1>
        <p 
          ref="heroSubtitle"
          class="text-xl text-subtext1 mb-8"
        >
          {{ subtitle }}
        </p>
        <div 
          ref="heroBadge"
          class="inline-flex items-center px-6 py-3 bg-mauve/10 border border-mauve/30 rounded-full hover:bg-mauve/20 transition-all duration-300 cursor-pointer"
          @click="$emit('scrollToSection')"
        >
          <Icon name="heroicons:academic-cap" class="w-6 h-6 mr-3 text-mauve animate-pulse" />
          <span class="text-mauve font-semibold">
            {{ badgeText }}
          </span>
        </div>
      </div>
    </div>
    
    <!-- Background decorations animées -->
    <div ref="bgDecor1" class="absolute top-20 right-20 w-64 h-64 bg-gradient-to-br from-mauve/20 to-pink/20 rounded-full blur-3xl"></div>
    <div ref="bgDecor2" class="absolute bottom-20 left-20 w-80 h-80 bg-gradient-to-br from-blue/10 to-teal/10 rounded-full blur-3xl"></div>
    
    <!-- Particules flottantes -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div 
        v-for="i in particleCount" 
        :key="`particle-${i}`"
        class="particle absolute w-2 h-2 bg-mauve/30 rounded-full"
        :style="{
          left: `${Math.random() * 100}%`,
          animationDelay: `${i * 0.5}s`
        }"
      ></div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface PortfolioHeroProps {
  title: string
  subtitle: string
  badgeText: string
  particleCount?: number
}

const props = withDefaults(defineProps<PortfolioHeroProps>(), {
  particleCount: 5
})

defineEmits<{
  scrollToSection: []
}>()

const heroTitle = ref<HTMLElement>()
const heroSubtitle = ref<HTMLElement>()
const heroBadge = ref<HTMLElement>()
const bgDecor1 = ref<HTMLElement>()
const bgDecor2 = ref<HTMLElement>()

defineExpose({
  heroTitle,
  heroSubtitle,
  heroBadge,
  bgDecor1,
  bgDecor2
})
</script>

<style scoped>
@keyframes float-up {
  0% {
    transform: translateY(100vh) scale(0);
    opacity: 0;
  }
  10% {
    opacity: 1;
  }
  90% {
    opacity: 1;
  }
  100% {
    transform: translateY(-100vh) scale(1);
    opacity: 0;
  }
}

.particle {
  animation: float-up 20s infinite ease-in-out;
}
</style>