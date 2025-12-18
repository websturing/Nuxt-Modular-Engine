<script setup lang="ts">
definePageMeta({
  layout: 'admin'
})

useSeoMeta({
  title: 'Permission Management'
})


const { modules, meta, fetchModules } = useAcl()

await fetchModules()
</script>

<template>

  <div class="space-y-10">
    <UiHeaderPage title="Permission Management"
      description="Define and manage user roles, granular access levels, and organizational security policies efficiently"
      :breadcrumbs="[{ label: 'Permission Management' }]" />

    <div class="space-y-4">

      <ModuleTable />
      <ModuleTable />

    </div>
  </div>
</template>