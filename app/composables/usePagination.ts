import type { PaginationMeta } from '@shared/schemas/pagination'
import { camelizeKeys } from 'humps'

/**
 * usePagination (Pure Client Logic)
 * Focus: Mengubah meta snake_case -> camelCase & mengatur reactivity page.
 * TIDAK melakukan fetch data. Cocok untuk Pinia.
 */
export const usePagination = (metaInput: MaybeRefOrGetter<any>) => {
    // 1. Reactive Page State (bisa di-bind ke UI)
    const page = ref(1)
    const perPage = ref(10)

    // 2. Computed Meta (Read Only)
    // Otomatis convert snake_case (API) -> camelCase (Frontend)
    const meta = computed<PaginationMeta>(() => {
        const raw = toValue(metaInput)

        // Safety check
        if (!raw) {
            return {
                page: 1,
                perPage: 10,
                total: 0,
                lastPage: 1,
                hasNext: false,
                hasPrev: false
            }
        }

        // Convert key: last_page -> lastPage
        return camelizeKeys(raw) as PaginationMeta
    })

    // 3. Sync State (Optional but handy)
    // Jika meta berubah (misal fetch baru), update page lokal jika perlu
    watch(() => meta.value.page, (val) => {
        if (val) page.value = val
    }, { immediate: true })

    // 4. Actions Helpers
    const nextPage = () => {
        if (meta.value.hasNext) page.value++
    }

    const prevPage = () => {
        if (meta.value.hasPrev) page.value--
    }

    return {
        // State yang bisa berubah (untuk v-model)
        page,
        perPage,

        // Meta hasil convert
        meta,

        // Actions
        nextPage,
        prevPage
    }
}
