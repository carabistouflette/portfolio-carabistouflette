<template>
  <div
    class="fixed top-0 left-0 right-0 h-1 bg-surface0/20 z-[100] transition-opacity duration-300"
    :class="{ 'opacity-0': !showProgress }"
  >
    <div
      class="h-full bg-gradient-to-r from-lavender via-mauve to-pink shadow-lg shadow-mauve/50 transition-all duration-150 ease-out"
      :style="{ width: `${progress}%` }"
    >
      <div class="h-full relative overflow-hidden">
        <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useThrottleFn } from '@vueuse/core'

const progress = ref(0)
const showProgress = ref(false)

const calculateProgress = () => {
  const winScroll = document.body.scrollTop || document.documentElement.scrollTop
  const height = document.documentElement.scrollHeight - document.documentElement.clientHeight
  const scrolled = (winScroll / height) * 100
  progress.value = Math.min(Math.max(scrolled, 0), 100)
  showProgress.value = winScroll > 100
}

const throttledCalculate = useThrottleFn(calculateProgress, 16)

onMounted(() => {
  window.addEventListener('scroll', throttledCalculate)
  calculateProgress()
})

onUnmounted(() => {
  window.removeEventListener('scroll', throttledCalculate)
})
</script>

<style scoped>
@keyframes shimmer {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(200%);
  }
}

.animate-shimmer {
  animation: shimmer 2s infinite;
}
</style>