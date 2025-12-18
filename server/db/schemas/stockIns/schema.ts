import { mysqlTable, primaryKey, bigint, varchar, char, timestamp, date, unique, int, time } from "drizzle-orm/mysql-core";
import { sql } from "drizzle-orm";

export const stockIns = mysqlTable("stock_ins", {
	id: bigint({ mode: "number", unsigned: true }).autoincrement().notNull(),
	serialNumber: varchar("serial_number", { length: 191 }).notNull(),
	ticketNo: int("ticket_no", { unsigned: true }).notNull(),
	glNo: varchar("gl_no", { length: 191 }).notNull(),
	size: varchar({ length: 10 }).notNull(),
	userDispatchId: int("user_dispatch_id").notNull(),
	color: varchar({ length: 255 }).notNull(),
	pcs: int({ unsigned: true }).notNull(),
	// you can use { mode: 'date' }, if you want to have Date as type for this column
	dateStockOut: date("date_stock_out", { mode: 'string' }),
	corId: bigint("cor_id", { mode: "number", unsigned: true }).notNull(),
	userId: bigint("user_id", { mode: "number", unsigned: true }),
	userDispatchName: varchar("user_dispatch_name", { length: 191 }),
	boxNumber: varchar("box_number", { length: 191 }),
	lineId: int("line_id"),
	createdAt: timestamp("created_at", { mode: 'string' }),
	updatedAt: timestamp("updated_at", { mode: 'string' }),
	inputSource: varchar("input_source", { length: 255 }).notNull(),
	containerScanStatus: varchar("container_scan_status", { length: 255 }).notNull(),
},
(table) => [
	primaryKey({ columns: [table.id], name: "stock_ins_id"}),
	unique("stock_ins_serial_number_unique").on(table.serialNumber),
]);