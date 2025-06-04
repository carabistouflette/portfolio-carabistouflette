<template>
  <div 
    ref="cardRef"
    :class="[
      'card-base', 
      hover ? 'card-hover' : '',
      glass ? 'card-glass' : 'card-solid',
      loading ? 'card-loading' : '',
      className
    ]"
    @click="handleClick"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <!-- Enhanced glass morphism layers -->
    <div class="card-bg" v-if="glass">
      <div class="glass-layer glass-layer-1"></div>
      <div class="glass-layer glass-layer-2"></div>
    </div>
    
    <!-- Main content -->
    <div class="card-content h-full flex flex-col">
      <div v-if="$slots.image" class="card-image-wrapper">
        <div class="card-image-container">
          <slot name="image" />
        </div>
        <div class="image-overlay"></div>
      </div>
      
      <div :class="['card-body flex flex-col flex-grow', $slots.image ? 'has-image' : '']">
        <div v-if="$slots.header" class="card-header">
          <slot name="header" />
        </div>
        <div v-if="$slots.default" class="card-main flex-grow">
          <slot />
        </div>
        <div v-if="$slots.footer" class="card-footer mt-auto">
          <slot name="footer" />
        </div>
      </div>
    </div>
    
    <!-- Loading skeleton -->
    <div v-if="loading" class="card-skeleton">
      <div class="skeleton-image" v-if="$slots.image"></div>
      <div class="skeleton-content">
        <div class="skeleton-line skeleton-title"></div>
        <div class="skeleton-line skeleton-text"></div>
        <div class="skeleton-line skeleton-text"></div>
      </div>
    </div>
    
    <!-- Hover effect layer -->
    <div class="card-shine-container">
      <div class="card-shine" ref="shineRef"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

// Props
const props = defineProps({
  hover: {
    type: Boolean,
    default: false
  },
  glass: {
    type: Boolean,
    default: false
  },
  loading: {
    type: Boolean,
    default: false
  },
  className: {
    type: String,
    default: ''
  }
})

// Events
const emit = defineEmits(['click'])

// Refs
const cardRef = ref<HTMLElement>()
const shineRef = ref<HTMLElement>()
const isHovered = ref(false)

// Handle click with ripple effect
const handleClick = (event: MouseEvent) => {
  if (!props.loading) {
    emit('click', event)
  }
}

// Mouse tracking for shine effect
const handleMouseEnter = (event: MouseEvent) => {
  isHovered.value = true
}

const handleMouseLeave = () => {
  isHovered.value = false
  if (shineRef.value) {
    shineRef.value.style.opacity = '0'
  }
}

// Update shine position on mouse move
const updateShinePosition = (event: MouseEvent) => {
  if (!cardRef.value || !shineRef.value || !isHovered.value) return
  
  const rect = cardRef.value.getBoundingClientRect()
  // Use pageX/pageY and account for scroll position
  const x = event.pageX - window.scrollX - rect.left
  const y = event.pageY - window.scrollY - rect.top
  
  // Ensure the shine stays within card bounds
  const clampedX = Math.max(0, Math.min(x, rect.width))
  const clampedY = Math.max(0, Math.min(y, rect.height))
  
  shineRef.value.style.transform = `translate(${clampedX}px, ${clampedY}px) translate(-50%, -50%)`
  shineRef.value.style.opacity = '1'
}

// Add mouse move listener
onMounted(() => {
  if (cardRef.value && props.hover) {
    cardRef.value.addEventListener('mousemove', updateShinePosition)
  }
})

onUnmounted(() => {
  if (cardRef.value) {
    cardRef.value.removeEventListener('mousemove', updateShinePosition)
  }
})
</script>

<style scoped>
/* Base card styles */
.card-base {
  @apply relative overflow-hidden rounded-xl;
  transition: var(--transition-base), transform var(--animation-base) var(--ease-spring);
  transform-style: preserve-3d;
  transform: translateZ(0);
  will-change: transform;
}

/* Solid card variant */
.card-solid {
  @apply bg-surface0 border border-surface1;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

/* Glass morphism variant */
.card-glass {
  @apply relative;
  background: transparent;
}

.card-bg {
  @apply absolute inset-0 overflow-hidden rounded-xl;
}

.glass-layer {
  @apply absolute inset-0;
  border-radius: inherit;
}

.glass-layer-1 {
  background: linear-gradient(
    135deg,
    rgba(49, 50, 68, 0.4),
    rgba(69, 71, 90, 0.2)
  );
  backdrop-filter: blur(16px) saturate(150%);
  -webkit-backdrop-filter: blur(16px) saturate(150%);
  border: 1px solid rgba(88, 91, 112, 0.15);
  box-shadow: 
    inset 0 0 0 1px rgba(255, 255, 255, 0.05),
    0 8px 32px 0 rgba(31, 38, 135, 0.12);
}

.glass-layer-2 {
  background: linear-gradient(
    to bottom right,
    transparent,
    rgba(203, 166, 247, 0.08)
  );
  opacity: 0;
  transition: opacity var(--animation-slow) var(--ease-out);
}

/* Content layers */
.card-content {
  @apply relative z-10;
}

/* Image handling */
.card-image-wrapper {
  @apply relative w-full h-48 overflow-hidden;
}

.card-image-container {
  @apply w-full h-full;
  transition: transform var(--animation-slow) var(--ease-out);
  will-change: transform;
}

.card-image-container :deep(img) {
  @apply w-full h-full object-cover;
}

.image-overlay {
  @apply absolute inset-0 opacity-0;
  background: linear-gradient(
    to top,
    rgba(30, 30, 46, 0.7),
    rgba(30, 30, 46, 0.3) 50%,
    transparent
  );
  transition: opacity var(--animation-base) var(--ease-out);
}

/* Body sections */
.card-body {
  @apply p-6;
}

.card-body.has-image {
  @apply pt-4;
}

.card-header {
  @apply mb-3;
}

.card-main {
  @apply text-subtext0 mb-4;
}

.card-footer {
  @apply pt-3 border-t border-surface1;
}

/* Hover states */
.card-hover {
  @apply cursor-pointer;
}

.card-hover:hover {
  transform: translateY(-2px) translateZ(0) scale(1.01);
  box-shadow: 
    0 20px 25px -5px rgba(0, 0, 0, 0.15),
    0 10px 10px -5px rgba(0, 0, 0, 0.04),
    0 0 0 1px rgba(203, 166, 247, 0.1);
}

.card-hover:hover .glass-layer-1 {
  background: linear-gradient(
    135deg,
    rgba(49, 50, 68, 0.5),
    rgba(69, 71, 90, 0.25)
  );
  border-color: rgba(203, 166, 247, 0.2);
}

.card-hover:hover .glass-layer-2 {
  opacity: 1;
}

.card-hover:hover .card-image-container {
  transform: scale(1.05);
}

.card-hover:hover .image-overlay {
  opacity: 1;
}

.card-hover:active {
  transform: translateY(0) translateZ(0) scale(var(--scale-press));
  transition-duration: 50ms;
}

/* Shine container to prevent overflow */
.card-shine-container {
  @apply absolute inset-0 overflow-hidden rounded-xl pointer-events-none;
  z-index: 20;
}

/* Enhanced shine effect */
.card-shine {
  @apply absolute pointer-events-none;
  width: 150px;
  height: 150px;
  background: radial-gradient(
    circle at center,
    rgba(255, 255, 255, 0.2),
    rgba(203, 166, 247, 0.1) 40%,
    transparent 70%
  );
  opacity: 0;
  transition: opacity var(--animation-fast) var(--ease-out);
  filter: blur(2px);
  will-change: transform;
}

/* Loading skeleton */
.card-loading {
  @apply pointer-events-none;
}

.card-skeleton {
  @apply absolute inset-0 bg-surface0 rounded-xl p-6;
}

.skeleton-image {
  @apply w-full h-48 bg-surface1 rounded-lg mb-4;
  animation: skeleton-pulse 2s ease-in-out infinite;
}

.skeleton-content {
  @apply space-y-3;
}

.skeleton-line {
  @apply h-4 bg-surface1 rounded relative overflow-hidden;
  animation: skeleton-pulse 2s ease-in-out infinite;
}

.skeleton-line::after {
  content: '';
  @apply absolute inset-0;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.08),
    transparent
  );
  animation: skeleton-wave 1.5s ease-in-out infinite;
}

@keyframes skeleton-wave {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}

.skeleton-title {
  @apply w-3/4 h-6 mb-4;
}

.skeleton-text {
  @apply w-full;
}

.skeleton-text:last-child {
  @apply w-5/6;
}

@keyframes skeleton-pulse {
  0%, 100% {
    opacity: 0.4;
  }
  50% {
    opacity: 0.7;
  }
}

</style>