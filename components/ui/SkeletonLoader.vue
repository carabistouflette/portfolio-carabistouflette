<template>
  <div 
    class="skeleton-loader"
    :class="[
      `skeleton-${variant}`,
      { 'skeleton-animated': animated }
    ]"
    :style="customStyle"
  >
    <div class="skeleton-shimmer" v-if="animated" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  variant?: 'text' | 'title' | 'avatar' | 'image' | 'card' | 'custom'
  width?: string | number
  height?: string | number
  rounded?: boolean | string
  animated?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'text',
  animated: true,
  rounded: false
})

const customStyle = computed(() => {
  const style: Record<string, any> = {}
  
  if (props.width) {
    style.width = typeof props.width === 'number' ? `${props.width}px` : props.width
  }
  
  if (props.height) {
    style.height = typeof props.height === 'number' ? `${props.height}px` : props.height
  }
  
  if (props.rounded === true) {
    style.borderRadius = '0.5rem'
  } else if (typeof props.rounded === 'string') {
    style.borderRadius = props.rounded
  }
  
  return style
})
</script>

<style scoped>
.skeleton-loader {
  position: relative;
  overflow: hidden;
  background: linear-gradient(
    90deg,
    var(--surface0) 0%,
    var(--surface1) 50%,
    var(--surface0) 100%
  );
  background-size: 200% 100%;
}

/* Variantes prédéfinies */
.skeleton-text {
  height: 1rem;
  width: 100%;
  border-radius: 0.25rem;
  margin-bottom: 0.5rem;
}

.skeleton-title {
  height: 2rem;
  width: 70%;
  border-radius: 0.375rem;
  margin-bottom: 1rem;
}

.skeleton-avatar {
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
}

.skeleton-image {
  width: 100%;
  height: 12rem;
  border-radius: 0.5rem;
}

.skeleton-card {
  width: 100%;
  height: 16rem;
  border-radius: 0.75rem;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

/* Animation shimmer */
.skeleton-animated {
  animation: skeleton-pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes skeleton-pulse {
  0%, 100% {
    opacity: 0.75;
  }
  50% {
    opacity: 1;
  }
}

.skeleton-shimmer {
  position: absolute;
  inset: 0;
  transform: translateX(-100%);
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(255, 255, 255, 0.04) 20%,
    rgba(255, 255, 255, 0.08) 50%,
    rgba(255, 255, 255, 0.04) 80%,
    transparent 100%
  );
  animation: skeleton-shimmer 2s infinite;
}

@keyframes skeleton-shimmer {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}

</style>