import { relations } from "drizzle-orm/relations";
import { employees } from "./schema";
import { users } from "../users/schema";

export const employeesRelations = relations(employees, ({ one }) => ({
	user: one(users, {
		fields: [employees.userId],
		references: [users.id]
	}),
}));