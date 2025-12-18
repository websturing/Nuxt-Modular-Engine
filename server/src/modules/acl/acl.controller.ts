import { aclModuleService } from "./acl.service";

export const HandleModules = defineEventHandler(async () => {
    const modules = await aclModuleService.getList();
    return modules;
})

export const HandleModulesPagination = defineEventHandler(async (event) => {
    const query = getQuery(event)
    const page = Number(query.page) || 1
    const perPage = Number(query.perPage) || 10

    const modules = await aclModuleService.getPagination(page, perPage);
    return modules;
})
