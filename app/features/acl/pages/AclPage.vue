<script setup lang="ts">
definePageMeta({
  layout: 'admin'
})

useSeoMeta({
  title: 'Permission Management'
})
</script>

<template>
  <div class="space-y-2">
    <UiBreadcrumb :items="[{ label: 'Permission Management' }]" />

    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-gray-800">Permission Management</h1>
        <p>Define and manage user roles, granular access levels, and organizational security policies efficiently</p>
      </div>
      <UiButton icon="heroicons:plus" label="Add Role" />
    </div>

    <AclContainer />
  </div>
</template>