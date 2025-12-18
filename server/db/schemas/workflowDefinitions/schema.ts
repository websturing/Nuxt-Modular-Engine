import { mysqlTable, primaryKey, bigint, varchar, text, char, timestamp, date, int, tinyint, time } from "drizzle-orm/mysql-core";
import { sql } from "drizzle-orm";

export const workflowDefinitions = mysqlTable("workflow_definitions", {
	id: bigint({ mode: "number", unsigned: true }).autoincrement().notNull(),
	name: varchar({ length: 255 }).notNull(),
	description: text(),
	isActive: tinyint("is_active").default(1).notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }),
	updatedAt: timestamp("updated_at", { mode: 'string' }),
},
(table) => [
	primaryKey({ columns: [table.id], name: "workflow_definitions_id"}),
]);