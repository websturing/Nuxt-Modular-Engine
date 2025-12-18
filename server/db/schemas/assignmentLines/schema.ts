import { mysqlTable, primaryKey, bigint, timestamp, date, int, tinyint, time } from "drizzle-orm/mysql-core";
import { sql } from "drizzle-orm";
import { users } from "../users/schema";
import { lines } from "../lines/schema";
import { gls } from "../gls/schema";

export const assignmentLines = mysqlTable("assignment_lines", {
	id: bigint({ mode: "number", unsigned: true }).autoincrement().notNull(),
	userId: bigint("user_id", { mode: "number", unsigned: true }).notNull().references(() => users.id, { onDelete: "cascade" } ),
	lineId: bigint("line_id", { mode: "number", unsigned: true }).notNull().references(() => lines.id, { onDelete: "cascade" } ),
	glId: bigint("gl_id", { mode: "number", unsigned: true }).notNull().references(() => gls.id, { onDelete: "cascade" } ),
	isActive: tinyint("is_active").default(1).notNull(),
	// you can use { mode: 'date' }, if you want to have Date as type for this column
	dateStart: date("date_start", { mode: 'string' }),
	// you can use { mode: 'date' }, if you want to have Date as type for this column
	dateEnd: date("date_end", { mode: 'string' }),
	startedAt: timestamp("started_at", { mode: 'string' }),
	completedAt: timestamp("completed_at", { mode: 'string' }),
	createdAt: timestamp("created_at", { mode: 'string' }),
	updatedAt: timestamp("updated_at", { mode: 'string' }),
},
(table) => [
	primaryKey({ columns: [table.id], name: "assignment_lines_id"}),
]);