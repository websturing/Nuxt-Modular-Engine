// schemas/auth.ts
import { z } from 'zod';
import { createApiResponse } from '../types/api';

export const LoginFormSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
})

const PermissionsSchema = z.array(z.string())

const UserSchema = z.object({
    id: z.number(),
    name: z.string(),
    email: z.string().email(),
    emailVerifiedAt: z.string().nullable(),
    createdAt: z.string(),
    updatedAt: z.string(),
    roleNames: z.array(z.string()),
});

export const LoginDataSchema = z.object({
    status: z.boolean(),
    accessToken: z.string(),
    tokenType: z.string(),
    user: UserSchema,
    roles: z.array(z.string()),
    permissions: z.array(z.string())
});

export const LoginResponseSchema = createApiResponse(LoginDataSchema);
export type LoginForm = z.infer<typeof LoginFormSchema>
export type User = z.infer<typeof UserSchema>
export type Permissions = z.infer<typeof PermissionsSchema>
export type LoginResponse = z.infer<typeof LoginResponseSchema>