import crypto from 'node:crypto';

export const generateSanctumToken = () => {
    // 1. Bikin random string (40 karakter)
    const plainTextToken = crypto.randomBytes(40).toString('hex');

    // 2. Hash string tersebut dengan SHA-256 (Cara Laravel simpan di DB)
    const hashedToken = crypto
        .createHash('sha256')
        .update(plainTextToken)
        .digest('hex');

    return {
        plainTextToken, // Ini yang dikasih ke User (jangn simpan di DB!)
        hashedToken     // Ini yang disimpan di DB
    };
};

export const hashToken = (token: string) => {
    return crypto.createHash('sha256').update(token).digest('hex');
};