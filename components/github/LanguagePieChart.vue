<template>
  <div class="pie-chart-container">
    <div class="relative w-full aspect-square max-w-sm mx-auto">
      <!-- SVG Pie Chart -->
      <svg viewBox="0 0 200 200" class="w-full h-full">
        <!-- Background circle -->
        <circle cx="100" cy="100" r="80" fill="var(--surface0)" />
        
        <!-- Pie slices -->
        <g v-for="(slice, index) in pieSlices" :key="slice.language">
          <path
            :d="slice.path"
            :fill="slice.color"
            class="transition-all duration-300 hover:opacity-80 cursor-pointer"
            @mouseenter="hoveredSlice = slice.language"
            @mouseleave="hoveredSlice = null"
          />
        </g>
        
        <!-- Center circle -->
        <circle cx="100" cy="100" r="50" fill="var(--base)" />
        
        <!-- Center text -->
        <text x="100" y="95" text-anchor="middle" class="fill-text text-2xl font-bold">
          {{ totalRepos }}
        </text>
        <text x="100" y="110" text-anchor="middle" class="fill-subtext0 text-xs">
          Projets
        </text>
      </svg>
      
      <!-- Tooltip -->
      <div 
        v-if="hoveredSlice"
        class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-surface2 text-text px-3 py-2 rounded-lg shadow-lg pointer-events-none z-10"
      >
        <div class="font-medium">{{ hoveredSlice }}</div>
        <div class="text-sm text-subtext0">
          {{ getLanguageCount(hoveredSlice) }} projets ({{ getLanguagePercentage(hoveredSlice) }}%)
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

interface Props {
  languages: Record<string, number>
}

const props = defineProps<Props>()

const hoveredSlice = ref<string | null>(null)

const totalRepos = computed(() => {
  return Object.values(props.languages).reduce((sum, count) => sum + count, 0)
})

const languageData = computed(() => {
  return Object.entries(props.languages)
    .sort(([, a], [, b]) => b - a)
    .map(([language, count]) => ({
      language,
      count,
      percentage: (count / totalRepos.value) * 100
    }))
})

const pieSlices = computed(() => {
  let currentAngle = -90 // Start at top
  
  return languageData.value.map(({ language, percentage }) => {
    const startAngle = currentAngle
    const endAngle = currentAngle + (percentage * 3.6) // 360 degrees / 100%
    currentAngle = endAngle
    
    const startAngleRad = (startAngle * Math.PI) / 180
    const endAngleRad = (endAngle * Math.PI) / 180
    
    const x1 = 100 + 80 * Math.cos(startAngleRad)
    const y1 = 100 + 80 * Math.sin(startAngleRad)
    const x2 = 100 + 80 * Math.cos(endAngleRad)
    const y2 = 100 + 80 * Math.sin(endAngleRad)
    
    const largeArcFlag = percentage > 50 ? 1 : 0
    
    const path = [
      `M 100 100`,
      `L ${x1} ${y1}`,
      `A 80 80 0 ${largeArcFlag} 1 ${x2} ${y2}`,
      `Z`
    ].join(' ')
    
    return {
      language,
      path,
      color: getLanguageColor(language),
      percentage
    }
  })
})

const getLanguageColor = (language: string): string => {
  const colors: Record<string, string> = {
    'TypeScript': '#3178c6',
    'JavaScript': '#f7df1e',
    'Python': '#3776ab',
    'Vue': '#4fc08d',
    'HTML': '#e34c26',
    'CSS': '#1572b6',
    'C': '#a8b9cc',
    'C++': '#00599c',
    'Java': '#007396',
    'Shell': '#89e051',
    'Go': '#00ADD8',
    'Rust': '#dea584',
    'PHP': '#777BB4',
    'Ruby': '#CC342D',
    'Swift': '#FA7343'
  }
  
  return colors[language] || '#cdd6f4'
}

const getLanguageCount = (language: string): number => {
  return props.languages[language] || 0
}

const getLanguagePercentage = (language: string): number => {
  const data = languageData.value.find(d => d.language === language)
  return data ? Math.round(data.percentage) : 0
}
</script>

<style scoped>
.pie-chart-container {
  @apply relative;
}
</style>