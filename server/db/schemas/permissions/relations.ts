import { relations } from "drizzle-orm/relations";
import { permissions } from "./schema";
import { modelHasPermissions } from "../modelHasPermissions/schema";
import { roleHasPermissions } from "../roleHasPermissions/schema";

export const permissionsRelations = relations(permissions, ({ many }) => ({
	modelHasPermissions: many(modelHasPermissions),
	roleHasPermissions: many(roleHasPermissions),
}));