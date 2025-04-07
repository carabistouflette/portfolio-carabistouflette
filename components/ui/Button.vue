<template>
  <NuxtLink
    ref="elementRef"
    v-if="to"
    :to="to"
    :class="buttonClasses"
    :style="magneticStyle"
    @click="$emit('click', $event)"
  >
    <Icon v-if="iconLeft" :name="iconLeft" class="w-5 h-5 mr-2" />
    <span v-if="$slots.default"><slot /></span>
    <Icon v-if="iconRight" :name="iconRight" class="w-5 h-5 ml-2" />
  </NuxtLink>
  <button
    ref="elementRef"
    v-else
    :type="type"
    :class="buttonClasses"
    :style="magneticStyle"
    :disabled="disabled"
    @click="$emit('click', $event)"
  >
    <Icon v-if="iconLeft" :name="iconLeft" class="w-5 h-5 mr-2" />
    <span v-if="$slots.default"><slot /></span>
    <Icon v-if="iconRight" :name="iconRight" class="w-5 h-5 ml-2" />
  </button>
</template>

<script setup lang="ts">
import { computed, ref, type PropType } from 'vue'; // Import PropType and ref
import { useMagneticEffect } from '~/composables/useMagneticEffect'; // Import the composable

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

// Gestion des événements
defineEmits(['click']);

// Size classes mapping
const sizeClasses: Record<ButtonSize, string> = {
  sm: 'px-3 py-1 text-sm',
  md: 'px-4 py-2 text-base', // Ensure base text size for md
  lg: 'px-6 py-3 text-lg'
};

// Génération des classes combinées
// Dynamically compute button classes
const buttonClasses = computed(() => {
  const base = 'inline-flex items-center justify-center rounded-lg font-medium transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-base';
  const size = sizeClasses[props.size];
  
  let variantStyle = '';
  switch (props.variant) {
    case 'solid':
      // Use text-base (dark) for better contrast on light accent backgrounds
      variantStyle = `bg-${props.color} text-base hover:brightness-110 active:brightness-95 shadow-md`;
      break;
    case 'outline':
      variantStyle = `border-2 border-${props.color} text-${props.color} bg-transparent hover:bg-${props.color}/10 active:bg-${props.color}/20`;
      break;
    case 'ghost':
      variantStyle = `text-${props.color} bg-transparent hover:bg-${props.color}/10 active:bg-${props.color}/20`;
      break;
  }

  const state = props.disabled
    ? 'opacity-50 cursor-not-allowed'
    : 'cursor-pointer active:scale-95'; // Simplified active state

  // Apply the ring color based on the button's color prop for better visibility
  const focusRing = `focus-visible:ring-${props.color}`;

  // Add the magnetic effect class
  return [base, size, variantStyle, state, focusRing, props.className]; // Remove 'magnetic-effect' class
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
  maxDistance: 200, // Increase activation distance for buttons
  disabled: computed(() => props.disabled) // Pass disabled state reactively
});
</script>