import { mysqlTable, primaryKey, bigint, varchar, char, timestamp, date, int, time } from "drizzle-orm/mysql-core";
import { sql } from "drizzle-orm";

export const gls = mysqlTable("gls", {
	id: bigint({ mode: "number", unsigned: true }).autoincrement().notNull(),
	glNumber: varchar("gl_number", { length: 255 }).notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }),
	updatedAt: timestamp("updated_at", { mode: 'string' }),
},
(table) => [
	primaryKey({ columns: [table.id], name: "gls_id"}),
]);