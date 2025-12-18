import { mysqlTable, primaryKey, bigint, varchar, char, timestamp, date, unique, int, time } from "drizzle-orm/mysql-core";
import { sql } from "drizzle-orm";
import { modules } from "../modules/schema";

export const modulePermissions = mysqlTable("module_permissions", {
	id: bigint({ mode: "number", unsigned: true }).autoincrement().notNull(),
	moduleId: bigint("module_id", { mode: "number", unsigned: true }).notNull().references(() => modules.id, { onDelete: "cascade" } ),
	action: varchar({ length: 255 }).notNull(),
	permissionName: varchar("permission_name", { length: 255 }).notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }),
	updatedAt: timestamp("updated_at", { mode: 'string' }),
},
(table) => [
	primaryKey({ columns: [table.id], name: "module_permissions_id"}),
	unique("module_permissions_permission_name_unique").on(table.permissionName),
]);