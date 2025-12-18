import { mysqlTable, primaryKey, bigint, varchar, char, timestamp, date, unique, int, time } from "drizzle-orm/mysql-core";
import { sql } from "drizzle-orm";

export const devices = mysqlTable("devices", {
	id: bigint({ mode: "number", unsigned: true }).autoincrement().notNull(),
	name: varchar({ length: 255 }).notNull(),
	description: varchar({ length: 255 }),
	macAddress: varchar("mac_address", { length: 255 }).notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }),
	updatedAt: timestamp("updated_at", { mode: 'string' }),
},
(table) => [
	primaryKey({ columns: [table.id], name: "devices_id"}),
	unique("devices_mac_address_unique").on(table.macAddress),
]);