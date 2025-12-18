import { relations } from "drizzle-orm/relations";
import { assignmentLines } from "./schema";
import { gls } from "../gls/schema";
import { layingPlannings } from "../layingPlannings/schema";
import { lines } from "../lines/schema";
import { users } from "../users/schema";

export const assignmentLinesRelations = relations(assignmentLines, ({ one, many }) => ({
	gl: one(gls, {
		fields: [assignmentLines.glId],
		references: [gls.id]
	}),
	line: one(lines, {
		fields: [assignmentLines.lineId],
		references: [lines.id]
	}),
	user: one(users, {
		fields: [assignmentLines.userId],
		references: [users.id]
	}),
	layingPlannings: many(layingPlannings),
}));