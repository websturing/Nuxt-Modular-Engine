/**
 * Product Service - API calls for Product domain
 */

import type {
    CreateProductDto,
    Product,
    ProductListParams,
    ProductListResponse,
    UpdateProductDto,
} from '../types/product.types'

export const productService = {
    /**
     * Get all products with pagination & filters
     */
    async getAll(params?: ProductListParams): Promise<ProductListResponse> {
        const api = useApi()
        return api.get<ProductListResponse>('/products', params as Record<string, unknown>)
    },

    /**
     * Get single product by ID
     */
    async getById(id: string): Promise<Product> {
        const api = useApi()
        return api.get<Product>(`/products/${id}`)
    },

    /**
     * Create new product
     */
    async create(data: CreateProductDto): Promise<Product> {
        const api = useApi()
        return api.post<Product>('/products', data)
    },

    /**
     * Update existing product
     */
    async update({ id, ...data }: UpdateProductDto): Promise<Product> {
        const api = useApi()
        return api.put<Product>(`/products/${id}`, data)
    },

    /**
     * Delete product
     */
    async delete(id: string): Promise<void> {
        const api = useApi()
        return api.delete<void>(`/products/${id}`)
    },
}
