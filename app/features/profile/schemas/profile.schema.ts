import { z } from 'zod';

export const ProfileFormSchema = z.object({
    email: z.string().email(),
    name: z.string(),
})

export type ProfileForm = z.infer<typeof ProfileFormSchema>
