/**
 * useProductList - Composable for product list management
 */

import { productService } from '../services/product.service'
import type { Product, ProductListParams } from '../types/product.types'

export function useProductList() {
    // State
    const products = ref<Product[]>([])
    const loading = ref(false)
    const error = ref<Error | null>(null)

    // Pagination
    const pagination = reactive({
        currentPage: 1,
        lastPage: 1,
        perPage: 10,
        total: 0,
    })

    // Filters
    const filters = reactive<ProductListParams>({
        page: 1,
        limit: 10,
        search: '',
        categoryId: undefined,
        sortBy: 'createdAt',
        sortOrder: 'desc',
    })

    /**
     * Fetch products from API
     */
    async function fetchProducts() {
        loading.value = true
        error.value = null

        try {
            const response = await productService.getAll(filters)
            products.value = response.data
            Object.assign(pagination, response.meta)
        } catch (e) {
            error.value = e as Error
            console.error('Failed to fetch products:', e)
        } finally {
            loading.value = false
        }
    }

    /**
     * Update filters and refetch
     */
    function setFilters(newFilters: Partial<ProductListParams>) {
        Object.assign(filters, newFilters)
        filters.page = 1 // Reset to first page on filter change
        fetchProducts()
    }

    /**
     * Go to specific page
     */
    function goToPage(page: number) {
        filters.page = page
        fetchProducts()
    }

    /**
     * Search products
     */
    function search(query: string) {
        filters.search = query
        filters.page = 1
        fetchProducts()
    }

    /**
     * Reset all filters
     */
    function resetFilters() {
        Object.assign(filters, {
            page: 1,
            limit: 10,
            search: '',
            categoryId: undefined,
            sortBy: 'createdAt',
            sortOrder: 'desc',
        })
        fetchProducts()
    }

    return {
        // State (readonly)
        products: readonly(products),
        loading: readonly(loading),
        error: readonly(error),
        pagination: readonly(pagination),
        filters,

        // Actions
        fetchProducts,
        setFilters,
        goToPage,
        search,
        resetFilters,
    }
}
