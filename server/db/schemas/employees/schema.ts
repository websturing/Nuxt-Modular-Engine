import { mysqlTable, primaryKey, bigint, varchar, char, timestamp, date, mysqlEnum, unique, int, tinyint, time } from "drizzle-orm/mysql-core";
import { sql } from "drizzle-orm";
import { users } from "../users/schema";

export const employees = mysqlTable("employees", {
	id: bigint({ mode: "number", unsigned: true }).autoincrement().notNull(),
	userId: bigint("user_id", { mode: "number", unsigned: true }).references(() => users.id, { onDelete: "set null" } ),
	name: varchar({ length: 255 }).notNull(),
	gender: mysqlEnum(['male','female']),
	// you can use { mode: 'date' }, if you want to have Date as type for this column
	dateBirth: date("date_birth", { mode: 'string' }),
	employeeCode: varchar("employee_code", { length: 255 }).notNull(),
	position: varchar({ length: 255 }),
	department: varchar({ length: 255 }),
	// you can use { mode: 'date' }, if you want to have Date as type for this column
	joinDate: date("join_date", { mode: 'string' }),
	active: tinyint().default(1).notNull(),
	deviceId: varchar("device_id", { length: 255 }),
	createdAt: timestamp("created_at", { mode: 'string' }),
	updatedAt: timestamp("updated_at", { mode: 'string' }),
},
(table) => [
	primaryKey({ columns: [table.id], name: "employees_id"}),
	unique("employees_employee_code_unique").on(table.employeeCode),
]);