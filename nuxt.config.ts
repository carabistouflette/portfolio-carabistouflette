// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  modules: [
    '@nuxtjs/tailwindcss',
    '@vueuse/nuxt',
    '@nuxt/image'
    // '@nuxt/icon'
  ],

  image: {
    inject: true,
    quality: 80,
    format: ['webp'],
    screens: {
      xs: 320,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      xxl: 1536,
      '2xl': 1536
    },
    presets: {
      default: {
        modifiers: {
          loading: 'lazy',
          fit: 'cover',
          format: 'webp',
          quality: 80
        }
      }
    }
  },

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
    exposeConfig: true,
    viewer: true
  },

  nitro: {
    prerender: {
      routes: ['/', '/projects', '/contact']
    }
  },

  components: {
    dirs: [
      '~/components/ui',
      '~/components/layout',
      '~/components/home',
      '~/components/projects',
      '~/components/contact'
    ],
    global: true
  },

  imports: {
    dirs: ['composables', 'utils']
  },

  typescript: {
    strict: true,
    typeCheck: false
  },

  vite: {
    optimizeDeps: {
      include: ['vue', '@vueuse/core']
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks: {}
        }
      }
    }
  },

  compatibilityDate: '2025-03-18'
})