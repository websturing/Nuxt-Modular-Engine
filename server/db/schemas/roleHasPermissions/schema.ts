import { mysqlTable, primaryKey, bigint, int } from "drizzle-orm/mysql-core";
import { sql } from "drizzle-orm";
import { permissions } from "../permissions/schema";
import { roles } from "../roles/schema";

export const roleHasPermissions = mysqlTable("role_has_permissions", {
	permissionId: bigint("permission_id", { mode: "number", unsigned: true }).notNull().references(() => permissions.id, { onDelete: "cascade" } ),
	roleId: bigint("role_id", { mode: "number", unsigned: true }).notNull().references(() => roles.id, { onDelete: "cascade" } ),
},
(table) => [
	primaryKey({ columns: [table.permissionId, table.roleId], name: "role_has_permissions_permission_id_role_id"}),
]);