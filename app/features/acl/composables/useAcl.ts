import type { PaginationMeta } from "~~/shared/schemas/pagination"

export const useAcl = () => {
    const modules = ref<any>([])
    const meta = ref<PaginationMeta>()

    const fetchModules = async (params: any = {}) => {
        const { data } = await useApi<any>('/acl/modules', { params })
        if (data.value) {
            modules.value = data.value.data
            meta.value = data.value.meta
        }
    }


    return {
        modules,
        meta,
        fetchModules
    };
}