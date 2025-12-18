import { relations } from "drizzle-orm/relations";
import { userShiftAssignments } from "./schema";
import { shifts } from "../shifts/schema";
import { users } from "../users/schema";

export const userShiftAssignmentsRelations = relations(userShiftAssignments, ({ one }) => ({
	shift: one(shifts, {
		fields: [userShiftAssignments.shiftId],
		references: [shifts.id]
	}),
	user: one(users, {
		fields: [userShiftAssignments.userId],
		references: [users.id]
	}),
}));