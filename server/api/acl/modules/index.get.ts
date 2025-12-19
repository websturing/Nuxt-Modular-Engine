
import { aclModuleService } from '@module/acl/aclModule.service'
import { defineApiHandler } from '@server/utils/defineApiHandler'
import { getApiQuery } from '@server/utils/getApiQuery'

export default defineApiHandler(async (event) => {
    // 👇 Panggil getQuery seperti biasa
    const query = getApiQuery(event)

    const page = Number(query.page) || 1
    const perPage = Number(query.perPage) || 10
    const search = query.search || ''

    const result = await aclModuleService.getList(page, perPage, search)

    return {
        success: true,
        ...result
    }
})
