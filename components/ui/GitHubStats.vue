<template>
  <div class="github-stats-container">
    <!-- Loading State -->
    <div v-if="loading" class="flex items-center justify-center py-8">
      <div class="flex flex-col items-center gap-4">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-mauve"></div>
        <p class="text-subtext0 text-sm">Chargement des statistiques GitHub...</p>
      </div>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="flex items-center justify-center py-8">
      <div class="text-center">
        <Icon name="mdi:alert-circle" class="text-4xl text-red mb-2" />
        <p class="text-subtext0">Impossible de charger les statistiques</p>
      </div>
    </div>

    <!-- Stats Display -->
    <div v-else-if="stats" class="github-stats">
      <!-- Statistiques principales -->
      <div class="stats-grid">
        <div 
          v-for="(stat, index) in mainStats" 
          :key="stat.label"
          class="stat-card"
          :style="{ animationDelay: `${index * 100}ms` }"
        >
          <Icon :name="stat.icon" class="stat-icon" />
          <div class="stat-value">{{ stat.value }}</div>
          <div class="stat-label">{{ stat.label }}</div>
          <div class="stat-glow" :style="{ background: stat.color }"></div>
        </div>
      </div>

      <!-- Langages les plus utilisés -->
      <div v-if="topLanguages.length > 0" class="languages-section">
        <h3 class="section-title">
          <Icon name="mdi:language" class="inline-block mr-2" />
          Langages principaux
        </h3>
        <div class="languages-grid">
          <div 
            v-for="(lang, index) in topLanguages" 
            :key="lang.name"
            class="language-item"
            :style="{ animationDelay: `${index * 50}ms` }"
          >
            <div class="language-header">
              <span class="language-name">{{ lang.name }}</span>
              <span class="language-count">{{ lang.count }} projets</span>
            </div>
            <div class="language-bar">
              <div 
                class="language-fill"
                :style="{ 
                  width: `${lang.percentage}%`,
                  background: getLanguageColor(lang.name)
                }"
              ></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Activité récente -->
      <div v-if="stats.recentActivity?.length > 0" class="activity-section">
        <h3 class="section-title">
          <Icon name="mdi:timeline-clock" class="inline-block mr-2" />
          Activité récente
        </h3>
        <div class="activity-list">
          <div 
            v-for="(activity, index) in stats.recentActivity"
            :key="index"
            class="activity-item"
            :style="{ animationDelay: `${index * 50}ms` }"
          >
            <div class="activity-icon">
              <Icon :name="getActivityIcon(activity.type)" />
            </div>
            <div class="activity-content">
              <p class="activity-description">{{ activity.description }}</p>
              <p class="activity-meta">
                <span class="activity-repo">{{ activity.repo }}</span>
                <span class="activity-date">{{ formatDate(activity.date) }}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useGitHub } from '~/composables/useGitHub'
import { formatNumber } from '~/utils/github'

interface Props {
  username?: string
  compact?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  username: 'carabistouflette',
  compact: false
})

const { user, stats, loading, error } = useGitHub(props.username)

const mainStats = computed(() => {
  if (!stats.value || !user.value) return []
  
  return [
    {
      icon: 'mdi:source-repository-multiple',
      value: stats.value.totalRepos,
      label: 'Repos',
      color: 'linear-gradient(135deg, #f5c2e7, #cba6f7)'
    },
    {
      icon: 'mdi:star',
      value: formatNumber(stats.value.totalStars),
      label: 'Stars',
      color: 'linear-gradient(135deg, #f9e2af, #f5e0dc)'
    },
    {
      icon: 'mdi:source-fork',
      value: formatNumber(stats.value.totalForks),
      label: 'Forks',
      color: 'linear-gradient(135deg, #94e2d5, #89dceb)'
    },
    {
      icon: 'mdi:account-group',
      value: formatNumber(user.value.followers),
      label: 'Followers',
      color: 'linear-gradient(135deg, #fab387, #f38ba8)'
    }
  ]
})

const topLanguages = computed(() => {
  if (!stats.value) return []
  
  const languages = Object.entries(stats.value.languages)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5)
    .map(([name, count]) => ({
      name,
      count,
      percentage: Math.round((count / stats.value!.totalRepos) * 100)
    }))
  
  return languages
})

const getLanguageColor = (language: string): string => {
  const colors: Record<string, string> = {
    'TypeScript': 'linear-gradient(135deg, #3178c6, #235a97)',
    'JavaScript': 'linear-gradient(135deg, #f7df1e, #d4c01a)',
    'Python': 'linear-gradient(135deg, #3776ab, #ffd43b)',
    'Vue': 'linear-gradient(135deg, #4fc08d, #35835b)',
    'HTML': 'linear-gradient(135deg, #e34c26, #c23616)',
    'CSS': 'linear-gradient(135deg, #1572b6, #115e91)',
    'C': 'linear-gradient(135deg, #a8b9cc, #7f8c9e)',
    'C++': 'linear-gradient(135deg, #00599c, #004177)',
    'Java': 'linear-gradient(135deg, #007396, #005671)',
    'Shell': 'linear-gradient(135deg, #89e051, #6cb63f)'
  }
  
  return colors[language] || 'linear-gradient(135deg, #cdd6f4, #a6adc8)'
}

const getActivityIcon = (type: string): string => {
  const icons: Record<string, string> = {
    'PushEvent': 'mdi:source-commit',
    'CreateEvent': 'mdi:plus-circle',
    'PullRequestEvent': 'mdi:source-pull',
    'IssuesEvent': 'mdi:alert-circle-outline'
  }
  
  return icons[type] || 'mdi:circle'
}

const formatDate = (dateString: string): string => {
  const date = new Date(dateString)
  const now = new Date()
  const diff = now.getTime() - date.getTime()
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  
  if (days === 0) return "Aujourd'hui"
  if (days === 1) return "Hier"
  if (days < 7) return `Il y a ${days} jours`
  if (days < 30) return `Il y a ${Math.floor(days / 7)} semaines`
  return `Il y a ${Math.floor(days / 30)} mois`
}
</script>

<style scoped>
.github-stats-container {
  @apply w-full;
}

.stats-grid {
  @apply grid grid-cols-2 md:grid-cols-4 gap-4 mb-8;
}

.stat-card {
  @apply relative p-6 rounded-xl backdrop-blur-sm border;
  @apply transform transition-all duration-300 hover:scale-105 hover:-translate-y-1;
  @apply overflow-hidden;
  background-color: rgba(69, 71, 90, 0.5); /* surface0 with opacity */
  border-color: rgba(108, 112, 134, 0.2); /* overlay0 with opacity */
  animation: fadeInUp 0.6s ease-out both;
}

.stat-card:hover .stat-glow {
  @apply opacity-30;
}

.stat-icon {
  @apply text-3xl mb-2 text-mauve;
}

.stat-value {
  @apply text-2xl font-bold text-text mb-1;
}

.stat-label {
  @apply text-sm text-subtext0;
}

.stat-glow {
  @apply absolute inset-0 opacity-0 transition-opacity duration-300;
  filter: blur(40px);
  z-index: -1;
}

.languages-section,
.activity-section {
  @apply mb-8;
}

.section-title {
  @apply text-lg font-semibold text-text mb-4 flex items-center;
}

.languages-grid {
  @apply space-y-3;
}

.language-item {
  animation: fadeInLeft 0.5s ease-out both;
}

.language-header {
  @apply flex justify-between items-center mb-2;
}

.language-name {
  @apply text-text font-medium;
}

.language-count {
  @apply text-sm text-subtext0;
}

.language-bar {
  @apply w-full h-2 rounded-full overflow-hidden;
  background-color: var(--surface1);
}

.language-fill {
  @apply h-full transition-all duration-700 ease-out;
  animation: expandWidth 1s ease-out both;
}

.activity-list {
  @apply space-y-3;
}

.activity-item {
  @apply flex gap-3 p-3 rounded-lg transition-colors;
  background-color: rgba(69, 71, 90, 0.3); /* surface0 with opacity */
  animation: fadeInLeft 0.5s ease-out both;
}

.activity-item:hover {
  background-color: rgba(69, 71, 90, 0.5); /* surface0 with opacity */
}

.activity-icon {
  @apply text-mauve text-xl flex-shrink-0 mt-1;
}

.activity-content {
  @apply flex-1;
}

.activity-description {
  @apply text-text text-sm;
}

.activity-meta {
  @apply flex gap-2 mt-1 text-xs text-subtext0;
}

.activity-repo {
  @apply font-medium;
}

.activity-date {
  @apply opacity-70;
}

/* Animations */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeInLeft {
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes expandWidth {
  from {
    width: 0;
  }
}

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
  .stat-card,
  .language-item,
  .activity-item {
    animation: none;
  }
  
  .stat-card:hover {
    transform: none;
  }
}
</style>