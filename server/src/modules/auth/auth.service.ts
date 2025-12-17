import type { LoginInput } from '@shared/schemas/auth';
import { compare } from 'bcryptjs';
import { generateSanctumToken, hashToken } from '../../../utils/sanctum';
import { getUserByEmailRepo, getUserByIdRepo } from '../../modules/users/user.repository';
import { getUserPermissionsRepo, getUserRolesRepo } from './acl.repository';
import { createSanctumTokenRepo, findSanctumTokenRepo } from './auth.repository';

export const loginService = async (input: LoginInput) => {
    // 1. Cek User & Password (Sama kayak sebelumnya)
    const user = await getUserByEmailRepo(input.email);
    if (!user || !(await compare(input.password, user.password))) {
        throw new Error('Email atau Password salah');
    }

    const userRoles = await getUserRolesRepo(user.id);
    const userPermissions = await getUserPermissionsRepo(user.id);
    // 2. Generate Token a la Sanctum
    const { plainTextToken, hashedToken } = generateSanctumToken();

    // 3. Simpan Hash ke DB
    const tokenId = await createSanctumTokenRepo(user.id, 'nuxt-login', hashedToken);

    // 4. Format Token untuk User: "ID|PLAINTEXT"
    // Ini standar Sanctum biar frontend Laravel/Nuxt gampang bacanya
    const finalToken = `${tokenId}|${plainTextToken}`;

    return {
        user: user,
        roles: userRoles,
        permissions: userPermissions,
        token: finalToken
    };
};

export const verifyTokenService = async (bearerToken: string) => {
    // Format token: "1|abcdefg..."
    const [id, plainToken] = bearerToken.split('|');

    if (!plainToken) return null; // Format salah

    // Hash ulang token yang dikirim user
    const hashedInput = hashToken(plainToken);

    // Cari di DB
    const tokenRecord = await findSanctumTokenRepo(hashedInput);

    if (!tokenRecord) return null; // Gak ketemu / palsu

    // (Opsional) Cek Token ID cocok gak biar makin aman
    if (tokenRecord.id !== Number(id)) return null;

    // (Opsional) Cek Expired At kalau kamu set expired
    // if (new Date() > tokenRecord.expiresAt) return null;

    // Ambil user pemilik token
    return await getUserByIdRepo(tokenRecord.tokenableId);
};