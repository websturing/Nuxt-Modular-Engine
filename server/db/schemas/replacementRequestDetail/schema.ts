import { mysqlTable, primaryKey, bigint, varchar, char, timestamp, date, int, time } from "drizzle-orm/mysql-core";
import { sql } from "drizzle-orm";

export const replacementRequestDetail = mysqlTable("replacement_request_detail", {
	id: bigint({ mode: "number", unsigned: true }).autoincrement().notNull(),
	glNo: varchar("gl_no", { length: 191 }).notNull(),
	size: varchar({ length: 10 }).notNull(),
	color: varchar({ length: 255 }).notNull(),
	pcs: int().notNull(),
	lineId: bigint("line_id", { mode: "number" }).notNull(),
	layingPlanningId: int("laying_planning_id"),
	description: varchar({ length: 255 }).notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }),
	updatedAt: timestamp("updated_at", { mode: 'string' }),
	replacementRequestId: int("replacement_request_id"),
},
(table) => [
	primaryKey({ columns: [table.id], name: "replacement_request_detail_id"}),
]);