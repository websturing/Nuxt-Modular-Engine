import { relations } from "drizzle-orm/relations";
import { modulePermissions } from "../modulePermissions/schema";
import { modules } from "./schema";

export const modulesRelations = relations(modules, ({ one, many }) => ({
	modulePermissions: many(modulePermissions),
	parent: one(modules, {
		fields: [modules.parentId],
		references: [modules.id],
		relationName: "modules_parentId_modules_id"
	}),
	children: many(modules, {
		relationName: "modules_parentId_modules_id"
	}),
}));