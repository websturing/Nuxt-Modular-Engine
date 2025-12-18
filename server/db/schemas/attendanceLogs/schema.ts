import { mysqlTable, primaryKey, bigint, varchar, text, char, timestamp, date, mysqlEnum, datetime, decimal, int, time } from "drizzle-orm/mysql-core";
import { sql } from "drizzle-orm";
import { attendances } from "../attendances/schema";

export const attendanceLogs = mysqlTable("attendance_logs", {
	id: bigint({ mode: "number", unsigned: true }).autoincrement().notNull(),
	attendanceId: bigint("attendance_id", { mode: "number", unsigned: true }).notNull().references(() => attendances.id, { onDelete: "cascade" } ),
	logType: mysqlEnum("log_type", ['check_in','check_out','location','retry','error']).notNull(),
	timestamp: datetime({ mode: 'string'}).notNull(),
	latitude: decimal({ precision: 10, scale: 8 }),
	longitude: decimal({ precision: 11, scale: 8 }),
	accuracy: decimal({ precision: 6, scale: 2 }),
	deviceId: varchar("device_id", { length: 255 }),
	notes: text(),
	createdAt: timestamp("created_at", { mode: 'string' }),
	updatedAt: timestamp("updated_at", { mode: 'string' }),
},
(table) => [
	primaryKey({ columns: [table.id], name: "attendance_logs_id"}),
]);