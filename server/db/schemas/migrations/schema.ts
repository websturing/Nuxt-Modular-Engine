import { mysqlTable, primaryKey, varchar, char, int } from "drizzle-orm/mysql-core";
import { sql } from "drizzle-orm";

export const migrations = mysqlTable("migrations", {
	id: int({ unsigned: true }).autoincrement().notNull(),
	migration: varchar({ length: 255 }).notNull(),
	batch: int().notNull(),
},
(table) => [
	primaryKey({ columns: [table.id], name: "migrations_id"}),
]);