import { mysqlTable, index, primaryKey, bigint, varchar, char, int } from "drizzle-orm/mysql-core";
import { sql } from "drizzle-orm";
import { permissions } from "../permissions/schema";

export const modelHasPermissions = mysqlTable("model_has_permissions", {
	permissionId: bigint("permission_id", { mode: "number", unsigned: true }).notNull().references(() => permissions.id, { onDelete: "cascade" } ),
	modelType: varchar("model_type", { length: 255 }).notNull(),
	modelId: bigint("model_id", { mode: "number", unsigned: true }).notNull(),
},
(table) => [
	index("model_has_permissions_model_id_model_type_index").on(table.modelId, table.modelType),
	primaryKey({ columns: [table.permissionId, table.modelId, table.modelType], name: "model_has_permissions_permission_id_model_id_model_type"}),
]);