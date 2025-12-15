<script setup lang="ts">
</script>

<template>
  <div class="flex flex-col gap-4">
    <UiInput placeholder="Email" leading-icon="solar:shield-user-broken" />
    <UiInput placeholder="Password" leading-icon="solar:lock-broken" type="password">
      <template #suffix>
        <Icon name="solar:eye-closed-bold-duotone" size="22" class="cursor-pointer hover:bg-primary-400" />
      </template>
    </UiInput>
    <UiButton type="submit" icon="solar:login-3-bold" icon-pos="right" class="text-primary-100">Sign In</UiButton>
  </div>
</template>