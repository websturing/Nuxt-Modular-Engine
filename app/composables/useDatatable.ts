// composables/useDatatable.ts
export function useDatatable<T>(
    data: Ref<T[]>,
    apiCallback: (params: any) => Promise<void>
) {
    const searchQuery = ref('')
    const currentPage = ref(1)
    const itemsPerPage = ref(10)
    const isLoading = ref(false)

    // Computed untuk filter Local
    const filteredData = computed(() => {
        if (!searchQuery.value) return data.value

        return data.value.filter((item: any) =>
            JSON.stringify(item).toLowerCase().includes(searchQuery.value.toLowerCase())
        )
    })

    // Action: Search Handler
    // Menggunakan debounce untuk menghindari spam API call
    const handleSearch = useDebounceFn(async () => {
        const query = searchQuery.value.toLowerCase()

        // 1. Jika search kosong, reset ke default (fetch server tanpa search)
        if (!query) {
            isLoading.value = true
            try {
                await apiCallback({ search: '', page: 1 })
                currentPage.value = 1
            } finally {
                isLoading.value = false
            }
            return
        }

        // 2. Coba cari di data yang sudah ada (Local)
        const hasLocalMatch = data.value.some((item: any) =>
            JSON.stringify(item).toLowerCase().includes(query)
        )

        // 3. Jika tidak ada di local, baru fetch ke server
        if (!hasLocalMatch) {
            isLoading.value = true
            try {
                await apiCallback({ search: searchQuery.value, page: 1 })
                currentPage.value = 1
            } finally {
                isLoading.value = false
            }
        }
    }, 500)

    // Watch search query changes
    watch(searchQuery, () => {
        handleSearch()
    })

    return {
        searchQuery,
        data: filteredData, // Return filtered data as 'data' untuk transparansi di UI
        originalData: data, // Keep reference to original
        currentPage,
        itemsPerPage,
        isLoading,
        handleSearch
    }
}