// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },


  // ========================================
  // 📦 MODULES
  // ========================================
  modules: [// '@pinia/nuxt',        // Uncomment jika butuh state management
    '@vueuse/nuxt',       // Uncomment untuk utility composables
    '@nuxtjs/tailwindcss', '@nuxt/icon', 'nuxt-time'],

  // ========================================
  // 🎨 CSS & STYLING
  // ========================================
  css: [
    '~/assets/css/variables.css', // 1. Design Tokens (Primitives & Semantics)
    '~/assets/css/main.css',       // 2. Global Styles
    '~/assets/css/utilities.css'       // 2. Global Styles
  ],

  tailwindcss: {
    cssPath: '~/assets/css/tailwind.css',
    configPath: 'tailwind.config.js',
  },

  // ========================================
  // 🔧 BUILD CONFIGURATION
  // ========================================
  build: {
    transpile: ['reka-ui']
  },

  // ========================================
  // 📦 AUTO-IMPORTS
  // ========================================
  imports: {
    dirs: [
      'composables',
      'composables/core',
      'features/*/composables',
      'utils',
    ],
  },

  // ========================================
  // 🧩 COMPONENTS AUTO-IMPORT
  // ========================================
  components: [
    { path: '~/components/ui', prefix: 'Ui' },
    { path: '~/components/shared', prefix: '' },
    // Auto-import dari modules
    { path: '~/features', prefix: '', pathPrefix: false, extensions: ['vue'] },
  ],

  // ========================================
  // 🌐 RUNTIME CONFIG (API, ENV)
  // ========================================
  runtimeConfig: {
    apiSecret: process.env.API_SECRET,
    public: {
      apiBase: process.env.API_BASE_URL || 'http://localhost:8000/api',
      timezone: process.env.NUXT_PUBLIC_TIMEZONE || 'Asia/Jakarta',
      timeFormat: process.env.NUXT_PUBLIC_TIME_FORMAT || 'HH:mm:ss',
      dateFormat: process.env.NUXT_PUBLIC_DATE_FORMAT || 'YYYY-MM-DD'
    }
  },

  // ========================================
  // 📁 DIRECTORY CONFIGURATION
  // ========================================
  // Nuxt 4 sudah default ke folder `app/`
  // Tidak perlu override kecuali custom structure

  // ========================================
  // 🔍 DEV SERVER
  // ========================================
  devServer: {
    port: 3000,           // Dev server port
    host: 'localhost'     // atau '0.0.0.0' untuk network access
  },

  // ========================================
  // 🚀 SSR / CSR MODE
  // ========================================
  ssr: true,              // true = SSR, false = SPA mode
})