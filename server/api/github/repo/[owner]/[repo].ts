export default defineEventHandler(async (event) => {
  const owner = getRouterParam(event, 'owner')
  const repo = getRouterParam(event, 'repo')
  
  if (!owner || !repo) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Owner et repo requis'
    })
  }

  try {
    // Cache les résultats pendant 1 heure
    const cacheKey = `github:repo:${owner}:${repo}`
    const cached = await useStorage('github').getItem(cacheKey)
    
    if (cached && Date.now() - (cached as any).timestamp < 3600000) {
      return { data: (cached as any).data }
    }

    // Headers pour l'API GitHub
    const headers: HeadersInit = {
      'Accept': 'application/vnd.github.v3+json',
      'User-Agent': 'Portfolio-App'
    }

    // Ajouter le token si disponible
    const githubToken = process.env.GITHUB_TOKEN
    if (githubToken) {
      headers['Authorization'] = `token ${githubToken}`
    }

    // Récupérer les données du repo
    const response = await fetch(`https://api.github.com/repos/${owner}/${repo}`, { headers })
    
    if (!response.ok) {
      throw createError({
        statusCode: response.status,
        statusMessage: 'Impossible de récupérer les données du repo'
      })
    }
    
    const data = await response.json()

    // Mettre en cache
    await useStorage('github').setItem(cacheKey, {
      data,
      timestamp: Date.now()
    })

    return { data }
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Erreur lors de la récupération des données du repo'
    })
  }
})