import { mysqlTable, primaryKey, bigint, timestamp, date, int, time } from "drizzle-orm/mysql-core";
import { sql } from "drizzle-orm";
import { users } from "../users/schema";
import { shifts } from "../shifts/schema";

export const userShiftAssignments = mysqlTable("user_shift_assignments", {
	id: bigint({ mode: "number", unsigned: true }).autoincrement().notNull(),
	userId: bigint("user_id", { mode: "number", unsigned: true }).notNull().references(() => users.id, { onDelete: "cascade" } ),
	shiftId: bigint("shift_id", { mode: "number", unsigned: true }).notNull().references(() => shifts.id, { onDelete: "cascade" } ),
	// you can use { mode: 'date' }, if you want to have Date as type for this column
	effectiveDateStart: date("effective_date_start", { mode: 'string' }).notNull(),
	// you can use { mode: 'date' }, if you want to have Date as type for this column
	effectiveDateEnd: date("effective_date_end", { mode: 'string' }),
	createdAt: timestamp("created_at", { mode: 'string' }),
	updatedAt: timestamp("updated_at", { mode: 'string' }),
},
(table) => [
	primaryKey({ columns: [table.id], name: "user_shift_assignments_id"}),
]);