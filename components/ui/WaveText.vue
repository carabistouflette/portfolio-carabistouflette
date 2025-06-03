<template>
  <component
    :is="tag"
    ref="textElement"
    class="wave-text"
    :class="{ 'wave-active': isActive }"
  >
    <span
      v-for="(char, index) in characters"
      :key="`${char}-${index}`"
      class="wave-char"
      :style="{
        '--char-index': index,
        animationDelay: `${index * delay}s`
      }"
    >
      {{ char === ' ' ? '\u00A0' : char }}
    </span>
  </component>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

interface Props {
  tag?: string
  text?: string
  delay?: number
  duration?: number
  height?: number
  loop?: boolean
  triggerOnHover?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  tag: 'span',
  delay: 0.05,
  duration: 0.6,
  height: 5,
  loop: false,
  triggerOnHover: true
})

const textElement = ref<HTMLElement | null>(null)
const isActive = ref(false)
const internalText = ref('')

const characters = computed(() => {
  const textToUse = props.text || internalText.value
  return textToUse.split('')
})

const handleMouseEnter = () => {
  if (props.triggerOnHover) {
    isActive.value = true
    if (!props.loop) {
      // Réinitialiser après l'animation
      setTimeout(() => {
        isActive.value = false
      }, (characters.value.length * props.delay + props.duration) * 1000)
    }
  }
}

const handleMouseLeave = () => {
  if (props.triggerOnHover && props.loop) {
    isActive.value = false
  }
}

const triggerWave = () => {
  isActive.value = true
  if (!props.loop) {
    setTimeout(() => {
      isActive.value = false
    }, (characters.value.length * props.delay + props.duration) * 1000)
  }
}

onMounted(() => {
  if (textElement.value && !props.text) {
    internalText.value = textElement.value.textContent || ''
  }
  
  if (textElement.value && props.triggerOnHover) {
    textElement.value.addEventListener('mouseenter', handleMouseEnter)
    textElement.value.addEventListener('mouseleave', handleMouseLeave)
  }
})

defineExpose({
  triggerWave
})
</script>

<style scoped>
.wave-text {
  display: inline-block;
  position: relative;
  cursor: default;
  --wave-height: v-bind(height + 'px');
  --wave-duration: v-bind(duration + 's');
}

.wave-char {
  display: inline-block;
  position: relative;
  transform-origin: bottom center;
  transition: transform 0.3s ease;
}

.wave-active .wave-char {
  animation: wave var(--wave-duration) cubic-bezier(0.4, 0, 0.2, 1) both;
}

@keyframes wave {
  0%, 100% {
    transform: translateY(0) scale(1);
  }
  25% {
    transform: translateY(calc(var(--wave-height) * -1)) scale(1.05);
  }
  50% {
    transform: translateY(0) scale(1);
  }
}

/* Variation avec rotation */
.wave-text.wave-rotate .wave-char {
  transform-origin: center center;
}

.wave-text.wave-rotate.wave-active .wave-char {
  animation: waveRotate var(--wave-duration) cubic-bezier(0.4, 0, 0.2, 1) both;
}

@keyframes waveRotate {
  0%, 100% {
    transform: translateY(0) rotate(0deg) scale(1);
  }
  25% {
    transform: translateY(calc(var(--wave-height) * -1)) rotate(5deg) scale(1.1);
  }
  50% {
    transform: translateY(0) rotate(-5deg) scale(1.05);
  }
  75% {
    transform: translateY(calc(var(--wave-height) * -0.5)) rotate(2deg) scale(1.02);
  }
}

/* Effet de couleur arc-en-ciel */
.wave-text.wave-rainbow.wave-active .wave-char {
  animation: waveRainbow var(--wave-duration) cubic-bezier(0.4, 0, 0.2, 1) both;
}

@keyframes waveRainbow {
  0%, 100% {
    transform: translateY(0) scale(1);
    color: currentColor;
  }
  25% {
    transform: translateY(calc(var(--wave-height) * -1)) scale(1.05);
    color: var(--mauve);
  }
  50% {
    transform: translateY(0) scale(1);
    color: var(--blue);
  }
  75% {
    transform: translateY(calc(var(--wave-height) * -0.5)) scale(1.02);
    color: var(--peach);
  }
}

/* Boucle infinie */
.wave-text.wave-active .wave-char[style*="--char-index"] {
  animation-iteration-count: v-bind(loop ? 'infinite' : '1');
}

/* Support pour reduced motion */
@media (prefers-reduced-motion: reduce) {
  .wave-char {
    animation: none !important;
  }
}
</style>