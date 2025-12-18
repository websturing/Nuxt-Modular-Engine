import { mysqlTable, primaryKey, bigint, varchar, char, timestamp, foreignKey, date, unique, int, tinyint, time } from "drizzle-orm/mysql-core";
import { sql } from "drizzle-orm";

export const modules = mysqlTable("modules", {
	id: bigint({ mode: "number", unsigned: true }).autoincrement().notNull(),
	name: varchar({ length: 255 }).notNull(),
	slug: varchar({ length: 255 }).notNull(),
	parentId: bigint("parent_id", { mode: "number", unsigned: true }),
	icon: varchar({ length: 255 }),
	order: int().default(0).notNull(),
	isActive: tinyint("is_active").default(1).notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }),
	updatedAt: timestamp("updated_at", { mode: 'string' }),
},
(table) => [
	foreignKey({
			columns: [table.parentId],
			foreignColumns: [table.id],
			name: "modules_parent_id_foreign"
		}).onDelete("cascade"),
	primaryKey({ columns: [table.id], name: "modules_id"}),
	unique("modules_slug_unique").on(table.slug),
]);