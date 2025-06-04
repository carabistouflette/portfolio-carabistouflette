<template>
  <div class="mist-background">
    <!-- Base gradient background -->
    <div class="base-gradient"></div>
    
    <!-- Animated mist layers -->
    <div class="mist-layer mist-1"></div>
    <div class="mist-layer mist-2"></div>
    <div class="mist-layer mist-3"></div>
    
    <!-- Floating orbs -->
    <div class="orb orb-1"></div>
    <div class="orb orb-2"></div>
    <div class="orb orb-3"></div>
    
    <!-- Subtle grid pattern -->
    <div class="grid-pattern"></div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'

let animationFrame: number

const animateMist = () => {
  const mists = document.querySelectorAll('.mist-layer')
  const orbs = document.querySelectorAll('.orb')
  const time = Date.now() * 0.0001
  
  // Animate mist layers
  mists.forEach((mist, index) => {
    const speed = (index + 1) * 0.5
    const x = Math.sin(time * speed) * 50
    const y = Math.cos(time * speed * 0.7) * 30
    ;(mist as HTMLElement).style.transform = `translate(${x}px, ${y}px) scale(${1 + Math.sin(time * speed * 0.5) * 0.1})`
  })
  
  // Animate orbs
  orbs.forEach((orb, index) => {
    const speed = (index + 1) * 0.3
    const x = Math.sin(time * speed + index) * 100
    const y = Math.cos(time * speed * 0.8 + index) * 100
    const scale = 1 + Math.sin(time * speed * 0.5 + index) * 0.3
    ;(orb as HTMLElement).style.transform = `translate(${x}px, ${y}px) scale(${scale})`
  })
  
  animationFrame = requestAnimationFrame(animateMist)
}

onMounted(() => {
  animateMist()
})

onUnmounted(() => {
  if (animationFrame) {
    cancelAnimationFrame(animationFrame)
  }
})
</script>

<style scoped>
.mist-background {
  position: fixed;
  inset: 0;
  overflow: hidden;
  z-index: -1;
  background: #050507;
}

/* Base gradient */
.base-gradient {
  position: absolute;
  inset: 0;
  background: radial-gradient(ellipse at top left, rgba(88, 28, 135, 0.15) 0%, transparent 60%),
              radial-gradient(ellipse at bottom right, rgba(107, 70, 193, 0.1) 0%, transparent 60%),
              radial-gradient(ellipse at center, rgba(67, 20, 120, 0.08) 0%, transparent 80%),
              linear-gradient(180deg, #050507 0%, #0f0817 50%, #050507 100%);
}

/* Mist layers */
.mist-layer {
  position: absolute;
  inset: -50%;
  filter: blur(100px);
  opacity: 0.6;
  mix-blend-mode: screen;
  will-change: transform;
}

.mist-1 {
  background: radial-gradient(circle at 30% 50%, rgba(88, 28, 135, 0.3) 0%, transparent 60%);
  animation: drift 40s ease-in-out infinite;
}

.mist-2 {
  background: radial-gradient(circle at 70% 30%, rgba(107, 70, 193, 0.25) 0%, transparent 60%);
  animation: drift 50s ease-in-out infinite reverse;
}

.mist-3 {
  background: radial-gradient(circle at 50% 70%, rgba(67, 20, 120, 0.2) 0%, transparent 60%);
  animation: drift 60s ease-in-out infinite;
}

/* Floating orbs */
.orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  mix-blend-mode: screen;
  will-change: transform;
}

.orb-1 {
  width: 600px;
  height: 600px;
  top: -200px;
  left: -200px;
  background: radial-gradient(circle, rgba(88, 28, 135, 0.2) 0%, transparent 70%);
}

.orb-2 {
  width: 400px;
  height: 400px;
  bottom: -100px;
  right: -100px;
  background: radial-gradient(circle, rgba(107, 70, 193, 0.15) 0%, transparent 70%);
}

.orb-3 {
  width: 500px;
  height: 500px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: radial-gradient(circle, rgba(124, 58, 237, 0.1) 0%, transparent 70%);
}

/* Grid pattern */
.grid-pattern {
  position: absolute;
  inset: 0;
  background-image: 
    linear-gradient(rgba(88, 28, 135, 0.02) 1px, transparent 1px),
    linear-gradient(90deg, rgba(107, 70, 193, 0.02) 1px, transparent 1px);
  background-size: 100px 100px;
  animation: grid-move 100s linear infinite;
  opacity: 0.3;
}

/* Animations */
@keyframes drift {
  0%, 100% {
    transform: translate(0, 0) rotate(0deg);
  }
  33% {
    transform: translate(100px, -50px) rotate(120deg);
  }
  66% {
    transform: translate(-100px, 50px) rotate(240deg);
  }
}

@keyframes grid-move {
  0% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(100px, 100px);
  }
}

/* Performance optimization for mobile */
@media (max-width: 768px) {
  .mist-layer {
    filter: blur(80px);
  }
  
  .orb {
    filter: blur(60px);
  }
  
  .grid-pattern {
    opacity: 0.5;
  }
}

</style>