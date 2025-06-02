<template>
  <div 
    v-if="showCustomCursor && !prefersReducedMotion"
    class="custom-cursor-container"
    :style="containerStyle"
  >
    <!-- Main cursor dot -->
    <div 
      class="cursor-dot"
      :class="cursorClass"
      :style="dotStyle"
    >
      <!-- Inner dot -->
      <div class="cursor-inner" :style="innerStyle"></div>
      
      <!-- Ring effect -->
      <div class="cursor-ring" :style="ringStyle"></div>
      
      <!-- Text label for interactive elements -->
      <div 
        v-if="cursorText" 
        class="cursor-text"
        :style="textStyle"
      >
        {{ cursorText }}
      </div>
      
      <!-- Icon for special states -->
      <Icon 
        v-if="cursorIcon" 
        :name="cursorIcon" 
        class="cursor-icon"
        :style="iconStyle"
      />
    </div>
    
    <!-- Trail particles -->
    <div 
      v-for="(particle, index) in trailParticles" 
      :key="index"
      class="cursor-trail-particle"
      :style="particle.style"
    ></div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue'

interface TrailParticle {
  x: number
  y: number
  opacity: number
  scale: number
  style: Record<string, string>
}

interface CursorState {
  x: number
  y: number
  isVisible: boolean
  isHovering: boolean
  cursorType: 'default' | 'pointer' | 'text' | 'grab' | 'grabbing' | 'help' | 'loading'
  text?: string
  icon?: string
  color?: string
}

// Props
const props = defineProps({
  enabled: {
    type: Boolean,
    default: true
  },
  showTrail: {
    type: Boolean,
    default: true
  },
  trailLength: {
    type: Number,
    default: 8
  },
  magneticStrength: {
    type: Number,
    default: 0.3
  }
})

// State
const cursorState = ref<CursorState>({
  x: 0,
  y: 0,
  isVisible: false,
  isHovering: false,
  cursorType: 'default'
})

const trailParticles = ref<TrailParticle[]>([])
const prefersReducedMotion = ref(false)
const showCustomCursor = ref(false)

// Computed properties
const containerStyle = computed(() => ({
  '--cursor-x': `${cursorState.value.x}px`,
  '--cursor-y': `${cursorState.value.y}px`,
  pointerEvents: 'none',
  position: 'fixed',
  top: '0',
  left: '0',
  zIndex: '10000',
  mixBlendMode: 'difference',
  width: '100vw',
  height: '100vh'
}))

const cursorClass = computed(() => {
  const classes = ['cursor-dot']
  
  if (cursorState.value.isHovering) {
    classes.push('cursor-hovering')
  }
  
  if (cursorState.value.cursorType !== 'default') {
    classes.push(`cursor-${cursorState.value.cursorType}`)
  }
  
  return classes.join(' ')
})

const dotStyle = computed(() => {
  return {
    transform: `translate3d(${cursorState.value.x}px, ${cursorState.value.y}px, 0)`,
    opacity: cursorState.value.isVisible ? '1' : '0'
  }
})

const innerStyle = computed(() => ({
  backgroundColor: cursorState.value.color || 'var(--text)'
}))

const ringStyle = computed(() => ({
  borderColor: cursorState.value.color || 'var(--text)'
}))

const textStyle = computed(() => ({
  color: cursorState.value.color || 'var(--text)'
}))

const iconStyle = computed(() => ({
  color: cursorState.value.color || 'var(--text)'
}))

const cursorText = computed(() => cursorState.value.text)
const cursorIcon = computed(() => cursorState.value.icon)

// Mouse tracking - amélioration de la synchronisation
let mouseX = 0
let mouseY = 0
let animationFrame: number | null = null

const updateCursorPosition = (event: MouseEvent) => {
  // Utiliser clientX/clientY qui sont toujours relatifs au viewport
  mouseX = event.clientX
  mouseY = event.clientY
  
  // Mise à jour immédiate pour éviter le décalage
  cursorState.value.x = mouseX
  cursorState.value.y = mouseY
}

const animateCursor = () => {
  // Update trail particles only
  if (props.showTrail) {
    updateTrail()
  }
  
  animationFrame = requestAnimationFrame(animateCursor)
}

const updateTrail = () => {
  // Version simplifiée du trail pour de meilleures performances
  trailParticles.value.unshift({
    x: cursorState.value.x,
    y: cursorState.value.y,
    opacity: 1,
    scale: 1,
    style: {
      transform: `translate3d(${cursorState.value.x}px, ${cursorState.value.y}px, 0)`,
      opacity: '1'
    }
  })
  
  // Limit trail length
  if (trailParticles.value.length > props.trailLength) {
    trailParticles.value.pop()
  }
  
  // Update existing particles with better performance
  trailParticles.value.forEach((particle, index) => {
    const progress = index / props.trailLength
    particle.opacity = Math.max(0, 1 - progress)
    particle.scale = Math.max(0.3, 1 - (progress * 0.7))
    
    particle.style = {
      transform: `translate3d(${particle.x}px, ${particle.y}px, 0) scale(${particle.scale})`,
      opacity: particle.opacity.toString()
    }
  })
}

// Event handlers
const handleMouseEnter = () => {
  cursorState.value.isVisible = true
}

const handleMouseLeave = () => {
  cursorState.value.isVisible = false
}

const handleElementHover = (event: MouseEvent) => {
  const target = event.target as HTMLElement
  if (!target) return
  
  cursorState.value.isHovering = true
  
  // Determine cursor type based on element
  if (target.tagName === 'A' || target.tagName === 'BUTTON' || target.closest('button, a')) {
    cursorState.value.cursorType = 'pointer'
    cursorState.value.text = 'CLICK'
  } else if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') {
    cursorState.value.cursorType = 'text'
    cursorState.value.icon = 'heroicons:pencil'
  } else if (target.draggable) {
    cursorState.value.cursorType = 'grab'
    cursorState.value.text = 'DRAG'
  }
  
  // Get custom cursor attributes
  const customType = target.getAttribute('data-cursor-type')
  const customText = target.getAttribute('data-cursor-text')
  const customIcon = target.getAttribute('data-cursor-icon')
  const customColor = target.getAttribute('data-cursor-color')
  
  if (customType) cursorState.value.cursorType = customType as any
  if (customText) cursorState.value.text = customText
  if (customIcon) cursorState.value.icon = customIcon
  if (customColor) cursorState.value.color = customColor
}

const handleElementLeave = () => {
  cursorState.value.isHovering = false
  cursorState.value.cursorType = 'default'
  cursorState.value.text = undefined
  cursorState.value.icon = undefined
  cursorState.value.color = undefined
}

// Effet magnétique désactivé temporairement pour éviter les décalages
const handleMagneticHover = (event: MouseEvent) => {
  // Désactivé pour corriger la synchronisation
  return
}

// Setup and cleanup
const setupCursor = () => {
  // Check for reduced motion preference
  if (typeof window !== 'undefined') {
    prefersReducedMotion.value = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  }
  
  if (!props.enabled || prefersReducedMotion.value) {
    return
  }
  
  // Hide default cursor
  document.body.style.cursor = 'none'
  showCustomCursor.value = true
  
  // Add event listeners - uniquement mousemove pour les coordonnées
  document.addEventListener('mousemove', updateCursorPosition, { passive: true })
  document.addEventListener('mouseenter', handleMouseEnter, { passive: true })
  document.addEventListener('mouseleave', handleMouseLeave, { passive: true })
  
  // Add delegation for hover effects
  document.addEventListener('mouseover', handleElementHover, { passive: true })
  document.addEventListener('mouseout', handleElementLeave, { passive: true })
  
  // Start animation loop
  animateCursor()
}

const cleanupCursor = () => {
  if (typeof window === 'undefined') return
  
  // Restore default cursor
  document.body.style.cursor = ''
  showCustomCursor.value = false
  
  // Remove event listeners
  document.removeEventListener('mousemove', updateCursorPosition)
  document.removeEventListener('mouseenter', handleMouseEnter)
  document.removeEventListener('mouseleave', handleMouseLeave)
  document.removeEventListener('mouseover', handleElementHover)
  document.removeEventListener('mouseout', handleElementLeave)
  
  // Stop animation
  if (animationFrame) {
    cancelAnimationFrame(animationFrame)
    animationFrame = null
  }
}

onMounted(() => {
  nextTick(() => {
    setupCursor()
  })
})

onUnmounted(() => {
  cleanupCursor()
})
</script>

<style scoped>
.custom-cursor-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  pointer-events: none;
  z-index: 10000;
  overflow: hidden;
}

.cursor-dot {
  position: absolute;
  width: 20px;
  height: 20px;
  transition: opacity 0.3s ease;
  will-change: transform, opacity;
  pointer-events: none;
}

.cursor-inner {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 4px;
  height: 4px;
  background-color: var(--text);
  border-radius: 50%;
  transform: translate(-50%, -50%);
  transition: all 0.2s ease;
}

.cursor-ring {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 20px;
  height: 20px;
  border: 1px solid var(--text);
  border-radius: 50%;
  transform: translate(-50%, -50%);
  transition: all 0.3s ease;
  opacity: 0.5;
}

.cursor-text {
  position: absolute;
  top: -30px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 1px;
  white-space: nowrap;
  opacity: 0;
  transition: opacity 0.2s ease;
}

.cursor-icon {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 16px;
  height: 16px;
  transform: translate(-50%, -50%);
  opacity: 0;
  transition: opacity 0.2s ease;
}

/* Hovering states */
.cursor-hovering .cursor-inner {
  width: 8px;
  height: 8px;
  background-color: var(--mauve);
}

.cursor-hovering .cursor-ring {
  width: 30px;
  height: 30px;
  border-color: var(--mauve);
  opacity: 1;
}

.cursor-hovering .cursor-text {
  opacity: 1;
}

.cursor-hovering .cursor-icon {
  opacity: 1;
}

/* Cursor types */
.cursor-pointer .cursor-inner {
  background-color: var(--green);
}

.cursor-pointer .cursor-ring {
  border-color: var(--green);
  animation: pulse 1.5s ease-in-out infinite;
}

.cursor-text .cursor-inner {
  background-color: var(--blue);
}

.cursor-text .cursor-ring {
  border-color: var(--blue);
}

.cursor-grab .cursor-inner {
  background-color: var(--yellow);
}

.cursor-grab .cursor-ring {
  border-color: var(--yellow);
}

.cursor-loading .cursor-ring {
  animation: spin 1s linear infinite;
}

/* Trail particles optimisées */
.cursor-trail-particle {
  position: absolute;
  width: 2px;
  height: 2px;
  background-color: var(--mauve);
  border-radius: 50%;
  pointer-events: none;
  will-change: transform, opacity;
  transform-origin: center;
}

/* Animations */
@keyframes pulse {
  0% {
    transform: translate(-50%, -50%) scale(1);
    opacity: 1;
  }
  50% {
    transform: translate(-50%, -50%) scale(1.2);
    opacity: 0.7;
  }
  100% {
    transform: translate(-50%, -50%) scale(1);
    opacity: 1;
  }
}

@keyframes spin {
  to {
    transform: translate(-50%, -50%) rotate(360deg);
  }
}

/* Responsive: hide on touch devices */
@media (hover: none) and (pointer: coarse) {
  .custom-cursor-container {
    display: none;
  }
}

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
  .custom-cursor-container {
    display: none;
  }
}
</style>