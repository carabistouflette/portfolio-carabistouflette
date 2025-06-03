<template>
  <component
    :is="tag"
    ref="textElement"
    class="liquid-text"
    :class="{ 'is-liquid': isLiquid }"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <slot />
  </component>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

interface Props {
  tag?: string
  intensity?: number
  speed?: number
  enableOnHover?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  tag: 'span',
  intensity: 15,
  speed: 0.03,
  enableOnHover: true
})

const textElement = ref<HTMLElement | null>(null)
const isLiquid = ref(false)
const originalText = ref('')
let animationFrameId: number | null = null
let time = 0

const createLiquidEffect = () => {
  if (!textElement.value || !isLiquid.value) return

  time += props.speed
  
  const chars = originalText.value.split('')
  
  // Nettoyer et recréer les spans
  textElement.value.innerHTML = ''
  
  chars.forEach((char, index) => {
    const span = document.createElement('span')
    span.textContent = char === ' ' ? '\u00A0' : char
    span.className = 'liquid-char'
    span.style.display = 'inline-block'
    span.style.willChange = 'transform'
    
    // Effet de distorsion liquide
    const offset = index * 0.1
    const x = Math.sin(time + offset) * props.intensity * 0.2
    const y = Math.cos(time * 1.2 + offset) * props.intensity * 0.3
    const rotation = Math.sin(time * 0.8 + offset) * 3
    const scaleX = 1 + Math.sin(time * 1.5 + offset) * 0.08
    const scaleY = 1 + Math.cos(time * 1.3 + offset) * 0.05
    
    span.style.transform = `
      translate(${x}px, ${y}px) 
      rotate(${rotation}deg) 
      scaleX(${scaleX})
      scaleY(${scaleY})
    `
    
    textElement.value?.appendChild(span)
  })
  
  animationFrameId = requestAnimationFrame(createLiquidEffect)
}

const startLiquidEffect = () => {
  if (isLiquid.value) return
  isLiquid.value = true
  createLiquidEffect()
}

const stopLiquidEffect = () => {
  isLiquid.value = false
  if (animationFrameId !== null) {
    window.cancelAnimationFrame(animationFrameId)
    animationFrameId = null
  }
  
  // Restaurer le texte original avec transition
  if (textElement.value) {
    textElement.value.innerHTML = ''
    originalText.value.split('').forEach((char, index) => {
      const span = document.createElement('span')
      span.textContent = char === ' ' ? '\u00A0' : char
      span.className = 'liquid-char liquid-char-reset'
      span.style.display = 'inline-block'
      span.style.animationDelay = `${index * 0.02}s`
      textElement.value?.appendChild(span)
    })
  }
}

const handleMouseEnter = () => {
  if (props.enableOnHover) {
    startLiquidEffect()
  }
}

const handleMouseLeave = () => {
  if (props.enableOnHover) {
    stopLiquidEffect()
  }
}

onMounted(() => {
  if (textElement.value) {
    originalText.value = textElement.value.textContent || ''
  }
})

onUnmounted(() => {
  stopLiquidEffect()
})

// Exposer les méthodes pour un contrôle externe
defineExpose({
  startLiquidEffect,
  stopLiquidEffect
})
</script>

<style scoped>
.liquid-text {
  position: relative;
  display: inline-block;
  cursor: default;
  user-select: none;
}

.liquid-char {
  position: relative;
  transition: none;
  transform-origin: center center;
}

.liquid-char-reset {
  animation: liquidReset 0.4s cubic-bezier(0.4, 0, 0.2, 1) forwards;
}

@keyframes liquidReset {
  from {
    transform: var(--liquid-transform, none);
  }
  to {
    transform: translate(0, 0) rotate(0deg) scale(1);
  }
}

/* Effet de brillance sur les caractères */
.is-liquid .liquid-char {
  filter: brightness(1.1);
  text-shadow: 
    0 0 5px currentColor,
    0 0 10px rgba(203, 166, 247, 0.5);
}

/* Support pour reduced motion */
@media (prefers-reduced-motion: reduce) {
  .liquid-char {
    transform: none !important;
    animation: none !important;
  }
  
  .is-liquid .liquid-char {
    filter: none;
    text-shadow: none;
  }
}
</style>