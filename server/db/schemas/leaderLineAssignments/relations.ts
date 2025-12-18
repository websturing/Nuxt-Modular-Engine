import { relations } from "drizzle-orm/relations";
import { leaderLineAssignments } from "./schema";
import { lines } from "../lines/schema";
import { users } from "../users/schema";

export const leaderLineAssignmentsRelations = relations(leaderLineAssignments, ({ one }) => ({
	line: one(lines, {
		fields: [leaderLineAssignments.lineId],
		references: [lines.id]
	}),
	user: one(users, {
		fields: [leaderLineAssignments.userId],
		references: [users.id]
	}),
}));