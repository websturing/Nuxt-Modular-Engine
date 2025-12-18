import { mysqlTable, index, primaryKey, bigint, varchar, char, timestamp, date, int, time } from "drizzle-orm/mysql-core";
import { sql } from "drizzle-orm";
import { cuttingGlColors } from "../cuttingGlColors/schema";

export const cuttingGlColorSizes = mysqlTable("cutting_gl_color_sizes", {
	id: bigint({ mode: "number", unsigned: true }).autoincrement().notNull(),
	cuttingGlColorId: bigint("cutting_gl_color_id", { mode: "number", unsigned: true }).notNull().references(() => cuttingGlColors.id, { onDelete: "cascade" } ),
	size: varchar({ length: 50 }).notNull(),
	orderQty: int("order_qty").default(0).notNull(),
	cutQty: int("cut_qty").default(0).notNull(),
	stockOutQty: int("stock_out_qty").default(0).notNull(),
	replacementQty: int("replacement_qty").default(0).notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }),
	updatedAt: timestamp("updated_at", { mode: 'string' }),
},
(table) => [
	index("cutting_gl_color_sizes_cutting_gl_color_id_size_index").on(table.cuttingGlColorId, table.size),
	primaryKey({ columns: [table.id], name: "cutting_gl_color_sizes_id"}),
]);