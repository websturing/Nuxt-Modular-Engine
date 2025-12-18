import { mysqlTable, primaryKey, bigint, varchar, char, timestamp, date, unique, int, time } from "drizzle-orm/mysql-core";
import { sql } from "drizzle-orm";

export const permissions = mysqlTable("permissions", {
	id: bigint({ mode: "number", unsigned: true }).autoincrement().notNull(),
	name: varchar({ length: 255 }).notNull(),
	guardName: varchar("guard_name", { length: 255 }).notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }),
	updatedAt: timestamp("updated_at", { mode: 'string' }),
},
(table) => [
	primaryKey({ columns: [table.id], name: "permissions_id"}),
	unique("permissions_name_guard_name_unique").on(table.name, table.guardName),
]);