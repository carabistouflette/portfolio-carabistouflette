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

  compatibilityDate: '2025-03-18'
})