import { mysqlTable, primaryKey, bigint, timestamp, date, int, time } from "drizzle-orm/mysql-core";
import { sql } from "drizzle-orm";

export const stockInDefects = mysqlTable("stock_in_defects", {
	id: bigint({ mode: "number", unsigned: true }).autoincrement().notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }),
	updatedAt: timestamp("updated_at", { mode: 'string' }),
	qty: int(),
	stockinId: int("stockin_id"),
},
(table) => [
	primaryKey({ columns: [table.id], name: "stock_in_defects_id"}),
]);