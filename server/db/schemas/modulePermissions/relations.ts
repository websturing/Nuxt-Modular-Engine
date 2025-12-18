import { relations } from "drizzle-orm/relations";
import { modulePermissions } from "./schema";
import { modules } from "../modules/schema";

export const modulePermissionsRelations = relations(modulePermissions, ({ one }) => ({
	module: one(modules, {
		fields: [modulePermissions.moduleId],
		references: [modules.id]
	}),
}));