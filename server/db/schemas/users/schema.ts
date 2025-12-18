import { mysqlTable, primaryKey, bigint, varchar, char, timestamp, date, unique, int, time } from "drizzle-orm/mysql-core";
import { sql } from "drizzle-orm";

export const users = mysqlTable("users", {
	id: bigint({ mode: "number", unsigned: true }).autoincrement().notNull(),
	name: varchar({ length: 255 }).notNull(),
	email: varchar({ length: 255 }).notNull(),
	emailVerifiedAt: timestamp("email_verified_at", { mode: 'string' }),
	password: varchar({ length: 255 }).notNull(),
	rememberToken: varchar("remember_token", { length: 100 }),
	createdAt: timestamp("created_at", { mode: 'string' }),
	updatedAt: timestamp("updated_at", { mode: 'string' }),
},
(table) => [
	primaryKey({ columns: [table.id], name: "users_id"}),
	unique("users_email_unique").on(table.email),
]);