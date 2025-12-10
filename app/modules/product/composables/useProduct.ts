/**
 * useProduct - Composable for single product operations
 */

import { productService } from '../services/product.service'
import type { CreateProductDto, Product, UpdateProductDto } from '../types/product.types'

export function useProduct() {
    const product = ref<Product | null>(null)
    const loading = ref(false)
    const saving = ref(false)
    const error = ref<Error | null>(null)

    /**
     * Fetch single product by ID
     */
    async function fetchProduct(id: string) {
        loading.value = true
        error.value = null

        try {
            product.value = await productService.getById(id)
        } catch (e) {
            error.value = e as Error
            console.error('Failed to fetch product:', e)
        } finally {
            loading.value = false
        }
    }

    /**
     * Create new product
     */
    async function createProduct(data: CreateProductDto): Promise<Product | null> {
        saving.value = true
        error.value = null

        try {
            const newProduct = await productService.create(data)
            product.value = newProduct
            return newProduct
        } catch (e) {
            error.value = e as Error
            console.error('Failed to create product:', e)
            return null
        } finally {
            saving.value = false
        }
    }

    /**
     * Update existing product
     */
    async function updateProduct(data: UpdateProductDto): Promise<Product | null> {
        saving.value = true
        error.value = null

        try {
            const updatedProduct = await productService.update(data)
            product.value = updatedProduct
            return updatedProduct
        } catch (e) {
            error.value = e as Error
            console.error('Failed to update product:', e)
            return null
        } finally {
            saving.value = false
        }
    }

    /**
     * Delete product
     */
    async function deleteProduct(id: string): Promise<boolean> {
        saving.value = true
        error.value = null

        try {
            await productService.delete(id)
            product.value = null
            return true
        } catch (e) {
            error.value = e as Error
            console.error('Failed to delete product:', e)
            return false
        } finally {
            saving.value = false
        }
    }

    /**
     * Reset state
     */
    function reset() {
        product.value = null
        error.value = null
    }

    return {
        // State
        product: readonly(product),
        loading: readonly(loading),
        saving: readonly(saving),
        error: readonly(error),

        // Actions
        fetchProduct,
        createProduct,
        updateProduct,
        deleteProduct,
        reset,
    }
}
