import { relations } from "drizzle-orm/relations";
import { attendances } from "./schema";
import { attendanceLogs } from "../attendanceLogs/schema";
import { users } from "../users/schema";

export const attendancesRelations = relations(attendances, ({ one, many }) => ({
	attendanceLogs: many(attendanceLogs),
	user: one(users, {
		fields: [attendances.userId],
		references: [users.id]
	}),
}));