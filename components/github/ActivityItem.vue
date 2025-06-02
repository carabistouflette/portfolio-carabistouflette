<template>
  <div class="activity-item-extended">
    <div class="flex gap-4">
      <div class="activity-timeline">
        <div class="activity-dot" :style="{ backgroundColor: `var(--${getActivityColor(activity.type)})` }"></div>
        <div class="activity-line"></div>
      </div>
      <div class="flex-1 pb-6">
        <div class="flex items-start justify-between mb-2">
          <div class="flex items-center gap-2">
            <Icon :name="getActivityIcon(activity.type)" class="text-lg" :style="{ color: `var(--${getActivityColor(activity.type)})` }" />
            <span class="font-medium text-text">{{ activity.description }}</span>
          </div>
          <span class="text-xs text-subtext1">{{ formatDate(activity.date) }}</span>
        </div>
        <div class="flex items-center gap-2 text-sm text-subtext0">
          <Icon name="mdi:source-repository" class="text-xs" />
          <a 
            :href="`https://github.com/${activity.repo}`"
            target="_blank"
            rel="noopener noreferrer"
            class="hover:text-mauve transition-colors"
          >
            {{ activity.repo }}
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { GitHubActivity } from '~/composables/useGitHub'

interface Props {
  activity: GitHubActivity
}

defineProps<Props>()

const getActivityIcon = (type: string): string => {
  const icons: Record<string, string> = {
    'PushEvent': 'mdi:source-commit',
    'CreateEvent': 'mdi:plus-circle',
    'PullRequestEvent': 'mdi:source-pull',
    'IssuesEvent': 'mdi:alert-circle-outline',
    'WatchEvent': 'mdi:eye',
    'ForkEvent': 'mdi:source-fork',
    'ReleaseEvent': 'mdi:tag',
    'DeleteEvent': 'mdi:delete'
  }
  
  return icons[type] || 'mdi:circle'
}

const getActivityColor = (type: string): string => {
  const colors: Record<string, string> = {
    'PushEvent': 'green',
    'CreateEvent': 'blue',
    'PullRequestEvent': 'mauve',
    'IssuesEvent': 'yellow',
    'WatchEvent': 'pink',
    'ForkEvent': 'teal',
    'ReleaseEvent': 'peach',
    'DeleteEvent': 'red'
  }
  
  return colors[type] || 'overlay0'
}

const formatDate = (dateString: string): string => {
  const date = new Date(dateString)
  const now = new Date()
  const diff = now.getTime() - date.getTime()
  const minutes = Math.floor(diff / (1000 * 60))
  const hours = Math.floor(diff / (1000 * 60 * 60))
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  
  if (minutes < 60) return `il y a ${minutes} minute${minutes > 1 ? 's' : ''}`
  if (hours < 24) return `il y a ${hours} heure${hours > 1 ? 's' : ''}`
  if (days === 1) return 'hier'
  if (days < 7) return `il y a ${days} jours`
  return date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })
}
</script>

<style scoped>
.activity-item-extended {
  @apply relative;
}

.activity-timeline {
  @apply relative flex flex-col items-center;
}

.activity-dot {
  @apply w-3 h-3 rounded-full z-10;
  box-shadow: 0 0 0 4px var(--base);
}

.activity-line {
  @apply absolute top-3 w-0.5 h-full bg-overlay0 opacity-30;
}

.activity-item-extended:last-child .activity-line {
  @apply hidden;
}
</style>