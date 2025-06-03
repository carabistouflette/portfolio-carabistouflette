import type { Ref } from 'vue'
import { watch } from 'vue'
import type { GitHubUser, GitHubRepo, GitHubStats, GitHubActivity } from '~/types/github'

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
        const clientData = useGitHubClient(username, false) // false pour éviter l'auto-fetch
        
        // Appeler fetch manuellement
        await clientData.fetch!()
        
        // Copier les données
        user.value = clientData.user.value
        repos.value = clientData.repos.value
        stats.value = clientData.stats.value
        error.value = clientData.error.value
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
        const clientData = useGitHubRepoClient(owner, repo, false)
        
        // Appeler fetch manuellement
        await clientData.fetch!()
        
        // Copier les données
        repoData.value = clientData.repo.value
        error.value = clientData.error.value
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

