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
    selectable?: boolean
    modelValue?: any[]
    showIndex?: boolean
    page?: number
    perPage?: number
}

const props = withDefaults(defineProps<Props>(), {
    data: () => [],
    loading: false,
    keyField: 'id',
    emptyMessage: 'No data available',
    skeletonRows: 5,
    selectable: false,
    modelValue: () => [],
    showIndex: false,
    page: 1,
    perPage: 10
})

const emit = defineEmits(['update:modelValue'])

const selected = computed({
    get: () => props.modelValue,
    set: (val) => emit('update:modelValue', val)
})

const allSelected = computed(() => {
    if (props.data.length === 0) return false;
    return props.data.every(row => {
        const key = row[props.keyField]
        return selected.value.includes(key)
    })
})

const indeterminate = computed(() => {
    if (props.data.length === 0) return false
    const count = props.data.filter(row => {
        const key = row[props.keyField]
        return selected.value.includes(key)
    }).length
    return count > 0 && count < props.data.length
})

const toggleAll = (e: Event) => {
    const checked = (e.target as HTMLInputElement).checked
    if (checked) {
        // Select all currently visible rows
        const currentKeys = props.data.map(row => row[props.keyField])
        // Merge with existing selection to avoid duplicates
        const newSelected = [...new Set([...selected.value, ...currentKeys])]
        selected.value = newSelected
    } else {
        // Deselect all currently visible rows
        const currentKeys = props.data.map(row => row[props.keyField])
        selected.value = selected.value.filter(key => !currentKeys.includes(key))
    }
}

const getValue = (obj: any, path: string) => {
    if (!obj || !path) return undefined
    return path.split('.').reduce((acc, part) => acc && acc[part], obj)
}

const alignmentClass = (align?: string) => {
    switch (align) {
        case 'center': return 'text-center'
        case 'right': return 'text-right'
        default: return 'text-left'
    }
}
</script>

<template>
    <div class="w-full overflow-hidden bg-white-50 border border-gray-200 rounded-xl shadow-sm">
        <div class="overflow-x-auto custom-scrollbar">
            <table class="w-full text-sm">
                <!-- Header -->
                <thead class="bg-gray-50 border-b border-gray-200">
                    <tr>
                        <!-- Checkbox Column -->
                        <th v-if="selectable" scope="col" class="w-12 px-4 py-2 text-center bg-gray-50">
                            <input type="checkbox" :checked="allSelected" :indeterminate.prop="indeterminate"
                                @change="toggleAll"
                                class="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500" />
                        </th>

                        <!-- Index Column -->
                        <th v-if="showIndex" scope="col"
                            class="w-12 px-4 py-2 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider bg-gray-50">
                            No
                        </th>

                        <th v-for="col in columns" :key="col.key" :scope="'col'" :class="[
                            'px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider',
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
                            <td v-if="selectable" class="px-4 py-4 text-center">
                                <div class="w-4 h-4 mx-auto bg-gray-100 rounded"></div>
                            </td>
                            <td v-if="showIndex" class="px-4 py-4 text-center">
                                <div class="w-4 h-4 mx-auto bg-gray-100 rounded"></div>
                            </td>
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
                            <td :colspan="columns.length + (selectable ? 1 : 0) + (showIndex ? 1 : 0)"
                                class="px-6 py-12 text-center text-gray-400 bg-gray-50/30">
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

                            <!-- Checkbox Cell -->
                            <td v-if="selectable" class="px-4 py-2 text-center">
                                <input type="checkbox" :value="row[keyField]" v-model="selected"
                                    class="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                                    @click.stop />
                            </td>

                            <!-- Index Cell -->
                            <td v-if="showIndex" class="px-4 py-2 text-center text-gray-500 text-xs">
                                {{ (page - 1) * perPage + rowIndex + 1 }}
                            </td>

                            <td v-for="col in columns" :key="col.key" :class="[
                                'px-4 py-2 whitespace-nowrap text-gray-700',
                                alignmentClass(col.align),
                                col.class
                            ]">
                                <!-- Dynamic Slot for Cells: cell-{key} -->
                                <slot :name="`cell-${col.key}`" :row="row" :index="rowIndex"
                                    :value="getValue(row, col.key)">
                                    {{ getValue(row, col.key) ?? '-' }}
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
