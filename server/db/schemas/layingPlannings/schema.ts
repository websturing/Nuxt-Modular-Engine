import { mysqlTable, primaryKey, bigint, varchar, char, timestamp, date, unique, int, time } from "drizzle-orm/mysql-core";
import { sql } from "drizzle-orm";
import { assignmentLines } from "../assignmentLines/schema";

export const layingPlannings = mysqlTable("laying_plannings", {
	id: bigint({ mode: "number", unsigned: true }).autoincrement().notNull(),
	assignmentLineId: bigint("assignment_line_id", { mode: "number", unsigned: true }).notNull().references(() => assignmentLines.id, { onDelete: "cascade" } ),
	color: varchar({ length: 255 }).notNull(),
	type: varchar({ length: 255 }).notNull(),
	orderQty: int("order_qty").notNull(),
	cutQty: int("cut_qty").notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }),
	updatedAt: timestamp("updated_at", { mode: 'string' }),
},
(table) => [
	primaryKey({ columns: [table.id], name: "laying_plannings_id"}),
	unique("uq_layingplanning_line_color").on(table.assignmentLineId, table.color),
]);