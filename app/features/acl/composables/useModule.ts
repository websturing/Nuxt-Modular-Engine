

export const useModule = async () => {
    const { modules, meta, fetchModules } = useAcl()
    const isLoading = ref(false)
    const page = ref(1)

    const loadData = async () => {
        isLoading.value = true
        try {
            await fetchModules({ page: page.value })
        } finally {
            isLoading.value = false
        }
    }

    watch(page, () => {
        loadData()
    })
    await loadData()

    return {
        modules,
        meta,
        fetchModules,
        isLoading,
        page
    }
}