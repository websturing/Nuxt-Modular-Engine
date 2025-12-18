import { relations } from "drizzle-orm/relations";
import { modelHasRoles } from "./schema";
import { roles } from "../roles/schema";

export const modelHasRolesRelations = relations(modelHasRoles, ({ one }) => ({
	role: one(roles, {
		fields: [modelHasRoles.roleId],
		references: [roles.id]
	}),
}));