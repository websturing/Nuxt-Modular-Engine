import { db } from '@db';
import { users } from '@db/migrations/schema';
import { desc, eq } from 'drizzle-orm';

// Get All
export const getAllUsersRepo = async () => {
    return await db.select({
        id: users.id,
        name: users.name,
        email: users.email,
        createdAt: users.createdAt,
    })
        .from(users)
        .orderBy(desc(users.createdAt));
};

// Get By ID
export const getUserByIdRepo = async (id: number) => {
    const result = await db.select()
        .from(users)
        .where(eq(users.id, id))
        .limit(1);
    return result[0];
};

// Get By Email (untuk cek duplikat)
export const getUserByEmailRepo = async (email: string) => {
    const result = await db.select()
        .from(users)
        .where(eq(users.email, email))
        .limit(1);
    return result[0];
};



// Delete
export const deleteUserRepo = async (id: number) => {
    return await db.delete(users).where(eq(users.id, id));
};