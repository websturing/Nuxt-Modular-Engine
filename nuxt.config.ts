// https://nuxt.com/docs/api/configuration/nuxt-config
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

export default defineNuxtConfig({
  compatibilityDate: '2024-07-15',
  devtools: { enabled: true },

  // ========================================
  // 📦 MODULES
  // ========================================
  modules: [
    'nuxt-auth-utils',
    '@vueuse/nuxt',
    '@nuxtjs/tailwindcss',
    '@nuxt/icon',
    'nuxt-time',
    '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt',
  ],

  piniaPersistedstate: {
    storage: 'cookies',
    cookieOptions: {
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7,
    },
  },

  alias: {
    '@db': fileURLToPath(new URL('./server/db', import.meta.url)),
    '@module': fileURLToPath(new URL('./server/src/modules', import.meta.url)),
  },
  // ========================================
  // 🎨 CSS & STYLING
  // ========================================
  css: [
    '~/assets/css/variables.css',
    '~/assets/css/main.css',
    '~/assets/css/utilities.css'
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
      'features/*/composables', // Auto import useSomething() dari folder feature
      'utils',
    ],
  },

  // ========================================
  // 🧩 COMPONENTS AUTO-IMPORT
  // ========================================
  components: [
    { path: '~/components/ui', prefix: 'Ui' },
    { path: '~/components/shared', prefix: '' },
    // Auto-import components dari feature tanpa prefix folder, tapi file harus unik namanya
    { path: '~/features', prefix: '', pathPrefix: false, extensions: ['vue'] },
  ],

  // ========================================
  // 🌐 RUNTIME CONFIG
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
  // 🚦 ROUTING LOGIC (FEATURE-BASED)
  // ========================================
  pages: true,
  hooks: {
    'pages:extend'(pages) {
      // Pastikan path resolve dari ROOT project (process.cwd())
      const featuresDir = path.resolve(process.cwd(), 'app/features')

      // console.log('🏁 START SCANNING FEATURES:', featuresDir)

      if (fs.existsSync(featuresDir)) {
        fs.readdirSync(featuresDir).forEach((featureName) => {
          const featurePagesDir = path.resolve(featuresDir, featureName, 'pages')

          if (fs.existsSync(featurePagesDir)) {
            fs.readdirSync(featurePagesDir).forEach((file) => {
              if (file.endsWith('.vue')) {
                const fileNameOriginal = file.replace('.vue', '')

                // Hapus kata "Page" di akhir nama file (misal: StockInPage -> StockIn)
                const cleanName = fileNameOriginal.replace(/Pages?$/i, '').toLowerCase()

                // Logic Penentuan URL dan Route Name
                let routePath = `/${featureName}` // Default: /stock-in
                let routeName = featureName       // Default Name: stock-in

                // Jika file BUKAN 'index.vue', tambahkan sebagai sub-path
                if (cleanName !== 'index' && cleanName !== '') {
                  routePath += `/${cleanName}`        // Hasil: /stock-in/create
                  routeName += `-${cleanName}`        // Hasil: stock-in-create
                }

                // Push rute ke Nuxt
                pages.push({
                  name: routeName,
                  path: routePath,
                  file: path.resolve(featurePagesDir, file)
                })

                console.log(`✅ ROUTE: ${routePath.padEnd(25)} name: ${routeName}`)
              }
            })
          }
        })
      }
    }
  },

  devServer: {
    port: 3000,
    host: 'localhost'
  },

  ssr: true,
})