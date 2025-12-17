import { db } from '@db';
import { personalAccessTokens } from '@db/migrations/schema';
import { eq } from 'drizzle-orm';

// Simpan Token a la Sanctum
export const createSanctumTokenRepo = async (userId: number, name: string, hashedToken: string) => {
    const result = await db.insert(personalAccessTokens).values({
        tokenableType: 'App\\Models\\User', // Samain kayak Laravel biar kompatibel
        tokenableId: userId,
        name: name,
        token: hashedToken,
        abilities: '["*"]', // Full access
        lastUsedAt: new Date(), // Set waktu sekarang
        createdAt: new Date(),
        updatedAt: new Date(),
    });

    // Di MySQL, insertId adalah ID dari row yang baru dibuat
    return result[0].insertId;
};

// Cari Token (Untuk validasi user login)
export const findSanctumTokenRepo = async (hashedToken: string) => {
    const result = await db.select()
        .from(personalAccessTokens)
        .where(eq(personalAccessTokens.token, hashedToken))
        .limit(1);

    return result[0];
};

// Logout (Hapus Token)
export const deleteSanctumTokenRepo = async (tokenId: number) => {
    await db.delete(personalAccessTokens).where(eq(personalAccessTokens.id, tokenId));
};