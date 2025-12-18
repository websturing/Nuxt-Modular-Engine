import { mysqlTable, index, primaryKey, bigint, varchar, text, char, int, longtext, tinyint } from "drizzle-orm/mysql-core";
import { sql } from "drizzle-orm";

export const jobs = mysqlTable("jobs", {
	id: bigint({ mode: "number", unsigned: true }).autoincrement().notNull(),
	queue: varchar({ length: 255 }).notNull(),
	payload: longtext().notNull(),
	attempts: tinyint({ unsigned: true }).notNull(),
	reservedAt: int("reserved_at", { unsigned: true }),
	availableAt: int("available_at", { unsigned: true }).notNull(),
	createdAt: int("created_at", { unsigned: true }).notNull(),
},
(table) => [
	index("jobs_queue_index").on(table.queue),
	primaryKey({ columns: [table.id], name: "jobs_id"}),
]);