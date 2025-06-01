// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  modules: [
    '@nuxtjs/tailwindcss',
    '@vueuse/nuxt',
    '@nuxt/image',
    '@nuxt/icon',
    '@nuxtjs/sitemap' // Added sitemap module
  ],

  icon: {
    collections: ['heroicons', 'mdi']
  },

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
    pageTransition: false,
    layoutTransition: false,
    head: {
      title: 'Alexis Robin - Portfolio',
      meta: [
        { name: 'description', content: 'Portfolio d\'Alexis Robin - Développeur Full Stack et passionné de programmation' }
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'alternate icon', type: 'image/x-icon', href: '/favicon.ico' }
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

  runtimeConfig: { // Added runtime configuration
    public: {
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || 'https://example.com', // Read from env or use placeholder
    }
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