<template>
  <NuxtLink
    ref="elementRef"
    :to="to"
    :class="navLinkClasses"
    :style="magneticStyle"
    :aria-current="isActive ? 'page' : undefined"
    @click="handleClick"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <span class="nav-link-bg"></span>
    <span class="nav-link-content">
      <Icon v-if="icon" :name="icon" class="nav-link-icon" />
      <span class="nav-link-label">{{ label }}</span>
    </span>
    <span class="nav-link-indicator" v-if="!mobile"></span>
  </NuxtLink>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'; // Import ref and watch
import { useRoute } from 'vue-router';
import { useMagneticEffect } from '~/composables/useMagneticEffect'; // Import the composable

// Define type directly
type AccentColor = 'rosewater' | 'flamingo' | 'pink' | 'mauve' | 'red' | 'maroon' | 'peach' | 'yellow' | 'green' | 'teal' | 'sky' | 'sapphire' | 'blue' | 'lavender';

// Props
const props = defineProps({
  to: {
    type: String,
    required: true
  },
  label: {
    type: String,
    required: true
  },
  icon: {
    type: String,
    default: ''
  },
  mobile: {
    type: Boolean,
    default: false
  },
  color: {
    type: String as import('vue').PropType<AccentColor>, // Use import('vue').PropType
    default: 'mauve', // Default accent color
    validator: (value: string) => ['rosewater', 'flamingo', 'pink', 'mauve', 'red', 'maroon', 'peach', 'yellow', 'green', 'teal', 'sky', 'sapphire', 'blue', 'lavender'].includes(value)
  }
});

// Check active state
const route = useRoute();
const isActive = computed(() => {
  if (props.to === '/') {
    return route.path === '/';
  }
  // Handle exact match for root, startsWith for others
  return route.path.startsWith(props.to) && (props.to !== '/' || route.path === '/');
});

// Events
const emit = defineEmits(['click']);

// State
const isHovered = ref(false);

// Handlers
const handleClick = (event: MouseEvent) => {
  emit('click', event);
};

const handleMouseEnter = () => {
  isHovered.value = true;
};

const handleMouseLeave = () => {
  isHovered.value = false;
};

// Compute dynamic classes
const navLinkClasses = computed(() => {
  const base = 'nav-link relative overflow-hidden cursor-pointer';
  const mobileClasses = 'nav-link-mobile flex items-center px-3 py-2 space-x-3 w-full rounded-lg';
  const desktopClasses = 'nav-link-desktop inline-flex items-center space-x-2 py-1';
  
  const focusClasses = 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-base';
  
  const activeClasses = isActive.value ? 'nav-link-active' : '';
  const colorClass = `nav-link-${props.color}`;

  return [
    base,
    props.mobile ? mobileClasses : desktopClasses,
    focusClasses,
    activeClasses,
    colorClass
  ];
});

// Magnetic Effect Setup
const elementRef = ref<HTMLElement | { $el: HTMLElement } | null>(null); // Can be NuxtLink instance
const htmlElementRef = ref<HTMLElement | null>(null); // Explicitly for the HTML element

// Watch the primary ref and extract the actual HTML element once mounted
watch(elementRef, (newVal) => {
  if (newVal) {
    // If newVal has $el (like a component instance), use $el
    htmlElementRef.value = newVal && '$el' in newVal && newVal.$el instanceof HTMLElement ? newVal.$el : null;
  } else {
    htmlElementRef.value = null;
  }
}, { flush: 'post', immediate: true }); // flush: 'post' ensures $el is available after render

// Pass the ref holding the actual HTML element to the composable
const { magneticStyle } = useMagneticEffect(htmlElementRef, {
  maxDistance: 100,
  strength: 0.2,
  disabled: computed(() => props.mobile)
});
</script>

<style scoped>
/* Base nav link styles */
.nav-link {
  transition: var(--transition-base);
  transform-style: preserve-3d;
}

/* Content wrapper */
.nav-link-content {
  @apply relative z-10 flex items-center;
  transition: var(--transition-fast);
}

/* Icon styles */
.nav-link-icon {
  @apply w-5 h-5;
  transition: transform var(--animation-base) var(--ease-spring);
}

/* Label styles */
.nav-link-label {
  transition: var(--transition-fast);
}

/* Enhanced background layer for hover effects */
.nav-link-bg {
  @apply absolute inset-0 opacity-0;
  background: linear-gradient(135deg, currentColor, transparent, currentColor);
  background-size: 200% 100%;
  transition: all var(--animation-base) var(--ease-out);
  border-radius: inherit;
}

.nav-link:hover .nav-link-bg {
  animation: waveEffect 0.8s ease-in-out;
}

@keyframes waveEffect {
  0% {
    background-position: 0% 50%;
    opacity: 0;
  }
  50% {
    background-position: 100% 50%;
    opacity: 0.15;
  }
  100% {
    background-position: 200% 50%;
    opacity: 0.1;
  }
}

/* Desktop specific styles */
.nav-link-desktop {
  @apply text-subtext0;
}

.nav-link-desktop .nav-link-content {
  @apply space-x-2;
}

.nav-link-desktop:hover .nav-link-icon {
  transform: translateY(-3px) rotate(-8deg) scale(1.1);
  animation: iconBounce 0.6s ease-in-out;
}

.nav-link-desktop:active .nav-link-icon {
  transform: translateY(1px) rotate(2deg) scale(0.95);
}

@keyframes iconBounce {
  0% { transform: translateY(-3px) rotate(-8deg) scale(1.1); }
  50% { transform: translateY(-5px) rotate(-12deg) scale(1.15); }
  100% { transform: translateY(-3px) rotate(-8deg) scale(1.1); }
}

/* Remove individual underline indicators - handled by parent navigation */
.nav-link-indicator {
  display: none;
}

/* Mobile specific styles */
.nav-link-mobile .nav-link-bg {
  opacity: 0.05;
}

.nav-link-mobile:hover .nav-link-bg {
  opacity: 0.1;
}

.nav-link-mobile:active .nav-link-bg {
  opacity: 0.15;
}

.nav-link-mobile.nav-link-active .nav-link-bg {
  opacity: 0.15;
}

/* Active state */
.nav-link-active {
  @apply font-medium;
}

.nav-link-active .nav-link-icon {
  animation: iconPulse 2s var(--ease-out) infinite;
}

@keyframes iconPulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.1); }
}

/* Color variants */
.nav-link-mauve { color: var(--mauve); }
.nav-link-mauve:hover { color: var(--mauve); }
.nav-link-mauve .nav-link-bg { background: var(--mauve); }
.nav-link-mauve .nav-link-indicator { background: var(--mauve); }

.nav-link-blue { color: var(--blue); }
.nav-link-blue:hover { color: var(--blue); }
.nav-link-blue .nav-link-bg { background: var(--blue); }
.nav-link-blue .nav-link-indicator { background: var(--blue); }

.nav-link-lavender { color: var(--lavender); }
.nav-link-lavender:hover { color: var(--lavender); }
.nav-link-lavender .nav-link-bg { background: var(--lavender); }
.nav-link-lavender .nav-link-indicator { background: var(--lavender); }

/* Hover color transition for desktop */
.nav-link-desktop:not(.nav-link-active) {
  color: var(--subtext0);
}

.nav-link-desktop:not(.nav-link-active):hover {
  color: inherit;
}

/* Focus visible enhancements */
.nav-link:focus-visible .nav-link-content {
  transform: scale(1.05);
}

.nav-link:focus-visible .nav-link-bg {
  opacity: 0.1;
}

</style>