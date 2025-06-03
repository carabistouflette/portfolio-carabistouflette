import type { Ref } from 'vue'
import { watch } from 'vue'

export interface GitHubUser {
  login: string
  name: string
  bio: string
  avatar_url: string
  public_repos: number
  followers: number
  following: number
  created_at: string
}

export interface GitHubRepo {
  id: number
  name: string
  full_name: string
  description: string
  html_url: string
  homepage: string
  language: string
  stargazers_count: number
  forks_count: number
  watchers_count: number
  open_issues_count: number
  topics: string[]
  created_at: string
  updated_at: string
  pushed_at: string
}

export interface GitHubStats {
  totalStars: number
  totalForks: number
  totalRepos: number
  languages: Record<string, number>
  recentActivity: GitHubActivity[]
}

export interface GitHubActivity {
  type: string
  repo: string
  date: string
  description: string
}

interface UseGitHubReturn {
  user: Ref<GitHubUser | null>
  repos: Ref<GitHubRepo[]>
  stats: Ref<GitHubStats | null>
  loading: Ref<boolean>
  error: Ref<Error | null>
  refresh: () => Promise<void>
}

export const useGitHub = (username: string = 'carabistouflette'): UseGitHubReturn => {
  const user = ref<GitHubUser | null>(null)
  const repos = ref<GitHubRepo[]>([])
  const stats = ref<GitHubStats | null>(null)
  const loading = ref(false)
  const error = ref<Error | null>(null)

  const fetchGitHubData = async () => {
    loading.value = true
    error.value = null

    try {
      // Utiliser notre endpoint serveur pour éviter les problèmes CORS et cacher les tokens
      const { data } = await $fetch(`/api/github/${username}`)
      
      if (data) {
        user.value = data.user
        repos.value = data.repos
        stats.value = data.stats
      }
    } catch (e) {
      // Si l'API serveur échoue (ex: en mode statique), utiliser l'API GitHub directement
      console.warn('API serveur indisponible, utilisation de l\'API GitHub directe')
      
      try {
        // Import dynamique pour éviter les problèmes de build
        const { useGitHubClient } = await import('./useGitHubClient')
        const clientData = useGitHubClient(username)
        
        // Attendre que les données soient chargées
        await new Promise(resolve => {
          const unwatch = watch(() => clientData.loading.value, (newVal) => {
            if (!newVal && (clientData.user.value || clientData.error.value)) {
              user.value = clientData.user.value
              repos.value = clientData.repos.value
              stats.value = clientData.stats.value
              error.value = clientData.error.value
              unwatch()
              resolve(undefined)
            }
          }, { immediate: true })
        })
      } catch (clientError) {
        error.value = clientError as Error
      }
    } finally {
      loading.value = false
    }
  }

  const refresh = async () => {
    await fetchGitHubData()
  }

  // Charger les données au montage
  onMounted(() => {
    fetchGitHubData()
  })

  return {
    user,
    repos,
    stats,
    loading,
    error,
    refresh
  }
}

// Composable pour récupérer les stats d'un repo spécifique
export const useGitHubRepo = (owner: string, repo: string) => {
  const repoData = ref<GitHubRepo | null>(null)
  const loading = ref(false)
  const error = ref<Error | null>(null)

  const fetchRepoData = async () => {
    loading.value = true
    error.value = null

    try {
      const { data } = await $fetch(`/api/github/repo/${owner}/${repo}`)
      repoData.value = data
    } catch (e) {
      // Si l'API serveur échoue, utiliser l'API GitHub directement
      console.warn('API serveur indisponible pour le repo, utilisation de l\'API GitHub directe')
      
      try {
        const { useGitHubRepoClient } = await import('./useGitHubClient')
        const clientData = useGitHubRepoClient(owner, repo)
        
        // Attendre que les données soient chargées
        await new Promise(resolve => {
          const unwatch = watch(() => clientData.loading.value, (newVal) => {
            if (!newVal && (clientData.repo.value || clientData.error.value)) {
              repoData.value = clientData.repo.value
              error.value = clientData.error.value
              unwatch()
              resolve(undefined)
            }
          }, { immediate: true })
        })
      } catch (clientError) {
        error.value = clientError as Error
      }
    } finally {
      loading.value = false
    }
  }

  onMounted(() => {
    fetchRepoData()
  })

  return {
    repo: repoData,
    loading,
    error,
    refresh: fetchRepoData
  }
}

// Helper pour formater les nombres
export const formatNumber = (num: number): string => {
  if (num >= 1000) {
    return `${(num / 1000).toFixed(1)}k`
  }
  return num.toString()
}