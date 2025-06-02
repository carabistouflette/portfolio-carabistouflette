// Plugin pour accéder aux variables d'environnement Cloudflare
import { defineNitroPlugin } from 'nitropack/runtime/plugin'

export default defineNitroPlugin((nitroApp) => {
  // Ce plugin sera automatiquement chargé par Nitro lors du démarrage
  // Il peut être utilisé pour ajouter des fonctionnalités spécifiques à Cloudflare
  
  console.log('Initialisation du plugin Cloudflare')
  
  // Exemple de middleware global pour ajouter des en-têtes de sécurité
  nitroApp.hooks.hook('request', (event) => {
    // Définir les en-têtes de sécurité
    event.node.res.setHeader('X-Content-Type-Options', 'nosniff')
    event.node.res.setHeader('X-Frame-Options', 'DENY')
    event.node.res.setHeader('X-XSS-Protection', '1; mode=block')
    event.node.res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin')
    event.node.res.setHeader('Permissions-Policy', 'geolocation=(), camera=(), microphone=()')
    
    // Ajouter une politique de sécurité du contenu (CSP)
    const cspDirectives = [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdnjs.cloudflare.com https://www.openstreetmap.org",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://www.openstreetmap.org",
      "img-src 'self' data: blob: https://*.tile.openstreetmap.org https://tile.openstreetmap.org https://*.basemaps.cartocdn.com https://tiles.stadiamaps.com https://unpkg.com https://www.openstreetmap.org https://avatars.githubusercontent.com https://*.githubusercontent.com",
      "font-src 'self' https://fonts.gstatic.com",
      "connect-src 'self' https://*.tile.openstreetmap.org https://tile.openstreetmap.org https://*.basemaps.cartocdn.com https://tiles.stadiamaps.com https://www.openstreetmap.org https://api.github.com",
      "media-src 'self'",
      "object-src 'none'",
      "frame-src 'self' https://www.openstreetmap.org",
      "child-src https://www.openstreetmap.org",
      "frame-ancestors 'none'"
    ]
    
    // Commenté temporairement pour éviter les conflits avec la CSP définie dans nuxt.config.ts
    // En production, cette CSP sera utilisée à la place de celle dans nuxt.config.ts
    // event.node.res.setHeader('Content-Security-Policy', cspDirectives.join('; '))
  })
})