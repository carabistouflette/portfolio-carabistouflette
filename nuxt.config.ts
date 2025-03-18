// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // Configuration Vite
  vite: {
    resolve: {
      alias: {
        '~': './',
        '@': './'
      }
    },
    optimizeDeps: {
      include: [
        'tailwindcss',
        '@vueuse/core'
      ]
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: ''
        }
      }
    }
  },

  devtools: { enabled: true },

  modules: [
    '@nuxtjs/tailwindcss',
    '@vueuse/nuxt',
    '@nuxt/image',
    'nuxt-icon',
    '@nuxtjs/color-mode'
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

  // CSS gérés via le plugin assets.ts
  css: [],

  colorMode: {
    // La configuration est dans le fichier config/color-mode.ts
  },

  nitro: {
    prerender: {
      routes: ['/', '/projects', '/contact']
    }
  },

  compatibilityDate: '2025-03-18'
})