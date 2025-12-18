import { relations } from "drizzle-orm/relations";
import { replacementRequest } from "./schema";
import { replacementHistories } from "../replacementHistories/schema";
import { replacementRequestNote } from "../replacementRequestNote/schema";
import { users } from "../users/schema";
import { workflowDefinitions } from "../workflowDefinitions/schema";
import { workflowSteps } from "../workflowSteps/schema";

export const replacementRequestRelations = relations(replacementRequest, ({ one, many }) => ({
	replacementHistories: many(replacementHistories),
	user: one(users, {
		fields: [replacementRequest.createdBy],
		references: [users.id]
	}),
	workflowStep: one(workflowSteps, {
		fields: [replacementRequest.currentStepId],
		references: [workflowSteps.id]
	}),
	workflowDefinition: one(workflowDefinitions, {
		fields: [replacementRequest.workflowDefinitionId],
		references: [workflowDefinitions.id]
	}),
	replacementRequestNotes: many(replacementRequestNote),
}));