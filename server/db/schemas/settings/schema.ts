import { mysqlTable, primaryKey, bigint, varchar, text, char, timestamp, date, unique, int, time } from "drizzle-orm/mysql-core";
import { sql } from "drizzle-orm";

export const settings = mysqlTable("settings", {
	id: bigint({ mode: "number", unsigned: true }).autoincrement().notNull(),
	key: varchar({ length: 255 }).notNull(),
	value: text(),
	type: varchar({ length: 255 }),
	createdAt: timestamp("created_at", { mode: 'string' }),
	updatedAt: timestamp("updated_at", { mode: 'string' }),
},
(table) => [
	primaryKey({ columns: [table.id], name: "settings_id"}),
	unique("settings_key_unique").on(table.key),
]);