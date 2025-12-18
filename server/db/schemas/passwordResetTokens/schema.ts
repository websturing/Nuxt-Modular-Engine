import { mysqlTable, primaryKey, varchar, char, timestamp, time } from "drizzle-orm/mysql-core";
import { sql } from "drizzle-orm";

export const passwordResetTokens = mysqlTable("password_reset_tokens", {
	email: varchar({ length: 255 }).notNull(),
	token: varchar({ length: 255 }).notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }),
},
(table) => [
	primaryKey({ columns: [table.email], name: "password_reset_tokens_email"}),
]);