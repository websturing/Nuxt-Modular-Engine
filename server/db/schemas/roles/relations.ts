import { relations } from "drizzle-orm/relations";
import { roles } from "./schema";
import { modelHasRoles } from "../modelHasRoles/schema";
import { roleHasPermissions } from "../roleHasPermissions/schema";
import { workflowSteps } from "../workflowSteps/schema";

export const rolesRelations = relations(roles, ({ many }) => ({
	modelHasRoles: many(modelHasRoles),
	roleHasPermissions: many(roleHasPermissions),
	workflowSteps: many(workflowSteps),
}));