<template>
  <NuxtLink
    ref="elementRef"
    v-if="to"
    :to="to"
    :class="buttonClasses"
    :style="magneticStyle"
    data-magnetic
    data-cursor-type="pointer"
    data-cursor-text="CLICK"
    :data-cursor-color="`var(--${color})`"
    @click="handleClick"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <span class="button-bg" :class="`bg-${color}`"></span>
    <span class="button-content">
      <Icon v-if="iconLeft" :name="iconLeft" class="w-5 h-5 mr-2" />
      <span v-if="$slots.default"><slot /></span>
      <Icon v-if="iconRight" :name="iconRight" class="w-5 h-5 ml-2" />
    </span>
    <span class="button-ripple" ref="rippleRef"></span>
  </NuxtLink>
  <button
    ref="elementRef"
    v-else
    :type="type"
    :class="buttonClasses"
    :style="magneticStyle"
    :disabled="disabled"
    data-magnetic
    data-cursor-type="pointer"
    data-cursor-text="CLICK"
    :data-cursor-color="`var(--${color})`"
    @click="handleClick"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <span class="button-bg" :class="`bg-${color}`"></span>
    <span class="button-content">
      <Icon v-if="iconLeft" :name="iconLeft" class="w-5 h-5 mr-2" />
      <span v-if="$slots.default"><slot /></span>
      <Icon v-if="iconRight" :name="iconRight" class="w-5 h-5 ml-2" />
    </span>
    <span class="button-ripple" ref="rippleRef"></span>
  </button>
</template>

<script setup lang="ts">
import { computed, ref, watch, type PropType } from 'vue';
import { useMagneticEffect } from '~/composables/useMagneticEffect';
import { useButtonInteractions } from '~/composables/useMicroInteractions';

// Define types directly
type AccentColor = 'rosewater' | 'flamingo' | 'pink' | 'mauve' | 'red' | 'maroon' | 'peach' | 'yellow' | 'green' | 'teal' | 'sky' | 'sapphire' | 'blue' | 'lavender';
type ButtonVariant = 'solid' | 'outline' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

// Props definition with validation
const props = defineProps({
  to: {
    type: [String, Object], // Simplify type, NuxtLink handles it
    default: undefined
  },
  type: {
    type: String as PropType<'button' | 'submit' | 'reset'>,
    default: 'button',
    validator: (value: string) => ['button', 'submit', 'reset'].includes(value)
  },
  variant: {
    type: String as PropType<ButtonVariant>,
    default: 'solid',
    validator: (value: string) => ['solid', 'outline', 'ghost'].includes(value)
  },
  color: {
    type: String as PropType<AccentColor>,
    default: 'mauve', // Default accent color
    validator: (value: string) => ['rosewater', 'flamingo', 'pink', 'mauve', 'red', 'maroon', 'peach', 'yellow', 'green', 'teal', 'sky', 'sapphire', 'blue', 'lavender'].includes(value)
  },
  size: {
    type: String as PropType<ButtonSize>,
    default: 'md',
    validator: (value: string) => ['sm', 'md', 'lg'].includes(value)
  },
  iconLeft: {
    type: String,
    default: ''
  },
  iconRight: {
    type: String,
    default: ''
  },
  disabled: {
    type: Boolean,
    default: false
  },
  className: {
    type: String,
    default: ''
  }
});

// Event management
const emit = defineEmits(['click']);

// Refs for ripple effect
const rippleRef = ref<HTMLElement>();
const isHovered = ref(false);

// Size classes mapping
const sizeClasses: Record<ButtonSize, string> = {
  sm: 'px-3 py-1 text-sm',
  md: 'px-4 py-2 text-base', // Ensure base text size for md
  lg: 'px-6 py-3 text-lg'
};

// Enhanced button classes with better structure
const buttonClasses = computed(() => {
  const base = 'button-base relative inline-flex items-center justify-center rounded-lg font-medium overflow-hidden';
  const size = sizeClasses[props.size];
  
  let variantStyle = '';
  switch (props.variant) {
    case 'solid':
      variantStyle = 'button-solid';
      break;
    case 'outline':
      variantStyle = `button-outline border-2 border-${props.color}`;
      break;
    case 'ghost':
      variantStyle = 'button-ghost';
      break;
  }

  const state = props.disabled
    ? 'opacity-50 cursor-not-allowed'
    : 'cursor-pointer';

  const focusRing = `focus-visible:ring-2 focus-visible:ring-${props.color} focus-visible:ring-offset-2 focus-visible:ring-offset-base`;

  return [base, size, variantStyle, state, focusRing, props.className];
});

// Magnetic Effect Setup
const elementRef = ref<any>(null); // Can be NuxtLink instance or button element
const htmlElementRef = ref<HTMLElement | null>(null); // Explicitly for the HTML element

// Watch the primary ref and extract the actual HTML element once mounted
watch(elementRef, (newVal) => {
  if (newVal) {
    // If newVal has $el (like a component instance), use $el, otherwise assume newVal is the element
    htmlElementRef.value = newVal.$el instanceof HTMLElement ? newVal.$el : newVal instanceof HTMLElement ? newVal : null;
  } else {
    htmlElementRef.value = null;
  }
}, { flush: 'post', immediate: true }); // flush: 'post' ensures $el is available after render

// Pass the ref holding the actual HTML element to the composable
const { magneticStyle } = useMagneticEffect(htmlElementRef, {
  maxDistance: 150,
  strength: 0.3,
  disabled: computed(() => props.disabled)
});

// Enhanced interactions
const { handleButtonClick, handleButtonHover } = useButtonInteractions();

// Enhanced click with ripple and micro-interactions
const handleClick = (event: MouseEvent) => {
  emit('click', event);
  
  if (!props.disabled) {
    // Trigger micro-interactions
    handleButtonClick(event);
    
    // Create ripple effect
    if (rippleRef.value && elementRef.value) {
      const button = elementRef.value.$el || elementRef.value;
      const rect = button.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      
      // Create ripple
      const ripple = document.createElement('span');
      ripple.className = 'ripple';
      ripple.style.left = `${x}px`;
      ripple.style.top = `${y}px`;
      
      rippleRef.value.appendChild(ripple);
      
      // Remove ripple after animation
      setTimeout(() => {
        ripple.remove();
      }, 600);
    }
  }
};

// Enhanced hover state management
const handleMouseEnter = () => {
  isHovered.value = true;
  if (!props.disabled) {
    handleButtonHover(true);
  }
};

const handleMouseLeave = () => {
  isHovered.value = false;
  if (!props.disabled) {
    handleButtonHover(false);
  }
};
</script>

<style scoped>
/* Base button styles */
.button-base {
  transition: var(--transition-spring);
  transform-style: preserve-3d;
  position: relative;
  isolation: isolate;
}

/* Button background layer */
.button-bg {
  position: absolute;
  inset: 0;
  border-radius: inherit;
  transition: var(--transition-base), transform var(--animation-base) var(--ease-spring);
  transform: translateZ(-1px);
  will-change: transform, opacity;
}

/* Button content layer */
.button-content {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  z-index: 1;
}

/* Solid variant */
.button-solid .button-bg {
  opacity: 1;
}

.button-solid .button-content {
  color: var(--crust);
}

.button-solid:hover:not(:disabled) .button-bg {
  filter: brightness(1.15) saturate(1.2);
  transform: translateZ(-1px) scale(1.02);
}

.button-solid:active:not(:disabled) .button-bg {
  filter: brightness(0.9);
  transform: translateZ(-1px) scale(var(--scale-press));
}

/* Outline variant */
.button-outline .button-bg {
  opacity: 0;
}

.button-outline .button-content {
  color: var(--color);
}

.button-outline:hover:not(:disabled) .button-bg {
  opacity: 0.15;
  transform: translateZ(-1px) scale(1.02);
}

.button-outline:active:not(:disabled) .button-bg {
  opacity: 0.25;
  transform: translateZ(-1px) scale(var(--scale-press));
}

/* Ghost variant */
.button-ghost .button-bg {
  opacity: 0;
}

.button-ghost .button-content {
  color: var(--color);
}

.button-ghost:hover:not(:disabled) .button-bg {
  opacity: 0.08;
  transform: translateZ(-1px) scale(1.05);
}

.button-ghost:active:not(:disabled) .button-bg {
  opacity: 0.15;
  transform: translateZ(-1px) scale(var(--scale-press));
}

/* Enhanced hover and active states with shake animation */
.button-base:hover:not(:disabled) {
  transform: translateY(-2px) scale(1.02);
  box-shadow: 
    0 15px 30px -5px rgba(0, 0, 0, 0.25),
    0 0 0 3px rgba(var(--color-rgb, 203, 166, 247), 0.15),
    0 0 20px rgba(var(--color-rgb, 203, 166, 247), 0.2);
  animation: buttonShake 0.5s ease-in-out;
}

.button-base:active:not(:disabled) {
  transform: translateY(0) scale(var(--scale-press));
  box-shadow: 
    0 5px 15px -3px rgba(0, 0, 0, 0.3),
    0 0 0 4px rgba(var(--color-rgb, 203, 166, 247), 0.3),
    inset 0 2px 4px rgba(0, 0, 0, 0.1);
  transition-duration: 50ms;
}

@keyframes buttonShake {
  0%, 100% { transform: translateY(-2px) scale(1.02) rotate(0deg); }
  25% { transform: translateY(-2px) scale(1.02) rotate(0.5deg); }
  75% { transform: translateY(-2px) scale(1.02) rotate(-0.5deg); }
}

/* Ripple effect container */
.button-ripple {
  position: absolute;
  inset: 0;
  overflow: hidden;
  border-radius: inherit;
}

/* Enhanced ripple animation */
.ripple {
  position: absolute;
  border-radius: 50%;
  background: radial-gradient(circle, currentColor 10%, transparent 70%);
  opacity: 0.4;
  width: 0;
  height: 0;
  transform: translate(-50%, -50%);
  animation: rippleEffect var(--animation-slow) var(--ease-out);
  pointer-events: none;
}

@keyframes rippleEffect {
  to {
    width: 300px;
    height: 300px;
    opacity: 0;
  }
}

/* Dynamic color variables with RGB values for effects */
.button-base {
  --color: var(--mauve);
  --color-rgb: 203, 166, 247;
}

.button-base:has(.bg-rosewater) { --color: var(--rosewater); --color-rgb: 245, 224, 220; }
.button-base:has(.bg-flamingo) { --color: var(--flamingo); --color-rgb: 242, 205, 205; }
.button-base:has(.bg-pink) { --color: var(--pink); --color-rgb: 245, 194, 231; }
.button-base:has(.bg-mauve) { --color: var(--mauve); --color-rgb: 203, 166, 247; }
.button-base:has(.bg-red) { --color: var(--red); --color-rgb: 243, 139, 168; }
.button-base:has(.bg-maroon) { --color: var(--maroon); --color-rgb: 235, 160, 172; }
.button-base:has(.bg-peach) { --color: var(--peach); --color-rgb: 250, 179, 135; }
.button-base:has(.bg-yellow) { --color: var(--yellow); --color-rgb: 249, 226, 175; }
.button-base:has(.bg-green) { --color: var(--green); --color-rgb: 166, 227, 161; }
.button-base:has(.bg-teal) { --color: var(--teal); --color-rgb: 148, 226, 213; }
.button-base:has(.bg-sky) { --color: var(--sky); --color-rgb: 137, 220, 235; }
.button-base:has(.bg-sapphire) { --color: var(--sapphire); --color-rgb: 116, 199, 236; }
.button-base:has(.bg-blue) { --color: var(--blue); --color-rgb: 137, 180, 250; }
.button-base:has(.bg-lavender) { --color: var(--lavender); --color-rgb: 180, 190, 254; }

/* Add subtle glow on focus */
.button-base:focus-visible {
  box-shadow: 
    0 0 0 3px rgba(var(--color-rgb), 0.3),
    0 0 20px -5px rgba(var(--color-rgb), 0.5);
}
</style>