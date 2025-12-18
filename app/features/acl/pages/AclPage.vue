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

  <div>
    <UiHeaderPage title="Permission Management"
      description="Define and manage user roles, granular access levels, and organizational security policies efficiently"
      :breadcrumbs="[{ label: 'Permission Management' }]" />

    <div class="space-y-4 mt-10">

      <ModuleTable />
    </div>
  </div>
</template>