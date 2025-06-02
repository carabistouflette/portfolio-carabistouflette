<template>
  <div class="min-h-screen">
    <!-- Hero Section -->
    <section class="relative py-16 overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-br from-mauve/10 via-transparent to-pink/10"></div>
      <div class="container-custom relative z-10">
        <div class="text-center">
          <h1 class="text-4xl md:text-5xl font-bold gradient-text mb-4">
            <Icon name="mdi:github" class="inline-block mr-2 mb-2" />
            Statistiques GitHub
          </h1>
          <p class="text-lg text-subtext0 max-w-2xl mx-auto">
            Aperçu détaillé de mon activité et de mes contributions sur GitHub
          </p>
        </div>
      </div>
    </section>

    <!-- Loading State -->
    <div v-if="loading" class="container-custom py-8">
      <div class="flex items-center justify-center">
        <EnhancedLoader />
      </div>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="container-custom py-8">
      <div class="text-center">
        <Icon name="mdi:alert-circle" class="text-6xl text-red mb-4" />
        <h2 class="text-2xl font-bold text-text mb-2">Erreur de chargement</h2>
        <p class="text-subtext0 mb-4">Impossible de charger les statistiques GitHub</p>
        <Button @click="refresh" variant="solid" color="mauve">
          <Icon name="mdi:refresh" class="mr-2" />
          Réessayer
        </Button>
      </div>
    </div>

    <!-- Stats Content -->
    <div v-else-if="user && stats" class="container-custom py-8 space-y-12">
      <!-- User Profile Section -->
      <section class="github-profile-section">
        <Card glass class="p-8">
          <div class="flex flex-col md:flex-row items-center md:items-start gap-8">
            <div class="relative">
              <img
                :src="user.avatar_url" 
                :alt="user.name || user.login"
                width="128"
                height="128"
                class="w-32 h-32 rounded-full border-4 border-mauve shadow-xl object-cover"
                loading="lazy"
                crossorigin="anonymous"
                referrerpolicy="no-referrer"
              />
              <div class="absolute -bottom-2 -right-2 bg-green text-base rounded-full p-2">
                <Icon name="mdi:check-circle" class="text-xl" />
              </div>
            </div>
            <div class="flex-1 text-center md:text-left">
              <h2 class="text-3xl font-bold text-text mb-2">{{ user.name }}</h2>
              <p class="text-lg text-mauve mb-4">@{{ user.login }}</p>
              <p v-if="user.bio" class="text-subtext0 mb-6 max-w-2xl">{{ user.bio }}</p>
              <div class="flex flex-wrap justify-center md:justify-start gap-6">
                <div class="text-center">
                  <div class="text-2xl font-bold text-text">{{ user.public_repos }}</div>
                  <div class="text-sm text-subtext0">Repositories</div>
                </div>
                <div class="text-center">
                  <div class="text-2xl font-bold text-text">{{ user.followers }}</div>
                  <div class="text-sm text-subtext0">Followers</div>
                </div>
                <div class="text-center">
                  <div class="text-2xl font-bold text-text">{{ user.following }}</div>
                  <div class="text-sm text-subtext0">Following</div>
                </div>
                <div class="text-center">
                  <div class="text-2xl font-bold text-text">{{ memberSince }}</div>
                  <div class="text-sm text-subtext0">Membre depuis</div>
                </div>
              </div>
            </div>
            <div class="flex gap-4">
              <a 
                :href="`https://github.com/${user.login}`" 
                target="_blank" 
                rel="noopener noreferrer"
                class="btn-github"
              >
                <Icon name="mdi:open-in-new" />
                Voir sur GitHub
              </a>
            </div>
          </div>
        </Card>
      </section>

      <!-- Global Stats -->
      <section class="github-stats-overview">
        <h2 class="section-title">Vue d'ensemble</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard
            icon="mdi:star"
            :value="stats.totalStars"
            label="Stars totales"
            color="yellow"
            :trend="+12"
          />
          <StatsCard
            icon="mdi:source-fork"
            :value="stats.totalForks"
            label="Forks totaux"
            color="blue"
          />
          <StatsCard
            icon="mdi:source-commit"
            :value="totalCommits"
            label="Commits (30j)"
            color="green"
          />
          <StatsCard
            icon="mdi:source-pull"
            :value="totalPRs"
            label="Pull Requests"
            color="mauve"
          />
        </div>
      </section>

      <!-- Languages Chart -->
      <section class="github-languages">
        <h2 class="section-title">Langages de programmation</h2>
        <Card glass class="p-6">
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <!-- Pie Chart -->
            <div class="relative">
              <LanguagePieChart :languages="stats.languages" />
            </div>
            <!-- Language List -->
            <div class="space-y-4">
              <div 
                v-for="(lang, index) in topLanguages" 
                :key="lang.name"
                class="language-item-extended"
                :style="{ animationDelay: `${index * 50}ms` }"
              >
                <div class="flex items-center justify-between mb-2">
                  <div class="flex items-center gap-3">
                    <div 
                      class="w-4 h-4 rounded-full"
                      :style="{ background: getLanguageColor(lang.name) }"
                    ></div>
                    <span class="font-medium text-text">{{ lang.name }}</span>
                  </div>
                  <div class="text-sm text-subtext0">
                    {{ lang.count }} repos ({{ lang.percentage }}%)
                  </div>
                </div>
                <div class="w-full bg-surface1 rounded-full h-3 overflow-hidden">
                  <div 
                    class="h-full rounded-full transition-all duration-1000"
                    :style="{ 
                      width: `${lang.percentage}%`,
                      background: getLanguageColor(lang.name)
                    }"
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </section>

      <!-- Repository List with Filters -->
      <section class="github-repositories">
        <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <h2 class="section-title mb-0">Repositories ({{ filteredRepos.length }})</h2>
          <div class="flex flex-wrap gap-4">
            <!-- Search -->
            <div class="relative">
              <Icon name="mdi:magnify" class="absolute left-3 top-1/2 -translate-y-1/2 text-subtext0" />
              <input
                v-model="searchQuery"
                type="text"
                placeholder="Rechercher..."
                class="pl-10 pr-4 py-2 bg-surface0 text-text rounded-lg border border-overlay0 focus:border-mauve focus:outline-none transition-colors"
              />
            </div>
            <!-- Sort -->
            <select
              v-model="sortBy"
              class="px-4 py-2 bg-surface0 text-text rounded-lg border border-overlay0 focus:border-mauve focus:outline-none transition-colors"
            >
              <option value="updated">Récemment mis à jour</option>
              <option value="stars">Plus de stars</option>
              <option value="forks">Plus de forks</option>
              <option value="name">Nom (A-Z)</option>
            </select>
            <!-- Language Filter -->
            <select
              v-model="filterLanguage"
              class="px-4 py-2 bg-surface0 text-text rounded-lg border border-overlay0 focus:border-mauve focus:outline-none transition-colors"
            >
              <option value="">Tous les langages</option>
              <option v-for="lang in availableLanguages" :key="lang" :value="lang">
                {{ lang }}
              </option>
            </select>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <RepoCard
            v-for="repo in paginatedRepos"
            :key="repo.id"
            :repo="repo"
            @click="openRepo(repo.html_url)"
          />
        </div>

        <!-- Pagination -->
        <div v-if="totalPages > 1" class="flex justify-center gap-2 mt-8">
          <Button
            @click="currentPage--"
            :disabled="currentPage === 1"
            variant="ghost"
            size="sm"
          >
            <Icon name="mdi:chevron-left" />
          </Button>
          <Button
            v-for="page in visiblePages"
            :key="page"
            @click="currentPage = page"
            :variant="currentPage === page ? 'solid' : 'ghost'"
            size="sm"
          >
            {{ page }}
          </Button>
          <Button
            @click="currentPage++"
            :disabled="currentPage === totalPages"
            variant="ghost"
            size="sm"
          >
            <Icon name="mdi:chevron-right" />
          </Button>
        </div>
      </section>

      <!-- Recent Activity -->
      <section class="github-activity">
        <h2 class="section-title">Activité récente</h2>
        <Card glass class="p-6">
          <div class="space-y-4">
            <ActivityItem
              v-for="(activity, index) in stats.recentActivity"
              :key="index"
              :activity="activity"
            />
          </div>
        </Card>
      </section>

      <!-- Contribution Graph -->
      <section class="github-contributions">
        <h2 class="section-title">Graphique de contributions</h2>
        <Card glass class="p-6">
          <ContributionGraph :username="username" />
        </Card>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useGitHub, type GitHubRepo } from '~/composables/useGitHub'
import StatsCard from '~/components/github/StatsCard.vue'
import ActivityItem from '~/components/github/ActivityItem.vue'
import RepoCard from '~/components/github/RepoCard.vue'
import ContributionGraph from '~/components/github/ContributionGraph.vue'
import LanguagePieChart from '~/components/github/LanguagePieChart.vue'

// Props
const username = 'carabistouflette'

// Composables
const { user, repos, stats, loading, error, refresh } = useGitHub(username)

// Search and filters
const searchQuery = ref('')
const sortBy = ref('updated')
const filterLanguage = ref('')
const currentPage = ref(1)
const reposPerPage = 10

// Computed
const memberSince = computed(() => {
  if (!user.value) return ''
  return new Date(user.value.created_at).getFullYear().toString()
})

const totalCommits = computed(() => {
  // This would need a separate API call to get commit activity
  return '247'
})

const totalPRs = computed(() => {
  // This would need a separate API call
  return '31'
})

const topLanguages = computed(() => {
  if (!stats.value) return []
  
  return Object.entries(stats.value.languages)
    .sort(([, a], [, b]) => b - a)
    .map(([name, count]) => ({
      name,
      count,
      percentage: Math.round((count / stats.value!.totalRepos) * 100)
    }))
})

const availableLanguages = computed(() => {
  if (!stats.value) return []
  return Object.keys(stats.value.languages).sort()
})

const filteredRepos = computed(() => {
  if (!repos.value) return []
  
  let filtered = [...repos.value]
  
  // Search filter
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(repo => 
      repo.name.toLowerCase().includes(query) ||
      (repo.description && repo.description.toLowerCase().includes(query))
    )
  }
  
  // Language filter
  if (filterLanguage.value) {
    filtered = filtered.filter(repo => repo.language === filterLanguage.value)
  }
  
  // Sort
  switch (sortBy.value) {
    case 'stars':
      filtered.sort((a, b) => b.stargazers_count - a.stargazers_count)
      break
    case 'forks':
      filtered.sort((a, b) => b.forks_count - a.forks_count)
      break
    case 'name':
      filtered.sort((a, b) => a.name.localeCompare(b.name))
      break
    case 'updated':
    default:
      filtered.sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime())
  }
  
  return filtered
})

const totalPages = computed(() => {
  return Math.ceil(filteredRepos.value.length / reposPerPage)
})

const paginatedRepos = computed(() => {
  const start = (currentPage.value - 1) * reposPerPage
  const end = start + reposPerPage
  return filteredRepos.value.slice(start, end)
})

const visiblePages = computed(() => {
  const pages = []
  const maxVisible = 5
  let start = Math.max(1, currentPage.value - Math.floor(maxVisible / 2))
  let end = Math.min(totalPages.value, start + maxVisible - 1)
  
  if (end - start < maxVisible - 1) {
    start = Math.max(1, end - maxVisible + 1)
  }
  
  for (let i = start; i <= end; i++) {
    pages.push(i)
  }
  
  return pages
})

// Methods
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
    'Shell': '#89e051'
  }
  
  return colors[language] || '#cdd6f4'
}

const openRepo = (url: string) => {
  window.open(url, '_blank', 'noopener,noreferrer')
}

// SEO
useHead({
  title: 'Statistiques GitHub - Alexis Robin',
  meta: [
    { name: 'description', content: 'Découvrez mes statistiques GitHub, mes projets open source et mes contributions.' }
  ]
})
</script>

<style scoped>
.section-title {
  @apply text-2xl font-bold text-text mb-6;
}

.btn-github {
  @apply inline-flex items-center gap-2 px-4 py-2 bg-surface1 hover:bg-surface2 text-text rounded-lg transition-colors;
}

.language-item-extended {
  animation: fadeInLeft 0.5s ease-out both;
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
</style>