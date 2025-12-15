<template>
  <div>
    <NuxtLoadingIndicator :duration="3000" :throttle="200" :height="4"
      class="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" />
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
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} | Sewing Application` : 'Nuxt Kaigrammm Template'
  }
})
</script>