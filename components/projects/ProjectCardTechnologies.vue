<template>
  <div class="technologies-section">
    <div v-if="priorityTechnologies.length > 0" class="technologies">
      <span 
        v-for="tech in displayedTechnologies" 
        :key="tech"
        class="technology-badge group-hover:animate-pulse-subtle"
      >
        {{ tech }}
      </span>
      <span 
        v-if="remainingCount > 0"
        class="technology-badge more-badge"
      >
        +{{ remainingCount }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  technologies?: string[]
  maxDisplay?: number
}

const props = withDefaults(defineProps<Props>(), {
  technologies: () => [],
  maxDisplay: 3
})

// Priority order for technologies
const technologyPriority = [
  'TypeScript', 'JavaScript', 'Vue.js', 'Nuxt.js', 'React', 'Next.js',
  'Node.js', 'Express', 'Python', 'Django', 'FastAPI',
  'PostgreSQL', 'MongoDB', 'Redis', 'Docker', 'Kubernetes',
  'AWS', 'Google Cloud', 'Azure'
]

const priorityTechnologies = computed(() => {
  if (!props.technologies || props.technologies.length === 0) return []
  
  const sorted = [...props.technologies].sort((a, b) => {
    const indexA = technologyPriority.indexOf(a)
    const indexB = technologyPriority.indexOf(b)
    
    if (indexA === -1 && indexB === -1) return 0
    if (indexA === -1) return 1
    if (indexB === -1) return -1
    
    return indexA - indexB
  })
  
  return sorted
})

const displayedTechnologies = computed(() => {
  return priorityTechnologies.value.slice(0, props.maxDisplay)
})

const remainingCount = computed(() => {
  return Math.max(0, priorityTechnologies.value.length - props.maxDisplay)
})
</script>

<style scoped>
.technologies-section {
  margin-top: auto;
}

.technologies {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 0.75rem;
}

.technology-badge {
  display: inline-block;
  padding: 0.25rem 0.75rem;
  font-size: 0.75rem;
  font-weight: 500;
  border-radius: 0.5rem;
  background-color: var(--mauve-alpha-10);
  color: var(--mauve);
  border: 1px solid var(--mauve-alpha-20);
  transition: all 0.2s ease;
}

.technology-badge:hover {
  background-color: var(--mauve-alpha-20);
  transform: translateY(-1px);
}

.more-badge {
  background-color: var(--surface1);
  color: var(--subtext0);
  border-color: var(--surface2);
}

.more-badge:hover {
  background-color: var(--surface2);
}

@keyframes pulse-subtle {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.8; }
}

.group-hover\:animate-pulse-subtle {
  animation: pulse-subtle 2s ease-in-out infinite;
}
</style>