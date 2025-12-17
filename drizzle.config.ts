import { defineConfig } from 'drizzle-kit'

export default defineConfig({
    schema: "./server/db/schema.ts", // File ini nanti akan DITULIS OTOMATIS oleh Drizzle
    out: "./server/db/migrations",
    dialect: 'mysql',
    dbCredentials: {
        url: process.env.DATABASE_URL as string,
    },
})