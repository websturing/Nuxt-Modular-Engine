import { z } from "zod"

export const PaginationMetaSchema = z.object({
    page: z.number(),
    perPage: z.number(),
    total: z.number(),
    lastPage: z.number(),
    hasNext: z.boolean(),
    hasPrev: z.boolean(),
})


export const PaginatedResultSchema = z.object({
    meta: PaginationMetaSchema,
    data: z.array(z.any()),
})

export type PaginationMeta = z.infer<typeof PaginationMetaSchema>
export type PaginatedResult<T> = z.infer<typeof PaginatedResultSchema>
