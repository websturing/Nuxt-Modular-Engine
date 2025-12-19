<script setup lang="ts">
import type { HelperColumn } from '~/components/ui/Datatable/UiDatatable.vue';

const columns = [
  { key: 'name', label: 'Module Name' },
  { key: 'slug', label: 'Slug' },
  { key: 'parent.name', label: 'Parent' },
  { key: 'is_active', label: 'Status', align: 'center' },
  { key: 'actions', label: '', width: '50px' }
] as HelperColumn[]

const { modules, meta, fetchModules } = useAcl()
const isLoading = ref(false)
const page = ref(1)

const { searchQuery, data: tableData } = useDatatable(modules, fetchModules)

// Wrapper untuk fetch data dengan loading state & params
const loadData = async () => {
  isLoading.value = true
  try {
    // Pass params page ke function fetch
    await fetchModules({ page: page.value })
  } finally {
    isLoading.value = false
  }
}

// Trigger fetch ulang saat page berubah
watch(page, () => {
  loadData()
})

// Initial load
await loadData()
</script>

<template>
  <div class="space-y-4">
    <UiDatatableToolbar v-model="searchQuery" />
    <UiDatatable show-index :page="page" :per-page="meta?.perPage" :columns="columns" :data="tableData"
      :loading="isLoading" keyField="name">
      <!-- Custom Status Render -->
      <template #cell-is_active="{ value }">
        <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize"
          :class="value ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'">
          {{ value ? 'active' : 'inactive' }}
        </span>
      </template>

      <!-- Actions -->
      <template #cell-actions="{ row }">
        <div class="flex justify-end">
          <UiButton size="sm" variant="ghost" icon="heroicons:pencil-square" />
        </div>
      </template>
    </UiDatatable>

    <div v-if="meta" class="flex justify-end pt-4">
      <UiPagination :meta="meta" v-model:page="page" />
    </div>
  </div>
</template>