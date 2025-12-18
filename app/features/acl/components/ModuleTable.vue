<script setup lang="ts">
import type { HelperColumn } from '~/components/ui/Datatable/UiDatatable.vue';

const columns = [
  { key: 'name', label: 'Module Name' },
  { key: 'slug', label: 'Slug' },
  { key: 'is_active', label: 'Status', align: 'center' },
  { key: 'actions', label: '', width: '50px' }
] as HelperColumn[]

const isLoading = ref(false)

const { modules, meta, fetchModules } = useAcl()

await fetchModules()
</script>

<template>
  <div class="flex flex-col gap-70">
    <UiDatatable :columns="columns" :data="modules" :loading="isLoading">
      <!-- Custom Status Render -->
      <template #cell-is_active="{ value }">
        <span class="badge">{{ value ? 'Active' : 'Inactive' }}</span>
      </template>

      <!-- Actions -->
      <template #cell-actions="{ row }">
        <UiButton size="sm" icon="heroicons:pencil-square" />
      </template>
    </UiDatatable>

    <UiPagination :meta="meta" class="mt-40" />
  </div>
</template>