// composables/useApi.ts
import { camelizeKeys, decamelizeKeys } from 'humps'; // 1. Import Humps
import { useAuthStore } from '~/stores/auth';

export const useApi = <T>(request: string | (() => string), opts: any = {}) => {
    const config = useRuntimeConfig()
    const authStore = useAuthStore()

    return useFetch<T>(request, {
        baseURL: config.public.apiBase,
        ...opts,

        onRequest({ options }) {

            if (authStore.token) {
                options.headers = {
                    ...options.headers,
                    Authorization: `Bearer ${authStore.token}`
                } as any
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

        onResponse({ response }) {
            if (response._data && typeof response._data === 'object') {
                response._data = camelizeKeys(response._data) as any
            }
        },

        onResponseError({ response }) {
            if (response.status === 401) {
                if (authStore.token) {
                    console.warn('Session expired (401). Logging out...')
                    authStore.logout()
                }
            }
        }
    })
}