import { mysqlTable, primaryKey, bigint, text, timestamp, date, mysqlEnum, datetime, unique, int, time } from "drizzle-orm/mysql-core";
import { sql } from "drizzle-orm";
import { users } from "../users/schema";

export const attendances = mysqlTable("attendances", {
	id: bigint({ mode: "number", unsigned: true }).autoincrement().notNull(),
	userId: bigint("user_id", { mode: "number", unsigned: true }).notNull().references(() => users.id, { onDelete: "cascade" } ),
	// you can use { mode: 'date' }, if you want to have Date as type for this column
	attendanceDate: date("attendance_date", { mode: 'string' }).notNull(),
	checkInTime: datetime("check_in_time", { mode: 'string'}),
	checkOutTime: datetime("check_out_time", { mode: 'string'}),
	status: mysqlEnum(['present','late','absent','on_leave','wfh']),
	note: text(),
	createdAt: timestamp("created_at", { mode: 'string' }),
	updatedAt: timestamp("updated_at", { mode: 'string' }),
},
(table) => [
	primaryKey({ columns: [table.id], name: "attendances_id"}),
	unique("attendances_user_id_attendance_date_unique").on(table.userId, table.attendanceDate),
]);