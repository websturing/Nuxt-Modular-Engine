import { mysqlTable, index, primaryKey, bigint, varchar, text, char, timestamp, date, unique, int, time } from "drizzle-orm/mysql-core";
import { sql } from "drizzle-orm";

export const personalAccessTokens = mysqlTable("personal_access_tokens", {
	id: bigint({ mode: "number", unsigned: true }).autoincrement().notNull(),
	tokenableType: varchar("tokenable_type", { length: 255 }).notNull(),
	tokenableId: bigint("tokenable_id", { mode: "number", unsigned: true }).notNull(),
	name: varchar({ length: 255 }).notNull(),
	token: varchar({ length: 64 }).notNull(),
	abilities: text(),
	lastUsedAt: timestamp("last_used_at", { mode: 'string' }),
	expiresAt: timestamp("expires_at", { mode: 'string' }),
	createdAt: timestamp("created_at", { mode: 'string' }),
	updatedAt: timestamp("updated_at", { mode: 'string' }),
},
(table) => [
	index("personal_access_tokens_tokenable_type_tokenable_id_index").on(table.tokenableType, table.tokenableId),
	primaryKey({ columns: [table.id], name: "personal_access_tokens_id"}),
	unique("personal_access_tokens_token_unique").on(table.token),
]);