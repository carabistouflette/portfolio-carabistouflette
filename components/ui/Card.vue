<template>
  <div 
    :class="[
      'overflow-hidden transition-all duration-300', 
      hover ? 'transform hover:-translate-y-2 hover:shadow-xl cursor-pointer active:translate-y-0 active:shadow-md' : '',
      glass ? 'glass-card' : 'bg-surface0 rounded-lg shadow-md border border-surface1',
      className
    ]"
    @click="$emit('click')"
  >
    <div v-if="$slots.image" class="w-full h-48 overflow-hidden">
      <slot name="image" />
    </div>
    <div :class="['p-6', $slots.image ? 'pt-4' : '']">
      <div v-if="$slots.header" class="mb-4">
        <slot name="header" />
      </div>
      <div v-if="$slots.default" class="prose prose-invert">
        <slot />
      </div>
      <div v-if="$slots.footer" class="mt-4 pt-4 border-t border-surface1">
        <slot name="footer" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Props
defineProps({
  hover: {
    type: Boolean,
    default: false
  },
  glass: {
    type: Boolean,
    default: false
  },
  className: {
    type: String,
    default: ''
  }
})

// Events
defineEmits(['click'])
</script>