import { relations } from "drizzle-orm/relations";
import { replacementHistories } from "./schema";
import { replacementRequest } from "../replacementRequest/schema";
import { users } from "../users/schema";
import { workflowSteps } from "../workflowSteps/schema";

export const replacementHistoriesRelations = relations(replacementHistories, ({ one }) => ({
	user: one(users, {
		fields: [replacementHistories.actionBy],
		references: [users.id]
	}),
	replacementRequest: one(replacementRequest, {
		fields: [replacementHistories.replacementRequestId],
		references: [replacementRequest.id]
	}),
	workflowStep: one(workflowSteps, {
		fields: [replacementHistories.workflowStepId],
		references: [workflowSteps.id]
	}),
}));