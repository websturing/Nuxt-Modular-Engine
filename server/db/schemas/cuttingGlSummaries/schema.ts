import { mysqlTable, primaryKey, bigint, varchar, char, timestamp, date, unique, int, time } from "drizzle-orm/mysql-core";
import { sql } from "drizzle-orm";

export const cuttingGlSummaries = mysqlTable("cutting_gl_summaries", {
	id: bigint({ mode: "number", unsigned: true }).autoincrement().notNull(),
	glNumber: varchar("gl_number", { length: 50 }).notNull(),
	orderQty: int("order_qty").default(0).notNull(),
	cutQty: int("cut_qty").default(0).notNull(),
	stockOutQty: int("stock_out_qty").default(0).notNull(),
	replacementQty: int("replacement_qty").default(0).notNull(),
	lastSyncAt: timestamp("last_sync_at", { mode: 'string' }),
	createdAt: timestamp("created_at", { mode: 'string' }),
	updatedAt: timestamp("updated_at", { mode: 'string' }),
},
(table) => [
	primaryKey({ columns: [table.id], name: "cutting_gl_summaries_id"}),
	unique("cutting_gl_summaries_gl_number_unique").on(table.glNumber),
]);