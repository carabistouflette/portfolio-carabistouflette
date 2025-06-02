<template>
  <div class="contribution-graph">
    <div class="text-center mb-6">
      <p class="text-subtext0">
        Ce graphique simule un calendrier de contributions GitHub.
        <br />
        Pour des données réelles, une authentification OAuth serait nécessaire.
      </p>
    </div>
    
    <!-- Months labels -->
    <div class="flex gap-1 mb-2 ml-8">
      <div 
        v-for="month in months" 
        :key="month"
        class="text-xs text-subtext1 flex-1 text-center"
      >
        {{ month }}
      </div>
    </div>
    
    <div class="flex gap-2">
      <!-- Days labels -->
      <div class="flex flex-col gap-1 pr-2">
        <div class="text-xs text-subtext1 h-3"></div>
        <div class="text-xs text-subtext1 h-3 flex items-center">Lun</div>
        <div class="text-xs text-subtext1 h-3"></div>
        <div class="text-xs text-subtext1 h-3 flex items-center">Mer</div>
        <div class="text-xs text-subtext1 h-3"></div>
        <div class="text-xs text-subtext1 h-3 flex items-center">Ven</div>
        <div class="text-xs text-subtext1 h-3"></div>
      </div>
      
      <!-- Contribution grid -->
      <div class="contribution-grid">
        <div v-for="week in weeks" :key="week[0].date" class="contribution-week">
          <div
            v-for="day in week"
            :key="day.date"
            class="contribution-day"
            :class="`level-${day.level}`"
            :title="`${day.count} contributions le ${formatDate(day.date)}`"
          ></div>
        </div>
      </div>
    </div>
    
    <!-- Legend -->
    <div class="flex items-center justify-end gap-2 mt-4">
      <span class="text-xs text-subtext1">Moins</span>
      <div class="contribution-day level-0"></div>
      <div class="contribution-day level-1"></div>
      <div class="contribution-day level-2"></div>
      <div class="contribution-day level-3"></div>
      <div class="contribution-day level-4"></div>
      <span class="text-xs text-subtext1">Plus</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  username: string
}

defineProps<Props>()

// Generate fake contribution data for the last 52 weeks
const generateContributions = () => {
  const contributions = []
  const today = new Date()
  const startDate = new Date(today)
  startDate.setDate(startDate.getDate() - 364) // 52 weeks ago
  
  // Adjust to start on Sunday
  const dayOfWeek = startDate.getDay()
  startDate.setDate(startDate.getDate() - dayOfWeek)
  
  for (let d = new Date(startDate); d <= today; d.setDate(d.getDate() + 1)) {
    const date = new Date(d)
    // Generate random contribution count with some patterns
    const isWeekend = date.getDay() === 0 || date.getDay() === 6
    const baseCount = isWeekend ? Math.random() * 3 : Math.random() * 10
    const count = Math.floor(baseCount * (Math.random() > 0.3 ? 1 : 0))
    
    contributions.push({
      date: date.toISOString().split('T')[0],
      count,
      level: getContributionLevel(count)
    })
  }
  
  return contributions
}

const getContributionLevel = (count: number): number => {
  if (count === 0) return 0
  if (count <= 2) return 1
  if (count <= 5) return 2
  if (count <= 8) return 3
  return 4
}

const contributions = generateContributions()

// Group contributions by week
const weeks = computed(() => {
  const weeks = []
  for (let i = 0; i < contributions.length; i += 7) {
    weeks.push(contributions.slice(i, i + 7))
  }
  return weeks
})

// Get month labels
const months = computed(() => {
  const monthNames = ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Jun', 'Jul', 'Aoû', 'Sep', 'Oct', 'Nov', 'Déc']
  const months = []
  let lastMonth = -1
  
  weeks.value.forEach((week, index) => {
    const firstDay = new Date(week[0].date)
    const month = firstDay.getMonth()
    
    if (month !== lastMonth && index % 4 === 0) {
      months.push(monthNames[month])
      lastMonth = month
    } else if (index % 4 === 0) {
      months.push('')
    }
  })
  
  return months
})

const formatDate = (dateString: string): string => {
  const date = new Date(dateString)
  return date.toLocaleDateString('fr-FR', { 
    day: 'numeric', 
    month: 'long', 
    year: 'numeric' 
  })
}
</script>

<style scoped>
.contribution-graph {
  @apply w-full overflow-x-auto;
}

.contribution-grid {
  @apply flex gap-1;
}

.contribution-week {
  @apply flex flex-col gap-1;
}

.contribution-day {
  @apply w-3 h-3 rounded-sm cursor-pointer transition-all duration-200;
  background-color: var(--surface1);
}

.contribution-day:hover {
  @apply scale-125;
  outline: 1px solid var(--overlay0);
  outline-offset: 1px;
}

.contribution-day.level-0 {
  background-color: var(--surface1);
}

.contribution-day.level-1 {
  background-color: rgba(166, 227, 161, 0.3);
}

.contribution-day.level-2 {
  background-color: rgba(166, 227, 161, 0.5);
}

.contribution-day.level-3 {
  background-color: rgba(166, 227, 161, 0.7);
}

.contribution-day.level-4 {
  background-color: var(--green);
}
</style>