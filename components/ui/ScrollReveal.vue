<template>
  <component
    :is="tag"
    ref="elementRef"
    :class="classes"
    v-bind="$attrs"
  >
    <slot />
  </component>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
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
  class: {
    type: [String, Object, Array],
    default: ''
  }
});

// Refs
const elementRef = ref<HTMLElement | null>(null);

// Computed
const classes = computed(() => [
  'scroll-reveal',
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
  stagger: 0,
  cascade: false
});

// Register element on mount
onMounted(() => {
  if (elementRef.value) {
    registerElement(elementRef.value);
  }
});
</script>

<style scoped>
/* Base scroll reveal styles */
.scroll-reveal {
  will-change: transform, opacity, filter;
}

/* Initial state classes for additional styling hooks */
.scroll-reveal-initial {
  /* Can be used for additional initial state styling */
}

/* Direction-specific enhancements */
.scroll-reveal-scale.revealed {
  animation: scaleReveal 0.6s ease-out;
}

.scroll-reveal-rotate.revealed {
  animation: rotateReveal 0.8s ease-out;
}

.scroll-reveal-flip.revealed {
  animation: flipReveal 0.8s ease-out;
}

.scroll-reveal-zoom.revealed {
  animation: zoomReveal 0.6s ease-out;
}

/* Custom reveal animations */
@keyframes scaleReveal {
  0% {
    transform: scale(0.8);
    opacity: 0;
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

@keyframes rotateReveal {
  0% {
    transform: rotate(10deg) scale(0.9);
    opacity: 0;
  }
  100% {
    transform: rotate(0) scale(1);
    opacity: 1;
  }
}

@keyframes flipReveal {
  0% {
    transform: perspective(600px) rotateY(90deg);
    opacity: 0;
  }
  100% {
    transform: perspective(600px) rotateY(0);
    opacity: 1;
  }
}

@keyframes zoomReveal {
  0% {
    transform: scale(0.5);
    opacity: 0;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

</style>