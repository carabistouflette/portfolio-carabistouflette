<template>
  <canvas ref="canvasRef" class="w-full h-full" />
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useParticleSystem } from '@/composables/useParticleSystem'

const canvasRef = ref<HTMLCanvasElement | null>(null)
let cleanup: (() => void) | null = null

onMounted(() => {
  if (canvasRef.value) {
    cleanup = useParticleSystem(canvasRef.value, {
      particleCount: 50,
      particleColor: 'rgba(203, 166, 247, 0.5)',
      connectionColor: 'rgba(203, 166, 247, 0.15)',
      particleSize: 2,
      connectionDistance: 100,
      mouseAttraction: true,
      mouseRadius: 150
    })
  }
})

onUnmounted(() => {
  if (cleanup) {
    cleanup()
  }
})
</script>