// server/db/index.ts
import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';

// 1. Import Schema dan Relations hasil generate tadi
import * as relations from './migrations/relations';
import { usersRelations } from './migrations/relations/users';
import * as schema from './migrations/schema';

const connection = mysql.createPool({
    uri: process.env.DATABASE_URL,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// 2. Masukkan keduanya ke dalam config 'schema'
// Kita pakai spread operator (...) untuk menggabungkan objectnya
export const db = drizzle(connection, {
    schema: { ...schema, ...relations, usersRelations },
    mode: 'default'
});