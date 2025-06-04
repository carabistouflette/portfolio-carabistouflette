<template>
  <div class="flex flex-col sm:flex-row items-center gap-6 p-6 bg-surface0 rounded-2xl border"
       :class="reverse ? 'sm:flex-row-reverse' : ''"
       :style="borderGradient">
    <div class="flex-1">
      <h3 class="text-2xl font-bold mb-3">{{ step.title }}</h3>
      <p class="text-subtext0 mb-4">{{ step.description }}</p>
      <div class="text-sm space-y-2">
        <div v-for="detail in step.details" :key="detail" 
          class="flex items-start">
          <Icon name="heroicons:check-circle" class="w-5 h-5 mr-2 flex-shrink-0 mt-0.5"
                :class="iconClass" />
          <span>{{ detail }}</span>
        </div>
      </div>
    </div>
    <div class="w-32 h-32 rounded-full flex items-center justify-center flex-shrink-0"
         :class="bgClass">
      <Icon :name="step.icon" class="w-16 h-16" :class="iconClass" />
    </div>
  </div>
</template>

<script setup lang="ts">
interface Step {
  title: string
  description: string
  details: string[]
  icon: string
}

interface Props {
  step: Step
  reverse?: boolean
  bgClass: string
  iconClass: string
  borderGradient: string
}

const props = defineProps<Props>()

const borderGradient = {
  background: props.borderGradient,
  padding: '1px'
}
</script>