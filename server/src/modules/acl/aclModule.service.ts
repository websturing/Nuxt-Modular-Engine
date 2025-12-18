import type { PaginatedResult } from '@shared/schemas/pagination'
import { moduleRepository } from './acl.repository'

const MAX_PER_PAGE = 100

export const aclModuleService = {
    /**
     * Mengambil daftar module dengan pagination.
     * Aman untuk Public API karena input divalidasi.
     */
    async getList(page: number = 1, perPage: number = 10): Promise<PaginatedResult<any>> {

        const safePage = Math.max(1, page)
        const safePerPage = Math.max(1, Math.min(MAX_PER_PAGE, perPage))
        const offset = (safePage - 1) * safePerPage

        const [data, total] = await Promise.all([
            moduleRepository.findMany({ offset, limit: safePerPage }),
            moduleRepository.count()
        ])

        const lastPage = Math.ceil(total / safePerPage)

        return {
            data,
            meta: {
                page: safePage,
                perPage: safePerPage,
                total,
                lastPage,
                hasNext: safePage < lastPage,
                hasPrev: safePage > 1
            }
        }
    }
}