// https://nuxt.com/docs/api/configuration/nuxt-config
import fs from 'fs'
import path from 'path'
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },


  // ========================================
  // 📦 MODULES
  // ========================================
  modules: [
    '@vueuse/nuxt',
    '@nuxtjs/tailwindcss',
    '@nuxt/icon',
    'nuxt-time',
    '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt',
  ],

  piniaPersistedstate: {
    storage: 'localStorage', // Sesuai permintaanmu
  },

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
  pages: true,
  hooks: {
    'pages:extend'(pages) {
      // [PENTING] 2. Gunakan process.cwd() agar path-nya akurat dari root project
      const featuresDir = path.resolve(process.cwd(), 'app/features')

      console.log('🏁 START SCANNING FEATURES:', featuresDir) // Log Debug

      if (fs.existsSync(featuresDir)) {
        fs.readdirSync(featuresDir).forEach((featureName) => {
          const featurePagesDir = path.resolve(featuresDir, featureName, 'pages')

          if (fs.existsSync(featurePagesDir)) {
            fs.readdirSync(featurePagesDir).forEach((file) => {
              if (file.endsWith('.vue')) {
                const fileNameOriginal = file.replace('.vue', '')

                // Regex: Hapus "Page" atau "Pages" di akhir (Case Insensitive)
                const cleanName = fileNameOriginal.replace(/Pages?$/i, '').toLowerCase()

                let routePath = ''

                // Logika Routing
                if (cleanName === 'index' || cleanName === '') {
                  routePath = `/${featureName}`
                } else {
                  routePath = `/${cleanName}`
                }

                // Push ke Router
                pages.push({
                  name: cleanName,
                  path: routePath,
                  file: path.resolve(featurePagesDir, file)
                })

                // [PENTING] 3. Bukti Registrasi
                console.log(`✅ ROUTE ADDED: ${routePath}  -->  ${featureName}/pages/${file}`)
              }
            })
          }
        })
      } else {
        console.log('⚠️  Folder "features" tidak ditemukan di root!')
      }
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