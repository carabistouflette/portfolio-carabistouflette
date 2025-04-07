<template>
  <NuxtLink
    :to="to"
    :class="navLinkClasses"
    @click="$emit('click')"
  >
    <Icon v-if="icon" :name="icon" class="w-5 h-5" />
    <span>{{ label }}</span>
  </NuxtLink>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';

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
    type: String as PropType<AccentColor>,
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
  const baseMobile = 'flex items-center px-3 py-2 space-x-3 w-full rounded-lg';
  const baseDesktop = `relative inline-block text-subtext0 after:content-[''] after:absolute after:w-0 after:h-0.5 after:bottom-0 after:left-0 after:transition-all after:duration-300`;
  const common = 'transition-all duration-300 cursor-pointer';

  let stateClasses = '';
  if (isActive.value) {
    stateClasses = props.mobile
      ? `bg-surface1 text-${props.color}` // Active mobile
      : `text-${props.color} after:bg-${props.color} after:w-full font-medium`; // Active desktop
  } else {
    stateClasses = props.mobile
      ? `hover:bg-surface0` // Inactive mobile hover
      : `hover:text-${props.color} hover:after:bg-${props.color} hover:after:w-full`; // Inactive desktop hover
  }

  return [
    common,
    props.mobile ? baseMobile : baseDesktop,
    stateClasses
  ];
});
</script>