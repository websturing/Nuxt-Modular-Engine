import { mysqlTable, index, primaryKey, bigint, varchar, char, int } from "drizzle-orm/mysql-core";
import { sql } from "drizzle-orm";
import { roles } from "../roles/schema";

export const modelHasRoles = mysqlTable("model_has_roles", {
	roleId: bigint("role_id", { mode: "number", unsigned: true }).notNull().references(() => roles.id, { onDelete: "cascade" } ),
	modelType: varchar("model_type", { length: 255 }).notNull(),
	modelId: bigint("model_id", { mode: "number", unsigned: true }).notNull(),
},
(table) => [
	index("model_has_roles_model_id_model_type_index").on(table.modelId, table.modelType),
	primaryKey({ columns: [table.roleId, table.modelId, table.modelType], name: "model_has_roles_role_id_model_id_model_type"}),
]);