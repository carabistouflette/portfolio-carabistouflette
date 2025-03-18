// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    // Configuration spécifique pour Cloudflare
    devtools: { enabled: false },
    
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
          { name: 'description', content: 'Portfolio d\'Alexis Robin - Développeur système embarqué et passionné de programmation bas niveau' }
        ],
        link: [
          { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
        ]
      }
    },
  
    css: [
      '~/assets/css/main.css',
      '~/assets/css/catppuccin.css',
      '~/assets/css/interaction-styles.css'
    ],
  
    tailwindcss: {
      configPath: '~/tailwind.config.ts',
      exposeConfig: false,
      viewer: false
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
  
    // Optimisation pour Cloudflare Pages
    nitro: {
      preset: 'cloudflare-pages',
      prerender: {
        routes: ['/', '/projects', '/contact']
      }
    },
  
    // Configuration de TypeScript
    typescript: {
      shim: false,
      strict: true,
      typeCheck: false
    },
    
    // Désactiver les fonctionnalités expérimentales pour la production
    experimental: {
      payloadExtraction: false,
      renderJsonPayloads: true,
      asyncContext: false
    },
  
    // Configurer les plugins actifs
    plugins: [
      '~/plugins/icons.ts'
    ],
  
    // Optimisation du poids du bundle
    vite: {
      build: {
        minify: 'terser',
        cssMinify: true,
        rollupOptions: {
          output: {
            manualChunks: {
              'vue': ['vue'],
              'icons': ['nuxt-icon']
            }
          }
        }
      }
    },
  
    compatibilityDate: '2025-03-18'
  })