    <script setup lang="ts">
    import type { PaginationMeta } from '@shared/schemas/pagination'
    import {
        PaginationEllipsis,
        PaginationFirst,
        PaginationLast,
        PaginationList,
        PaginationListItem,
        PaginationNext,
        PaginationPrev,
        PaginationRoot,
    } from 'reka-ui'

    interface Props {
        page?: number
        total?: number
        perPage?: number
        meta?: PaginationMeta
        siblingCount?: number
        showEdges?: boolean
    }

    const props = withDefaults(defineProps<Props>(), {
        page: 1,
        total: 0,
        perPage: 10,
        meta: undefined,
        siblingCount: 1,
        showEdges: true,
    })

    const emit = defineEmits<{
        'update:page': [value: number]
    }>()

    const currentPage = computed({
        get: () => props.page,
        set: (val) => emit('update:page', val),
    })

    const resolvedTotal = computed(() => props.meta?.total ?? props.total)
    const resolvedPerPage = computed(() => props.meta?.perPage ?? props.perPage)
</script>

<template>
    <!-- Wrapper ini penting agar style container tidak berantakan jika pagination hidden -->
    <div v-if="resolvedTotal > 0" class="flex items-center">
        <PaginationRoot v-model:page="currentPage" :total="resolvedTotal" :items-per-page="resolvedPerPage"
            :sibling-count="props.siblingCount" show-edges :default-page="1" class="flex items-center gap-1">

            <PaginationList v-slot="{ items }" class="flex items-center gap-1">
                <PaginationFirst v-if="showEdges"
                    class="w-8 h-8 flex items-center justify-center rounded-md border border-gray-200 bg-white text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors focus:shadow focus:ring-1 focus:ring-primary-500 focus:outline-none">
                    <Icon name="heroicons:chevron-double-left-20-solid" class="w-4 h-4" />
                </PaginationFirst>

                <PaginationPrev
                    class="w-8 h-8 flex items-center justify-center rounded-md border border-gray-200 bg-white text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors focus:shadow focus:ring-1 focus:ring-primary-500 focus:outline-none">
                    <Icon name="heroicons:chevron-left-20-solid" class="w-4 h-4" />
                </PaginationPrev>

                <template v-for="(page, index) in items">
                    <PaginationListItem v-if="page.type === 'page'" :key="index" :value="page.value"
                        class="w-8 h-8 flex items-center justify-center rounded-md border text-sm font-medium transition-colors data-[selected]:bg-primary-500 data-[selected]:text-white-50 data-[selected]:border-primary-600 bg-white text-gray-700 border-gray-200 hover:bg-gray-50 focus:shadow focus:ring-1 focus:ring-primary-500 focus:outline-none">
                        {{ page.value }}
                    </PaginationListItem>

                    <PaginationEllipsis v-else :key="page.type + index"
                        class="w-8 h-8 flex items-center justify-center text-gray-400">
                        &#8230;
                    </PaginationEllipsis>
                </template>

                <PaginationNext
                    class="w-8 h-8 flex items-center justify-center rounded-md border border-gray-200 bg-white text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors focus:shadow focus:ring-1 focus:ring-primary-500 focus:outline-none">
                    <Icon name="heroicons:chevron-right-20-solid" class="w-4 h-4" />
                </PaginationNext>

                <PaginationLast v-if="showEdges"
                    class="w-8 h-8 flex items-center justify-center rounded-md border border-gray-200 bg-white text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors focus:shadow focus:ring-1 focus:ring-primary-500 focus:outline-none">
                    <Icon name="heroicons:chevron-double-right-20-solid" class="w-4 h-4" />
                </PaginationLast>
            </PaginationList>
        </PaginationRoot>
    </div>
</template>
