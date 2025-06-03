import type { H3Event } from 'h3'

interface RateLimitStore {
  [key: string]: {
    count: number
    resetTime: number
  }
}

// En mémoire pour Cloudflare Workers (utiliser KV pour la production)
const store: RateLimitStore = {}

export interface RateLimitOptions {
  windowMs?: number // Fenêtre de temps en millisecondes
  max?: number // Nombre maximum de requêtes
  message?: string // Message d'erreur personnalisé
  keyGenerator?: (event: H3Event) => string // Fonction pour générer la clé
}

export function createRateLimiter(options: RateLimitOptions = {}) {
  const {
    windowMs = 15 * 60 * 1000, // 15 minutes par défaut
    max = 5, // 5 requêtes par défaut
    message = 'Trop de requêtes, veuillez réessayer plus tard.',
    keyGenerator = (event) => getClientIP(event) || 'anonymous'
  } = options

  return async (event: H3Event): Promise<boolean> => {
    const key = keyGenerator(event)
    const now = Date.now()
    
    // Nettoyer les entrées expirées
    cleanupExpiredEntries(now)
    
    // Récupérer ou créer l'entrée
    const entry = store[key] || { count: 0, resetTime: now + windowMs }
    
    // Vérifier si la fenêtre est expirée
    if (now >= entry.resetTime) {
      entry.count = 0
      entry.resetTime = now + windowMs
    }
    
    // Incrémenter le compteur
    entry.count++
    store[key] = entry
    
    // Ajouter les headers de rate limit
    setHeader(event, 'X-RateLimit-Limit', max.toString())
    setHeader(event, 'X-RateLimit-Remaining', Math.max(0, max - entry.count).toString())
    setHeader(event, 'X-RateLimit-Reset', new Date(entry.resetTime).toISOString())
    
    // Vérifier la limite
    if (entry.count > max) {
      setHeader(event, 'Retry-After', Math.ceil((entry.resetTime - now) / 1000).toString())
      throw createError({
        statusCode: 429,
        statusMessage: message
      })
    }
    
    return true
  }
}

function cleanupExpiredEntries(now: number) {
  for (const key in store) {
    if (store[key].resetTime <= now) {
      delete store[key]
    }
  }
}

// Helper pour obtenir l'IP du client (compatible Cloudflare)
function getClientIP(event: H3Event): string | null {
  // Headers Cloudflare
  const cfConnectingIP = getHeader(event, 'cf-connecting-ip')
  if (cfConnectingIP) return cfConnectingIP
  
  // Headers standards
  const xForwardedFor = getHeader(event, 'x-forwarded-for')
  if (xForwardedFor) {
    return xForwardedFor.split(',')[0].trim()
  }
  
  const xRealIP = getHeader(event, 'x-real-ip')
  if (xRealIP) return xRealIP
  
  // Fallback vers l'IP de la connexion
  return event.node?.req?.socket?.remoteAddress || null
}