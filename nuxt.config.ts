// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  // ========================================
  // 📦 MODULES
  // ========================================
  modules: [
    '@nuxtjs/tailwindcss',
    // '@pinia/nuxt',        // Uncomment jika butuh state management
    // '@vueuse/nuxt',       // Uncomment untuk utility composables
  ],

  // ========================================
  // 🎨 CSS & STYLING
  // ========================================
  css: [
    '~/assets/css/variables.css', // 1. Design Tokens (Primitives & Semantics)
    '~/assets/css/main.css'       // 2. Global Styles
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
      'modules/*/composables',
      'utils',
    ],
  },

  // ========================================
  // 🧩 COMPONENTS AUTO-IMPORT
  // ========================================
  components: [
    { path: '~/components/ui', prefix: 'Ui' },
    { path: '~/components/common', prefix: '' },
    { path: '~/components/layout', prefix: 'Layout' },
    // Auto-import dari modules
    { path: '~/modules', prefix: '', pathPrefix: false, extensions: ['vue'] },
  ],

  // ========================================
  // 🌐 RUNTIME CONFIG (API, ENV)
  // ========================================
  runtimeConfig: {
    apiSecret: process.env.API_SECRET,
    public: {
      apiBase: process.env.API_BASE_URL || 'http://localhost:8000/api'
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