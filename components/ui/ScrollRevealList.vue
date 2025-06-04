<template>
  <component
    :is="tag"
    ref="containerRef"
    :class="containerClasses"
    v-bind="$attrs"
  >
    <slot />
  </component>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, nextTick } from 'vue';
import { useScrollReveal } from '~/composables/useScrollReveal';

// Props
const props = defineProps({
  tag: {
    type: String,
    default: 'div'
  },
  direction: {
    type: String as import('vue').PropType<'up' | 'down' | 'left' | 'right' | 'fade' | 'scale' | 'rotate' | 'flip' | 'zoom'>,
    default: 'up'
  },
  stagger: {
    type: Number,
    default: 100
  },
  delay: {
    type: Number,
    default: 0
  },
  duration: {
    type: Number,
    default: 600
  },
  distance: {
    type: String,
    default: '30px'
  },
  once: {
    type: Boolean,
    default: true
  },
  threshold: {
    type: Number,
    default: 0.1
  },
  blur: {
    type: Boolean,
    default: true
  },
  scale: {
    type: Number,
    default: 0.9
  },
  rotate: {
    type: Number,
    default: 10
  },
  itemSelector: {
    type: String,
    default: ':scope > *'
  },
  cascade: {
    type: Boolean,
    default: true
  },
  class: {
    type: [String, Object, Array],
    default: ''
  }
});

// Refs
const containerRef = ref<HTMLElement | null>(null);

// Computed
const containerClasses = computed(() => [
  'scroll-reveal-list',
  `scroll-reveal-${props.direction}`,
  props.class
]);

// Scroll reveal setup
const { registerElement } = useScrollReveal({
  direction: props.direction,
  delay: props.delay,
  duration: props.duration,
  distance: props.distance,
  once: props.once,
  threshold: props.threshold,
  blur: props.blur,
  scale: props.scale,
  rotate: props.rotate,
  stagger: props.stagger,
  cascade: props.cascade
});

// Register child elements on mount
onMounted(() => {
  nextTick(() => {
    if (containerRef.value) {
      const items = Array.from(
        containerRef.value.querySelectorAll(props.itemSelector)
      ) as HTMLElement[];
      
      if (items.length > 0) {
        registerElement(items);
      }
    }
  });
});

// Expose method to re-register elements (useful for dynamic content)
const refreshElements = () => {
  nextTick(() => {
    if (containerRef.value) {
      const items = Array.from(
        containerRef.value.querySelectorAll(props.itemSelector)
      ) as HTMLElement[];
      
      if (items.length > 0) {
        registerElement(items);
      }
    }
  });
};

defineExpose({
  refreshElements
});
</script>

<style scoped>
/* Base scroll reveal list styles */
.scroll-reveal-list {
  /* Container can have additional styling */
}

/* Child item animations are handled by the composable */
.scroll-reveal-list :deep(> *) {
  will-change: transform, opacity, filter;
}

/* Add some spacing effects based on reveal direction */
.scroll-reveal-up :deep(> *),
.scroll-reveal-down :deep(> *) {
  margin-bottom: 0.5rem;
}

.scroll-reveal-left :deep(> *),
.scroll-reveal-right :deep(> *) {
  margin-right: 0.5rem;
}

</style>