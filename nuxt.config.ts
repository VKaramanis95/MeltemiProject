import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  compatibilityDate: '2026-09-15',
  modules: ['@nuxtjs/i18n', '@nuxtjs/tailwindcss'],
  tailwindcss: {
    cssPath: '~/assets/css/main.css',
  },
  components: [
    { path: '~/components', pathPrefix: false },
  ],

  app: {
    head: {
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700;800&display=swap&subset=greek',
          media: 'print',
          onload: "this.media='all'",
        },
      ],
      noscript: [
        {
          innerHTML:
            '<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700;800&display=swap&subset=greek">',
        },
      ],
    },
  },

   runtimeConfig: {
    public: {
      emailjs: {
        serviceId: '',
        templateId: '',
        publicKey: '',
      },
    },
  },

  i18n: {
    restructureDir: '.',
    strategy: 'prefix_except_default',
    defaultLocale: 'el',
    detectBrowserLanguage: false,
    langDir: 'locales',
    vueI18n: './i18n.config.ts',
    locales: [
      {
        code: 'el',
        language: 'el-GR',
        name: 'Ελληνικά',
        file: 'el.json',
      },
      {
        code: 'en',
        language: 'en-US',
        name: 'English',
        file: 'en.json',
      },
    ],
    compilation: { strictMessage: false, escapeHtml: false },


    baseUrl: 'my domain',


  },
})