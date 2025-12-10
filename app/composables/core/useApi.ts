/**
 * useApi - Core API composable
 * Base fetcher dengan retry, error handling, dan config
 */

interface FetchOptions {
    method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'
    body?: unknown
    params?: Record<string, unknown>
    headers?: Record<string, string>
    retry?: number
    retryDelay?: number
}

interface ApiError {
    message: string
    statusCode: number
    data?: unknown
}

export function useApi() {
    const config = useRuntimeConfig()
    const baseURL = config.public.apiBase as string

    /**
     * Core fetch function dengan retry logic
     */
    async function request<T>(endpoint: string, options: FetchOptions = {}): Promise<T> {
        const {
            method = 'GET',
            body,
            params,
            headers = {},
            retry = 3,
            retryDelay = 1000,
        } = options

        // Filter undefined params
        const filteredParams = params
            ? Object.fromEntries(
                Object.entries(params).filter(([, v]) => v !== undefined)
            )
            : undefined

        let attempts = 0
        let lastError: Error | null = null

        while (attempts < retry) {
            try {
                const response = await $fetch<T>(`${baseURL}${endpoint}`, {
                    method,
                    body: body instanceof FormData ? body : body ? JSON.stringify(body) : undefined,
                    params: filteredParams,
                    headers: {
                        'Content-Type': body instanceof FormData ? 'multipart/form-data' : 'application/json',
                        'Accept': 'application/json',
                        ...headers,
                    },
                })

                return response
            } catch (error: unknown) {
                attempts++
                lastError = error as Error

                // Don't retry on client errors (4xx)
                if (error && typeof error === 'object' && 'statusCode' in error) {
                    const statusCode = (error as { statusCode: number }).statusCode
                    if (statusCode >= 400 && statusCode < 500) {
                        throw createApiError(error)
                    }
                }

                // Wait before retry (exponential backoff)
                if (attempts < retry) {
                    await new Promise((resolve) => setTimeout(resolve, retryDelay * attempts))
                }
            }
        }

        throw lastError || new Error('Request failed after retries')
    }

    /**
     * Create standardized API error
     */
    function createApiError(error: unknown): ApiError {
        if (error && typeof error === 'object') {
            const err = error as { statusCode?: number; data?: { message?: string }; message?: string }
            return {
                message: err.data?.message || err.message || 'An error occurred',
                statusCode: err.statusCode || 500,
                data: err.data,
            }
        }
        return {
            message: 'An unknown error occurred',
            statusCode: 500,
        }
    }

    return {
        /**
         * GET request
         */
        get: <T>(endpoint: string, params?: FetchOptions['params']) =>
            request<T>(endpoint, { method: 'GET', params }),

        /**
         * POST request
         */
        post: <T>(endpoint: string, body?: FetchOptions['body']) =>
            request<T>(endpoint, { method: 'POST', body }),

        /**
         * PUT request
         */
        put: <T>(endpoint: string, body?: FetchOptions['body']) =>
            request<T>(endpoint, { method: 'PUT', body }),

        /**
         * PATCH request
         */
        patch: <T>(endpoint: string, body?: FetchOptions['body']) =>
            request<T>(endpoint, { method: 'PATCH', body }),

        /**
         * DELETE request
         */
        delete: <T>(endpoint: string) =>
            request<T>(endpoint, { method: 'DELETE' }),

        /**
         * Custom request with full options
         */
        request,
    }
}
