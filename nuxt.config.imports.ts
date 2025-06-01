// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devtools: { enabled: true },
  
    modules: [
      '@nuxtjs/tailwindcss',
      '@vueuse/nuxt',
      '@nuxt/image',
      'nuxt-icon'
    ],
  
    app: {
      pageTransition: { name: 'page', mode: 'out-in' },
      layoutTransition: { name: 'layout', mode: 'out-in' },
      head: {
        title: 'Alexis Robin - Portfolio',
        meta: [
          { name: 'description', content: 'Portfolio d\'Alexis Robin - Développeur Full Stack et passionné de programmation' }
        ],
        link: [
          { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
        ]
      }
    },
  
    css: [
      '~/assets/css/main.css'
    ],
  
    tailwindcss: {
      configPath: '~/tailwind.config.ts',
      exposeConfig: true,
      viewer: true
    },
  
    // Configuration optimisée des composants
    components: {
      global: false, // Désactive l'enregistrement global automatique
      dirs: [
        // Composants UI utilisés globalement
        { path: '~/components/ui', global: true },
        { path: '~/components/layout', global: true },
        // Autres composants chargés localement
        '~/components/home',
        '~/components/projects',
        '~/components/contact'
      ]
    },
  
    // Auto-importation des composables et utilitaires
    imports: {
      dirs: ['composables', 'utils'],
      imports: [
        { from: 'vue', name: 'computed' },
        { from: 'vue', name: 'ref' },
        { from: 'vue', name: 'reactive' },
        { from: 'vue', name: 'onMounted' },
        { from: 'vue', name: 'onBeforeUnmount' },
        { from: 'vue', name: 'watch' }
      ]
    },
  
    // Optimisation de la génération
    nitro: {
      prerender: {
        routes: ['/', '/projects', '/contact']
      }
    },
  
    // Configuration de TypeScript
    typescript: {
      shim: false,
      strict: true
    },
    
    // Désactiver certaines fonctionnalités expérimentales
    experimental: {
      payloadExtraction: false,
      renderJsonPayloads: true,
      asyncContext: false // Désactive le contexte asynchrone
    },
  
    // Configurer les plugins actifs
    plugins: [
      '~/plugins/icons.ts' // Garder uniquement ce plugin
    ],
  
    compatibilityDate: '2025-03-18'
  })