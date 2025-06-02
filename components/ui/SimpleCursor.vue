<template>
  <div 
    v-if="enabled && !isMobile && !prefersReducedMotion"
    class="simple-cursor"
    :style="cursorStyle"
  >
    <div class="cursor-dot" :class="dotClass"></div>
    <div class="cursor-ring" :class="ringClass"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  enabled: {
    type: Boolean,
    default: true
  }
})

// State
const cursorX = ref(0)
const cursorY = ref(0)
const isVisible = ref(false)
const isHovering = ref(false)
const isMobile = ref(false)
const prefersReducedMotion = ref(false)

// Computed
const cursorStyle = computed(() => ({
  '--x': cursorX.value + 'px',
  '--y': cursorY.value + 'px',
  opacity: isVisible.value ? '1' : '0'
}))

const dotClass = computed(() => ({
  'cursor-dot--hover': isHovering.value
}))

const ringClass = computed(() => ({
  'cursor-ring--hover': isHovering.value
}))

// Animation state
let targetX = 0
let targetY = 0
let currentX = 0
let currentY = 0
let animationId: number | null = null

// Event handlers
const updatePosition = (e: MouseEvent) => {
  targetX = e.clientX
  targetY = e.clientY
}

// Smooth animation loop
const animate = () => {
  // Easing factor ajustable - 0.4 pour plus de réactivité
  const ease = 0.4
  
  // Interpolation fluide
  currentX += (targetX - currentX) * ease
  currentY += (targetY - currentY) * ease
  
  // Mise à jour des valeurs réactives
  cursorX.value = currentX
  cursorY.value = currentY
  
  // Continue l'animation
  animationId = requestAnimationFrame(animate)
}

const handleMouseEnter = () => {
  isVisible.value = true
}

const handleMouseLeave = () => {
  isVisible.value = false
}

const handleElementHover = (e: MouseEvent) => {
  const target = e.target as HTMLElement
  if (target && (target.tagName === 'A' || target.tagName === 'BUTTON' || target.closest('button, a, [data-cursor]'))) {
    isHovering.value = true
  }
}

const handleElementLeave = () => {
  isHovering.value = false
}

// Setup
const setup = () => {
  // Device detection
  isMobile.value = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
  prefersReducedMotion.value = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  
  if (!props.enabled || isMobile.value || prefersReducedMotion.value) {
    return
  }
  
  // Hide default cursor everywhere
  document.body.style.cursor = 'none'
  document.documentElement.style.cursor = 'none'
  
  // Add global style to hide cursor on all elements
  const style = document.createElement('style')
  style.id = 'custom-cursor-hide'
  style.textContent = `
    *, *::before, *::after {
      cursor: none !important;
    }
  `
  document.head.appendChild(style)
  
  // Initialize cursor position
  const initEvent = { clientX: window.innerWidth / 2, clientY: window.innerHeight / 2 } as MouseEvent
  updatePosition(initEvent)
  currentX = targetX
  currentY = targetY
  cursorX.value = currentX
  cursorY.value = currentY
  
  // Add listeners
  document.addEventListener('mousemove', updatePosition, { passive: true })
  document.addEventListener('mouseenter', handleMouseEnter, { passive: true })
  document.addEventListener('mouseleave', handleMouseLeave, { passive: true })
  document.addEventListener('mouseover', handleElementHover, { passive: true })
  document.addEventListener('mouseout', handleElementLeave, { passive: true })
  
  // Start animation loop
  animate()
}

const cleanup = () => {
  if (typeof document === 'undefined') return
  
  // Stop animation loop
  if (animationId) {
    cancelAnimationFrame(animationId)
    animationId = null
  }
  
  // Restore cursor
  document.body.style.cursor = ''
  document.documentElement.style.cursor = ''
  
  // Remove global cursor hiding style
  const style = document.getElementById('custom-cursor-hide')
  if (style) {
    style.remove()
  }
  
  // Remove listeners
  document.removeEventListener('mousemove', updatePosition)
  document.removeEventListener('mouseenter', handleMouseEnter)
  document.removeEventListener('mouseleave', handleMouseLeave)
  document.removeEventListener('mouseover', handleElementHover)
  document.removeEventListener('mouseout', handleElementLeave)
}

onMounted(() => {
  if (typeof window !== 'undefined') {
    setup()
  }
})

onUnmounted(() => {
  cleanup()
})
</script>

<style>
.simple-cursor {
  position: fixed !important;
  top: 0 !important;
  left: 0 !important;
  pointer-events: none !important;
  z-index: 2147483647 !important; /* Valeur maximale pour z-index */
  mix-blend-mode: difference;
  transition: opacity 0.3s ease;
  isolation: isolate; /* Crée un nouveau stacking context */
}

.cursor-dot {
  position: fixed !important;
  width: 8px;
  height: 8px;
  background: white;
  border-radius: 50%;
  transform: translate3d(calc(var(--x) - 4px), calc(var(--y) - 4px), 0);
  transition: width 0.15s ease, height 0.15s ease;
  will-change: transform;
  z-index: inherit;
  pointer-events: none !important;
}

.cursor-ring {
  position: fixed !important;
  width: 30px;
  height: 30px;
  border: 2px solid white;
  border-radius: 50%;
  transform: translate3d(calc(var(--x) - 15px), calc(var(--y) - 15px), 0);
  transition: width 0.2s ease, height 0.2s ease, opacity 0.2s ease;
  opacity: 0.5;
  will-change: transform;
  z-index: inherit;
  pointer-events: none !important;
}

.cursor-dot--hover {
  width: 12px;
  height: 12px;
  transform: translate3d(calc(var(--x) - 6px), calc(var(--y) - 6px), 0);
}

.cursor-ring--hover {
  width: 50px;
  height: 50px;
  transform: translate3d(calc(var(--x) - 25px), calc(var(--y) - 25px), 0);
  opacity: 0.8;
}

/* Mobile hide */
@media (hover: none) and (pointer: coarse) {
  .simple-cursor {
    display: none;
  }
}

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
  .simple-cursor {
    display: none;
  }
}
</style>