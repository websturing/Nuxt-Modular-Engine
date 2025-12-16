// composables/useApi.ts
import { useAuthStore } from '~/stores/auth'

export const useApi = <T>(request: string | (() => string), opts: any = {}) => {
    const config = useRuntimeConfig()
    const authStore = useAuthStore()

    return useFetch<T>(request, {
        baseURL: config.public.apiBase,
        ...opts,

        onRequest({ options }) {
            if (authStore.token) {
                // Copy headers lama (jika ada) lalu tambahkan Authorization
                options.headers = {
                    ...options.headers,
                    Authorization: `Bearer ${authStore.token}`
                } as any
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