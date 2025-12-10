/**
 * useLoading - Loading state management
 * Centralized loading state dengan minimum display time
 */

interface LoadingOptions {
    minLoadingTime?: number // Minimum time to show loading (prevents flash)
}

export function useLoading(options: LoadingOptions = {}) {
    const { minLoadingTime = 300 } = options

    const isLoading = ref(false)
    const loadingStartTime = ref<number | null>(null)

    /**
     * Start loading state
     */
    function startLoading() {
        isLoading.value = true
        loadingStartTime.value = Date.now()
    }

    /**
     * Stop loading state (respects minimum loading time)
     */
    async function stopLoading() {
        if (loadingStartTime.value) {
            const elapsed = Date.now() - loadingStartTime.value
            const remaining = minLoadingTime - elapsed

            if (remaining > 0) {
                await new Promise((resolve) => setTimeout(resolve, remaining))
            }
        }

        isLoading.value = false
        loadingStartTime.value = null
    }

    /**
     * Wrap an async function with loading state
     */
    async function withLoading<T>(fn: () => Promise<T>): Promise<T> {
        startLoading()
        try {
            return await fn()
        } finally {
            await stopLoading()
        }
    }

    return {
        isLoading: readonly(isLoading),
        startLoading,
        stopLoading,
        withLoading,
    }
}
