<template>
  <Transition
    :name="transitionName"
    :mode="mode"
    @before-enter="onBeforeEnter"
    @enter="onEnter"
    @after-enter="onAfterEnter"
    @before-leave="onBeforeLeave"
    @leave="onLeave"
    @after-leave="onAfterLeave"
  >
    <slot />
  </Transition>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

interface Props {
  name?: 'fade' | 'slide' | 'morph' | 'liquid' | 'reveal'
  mode?: 'out-in' | 'in-out' | 'default'
  duration?: number
}

const props = withDefaults(defineProps<Props>(), {
  name: 'morph',
  mode: 'out-in',
  duration: 800
})

const isTransitioning = ref(false)

const transitionName = computed(() => `page-${props.name}`)

// Lifecycle hooks
const onBeforeEnter = (el: Element) => {
  const element = el as HTMLElement
  element.style.transitionDuration = `${props.duration}ms`
}

const onEnter = (el: Element) => {
  const element = el as HTMLElement
  isTransitioning.value = true
  
  // Add entering class for additional effects
  element.classList.add('page-entering')
  
  // Force reflow
  void element.offsetHeight
}

const onAfterEnter = (el: Element) => {
  const element = el as HTMLElement
  element.classList.remove('page-entering')
  element.style.transitionDuration = ''
  isTransitioning.value = false
}

const onBeforeLeave = (el: Element) => {
  const element = el as HTMLElement
  element.style.transitionDuration = `${props.duration}ms`
}

const onLeave = (el: Element) => {
  const element = el as HTMLElement
  element.classList.add('page-leaving')
}

const onAfterLeave = (el: Element) => {
  const element = el as HTMLElement
  element.classList.remove('page-leaving')
  element.style.transitionDuration = ''
}
</script>

<style>
/* Fade transition */
.page-fade-enter-active,
.page-fade-leave-active {
  transition: opacity var(--transition-duration, 0.8s) cubic-bezier(0.4, 0, 0.2, 1);
}

.page-fade-enter-from {
  opacity: 0;
}

.page-fade-leave-to {
  opacity: 0;
}

/* Slide transition */
.page-slide-enter-active,
.page-slide-leave-active {
  transition: all var(--transition-duration, 0.8s) cubic-bezier(0.4, 0, 0.2, 1);
}

.page-slide-enter-from {
  opacity: 0;
  transform: translateX(30px);
}

.page-slide-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}

/* Morph transition */
.page-morph-enter-active,
.page-morph-leave-active {
  transition: all var(--transition-duration, 0.8s) cubic-bezier(0.4, 0, 0.2, 1);
  transform-style: preserve-3d;
  perspective: 1000px;
}

.page-morph-enter-from {
  opacity: 0;
  transform: scale(1.1) rotateX(-10deg);
  filter: blur(5px);
}

.page-morph-leave-to {
  opacity: 0;
  transform: scale(0.9) rotateX(10deg);
  filter: blur(5px);
}

/* Liquid transition */
.page-liquid-enter-active,
.page-liquid-leave-active {
  transition: all var(--transition-duration, 0.8s) cubic-bezier(0.4, 0, 0.2, 1);
}

.page-liquid-enter-from {
  opacity: 0;
  transform: scale(0.8) translateY(20px);
  filter: blur(10px) contrast(2) brightness(1.2);
}

.page-liquid-leave-to {
  opacity: 0;
  transform: scale(1.2) translateY(-20px);
  filter: blur(10px) contrast(0.5) brightness(0.8);
}

/* Reveal transition */
.page-reveal-enter-active,
.page-reveal-leave-active {
  transition: all var(--transition-duration, 0.8s) cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
}

.page-reveal-enter-from {
  opacity: 0;
  transform: translateY(100%);
  clip-path: polygon(0 100%, 100% 100%, 100% 100%, 0 100%);
}

.page-reveal-enter-to {
  opacity: 1;
  transform: translateY(0);
  clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
}

.page-reveal-leave-to {
  opacity: 0;
  transform: translateY(-100%);
  clip-path: polygon(0 0, 100% 0, 100% 0, 0 0);
}

/* Additional effects during transition */
.page-entering {
  will-change: transform, opacity, filter;
}

.page-leaving {
  position: absolute;
  width: 100%;
  will-change: transform, opacity, filter;
}

</style>