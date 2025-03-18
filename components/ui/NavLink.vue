<template>
  <NuxtLink
    :to="to"
    :class="[
      mobile 
        ? 'flex items-center px-3 py-2 space-x-3 w-full rounded-lg transition-all duration-300 cursor-pointer' 
        : 'link-hover cursor-pointer',
      isActive
        ? mobile
          ? 'bg-surface1 text-mauve'
          : 'text-mauve after:w-full font-medium'
        : mobile
          ? 'hover:bg-surface0 hover:scale-105 active:scale-95'
          : 'hover:scale-105'
    ]"
    @click="$emit('click')"
  >
    <NuxtIcon v-if="icon" :name="icon" class="w-5 h-5" />
    <span>{{ label }}</span>
  </NuxtLink>
</template>

<script setup lang="ts">
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
  }
});

// Check active state
const route = useRoute();
const isActive = computed(() => {
  if (props.to === '/') {
    return route.path === '/';
  }
  return route.path.startsWith(props.to);
});

// Events
defineEmits(['click']);
</script>