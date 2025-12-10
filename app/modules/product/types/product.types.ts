/**
 * Product Types - Domain Types/Interfaces
 */

export interface Product {
    id: string
    name: string
    sku: string
    description?: string
    price: number
    stock: number
    category?: ProductCategory
    images?: string[]
    isActive: boolean
    createdAt: string
    updatedAt: string
}

export interface ProductCategory {
    id: string
    name: string
    slug: string
    description?: string
}

export interface ProductListParams {
    page?: number
    limit?: number
    search?: string
    categoryId?: string
    sortBy?: 'name' | 'price' | 'createdAt' | 'stock'
    sortOrder?: 'asc' | 'desc'
    isActive?: boolean
}

export interface ProductListResponse {
    data: Product[]
    meta: {
        currentPage: number
        lastPage: number
        perPage: number
        total: number
    }
}

export interface CreateProductDto {
    name: string
    sku: string
    description?: string
    price: number
    stock: number
    categoryId?: string
    images?: string[]
    isActive?: boolean
}

export interface UpdateProductDto extends Partial<CreateProductDto> {
    id: string
}
