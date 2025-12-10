<script setup lang="ts">
/**
 * EmptyState - Display when no data available
 */

interface Props {
    title?: string
    description?: string
    icon?: 'inbox' | 'search' | 'folder' | 'document'
}

const props = withDefaults(defineProps<Props>(), {
    title: 'No data found',
    description: 'There are no items to display at this time.',
    icon: 'inbox',
})
</script>

<template>
    <div class="flex flex-col items-center justify-center py-12 px-4 text-center">
        <!-- Icon -->
        <div class="mb-4 rounded-full bg-gray-100 p-4">
            <!-- Inbox icon -->
            <svg v-if="icon === 'inbox'" class="h-8 w-8 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none"
                viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                    d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
            </svg>

            <!-- Search icon -->
            <svg v-else-if="icon === 'search'" class="h-8 w-8 text-gray-400" xmlns="http://www.w3.org/2000/svg"
                fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>

            <!-- Folder icon -->
            <svg v-else-if="icon === 'folder'" class="h-8 w-8 text-gray-400" xmlns="http://www.w3.org/2000/svg"
                fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                    d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
            </svg>

            <!-- Document icon -->
            <svg v-else class="h-8 w-8 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
        </div>

        <!-- Title -->
        <h3 class="text-lg font-medium text-gray-900 mb-1">
            {{ title }}
        </h3>

        <!-- Description -->
        <p class="text-sm text-gray-500 max-w-sm mb-4">
            {{ description }}
        </p>

        <!-- Action slot -->
        <div v-if="$slots.action">
            <slot name="action" />
        </div>
    </div>
</template>
