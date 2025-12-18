import { moduleRepository } from "./acl.repository";


export const aclModuleService = {
    async getList() {
        const result = await moduleRepository.findMany({ skip: 0, take: 1 });
        return result;
    },
    async getPagination(page: number = 1, perPage: number = 10) {
        // 1. Hitung Offset (Logic)
        // Page 1: skip 0, Page 2: skip 10
        const skip = (page - 1) * perPage

        // 2. Eksekusi Paralel (Efficiency Tip!)
        // Gunakan Promise.all agar query data & query count jalan berbarengan
        const [data, total] = await Promise.all([
            moduleRepository.findMany({ skip, take: perPage }),
            moduleRepository.count()
        ])

        // 3. Susun Return Data + Meta (Logic Bisnis)
        const lastPage = Math.ceil(total / perPage)

        return {
            data,
            meta: {
                page,
                perPage,
                total,
                lastPage,
                hasNext: page < lastPage,
                hasPrev: page > 1
            }
        }
    }


}