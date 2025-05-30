<template>
  <NuxtLink
    ref="elementRef"
    :to="to"
    :class="navLinkClasses"
    :aria-current="isActive ? 'page' : undefined"
    @click="$emit('click')"
  >
    <Icon v-if="icon" :name="icon" class="w-5 h-5" />
    <span>{{ label }}</span>
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
defineEmits(['click']);

// Compute dynamic classes
const navLinkClasses = computed(() => {
  const baseMobile = 'flex items-center px-3 py-2 space-x-3 w-full rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-base'; // Added focus styles for mobile consistency
  const baseDesktop = `relative inline-block text-subtext0 after:content-[''] after:absolute after:w-0 after:h-0.5 after:bottom-0 after:left-0 after:transition-all after:duration-300 focus:outline-none focus-visible:underline focus-visible:decoration-2 focus-visible:underline-offset-4`; // Added focus styles for desktop
  const common = 'transition-all duration-300 cursor-pointer';

  let stateClasses = '';
  if (isActive.value) {
    stateClasses = props.mobile
      ? `bg-surface1 text-${props.color}` // Active mobile
      : `text-${props.color} after:bg-${props.color} after:w-full font-medium`; // Active desktop
  } else {
    stateClasses = props.mobile
      ? `hover:bg-surface0 focus-visible:ring-${props.color}` // Inactive mobile hover + focus ring
      : `hover:text-${props.color} hover:after:bg-${props.color} hover:after:w-full focus-visible:text-${props.color} focus-visible:decoration-${props.color}`; // Inactive desktop hover + focus styles
  }

  return [
    common,
    props.mobile ? baseMobile : baseDesktop,
    stateClasses
    // 'magnetic-effect' class removed
  ];
});

// Magnetic Effect Setup
const elementRef = ref<any>(null); // Can be NuxtLink instance
const htmlElementRef = ref<HTMLElement | null>(null); // Explicitly for the HTML element

// Watch the primary ref and extract the actual HTML element once mounted
watch(elementRef, (newVal) => {
  if (newVal) {
    // If newVal has $el (like a component instance), use $el
    htmlElementRef.value = newVal.$el instanceof HTMLElement ? newVal.$el : null;
  } else {
    htmlElementRef.value = null;
  }
}, { flush: 'post', immediate: true }); // flush: 'post' ensures $el is available after render

// Pass the ref holding the actual HTML element to the composable
const { magneticStyle } = useMagneticEffect(htmlElementRef);
</script>