<template>
  <div class="absolute inset-0 overflow-hidden pointer-events-none will-change-transform" style="z-index: 0;">
    <!-- Floating Orbs -->
    <div v-if="config.floatingOrbs?.enabled" class="absolute inset-0">
      <div
        v-for="orb in orbs"
        :key="`orb-${orb.id}`"
        class="absolute rounded-full"
        :style="{
          left: `${orb.x}%`,
          top: `${orb.y}%`,
          width: `${orb.size}px`,
          height: `${orb.size}px`,
          background: `radial-gradient(circle, ${orb.color}60 0%, transparent 70%)`,
          filter: `blur(${config.floatingOrbs?.blurAmount || 40}px)`,
          animation: isAnimationEnabled ? `float-orb-${orb.id} ${20 + orb.animationDelay}s infinite ease-in-out` : 'none'
        }"
      />
    </div>

    <!-- Geometric Shapes -->
    <div v-if="config.geometricShapes?.enabled" class="absolute inset-0">
      <div
        v-for="shape in shapes"
        :key="`shape-${shape.id}`"
        class="absolute"
        :style="{
          left: `${shape.x}%`,
          top: `${shape.y}%`,
          width: `${shape.size}px`,
          height: `${shape.size}px`,
          opacity: shape.opacity,
          animation: isAnimationEnabled ? `rotate-shape ${shape.animationDuration}s infinite linear` : 'none'
        }"
      >
        <svg
          v-if="shape.shape === 'hexagon'"
          viewBox="0 0 100 100"
          :style="{ fill: shape.color }"
        >
          <polygon points="50,5 90,25 90,75 50,95 10,75 10,25" />
        </svg>
        <svg
          v-else-if="shape.shape === 'triangle'"
          viewBox="0 0 100 100"
          :style="{ fill: shape.color }"
        >
          <polygon points="50,10 90,90 10,90" />
        </svg>
        <div
          v-else-if="shape.shape === 'circle'"
          class="w-full h-full rounded-full"
          :style="{ backgroundColor: shape.color }"
        />
        <div
          v-else-if="shape.shape === 'square'"
          class="w-full h-full"
          :style="{ backgroundColor: shape.color, transform: `rotate(${shape.rotation}deg)` }"
        />
      </div>
    </div>

    <!-- Wave Patterns -->
    <div v-if="config.waves?.enabled" class="absolute inset-0">
      <svg class="w-full h-full" preserveAspectRatio="none">
        <defs>
          <linearGradient
            v-for="(color, index) in config.waves.colors"
            :key="`wave-gradient-${index}`"
            :id="`wave-gradient-${index}`"
            x1="0%" y1="0%" x2="100%" y2="0%"
          >
            <stop offset="0%" :style="`stop-color:${color};stop-opacity:0`" />
            <stop offset="50%" :style="`stop-color:${color};stop-opacity:0.3`" />
            <stop offset="100%" :style="`stop-color:${color};stop-opacity:0`" />
          </linearGradient>
        </defs>
        <path
          v-for="i in config.waves.count"
          :key="`wave-${i}`"
          :d="generateWavePath(i)"
          :fill="`url(#wave-gradient-${(i - 1) % config.waves.colors.length})`"
          :opacity="0.5 / i"
        />
      </svg>
    </div>

    <!-- Animated Particles -->
    <div v-if="config.particles?.enabled" class="absolute inset-0">
      <div
        v-for="particle in particles"
        :key="`particle-${particle.id}`"
        class="particle"
        :style="{
          left: `${particle.x}%`,
          top: `${particle.y}%`,
          width: `${particle.size}px`,
          height: `${particle.size}px`,
          opacity: particle.opacity,
          background: `radial-gradient(circle, ${config.particles?.color || colors.mauve} 0%, ${config.particles?.color || colors.mauve}80 50%, transparent 70%)`,
          boxShadow: `0 0 ${particle.size * 3}px ${config.particles?.color || colors.mauve}60`,
          animation: isAnimationEnabled ? `float-particle-${particle.id} ${config.particles?.speed || 20}s infinite ease-in-out` : 'none'
        }"
      />
    </div>

    <!-- Gradient Mesh -->
    <div v-if="config.gradientMesh?.enabled" class="absolute inset-0">
      <div
        class="gradient-mesh"
        :style="{
          opacity: config.gradientMesh.opacity,
          background: generateGradientMesh(),
          animation: gradientAnimation
        }"
      />
    </div>

    <!-- Noise Texture -->
    <div v-if="config.noise?.enabled" class="absolute inset-0">
      <div
        class="noise-pattern"
        :style="{
          opacity: config.noise.opacity,
          transform: `scale(${config.noise.scale})`
        }"
      />
    </div>

    <!-- Dynamic Style Generation -->
    <component :is="'style'">
      {{ generateDynamicStyles() }}
    </component>
  </div>
</template>

<script setup lang="ts">
import { computed, watch, onMounted, onUnmounted, ref } from 'vue'
import { useBackgroundAnimations } from '~/composables/useBackgroundAnimations'
import { colors } from '~/constants/colors'
import type { AnimationConfig } from '~/composables/useBackgroundAnimations'

interface Props {
  customConfig?: Partial<AnimationConfig>
  reducedMotion?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  reducedMotion: false
})

const { config, particles, orbs, shapes, time } = useBackgroundAnimations(props.customConfig)

// Détection de la préférence de mouvement réduit
const prefersReducedMotion = ref(false)

onMounted(() => {
  console.log('BackgroundAnimation mounted!')
  console.log('Config:', config.value)
  console.log('Particles:', particles.value)
  console.log('Orbs:', orbs.value)
  
  const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
  prefersReducedMotion.value = mediaQuery.matches
  
  const handleChange = (e: any) => {
    prefersReducedMotion.value = e.matches
  }
  
  mediaQuery.addEventListener('change', handleChange)
  
  onUnmounted(() => {
    mediaQuery.removeEventListener('change', handleChange)
  })
})

// Désactive les animations si mouvement réduit est activé
const isAnimationEnabled = computed(() => !props.reducedMotion && !prefersReducedMotion.value)

const generateWavePath = (index: number) => {
  if (!config.value.waves) return ''
  
  const { amplitude, frequency, speed } = config.value.waves
  const points: string[] = []
  const height = 50 + (index - 1) * 20
  
  for (let x = 0; x <= 100; x += 1) {
    const y = height + Math.sin((x * frequency + time.value * speed * index)) * amplitude
    points.push(`${x},${y}`)
  }
  
  return `M0,100 L0,${height} ${points.join(' ')} L100,100 Z`
}

const generateGradientMesh = () => {
  if (!config.value.gradientMesh) return ''
  
  const gradients = config.value.gradientMesh.colors.map((color, i) => {
    const angle = (360 / config.value.gradientMesh!.colors.length) * i
    return `radial-gradient(circle at ${50 + Math.cos(angle * Math.PI / 180) * 30}% ${50 + Math.sin(angle * Math.PI / 180) * 30}%, ${color}40 0%, transparent 50%)`
  })
  
  return gradients.join(', ')
}

const gradientAnimation = computed(() => {
  if (!config.value.gradientMesh?.animation || !isAnimationEnabled.value) return 'none'
  
  switch (config.value.gradientMesh.animation) {
    case 'pulse':
      return 'gradient-pulse 4s ease-in-out infinite'
    case 'shift':
      return 'gradient-shift 20s linear infinite'
    case 'rotate':
      return 'gradient-rotate 30s linear infinite'
    default:
      return 'none'
  }
})

const generateDynamicStyles = () => {
  if (!isAnimationEnabled.value) return ''
  
  let styles = ''
  
  // Particle animations
  particles.value.forEach((particle, i) => {
    const xMove = Math.sin(particle.direction) * 100
    const yMove = Math.cos(particle.direction) * 100
    
    styles += `
      @keyframes float-particle-${i} {
        0%, 100% {
          transform: translate(0, 0) scale(1);
        }
        33% {
          transform: translate(${xMove}px, ${-yMove}px) scale(1.2);
        }
        66% {
          transform: translate(${-xMove}px, ${yMove}px) scale(0.8);
        }
      }
    `
  })
  
  // Orb animations
  orbs.value.forEach((orb, i) => {
    styles += `
      @keyframes float-orb-${i} {
        0%, 100% {
          transform: translate(0, 0) scale(1);
        }
        25% {
          transform: translate(${20 + i * 10}px, ${-30 - i * 5}px) scale(1.1);
        }
        50% {
          transform: translate(${-10 - i * 5}px, ${20 + i * 10}px) scale(0.95);
        }
        75% {
          transform: translate(${30 + i * 5}px, ${10 - i * 10}px) scale(1.05);
        }
      }
    `
  })
  
  return styles
}
</script>

<style scoped>
.particle {
  position: absolute;
  border-radius: 50%;
  filter: blur(0px);
  box-shadow: 
    0 0 10px currentColor,
    0 0 20px currentColor,
    0 0 30px currentColor,
    0 0 40px currentColor;
}

.gradient-mesh {
  width: 100%;
  height: 100%;
  filter: blur(60px);
}

.noise-pattern {
  width: 100%;
  height: 100%;
  background-image: 
    repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(255, 255, 255, 0.01) 35px, rgba(255, 255, 255, 0.01) 70px),
    repeating-linear-gradient(-45deg, transparent, transparent 35px, rgba(255, 255, 255, 0.01) 35px, rgba(255, 255, 255, 0.01) 70px);
  animation: noise-shift 120s linear infinite;
}

@keyframes rotate-shape {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@keyframes gradient-pulse {
  0%, 100% {
    opacity: 0.1;
    transform: scale(1);
  }
  50% {
    opacity: 0.2;
    transform: scale(1.1);
  }
}

@keyframes gradient-shift {
  0% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(50px, 50px);
  }
}

@keyframes gradient-rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@keyframes noise-shift {
  0% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(100px, 100px);
  }
}
</style>