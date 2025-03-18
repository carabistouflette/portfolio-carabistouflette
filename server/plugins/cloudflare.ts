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
      "script-src 'self' 'unsafe-inline' https://cdnjs.cloudflare.com",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "img-src 'self' data: blob:",
      "font-src 'self' https://fonts.gstatic.com",
      "connect-src 'self'",
      "media-src 'self'",
      "object-src 'none'",
      "frame-src 'self'",
      "frame-ancestors 'none'"
    ]
    
    event.node.res.setHeader('Content-Security-Policy', cspDirectives.join('; '))
  })
})