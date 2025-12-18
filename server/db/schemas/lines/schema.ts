import { mysqlTable, primaryKey, bigint, varchar, char, timestamp, date, int, time } from "drizzle-orm/mysql-core";
import { sql } from "drizzle-orm";

export const lines = mysqlTable("lines", {
	id: bigint({ mode: "number", unsigned: true }).autoincrement().notNull(),
	name: varchar({ length: 255 }).notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }),
	updatedAt: timestamp("updated_at", { mode: 'string' }),
	location: varchar({ length: 450 }),
},
(table) => [
	primaryKey({ columns: [table.id], name: "lines_id"}),
]);