import { relations } from "drizzle-orm/relations";
import { workflowDefinitions } from "./schema";
import { replacementRequest } from "../replacementRequest/schema";
import { workflowSteps } from "../workflowSteps/schema";

export const workflowDefinitionsRelations = relations(workflowDefinitions, ({ many }) => ({
	replacementRequests: many(replacementRequest),
	workflowSteps: many(workflowSteps),
}));