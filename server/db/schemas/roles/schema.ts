import { mysqlTable, primaryKey, bigint, varchar, char, timestamp, date, unique, int, time } from "drizzle-orm/mysql-core";
import { sql } from "drizzle-orm";

export const roles = mysqlTable("roles", {
	id: bigint({ mode: "number", unsigned: true }).autoincrement().notNull(),
	name: varchar({ length: 255 }).notNull(),
	guardName: varchar("guard_name", { length: 255 }).notNull(),
	color: varchar({ length: 255 }).default('#6c757d').notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }),
	updatedAt: timestamp("updated_at", { mode: 'string' }),
},
(table) => [
	primaryKey({ columns: [table.id], name: "roles_id"}),
	unique("roles_name_guard_name_unique").on(table.name, table.guardName),
]);