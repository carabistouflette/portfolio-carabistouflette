export default defineEventHandler(async (event) => {
  const username = getRouterParam(event, 'username')
  
  if (!username) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Username requis'
    })
  }

  try {
    // Cache les résultats pendant 1 heure
    const cacheKey = `github:${username}`
    const cached = await useStorage('github').getItem(cacheKey)
    
    if (cached && Date.now() - (cached as any).timestamp < 3600000) {
      return { data: (cached as any).data }
    }

    // Headers pour l'API GitHub
    const headers: HeadersInit = {
      'Accept': 'application/vnd.github.v3+json',
      'User-Agent': 'Portfolio-App'
    }

    // Ajouter le token si disponible (augmente la limite de taux)
    const githubToken = process.env.GITHUB_TOKEN
    if (githubToken) {
      headers['Authorization'] = `token ${githubToken}`
    }

    // Récupérer les données utilisateur
    const userResponse = await fetch(`https://api.github.com/users/${username}`, { headers })
    if (!userResponse.ok) {
      throw createError({
        statusCode: userResponse.status,
        statusMessage: 'Impossible de récupérer les données utilisateur'
      })
    }
    const userData = await userResponse.json()

    // Récupérer les repos (max 100)
    const reposResponse = await fetch(`https://api.github.com/users/${username}/repos?per_page=100&sort=updated`, { headers })
    if (!reposResponse.ok) {
      throw createError({
        statusCode: reposResponse.status,
        statusMessage: 'Impossible de récupérer les repos'
      })
    }
    const reposData = await reposResponse.json()

    // Calculer les statistiques
    const stats = calculateStats(reposData)

    // Récupérer l'activité récente
    const eventsResponse = await fetch(`https://api.github.com/users/${username}/events/public?per_page=10`, { headers })
    let recentActivity: any[] = []
    if (eventsResponse.ok) {
      const eventsData = await eventsResponse.json()
      recentActivity = formatActivity(eventsData)
    }

    const result = {
      user: userData,
      repos: reposData,
      stats: {
        ...stats,
        recentActivity
      }
    }

    // Mettre en cache
    await useStorage('github').setItem(cacheKey, {
      data: result,
      timestamp: Date.now()
    })

    return { data: result }
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Erreur lors de la récupération des données GitHub'
    })
  }
})

function calculateStats(repos: any[]) {
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

function formatActivity(events: any[]): any[] {
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