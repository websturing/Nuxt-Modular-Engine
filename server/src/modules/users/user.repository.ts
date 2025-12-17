import { desc } from 'drizzle-orm';
import { db } from '../../../db';
import { users } from '../../../db/migrations/schema'; // Pastikan nama 'users' sesuai export di schema.ts kamu

export const getAllUsersRepository = async () => {
    // Select * from users order by created_at desc
    return await db.select()
        .from(users)
        .orderBy(desc(users.createdAt));
};