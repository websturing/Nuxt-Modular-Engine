<script setup lang="ts">
definePageMeta({
  layout: 'admin'
})

useSeoMeta({
  title: 'Permission Management'
})
</script>

<template>
  <div class="space-y-10">
    <div class="space-y-1">
      <UiBreadcrumb :items="[{ label: 'Permission Management' }]" />

      <div class="flex items-center justify-between">
        <div>
          <p class="text-xl font-bold text-gray-800">Permission Management</p>
          <p>Define and manage user roles, granular access levels, and organizational security policies efficiently</p>
        </div>
        <UiButton icon="heroicons:plus" label="Add Role" />
      </div>
    </div>

    <AclContainer />
  </div>
</template>