<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
    <UiToastProvider />
  </div>
</template>

<script setup lang="ts">
const { initTheme } = useTheme()
import UiToastProvider from './components/ui/Toast/UiToast.vue'

onMounted(() => {
  initTheme()
})

useHead({
  // %s akan diganti dengan 'title' yang kamu set di useSeoMeta pada setiap halaman
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} | Sewing Application` : 'Nuxt Kaigrammm Template'
  }
})
</script>