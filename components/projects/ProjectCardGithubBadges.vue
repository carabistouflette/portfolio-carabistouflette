<template>
  <div v-if="githubRepo && githubStats" class="github-badges">
    <a 
      v-if="githubStats.stars !== undefined"
      :href="`https://github.com/${githubRepo}`"
      target="_blank"
      rel="noopener noreferrer"
      class="github-badge stars-badge focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow focus-visible:ring-offset-2 focus-visible:ring-offset-base"
      :aria-label="`${githubStats.stars} étoiles sur GitHub pour ${projectTitle}`"
      @click.stop
    >
      <Icon name="mdi:star" class="badge-icon" />
      <span>{{ formatNumber(githubStats.stars) }}</span>
    </a>
    <a 
      v-if="githubStats.forks !== undefined"
      :href="`https://github.com/${githubRepo}/fork`"
      target="_blank"
      rel="noopener noreferrer"
      class="github-badge forks-badge focus:outline-none focus-visible:ring-2 focus-visible:ring-blue focus-visible:ring-offset-2 focus-visible:ring-offset-base"
      :aria-label="`${githubStats.forks} forks sur GitHub pour ${projectTitle}`"
      @click.stop
    >
      <Icon name="mdi:source-fork" class="badge-icon" />
      <span>{{ formatNumber(githubStats.forks) }}</span>
    </a>
    <a 
      v-if="githubStats.language"
      :href="`https://github.com/${githubRepo}`"
      target="_blank"
      rel="noopener noreferrer"
      class="github-badge language-badge focus:outline-none focus-visible:ring-2 focus-visible:ring-green focus-visible:ring-offset-2 focus-visible:ring-offset-base"
      :aria-label="`Langage principal: ${githubStats.language}`"
      @click.stop
    >
      <div 
        class="language-dot" 
        :style="{ backgroundColor: languageColor }"
      ></div>
      <span>{{ githubStats.language }}</span>
    </a>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface GithubStats {
  stars?: number
  forks?: number
  language?: string
}

interface Props {
  githubRepo?: string
  githubStats?: GithubStats | null
  projectTitle: string
}

const props = defineProps<Props>()

const formatNumber = (num: number): string => {
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'k'
  }
  return num.toString()
}

// Language colors mapping
const languageColors: Record<string, string> = {
  'TypeScript': '#3178c6',
  'JavaScript': '#f1e05a',
  'Vue': '#4fc08d',
  'Python': '#3572A5',
  'Go': '#00ADD8',
  'Rust': '#dea584',
  'Java': '#b07219',
  'C++': '#f34b7d',
  'C': '#555555',
  'CSS': '#563d7c',
  'HTML': '#e34c26',
  'default': '#666666'
}

const languageColor = computed(() => {
  if (!props.githubStats?.language) return languageColors.default
  return languageColors[props.githubStats.language] || languageColors.default
})
</script>

<style scoped>
.github-badges {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 0.5rem;
}

.github-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.25rem 0.5rem;
  font-size: 0.75rem;
  border-radius: 0.375rem;
  transition: all 0.2s ease;
  border: 1px solid var(--surface1);
  background-color: var(--surface0);
}

.github-badge:hover {
  transform: translateY(-1px);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.stars-badge:hover {
  background-color: var(--yellow-alpha-10);
  border-color: var(--yellow);
  color: var(--yellow);
}

.forks-badge:hover {
  background-color: var(--blue-alpha-10);
  border-color: var(--blue);
  color: var(--blue);
}

.language-badge:hover {
  background-color: var(--green-alpha-10);
  border-color: var(--green);
  color: var(--green);
}

.badge-icon {
  width: 1rem;
  height: 1rem;
}

.language-dot {
  width: 0.75rem;
  height: 0.75rem;
  border-radius: 50%;
}
</style>