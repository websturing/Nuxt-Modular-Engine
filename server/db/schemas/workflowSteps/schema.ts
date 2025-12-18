import { mysqlTable, primaryKey, bigint, varchar, char, timestamp, date, int, tinyint, time } from "drizzle-orm/mysql-core";
import { sql } from "drizzle-orm";
import { workflowDefinitions } from "../workflowDefinitions/schema";
import { roles } from "../roles/schema";

export const workflowSteps = mysqlTable("workflow_steps", {
	id: bigint({ mode: "number", unsigned: true }).autoincrement().notNull(),
	workflowDefinitionId: bigint("workflow_definition_id", { mode: "number", unsigned: true }).notNull().references(() => workflowDefinitions.id, { onDelete: "cascade" } ),
	name: varchar({ length: 255 }).notNull(),
	stepOrder: int("step_order", { unsigned: true }).notNull(),
	roleIdResponsible: bigint("role_id_responsible", { mode: "number", unsigned: true }).notNull().references(() => roles.id, { onDelete: "cascade" } ),
	isFinal: tinyint("is_final").default(0).notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }),
	updatedAt: timestamp("updated_at", { mode: 'string' }),
},
(table) => [
	primaryKey({ columns: [table.id], name: "workflow_steps_id"}),
]);