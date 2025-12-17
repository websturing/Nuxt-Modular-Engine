import jwt from 'jsonwebtoken';

const ACCESS_SECRET = process.env.JWT_ACCESS_SECRET || 'rahasia-akses';
const REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'rahasia-refresh';

// Tipe data payload token
interface TokenPayload {
    id: number;
    role: string;
}

// 1. Bikin Access Token (Pendek: 15 Menit)
export const generateAccessToken = (user: TokenPayload) => {
    return jwt.sign({ id: user.id, role: user.role }, ACCESS_SECRET, { expiresIn: '15m' });
};

// 2. Bikin Refresh Token (Panjang: 7 Hari)
export const generateRefreshToken = (user: { id: number }) => {
    return jwt.sign({ id: user.id }, REFRESH_SECRET, { expiresIn: '7d' });
};

// 3. Verifikasi Access Token (Dipakai Middleware)
export const verifyAccessToken = (token: string) => {
    try {
        return jwt.verify(token, ACCESS_SECRET) as TokenPayload;
    } catch (e) {
        return null; // Token palsu / expired
    }
};

// 4. Verifikasi Refresh Token (Dipakai endpoint /refresh)
export const verifyRefreshToken = (token: string) => {
    try {
        return jwt.verify(token, REFRESH_SECRET) as { id: number };
    } catch (e) {
        return null;
    }
};