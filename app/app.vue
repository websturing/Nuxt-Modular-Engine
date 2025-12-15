<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
const { initTheme } = useTheme()

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