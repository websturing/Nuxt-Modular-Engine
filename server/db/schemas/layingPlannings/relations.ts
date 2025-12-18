import { relations } from "drizzle-orm/relations";
import { layingPlannings } from "./schema";
import { assignmentLines } from "../assignmentLines/schema";

export const layingPlanningsRelations = relations(layingPlannings, ({ one }) => ({
	assignmentLine: one(assignmentLines, {
		fields: [layingPlannings.assignmentLineId],
		references: [assignmentLines.id]
	}),
}));