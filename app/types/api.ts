import { z } from 'zod';

// Factory Function untuk membuat schema API Response
export const createApiResponse = <T extends z.ZodTypeAny>(dataSchema: T) =>
    z.object({
        status: z.boolean(),
        message: z.string(),
        // Data bisa berupa object, array, atau null tergantung endpoint
        data: dataSchema,
    });

// Type helper untuk TypeScript inference
export type ApiResponse<T> = {
    status: boolean;
    message: string;
    data: T;
};