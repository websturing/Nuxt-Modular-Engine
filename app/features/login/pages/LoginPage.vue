<script setup lang="ts">

definePageMeta({
  layout: false
})

</script>

<template>
  <NuxtLayout name="login">
    <div class="mb-4">
      <p class="text-2xl font-bold">Welcome Back</p>
      <p class="text-lg">Enter your email and password to access your account.</p>
    </div>
    <div class="flex flex-col gap-4">
      <UiInput placeholder="Email" leading-icon="solar:shield-user-broken" />
      <UiInput placeholder="Password" leading-icon="solar:lock-broken" type="password">
        <template #suffix>
          <Icon name="solar:eye-closed-bold-duotone" size="22" class="cursor-pointer hover:bg-primary-400" />
        </template>
      </UiInput>
      <UiButton type="submit" icon="solar:login-3-bold" icon-pos="right" class="text-primary-100">Sign In</UiButton>
    </div>
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