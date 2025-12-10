<script setup lang="ts">
import type { Product } from '../types/product.types';

/**
 * ProductCard - Display single product in card format
 */

interface Props {
    product: Product
    hoverable?: boolean
}

const props = withDefaults(defineProps<Props>(), {
    hoverable: true,
})

const emit = defineEmits<{
    click: [product: Product]
    edit: [product: Product]
    delete: [product: Product]
}>()

// Format price to IDR
const formattedPrice = computed(() => {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
    }).format(props.product.price)
})

// Stock status
const stockStatus = computed(() => {
    if (props.product.stock === 0) {
        return { label: 'Out of Stock', color: 'bg-red-100 text-red-700' }
    }
    if (props.product.stock < 10) {
        return { label: 'Low Stock', color: 'bg-yellow-100 text-yellow-700' }
    }
    return { label: 'In Stock', color: 'bg-green-100 text-green-700' }
})
</script>

<template>
    <UiCard :hoverable="hoverable" padding="none" class="overflow-hidden" @click="emit('click', product)">
        <!-- Product Image -->
        <div class="aspect-square bg-gray-100 relative">
            <img v-if="product.images?.length" :src="product.images[0]" :alt="product.name"
                class="w-full h-full object-cover">
            <div v-else class="w-full h-full flex items-center justify-center text-gray-400">
                <svg class="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
            </div>

            <!-- Status Badge -->
            <span :class="['absolute top-2 right-2 px-2 py-1 text-xs font-medium rounded-full', stockStatus.color]">
                {{ stockStatus.label }}
            </span>
        </div>

        <!-- Product Info -->
        <div class="p-4">
            <p class="text-xs text-gray-500 mb-1">{{ product.sku }}</p>
            <h3 class="font-medium text-gray-900 mb-2 line-clamp-2">
                {{ product.name }}
            </h3>
            <p class="text-lg font-bold text-primary-600">
                {{ formattedPrice }}
            </p>

            <!-- Actions -->
            <div class="flex gap-2 mt-3">
                <UiButton size="sm" variant="outline" full-width @click.stop="emit('edit', product)">
                    Edit
                </UiButton>
                <UiButton size="sm" variant="ghost" class="text-red-600 hover:bg-red-50"
                    @click.stop="emit('delete', product)">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                </UiButton>
            </div>
        </div>
    </UiCard>
</template>
