import { z } from 'zod';

export const LoginSchema = z.object({
    email: z
        .string()
        .min(1, 'Email is Required')
        .email('Format email is invalid'),
    password: z
        .string()
        .min(6, 'Password must be at least 6 characters'),
});

// Export type untuk digunakan di props atau API
export type LoginPayload = z.infer<typeof LoginSchema>;