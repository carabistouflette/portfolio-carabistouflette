<template>
  <Card 
    glass 
    hover 
    class="repo-card cursor-pointer h-full flex flex-col"
    @click="$emit('click')"
  >
    <template #header>
      <div class="flex items-start justify-between gap-4">
        <div class="flex-1 min-w-0">
          <h3 class="text-lg font-semibold text-text truncate flex items-center gap-2">
            <Icon name="mdi:book-open-variant" class="text-mauve flex-shrink-0" />
            {{ repo.name }}
          </h3>
        </div>
        <div v-if="repo.private" class="flex-shrink-0">
          <span class="text-xs bg-surface2 text-subtext0 px-2 py-1 rounded">
            Private
          </span>
        </div>
      </div>
    </template>

    <div class="flex-1 space-y-4">
      <p v-if="repo.description" class="text-sm text-subtext0 line-clamp-2">
        {{ repo.description }}
      </p>
      <p v-else class="text-sm text-subtext1 italic">
        Aucune description
      </p>

      <div class="flex flex-wrap items-center gap-4 text-sm">
        <div v-if="repo.language" class="flex items-center gap-1">
          <div 
            class="w-3 h-3 rounded-full"
            :style="{ backgroundColor: getLanguageColor(repo.language) }"
          ></div>
          <span class="text-subtext0">{{ repo.language }}</span>
        </div>

        <a 
          v-if="repo.stargazers_count > 0"
          :href="`${repo.html_url}/stargazers`"
          target="_blank"
          rel="noopener noreferrer"
          class="flex items-center gap-1 text-yellow hover:text-yellow/80 transition-colors"
          @click.stop
        >
          <Icon name="mdi:star" />
          <span>{{ repo.stargazers_count }}</span>
        </a>

        <a 
          v-if="repo.forks_count > 0"
          :href="`${repo.html_url}/network/members`"
          target="_blank"
          rel="noopener noreferrer"
          class="flex items-center gap-1 text-blue hover:text-blue/80 transition-colors"
          @click.stop
        >
          <Icon name="mdi:source-fork" />
          <span>{{ repo.forks_count }}</span>
        </a>

        <div v-if="repo.open_issues_count > 0" class="flex items-center gap-1 text-green">
          <Icon name="mdi:alert-circle-outline" />
          <span>{{ repo.open_issues_count }}</span>
        </div>
      </div>

      <div v-if="repo.topics && repo.topics.length > 0" class="flex flex-wrap gap-2">
        <span 
          v-for="topic in repo.topics.slice(0, 5)" 
          :key="topic"
          class="text-xs bg-surface1 text-subtext0 px-2 py-1 rounded-md"
        >
          {{ topic }}
        </span>
        <span 
          v-if="repo.topics.length > 5"
          class="text-xs text-subtext1"
        >
          +{{ repo.topics.length - 5 }}
        </span>
      </div>
    </div>

    <template #footer>
      <div class="flex items-center justify-between text-xs text-subtext1">
        <span>Mis à jour {{ formatDate(repo.updated_at) }}</span>
        <div class="flex items-center gap-3">
          <a
            v-if="repo.homepage"
            :href="repo.homepage"
            target="_blank"
            rel="noopener noreferrer"
            class="text-mauve hover:text-mauve/80 transition-colors"
            @click.stop
          >
            <Icon name="mdi:web" class="text-lg" />
          </a>
          <a
            :href="repo.html_url"
            target="_blank"
            rel="noopener noreferrer"
            class="text-mauve hover:text-mauve/80 transition-colors"
            @click.stop
          >
            <Icon name="mdi:github" class="text-lg" />
          </a>
        </div>
      </div>
    </template>
  </Card>
</template>

<script setup lang="ts">
import type { GitHubRepo } from '~/composables/useGitHub'

interface Props {
  repo: GitHubRepo
}

defineProps<Props>()
defineEmits(['click'])

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

const formatDate = (dateString: string): string => {
  const date = new Date(dateString)
  const now = new Date()
  const diff = now.getTime() - date.getTime()
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  
  if (days === 0) return "aujourd'hui"
  if (days === 1) return "hier"
  if (days < 7) return `il y a ${days} jours`
  if (days < 30) return `il y a ${Math.floor(days / 7)} semaines`
  if (days < 365) return `il y a ${Math.floor(days / 30)} mois`
  return `il y a ${Math.floor(days / 365)} ans`
}
</script>

<style scoped>
.repo-card {
  @apply transition-all duration-300;
}

.repo-card:hover {
  @apply transform -translate-y-1;
  box-shadow: 0 10px 30px -10px rgba(0, 0, 0, 0.3);
}
</style>