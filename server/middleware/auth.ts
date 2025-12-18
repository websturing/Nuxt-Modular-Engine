import { verifyTokenService } from '@module/auth/auth.service';

export default defineEventHandler(async (event) => {
    const url = event.node.req.url || '';

    // 1. Bypass non-API requests
    // We restrict protection to backend endpoints, excluding frontend assets (HTML/CSS/JS).
    if (!url.startsWith('/api')) {
        return;
    }

    // 2. Public Route Whitelist
    // Define endpoints accessible without authentication here.
    const publicRoutes = [
        '/api/auth/login',
        '/api/auth/register',
        '/api/_nuxt_icon', // ✅ Nuxt Icon internal API
        // '/api/public/something'
    ];

    // Logic: Permit access if the request URL matches any whitelisted public route.
    const isPublic = publicRoutes.some(route => url.startsWith(route));

    if (isPublic) {
        return; // Access granted; token verification skipped.
    }

    // --- SECURITY CHECK INITIATED (PROTECTED ZONE) ---

    // 3. Retrieve Authentication Token from Header
    const authHeader = event.node.req.headers['authorization'];
    const token = authHeader?.split(' ')[1]; // Format: "Bearer <token>"

    if (!token) {
        // ❌ Missing token? Deny access.
        throw createError({
            statusCode: 401,
            statusMessage: 'Unauthorized',
            message: 'Authentication required. Please log in to access this resource.'
        });
    }

    // 4. Verify Token validity
    try {
        const user = await verifyTokenService(token);

        if (!user) {
            // ❌ Invalid or expired token? Deny access.
            throw createError({
                statusCode: 401,
                statusMessage: 'Unauthorized',
                message: 'Your session has expired. Please log in again.'
            });
        }

        // ✅ Token Valid! Attach user data to context.
        // Make user data available for downstream controllers via event.context.user.
        event.context.user = user;

    } catch (error) {
        // Token validation error
        throw createError({
            statusCode: 401,
            statusMessage: 'Unauthorized',
            message: 'Invalid authentication token.'
        });
    }
});