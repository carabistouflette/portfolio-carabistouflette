<template>
  <div ref="backgroundRef" class="absolute inset-0 overflow-hidden pointer-events-none">
    <!-- Animated gradient orbs with parallax -->
    <div class="parallax-orb absolute top-1/4 right-1/4 w-64 md:w-96 h-64 md:h-96" data-speed="0.5">
      <div class="orb-gradient orb-1"></div>
    </div>
    <div class="parallax-orb absolute bottom-1/4 left-1/4 w-48 md:w-64 h-48 md:h-64" data-speed="0.3">
      <div class="orb-gradient orb-2"></div>
    </div>
    <div class="parallax-orb absolute top-3/4 right-1/3 w-56 md:w-80 h-56 md:h-80" data-speed="0.7">
      <div class="orb-gradient orb-3"></div>
    </div>
    
    <!-- Animated mesh gradient -->
    <div class="absolute inset-0 opacity-30">
      <div class="mesh-gradient"></div>
    </div>
    
    <!-- Enhanced grid pattern with perspective -->
    <div class="absolute inset-0 bg-grid-pattern opacity-10 perspective-grid"></div>
    
    <!-- Interactive floating particles -->
    <div 
      ref="particlesRef" 
      class="particles-container absolute inset-0"
      aria-hidden="true"
      role="presentation"
    >
      <div 
        class="particle interactive-particle" 
        v-for="i in particleCount" 
        :key="i"
        :style="{
          '--particle-x': particlePositions[i-1]?.x + '%',
          '--particle-y': particlePositions[i-1]?.y + '%',
          left: particlePositions[i-1]?.x + '%',
          top: particlePositions[i-1]?.y + '%'
        }"
        aria-hidden="true"
      ></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

interface Props {
  particleCount: number
  particlePositions: Array<{
    x: number
    y: number
    targetX: number
    targetY: number
    velocityX: number
    velocityY: number
    baseX: number
    baseY: number
  }>
}

const props = defineProps<Props>()

const backgroundRef = ref<HTMLElement>()
const particlesRef = ref<HTMLElement>()

defineExpose({
  backgroundRef,
  particlesRef
})
</script>

<style scoped>
/* Enhanced grid pattern with perspective */
.bg-grid-pattern {
  background-image: 
    linear-gradient(to right, rgba(var(--surface0), 0.5) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(var(--surface0), 0.5) 1px, transparent 1px);
  background-size: 30px 30px;
  transform: perspective(500px) rotateX(60deg);
  transform-origin: center center;
}

/* Enhanced orb gradients with glow effect */
.orb-gradient {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  filter: blur(40px) saturate(150%);
  opacity: 0.5;
  animation: orbFloat 20s var(--ease-in-out) infinite;
  will-change: transform;
  mix-blend-mode: screen;
}

.orb-1 {
  background: radial-gradient(circle at 30% 50%, var(--mauve), transparent 70%);
  animation-duration: 15s;
}

.orb-2 {
  background: radial-gradient(circle at 70% 30%, var(--blue), transparent 70%);
  animation-duration: 20s;
  animation-delay: 5s;
}

.orb-3 {
  background: radial-gradient(circle at 50% 70%, var(--peach), transparent 70%);
  animation-duration: 18s;
  animation-delay: 10s;
}

@keyframes orbFloat {
  0%, 100% {
    transform: translate(0, 0) scale(1) rotate(0deg);
  }
  25% {
    transform: translate(20px, -20px) scale(1.05) rotate(90deg);
  }
  50% {
    transform: translate(-10px, -30px) scale(1.1) rotate(180deg);
  }
  75% {
    transform: translate(-20px, 10px) scale(0.95) rotate(270deg);
  }
}

/* Enhanced interactive floating particles - plus visibles */
.particle {
  position: absolute;
  width: 6px;
  height: 6px;
  background: radial-gradient(circle, var(--mauve) 0%, var(--blue) 30%, transparent 70%);
  opacity: 0.6;
  border-radius: 50%;
  animation: particleFloat linear infinite;
  filter: blur(0px);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 0 10px rgba(203, 166, 247, 0.5);
}

.interactive-particle {
  position: absolute;
  transition: all 0.2s ease-out;
}

.interactive-particle:hover {
  width: 12px;
  height: 12px;
  opacity: 0.9;
  box-shadow: 0 0 20px rgba(203, 166, 247, 0.8);
  filter: blur(0px);
}

.particle:nth-child(odd) {
  width: 8px;
  height: 8px;
  animation-duration: 35s;
  left: calc(var(--random) * 100%);
  background: radial-gradient(circle, var(--mauve) 0%, var(--peach) 40%, transparent 70%);
  opacity: 0.7;
  box-shadow: 0 0 15px rgba(250, 179, 135, 0.6);
}

.particle:nth-child(even) {
  width: 5px;
  height: 5px;
  animation-duration: 45s;
  left: calc(var(--random) * 100%);
  opacity: 0.5;
  background: radial-gradient(circle, var(--blue) 0%, var(--teal) 40%, transparent 70%);
  box-shadow: 0 0 12px rgba(137, 180, 250, 0.5);
}

@keyframes particleFloat {
  from {
    transform: translateY(100vh) rotate(0deg);
  }
  to {
    transform: translateY(-100px) rotate(360deg);
  }
}

/* Désactiver l'animation float pour les particules interactives */
.interactive-particle {
  animation: none !important;
}

/* Animated mesh gradient */
.mesh-gradient {
  width: 100%;
  height: 100%;
  background: linear-gradient(
    -45deg,
    rgba(203, 166, 247, 0.15) 0%,
    rgba(137, 180, 250, 0.15) 25%,
    rgba(148, 226, 213, 0.15) 50%,
    rgba(250, 179, 135, 0.15) 75%,
    rgba(203, 166, 247, 0.15) 100%
  );
  background-size: 400% 400%;
  animation: meshMove 25s var(--ease-in-out) infinite;
  filter: blur(60px) saturate(130%);
}

@keyframes meshMove {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

/* Smooth parallax orb movement */
.parallax-orb {
  will-change: transform;
  transition: transform var(--animation-fast) var(--ease-out);
  transform: translateZ(0);
}

/* Enhanced particle interactions */
.particle:hover {
  transform: scale(3) !important;
  opacity: 1;
  filter: blur(0px) brightness(1.5);
  z-index: 100;
  transition: all 0.3s ease-out;
}

/* Mobile orb adjustments */
@media (max-width: 768px) {
  .orb-gradient {
    filter: blur(30px) saturate(150%);
    opacity: 0.4;
  }
  
  .mesh-gradient {
    opacity: 0.6;
    filter: blur(40px) saturate(130%);
    background-size: 300% 300%;
  }
  
  .bg-grid-pattern {
    opacity: 0.08;
    background-size: 25px 25px;
    transform: perspective(400px) rotateX(45deg);
  }
  
  .particle {
    width: 4px;
    height: 4px;
  }
  
  .particle:nth-child(odd) {
    width: 5px;
    height: 5px;
  }
  
  .particle:nth-child(even) {
    width: 3px;
    height: 3px;
  }
  
  /* Enhanced mobile particle styles */
  .particle {
    box-shadow: 0 0 20px currentColor;
  }
}

/* Reduced motion preferences */
@media (prefers-reduced-motion: reduce) {
  .particle,
  .orb-gradient,
  .mesh-gradient {
    animation: none;
  }
  
  .interactive-particle {
    transition: none;
    transform: none;
  }
}
</style>