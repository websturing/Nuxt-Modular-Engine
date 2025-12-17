import { loginSchema } from '@shared/schemas/auth';
import { createError, defineEventHandler, getRequestHeader, readValidatedBody } from 'h3';
import { loginService } from './auth.service';

// --- 1. LOGIN ---
export const loginController = defineEventHandler(async (event) => {
    // Validasi Input (Email/Pass)
    const body = await readValidatedBody(event, (b) => loginSchema.parse(b));

    try {
        // Panggil Service (Dapet User + Token Sanctum)
        const result = await loginService(body);

        // Return JSON ke Frontend/Mobile
        return {
            success: true,
            message: 'Login berhasil',
            data: result // Isinya: { user: {...}, token: "1|abcdef..." }
        };

    } catch (error: any) {
        throw createError({ statusCode: 401, message: error.message });
    }
});

// --- 2. GET ME (Cek siapa yang login) ---
export const meController = defineEventHandler(async (event) => {
    // User otomatis diisi oleh Middleware auth.ts yang kita buat tadi
    const user = event.context.user;

    if (!user) {
        throw createError({ statusCode: 401, message: 'Unauthenticated' });
    }

    return {
        success: true,
        data: user
    };
});

// --- 3. LOGOUT ---
export const logoutController = defineEventHandler(async (event) => {
    // Ambil token dari Header: "Bearer 1|abc..."
    const authHeader = getRequestHeader(event, 'Authorization');

    if (authHeader) {
        const token = authHeader.split(' ')[1]; // Ambil "1|abc..."
        // Kita hapus token dari DB
        // Note: Kamu perlu update logoutService di auth.service.ts untuk nerima token string dan hapus berdasarkan ID token
        // Tapi untuk MVP, hapus di client side (buang token) juga cukup.
        // Jika mau strict DB logout:
        // await logoutService(token); 
    }

    return { success: true, message: 'Logout berhasil' };
});