import { relations } from "drizzle-orm/relations";
import { roleHasPermissions } from "./schema";
import { permissions } from "../permissions/schema";
import { roles } from "../roles/schema";

export const roleHasPermissionsRelations = relations(roleHasPermissions, ({ one }) => ({
	permission: one(permissions, {
		fields: [roleHasPermissions.permissionId],
		references: [permissions.id]
	}),
	role: one(roles, {
		fields: [roleHasPermissions.roleId],
		references: [roles.id]
	}),
}));