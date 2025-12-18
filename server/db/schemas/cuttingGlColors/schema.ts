import { mysqlTable, index, primaryKey, bigint, varchar, char, timestamp, date, int, time } from "drizzle-orm/mysql-core";
import { sql } from "drizzle-orm";
import { cuttingGlSummaries } from "../cuttingGlSummaries/schema";

export const cuttingGlColors = mysqlTable("cutting_gl_colors", {
	id: bigint({ mode: "number", unsigned: true }).autoincrement().notNull(),
	cuttingGlSummaryId: bigint("cutting_gl_summary_id", { mode: "number", unsigned: true }).notNull().references(() => cuttingGlSummaries.id, { onDelete: "cascade" } ),
	color: varchar({ length: 255 }).notNull(),
	type: varchar({ length: 50 }),
	orderQty: int("order_qty").default(0).notNull(),
	cutQty: int("cut_qty").default(0).notNull(),
	stockOutQty: int("stock_out_qty").default(0).notNull(),
	replacementQty: int("replacement_qty").default(0).notNull(),
	lastSyncAt: timestamp("last_sync_at", { mode: 'string' }),
	createdAt: timestamp("created_at", { mode: 'string' }),
	updatedAt: timestamp("updated_at", { mode: 'string' }),
},
(table) => [
	index("cutting_gl_colors_cutting_gl_summary_id_color_index").on(table.cuttingGlSummaryId, table.color),
	primaryKey({ columns: [table.id], name: "cutting_gl_colors_id"}),
]);