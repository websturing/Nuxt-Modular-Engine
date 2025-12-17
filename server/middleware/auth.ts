import { verifyTokenService } from '@module/auth/auth.service';

export default defineEventHandler(async (event) => {
    const url = event.node.req.url;
    // Skip endpoint public
    if (url?.startsWith('/api/auth') || !url?.startsWith('/api')) return;

    // Ambil Header Authorization
    const authHeader = event.node.req.headers['authorization'];
    if (!authHeader) {
        event.context.user = null;
        return;
    }

    // Format: "Bearer 1|s87asd6..."
    const token = authHeader.split(' ')[1];

    if (token) {
        // Panggil Service verifikasi
        const user = await verifyTokenService(token);
        event.context.user = user || null;
    }
});