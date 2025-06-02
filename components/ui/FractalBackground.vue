<template>
  <div class="fractal-container">
    <canvas 
      ref="canvas" 
      class="fractal-canvas"
      :width="canvasSize"
      :height="canvasSize"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const canvas = ref<HTMLCanvasElement>()
const canvasSize = 800
let animationId: number
let time = 0

const drawFractal = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number, angle: number, depth: number) => {
  if (depth === 0 || size < 1) return
  
  ctx.save()
  ctx.translate(x, y)
  ctx.rotate(angle)
  
  const opacity = Math.max(0.1, 1 - (depth * 0.15))
  ctx.strokeStyle = `rgba(147, 153, 178, ${opacity})`
  ctx.lineWidth = Math.max(0.5, 3 - depth * 0.4)
  
  ctx.beginPath()
  ctx.moveTo(0, 0)
  ctx.lineTo(0, -size)
  ctx.stroke()
  
  const growthFactor = Math.sin(time * 0.001) * 0.1 + 0.9
  const newSize = size * 0.7 * growthFactor
  
  drawFractal(ctx, 0, -size, newSize, angle - 0.4 + Math.sin(time * 0.002) * 0.1, depth - 1)
  drawFractal(ctx, 0, -size, newSize, angle + 0.4 + Math.cos(time * 0.002) * 0.1, depth - 1)
  
  ctx.restore()
}

const animate = () => {
  if (!canvas.value) return
  
  const ctx = canvas.value.getContext('2d')
  if (!ctx) return
  
  ctx.clearRect(0, 0, canvasSize, canvasSize)
  
  const centerX = canvasSize / 2
  const centerY = canvasSize * 0.9
  const baseSize = 120 + Math.sin(time * 0.0005) * 20
  
  drawFractal(ctx, centerX, centerY, baseSize, 0, 8)
  
  drawFractal(ctx, centerX - 200, centerY, baseSize * 0.7, -0.3, 7)
  drawFractal(ctx, centerX + 200, centerY, baseSize * 0.7, 0.3, 7)
  
  time += 16
  animationId = requestAnimationFrame(animate)
}

onMounted(() => {
  if (canvas.value) {
    animate()
  }
})

onUnmounted(() => {
  if (animationId) {
    cancelAnimationFrame(animationId)
  }
})
</script>

<style scoped>
.fractal-container {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
  overflow: hidden;
}

.fractal-canvas {
  position: absolute;
  width: 100%;
  height: 100%;
  opacity: 0;
  animation: fadeIn 2s ease-out forwards;
  animation-delay: 0.5s;
}

@keyframes fadeIn {
  to {
    opacity: 0.3;
  }
}
</style>