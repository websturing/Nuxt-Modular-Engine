import { mysqlTable, primaryKey, bigint, timestamp, date, int, time } from "drizzle-orm/mysql-core";
import { sql } from "drizzle-orm";
import { lines } from "../lines/schema";
import { devices } from "../devices/schema";

export const lineDevices = mysqlTable("line_devices", {
	id: bigint({ mode: "number", unsigned: true }).autoincrement().notNull(),
	lineId: bigint("line_id", { mode: "number", unsigned: true }).references(() => lines.id, { onDelete: "cascade" } ),
	deviceId: bigint("device_id", { mode: "number", unsigned: true }).references(() => devices.id, { onDelete: "cascade" } ),
	createdAt: timestamp("created_at", { mode: 'string' }),
	updatedAt: timestamp("updated_at", { mode: 'string' }),
},
(table) => [
	primaryKey({ columns: [table.id], name: "line_devices_id"}),
]);