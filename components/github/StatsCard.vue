<template>
  <Card glass hover class="stats-card-extended">
    <div class="flex items-start justify-between">
      <div class="flex-1">
        <div class="flex items-center gap-3 mb-3">
          <div
            class="w-12 h-12 rounded-lg flex items-center justify-center"
            :style="{ backgroundColor: getColorRgba(color, 0.1) }"
          >
            <Icon :name="icon" class="text-2xl" :style="{ color: getColorValue(color) }" />
          </div>
        </div>
        <div class="text-3xl font-bold text-text mb-1">
          {{ formattedValue }}
        </div>
        <div class="text-sm text-subtext0">{{ label }}</div>
      </div>
      <div v-if="trend" class="flex items-center gap-1 text-sm">
        <Icon 
          :name="trend > 0 ? 'mdi:trending-up' : 'mdi:trending-down'" 
          :style="{ color: trend > 0 ? 'var(--green)' : 'var(--red)' }"
        />
        <span :style="{ color: trend > 0 ? 'var(--green)' : 'var(--red)' }">
          {{ Math.abs(trend) }}%
        </span>
      </div>
    </div>
    <div v-if="sparkline" class="mt-4">
      <!-- Placeholder for sparkline chart -->
      <div class="h-8 bg-surface1 rounded animate-pulse"></div>
    </div>
  </Card>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  icon: string
  value: number | string
  label: string
  color: string
  trend?: number
  sparkline?: number[]
}

const props = defineProps<Props>()

const formattedValue = computed(() => {
  if (typeof props.value === 'number') {
    if (props.value >= 1000) {
      return `${(props.value / 1000).toFixed(1)}k`
    }
    return props.value.toLocaleString()
  }
  return props.value
})

const getColorValue = (color: string): string => {
  return `var(--${color})`
}

const getColorRgba = (color: string, opacity: number): string => {
  const colorMap: Record<string, string> = {
    'yellow': '249, 226, 175',
    'blue': '137, 180, 250',
    'green': '166, 227, 161',
    'mauve': '203, 166, 247',
    'red': '243, 139, 168',
    'pink': '245, 194, 231',
    'teal': '148, 226, 213',
    'peach': '250, 179, 135'
  }
  const rgb = colorMap[color] || '205, 214, 244' // default to text color
  return `rgba(${rgb}, ${opacity})`
}
</script>

<style scoped>
.stats-card-extended {
  @apply relative overflow-hidden;
  transition: all 0.3s ease;
}

.stats-card-extended::before {
  content: '';
  @apply absolute inset-0 opacity-0 transition-opacity duration-300;
  background: radial-gradient(circle at top right, var(--mauve) 0%, transparent 70%);
  filter: blur(60px);
  z-index: -1;
}

.stats-card-extended:hover::before {
  @apply opacity-10;
}
</style>