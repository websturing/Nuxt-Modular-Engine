import { mysqlTable, primaryKey, bigint, varchar, text, char, timestamp, unique, int, longtext, time } from "drizzle-orm/mysql-core";
import { sql } from "drizzle-orm";

export const failedJobs = mysqlTable("failed_jobs", {
	id: bigint({ mode: "number", unsigned: true }).autoincrement().notNull(),
	uuid: varchar({ length: 255 }).notNull(),
	connection: text().notNull(),
	queue: text().notNull(),
	payload: longtext().notNull(),
	exception: longtext().notNull(),
	failedAt: timestamp("failed_at", { mode: 'string' }).defaultNow().notNull(),
},
(table) => [
	primaryKey({ columns: [table.id], name: "failed_jobs_id"}),
	unique("failed_jobs_uuid_unique").on(table.uuid),
]);