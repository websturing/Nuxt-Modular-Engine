<script setup lang="ts">

definePageMeta({
  layout: false
})
useSeoMeta({
  title: 'Welcome back, Login to your account'
})
</script>

<template>
  <NuxtLayout name="login">
    <div class="mb-4">
      <p class="text-2xl font-bold">Welcome Back</p>
      <p class="text text-gray-400">Enter your email and password to access your account.</p>
    </div>
    <login-form />
    <footer class="fixed bottom-10 text-gray-400">
      kaigrammm Workspace @2024. Batam, Riau Islands
    </footer>
    <template #branding>
      <h2 class="text-3xl text-primary-100 font-bold mb-4">Enterprise System</h2>
      <p class="text-primary-100 text-lg">Manage your production seamlessly with our advanced sewing
        application.</p>
    </template>
  </NuxtLayout>
</template>