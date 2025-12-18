import { mysqlTable, index, primaryKey, bigint, varchar, text, char, int, longtext } from "drizzle-orm/mysql-core";
import { sql } from "drizzle-orm";

export const sessions = mysqlTable("sessions", {
	id: varchar({ length: 255 }).notNull(),
	userId: bigint("user_id", { mode: "number", unsigned: true }),
	ipAddress: varchar("ip_address", { length: 45 }),
	userAgent: text("user_agent"),
	payload: longtext().notNull(),
	lastActivity: int("last_activity").notNull(),
},
(table) => [
	index("sessions_user_id_index").on(table.userId),
	index("sessions_last_activity_index").on(table.lastActivity),
	primaryKey({ columns: [table.id], name: "sessions_id"}),
]);