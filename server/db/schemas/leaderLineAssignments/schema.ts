import { mysqlTable, index, primaryKey, bigint, timestamp, date, unique, int, tinyint, time } from "drizzle-orm/mysql-core";
import { sql } from "drizzle-orm";
import { users } from "../users/schema";
import { lines } from "../lines/schema";

export const leaderLineAssignments = mysqlTable("leader_line_assignments", {
	id: bigint({ mode: "number", unsigned: true }).autoincrement().notNull(),
	userId: bigint("user_id", { mode: "number", unsigned: true }).notNull().references(() => users.id),
	lineId: bigint("line_id", { mode: "number", unsigned: true }).notNull().references(() => lines.id),
	assignedAt: timestamp("assigned_at", { mode: 'string' }).default('2025-11-24 21:35:56'),
	unassignedAt: timestamp("unassigned_at", { mode: 'string' }),
	isActive: tinyint("is_active").default(1).notNull(),
	createdBy: bigint("created_by", { mode: "number", unsigned: true }),
	updatedBy: bigint("updated_by", { mode: "number", unsigned: true }),
	createdAt: timestamp("created_at", { mode: 'string' }),
	updatedAt: timestamp("updated_at", { mode: 'string' }),
},
(table) => [
	index("leader_line_assignments_user_id_index").on(table.userId),
	index("leader_line_assignments_line_id_index").on(table.lineId),
	index("leader_line_assignments_user_id_is_active_index").on(table.userId, table.isActive),
	primaryKey({ columns: [table.id], name: "leader_line_assignments_id"}),
	unique("leader_line_assignments_user_id_line_id_unassigned_at_unique").on(table.userId, table.lineId, table.unassignedAt),
]);