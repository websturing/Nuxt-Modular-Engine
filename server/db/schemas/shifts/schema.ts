import { mysqlTable, primaryKey, bigint, varchar, char, timestamp, date, int, tinyint, time } from "drizzle-orm/mysql-core";
import { sql } from "drizzle-orm";

export const shifts = mysqlTable("shifts", {
	id: bigint({ mode: "number", unsigned: true }).autoincrement().notNull(),
	name: varchar({ length: 255 }).notNull(),
	startTime: time("start_time").notNull(),
	endTime: time("end_time").notNull(),
	tolerance: time().notNull(),
	isNightShift: tinyint("is_night_shift").default(0).notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }),
	updatedAt: timestamp("updated_at", { mode: 'string' }),
},
(table) => [
	primaryKey({ columns: [table.id], name: "shifts_id"}),
]);