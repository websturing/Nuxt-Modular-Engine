import { relations } from "drizzle-orm/relations";
import { workflowSteps } from "./schema";
import { replacementHistories } from "../replacementHistories/schema";
import { replacementRequest } from "../replacementRequest/schema";
import { roles } from "../roles/schema";
import { workflowDefinitions } from "../workflowDefinitions/schema";

export const workflowStepsRelations = relations(workflowSteps, ({ one, many }) => ({
	replacementHistories: many(replacementHistories),
	replacementRequests: many(replacementRequest),
	role: one(roles, {
		fields: [workflowSteps.roleIdResponsible],
		references: [roles.id]
	}),
	workflowDefinition: one(workflowDefinitions, {
		fields: [workflowSteps.workflowDefinitionId],
		references: [workflowDefinitions.id]
	}),
}));