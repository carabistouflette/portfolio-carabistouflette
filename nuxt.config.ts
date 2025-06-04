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
    serverBundle: {
      collections: ['heroicons', 'mdi', 'logos', 'simple-icons', 'vscode-icons']
    }
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
    pageTransition: { name: 'page', mode: 'out-in' },
    layoutTransition: { name: 'layout', mode: 'out-in' },
    head: {
      title: 'Alexis Robin - Portfolio | Développeur Full Stack',
      meta: [
        // Content Security Policy pour autoriser les images GitHub et Google Fonts (sans frame-ancestors qui n'est pas supporté dans meta)
        { 
          'http-equiv': 'Content-Security-Policy', 
          content: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.openstreetmap.org; style-src 'self' 'unsafe-inline' https://www.openstreetmap.org https://fonts.googleapis.com; img-src 'self' data: blob: https://*.tile.openstreetmap.org https://tile.openstreetmap.org https://*.basemaps.cartocdn.com https://tiles.stadiamaps.com https://unpkg.com https://www.openstreetmap.org https://avatars.githubusercontent.com https://*.githubusercontent.com; font-src 'self' https://fonts.gstatic.com; connect-src 'self' https://*.tile.openstreetmap.org https://tile.openstreetmap.org https://*.basemaps.cartocdn.com https://tiles.stadiamaps.com https://www.openstreetmap.org https://api.github.com https://api.iconify.design; frame-src 'self' https://www.openstreetmap.org; child-src https://www.openstreetmap.org; object-src 'none';" 
        },
        { name: 'description', content: 'Portfolio d\'Alexis Robin - Étudiant en informatique spécialisé en développement full stack et programmation bas niveau. Découvrez mes projets et compétences.' },
        { name: 'keywords', content: 'Alexis Robin, développeur, full stack, programmation bas niveau, informatique, IUT Montpellier, DACS, portfolio' },
        { name: 'author', content: 'Alexis Robin' },
        { name: 'robots', content: 'index, follow' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        
        // Open Graph meta tags
        { property: 'og:type', content: 'website' },
        { property: 'og:site_name', content: 'Alexis Robin - Portfolio' },
        { property: 'og:title', content: 'Alexis Robin - Portfolio | Développeur Full Stack' },
        { property: 'og:description', content: 'Portfolio d\'Alexis Robin - Étudiant en informatique spécialisé en développement full stack et programmation bas niveau.' },
        { property: 'og:image', content: '/profile-logo.svg' },
        { property: 'og:image:alt', content: 'Logo d\'Alexis Robin' },
        { property: 'og:locale', content: 'fr_FR' },
        
        // Twitter Card meta tags
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: 'Alexis Robin - Portfolio | Développeur Full Stack' },
        { name: 'twitter:description', content: 'Portfolio d\'Alexis Robin - Étudiant en informatique spécialisé en développement full stack et programmation bas niveau.' },
        { name: 'twitter:image', content: '/profile-logo.svg' },
        
        // Additional meta tags
        { name: 'theme-color', content: '#cba6f7' },
        { name: 'msapplication-TileColor', content: '#cba6f7' }
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'alternate icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'canonical', href: process.env.NUXT_PUBLIC_SITE_URL || 'https://example.com' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: 'anonymous' },
        { rel: 'preload', as: 'style', href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&family=Poppins:wght@600;700&display=swap' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&family=Poppins:wght@600;700&display=swap', media: 'print', onload: 'this.media="all"' }
      ]
    }
  },

  css: [
    '~/assets/css/main.css',
    '~/assets/css/ai-fixes.css'
  ],

  tailwindcss: {
    configPath: '~/tailwind.config.ts',
    exposeConfig: true,
    viewer: true
  },

  nitro: {
    prerender: {
      routes: ['/', '/projects', '/contact', '/ia', '/projects/train-game', '/projects/bulk-csv-smag', '/projects/voting-app']
    }
  },

  components: {
    dirs: [
      '~/components/ui',
      '~/components/layout',
      '~/components/home',
      '~/components/projects',
      '~/components/contact',
      '~/components/ai'
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

  sitemap: {
    hostname: process.env.NUXT_PUBLIC_SITE_URL || 'https://example.com',
    gzip: true,
    routes: ['/', '/projects', '/contact', '/ia', '/projects/train-game', '/projects/bulk-csv-smag', '/projects/voting-app']
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
          manualChunks: (id) => {
            // Vendor chunks for better caching
            if (id.includes('node_modules')) {
              if (id.includes('vue') && !id.includes('@vueuse')) {
                return 'vue-vendor';
              }
              if (id.includes('@vueuse')) {
                return 'vueuse-vendor';
              }
              if (id.includes('leaflet')) {
                return 'leaflet-vendor';
              }
              if (id.includes('@iconify') || id.includes('unplugin-icons')) {
                return 'icons-vendor';
              }
              if (id.includes('isomorphic-dompurify')) {
                return 'security-vendor';
              }
              return 'vendor';
            }
          }
        }
      }
    }
  },

  // Performance optimizations
  experimental: {
    payloadExtraction: true // Reduce bundle size by extracting payload
  },

  compatibilityDate: '2025-03-18'
})