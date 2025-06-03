import type { Ref } from 'vue'
import type { GitHubUser, GitHubRepo, GitHubStats, GitHubActivity, GitHubEvent } from '~/types/github'

interface UseGitHubReturn {
  user: Ref<GitHubUser | null>
  repos: Ref<GitHubRepo[]>
  stats: Ref<GitHubStats | null>
  loading: Ref<boolean>
  error: Ref<Error | null>
  refresh: () => Promise<void>
}

const calculateStats = (repos: GitHubRepo[]): Omit<GitHubStats, 'recentActivity'> => {
  let totalStars = 0
  let totalForks = 0
  const languages: Record<string, number> = {}

  repos.forEach(repo => {
    totalStars += repo.stargazers_count || 0
    totalForks += repo.forks_count || 0
    
    if (repo.language) {
      languages[repo.language] = (languages[repo.language] || 0) + 1
    }
  })

  return {
    totalStars,
    totalForks,
    totalRepos: repos.length,
    languages
  }
}

const formatActivity = (events: GitHubEvent[]): GitHubActivity[] => {
  return events
    .filter(event => ['PushEvent', 'CreateEvent', 'PullRequestEvent', 'IssuesEvent'].includes(event.type))
    .slice(0, 5)
    .map(event => {
      let description = ''
      
      switch (event.type) {
        case 'PushEvent':
          const commits = event.payload.commits?.length || 0
          description = `Pushed ${commits} commit${commits > 1 ? 's' : ''}`
          break
        case 'CreateEvent':
          description = `Created ${event.payload.ref_type} ${event.payload.ref || ''}`
          break
        case 'PullRequestEvent':
          description = `${event.payload.action} pull request #${event.payload.pull_request?.number}`
          break
        case 'IssuesEvent':
          description = `${event.payload.action} issue #${event.payload.issue?.number}`
          break
      }

      return {
        type: event.type,
        repo: event.repo.name,
        date: event.created_at,
        description
      }
    })
}

export const useGitHubClient = (username: string = 'carabistouflette'): UseGitHubReturn => {
  const user = ref<GitHubUser | null>(null)
  const repos = ref<GitHubRepo[]>([])
  const stats = ref<GitHubStats | null>(null)
  const loading = ref(false)
  const error = ref<Error | null>(null)

  const fetchGitHubData = async () => {
    loading.value = true
    error.value = null

    try {
      // Headers pour l'API GitHub
      const headers: HeadersInit = {
        'Accept': 'application/vnd.github.v3+json',
      }

      // Récupérer les données utilisateur
      const userResponse = await fetch(`https://api.github.com/users/${username}`, { headers })
      if (!userResponse.ok) {
        throw new Error('Impossible de récupérer les données utilisateur')
      }
      const userData = await userResponse.json()
      user.value = userData

      // Récupérer les repos (max 100)
      const reposResponse = await fetch(`https://api.github.com/users/${username}/repos?per_page=100&sort=updated`, { headers })
      if (!reposResponse.ok) {
        throw new Error('Impossible de récupérer les repos')
      }
      const reposData = await reposResponse.json()
      repos.value = reposData

      // Calculer les statistiques
      const baseStats = calculateStats(reposData)

      // Récupérer l'activité récente
      let recentActivity: GitHubActivity[] = []
      try {
        const eventsResponse = await fetch(`https://api.github.com/users/${username}/events/public?per_page=10`, { headers })
        if (eventsResponse.ok) {
          const eventsData = await eventsResponse.json()
          recentActivity = formatActivity(eventsData)
        }
      } catch (e) {
        console.warn('Impossible de récupérer l\'activité récente:', e)
      }

      stats.value = {
        ...baseStats,
        recentActivity
      }
    } catch (e) {
      error.value = e as Error
      console.error('Erreur lors de la récupération des données GitHub:', e)
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
export const useGitHubRepoClient = (owner: string, repo: string) => {
  const repoData = ref<GitHubRepo | null>(null)
  const loading = ref(false)
  const error = ref<Error | null>(null)

  const fetchRepoData = async () => {
    loading.value = true
    error.value = null

    try {
      const headers: HeadersInit = {
        'Accept': 'application/vnd.github.v3+json',
      }

      const response = await fetch(`https://api.github.com/repos/${owner}/${repo}`, { headers })
      if (!response.ok) {
        throw new Error('Impossible de récupérer les données du repo')
      }
      repoData.value = await response.json()
    } catch (e) {
      error.value = e as Error
      console.error('Erreur lors de la récupération des données du repo:', e)
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

