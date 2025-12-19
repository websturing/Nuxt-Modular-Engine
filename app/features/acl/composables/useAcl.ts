import type { PaginationMeta } from "~~/shared/schemas/pagination"

export const useAcl = () => {
    const modules = ref<any>([])
    const meta = ref<PaginationMeta>()

    const fetchModules = async (params: any = {}) => {
        const response = await $api<any>('/acl/modules', { params })
        if (response) {
            modules.value = response.data
            meta.value = response.meta
        }
    }


    return {
        modules,
        meta,
        fetchModules
    };
}