import { relations } from "drizzle-orm/relations";
import { modules } from "./schema";
import { modulePermissions } from "../modulePermissions/schema";

export const modulesRelations = relations(modules, ({ one, many }) => ({
	modulePermissions: many(modulePermissions),
	module: one(modules, {
		fields: [modules.parentId],
		references: [modules.id],
		relationName: "modules_parentId_modules_id"
	}),
	modules: many(modules, {
		relationName: "modules_parentId_modules_id"
	}),
}));