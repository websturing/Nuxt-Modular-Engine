import { mysqlTable, index, primaryKey, bigint, varchar, text, json, char, timestamp, date, int, time } from "drizzle-orm/mysql-core";
import { sql } from "drizzle-orm";

export const activityLog = mysqlTable("activity_log", {
	id: bigint({ mode: "number", unsigned: true }).autoincrement().notNull(),
	logName: varchar("log_name", { length: 255 }),
	description: text().notNull(),
	subjectType: varchar("subject_type", { length: 255 }),
	event: varchar({ length: 255 }),
	subjectId: bigint("subject_id", { mode: "number", unsigned: true }),
	causerType: varchar("causer_type", { length: 255 }),
	causerId: bigint("causer_id", { mode: "number", unsigned: true }),
	properties: json(),
	batchUuid: char("batch_uuid", { length: 36 }),
	createdAt: timestamp("created_at", { mode: 'string' }),
	updatedAt: timestamp("updated_at", { mode: 'string' }),
},
(table) => [
	index("subject").on(table.subjectType, table.subjectId),
	index("causer").on(table.causerType, table.causerId),
	index("activity_log_log_name_index").on(table.logName),
	primaryKey({ columns: [table.id], name: "activity_log_id"}),
]);