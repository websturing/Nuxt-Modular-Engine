// composables/useApi.ts
import { camelizeKeys, decamelizeKeys } from 'humps';
import { useAuthStore } from '~/stores/auth';

const createApiOptions = () => {
    const config = useRuntimeConfig()
    const authStore = useAuthStore()

    return {
        baseURL: config.public.apiBase,
        onRequest({ options }: any) {
            if (authStore.token) {
                options.headers = {
                    ...options.headers,
                    Authorization: `Bearer ${authStore.token}`
                }
            }

            if (options.body && !(options.body instanceof FormData)) {
                options.body = decamelizeKeys(options.body)
            }

            if (options.params) {
                options.params = decamelizeKeys(options.params)
            }
            if (options.query) {
                options.query = decamelizeKeys(options.query)
            }
        },

        onResponse({ response }: any) {
            if (response._data && typeof response._data === 'object') {
                response._data = camelizeKeys(response._data)
            }
        },

        onResponseError({ response }: any) {
            if (response.status === 401) {
                if (authStore.token) {
                    console.warn('Session expired (401). Logging out...')
                    authStore.logout()
                }
            }
        }
    }
}

// Untuk penggunaan di dalam setup() / top-level (Reactive)
export const useApi = <T>(request: string | (() => string), opts: any = {}) => {
    const options = createApiOptions()
    return useFetch<T>(request, {
        ...options,
        ...opts
    })
}

// Untuk penggunaan di dalam function / action (Imperative)
export const $api = <T>(request: string, opts: any = {}) => {
    const options = createApiOptions()
    return $fetch<T>(request, {
        ...options,
        ...opts
    })
}