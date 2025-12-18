<script setup lang="ts">
/**
 * UiDatatable
 * Generic datatable component with skeleton loading, slots, and styling.
 */

export interface HelperColumn {
    key: string
    label: string
    class?: string
    headerClass?: string
    width?: string
    align?: 'left' | 'center' | 'right'
}

interface Props {
    columns: HelperColumn[]
    data: any[]
    loading?: boolean
    keyField?: string
    emptyMessage?: string
    skeletonRows?: number
}

const props = withDefaults(defineProps<Props>(), {
    data: () => [],
    loading: false,
    keyField: 'id',
    emptyMessage: 'No data available',
    skeletonRows: 5
})

const alignmentClass = (align?: string) => {
    switch (align) {
        case 'center': return 'text-center'
        case 'right': return 'text-right'
        default: return 'text-left'
    }
}
</script>

<template>
    <div class="w-full overflow-hidden bg-white border border-gray-200 rounded-xl shadow-sm">
        <div class="overflow-x-auto custom-scrollbar">
            <table class="w-full text-sm">
                <!-- Header -->
                <thead class="bg-gray-50 border-b border-gray-200">
                    <tr>
                        <th v-for="col in columns" :key="col.key" :scope="'col'" :class="[
                            'px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider',
                            alignmentClass(col.align),
                            col.headerClass,
                            col.width ? '' : 'whitespace-nowrap'
                        ]" :style="{ width: col.width }">
                            <slot :name="`header-${col.key}`" :column="col">
                                {{ col.label }}
                            </slot>
                        </th>
                    </tr>
                </thead>

                <tbody class="divide-y divide-gray-100">
                    <!-- Loading Skeleton -->
                    <template v-if="loading">
                        <tr v-for="i in skeletonRows" :key="`skeleton-${i}`" class="animate-pulse">
                            <td v-for="col in columns" :key="col.key" class="px-6 py-4 whitespace-nowrap">
                                <div class="h-4 bg-gray-100 rounded" :class="[
                                    col.key === 'actions' ? 'w-8 ml-auto' : 'w-3/4',
                                    col.align === 'center' ? 'mx-auto' : '',
                                    col.align === 'right' ? 'ml-auto' : ''
                                ]"></div>
                            </td>
                        </tr>
                    </template>

                    <!-- Empty State -->
                    <template v-else-if="data.length === 0">
                        <tr>
                            <td :colspan="columns.length" class="px-6 py-12 text-center text-gray-400 bg-gray-50/30">
                                <div class="flex flex-col items-center justify-center">
                                    <Icon name="heroicons:inbox" class="w-10 h-10 mb-2 opacity-20" />
                                    <span class="text-sm">{{ emptyMessage }}</span>
                                </div>
                            </td>
                        </tr>
                    </template>

                    <!-- Data Rows -->
                    <template v-else>
                        <tr v-for="(row, rowIndex) in data" :key="row[keyField] || rowIndex"
                            class="group hover:bg-gray-50/50 transition-colors duration-150 ease-in-out">
                            <td v-for="col in columns" :key="col.key" :class="[
                                'px-6 py-4 whitespace-nowrap text-gray-700 font-medium',
                                alignmentClass(col.align),
                                col.class
                            ]">
                                <!-- Dynamic Slot for Cells: cell-{key} -->
                                <slot :name="`cell-${col.key}`" :row="row" :index="rowIndex" :value="row[col.key]">
                                    {{ row[col.key] }}
                                </slot>
                            </td>
                        </tr>
                    </template>
                </tbody>
            </table>
        </div>
    </div>
</template>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
    height: 8px;
}

.custom-scrollbar::-webkit-scrollbar-track {
    background: transparent;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
    background-color: #e5e7eb;
    border-radius: 20px;
}
</style>
