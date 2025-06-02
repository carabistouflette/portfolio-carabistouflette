<template>
  <div class="inverted-scroll-wrapper">
    <div ref="contentRef" class="inverted-content" :style="{ transform: containerTransform }">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, watch, ref } from 'vue'
import { useInvertedScroll } from '~/composables/useInvertedScroll'

interface Props {
  enabled?: boolean
  offset?: number
  speed?: number
}

const props = withDefaults(defineProps<Props>(), {
  enabled: true,
  offset: 0,
  speed: 1
})

const contentRef = ref<HTMLElement>()
const { containerTransform, initInvertedScroll } = useInvertedScroll()

onMounted(() => {
  if (props.enabled && contentRef.value) {
    initInvertedScroll(contentRef.value)
  }
})

watch(() => props.enabled, (newValue) => {
  if (newValue && contentRef.value) {
    initInvertedScroll(contentRef.value)
  }
})
</script>

<style scoped>
.inverted-scroll-wrapper {
  position: relative;
  width: 100%;
}

.inverted-content {
  transition: transform 0.1s ease-out;
}
</style>