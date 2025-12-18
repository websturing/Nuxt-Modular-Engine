import { relations } from "drizzle-orm/relations";
import { modelHasPermissions } from "./schema";
import { permissions } from "../permissions/schema";

export const modelHasPermissionsRelations = relations(modelHasPermissions, ({ one }) => ({
	permission: one(permissions, {
		fields: [modelHasPermissions.permissionId],
		references: [permissions.id]
	}),
}));