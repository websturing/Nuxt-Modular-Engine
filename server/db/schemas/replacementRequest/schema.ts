import { mysqlTable, primaryKey, bigint, varchar, char, timestamp, date, mysqlEnum, unique, int, time } from "drizzle-orm/mysql-core";
import { sql } from "drizzle-orm";
import { workflowDefinitions } from "../workflowDefinitions/schema";
import { workflowSteps } from "../workflowSteps/schema";
import { users } from "../users/schema";

export const replacementRequest = mysqlTable("replacement_request", {
	id: bigint({ mode: "number", unsigned: true }).autoincrement().notNull(),
	workflowDefinitionId: bigint("workflow_definition_id", { mode: "number", unsigned: true }).notNull().references(() => workflowDefinitions.id, { onDelete: "cascade" } ),
	currentStepId: bigint("current_step_id", { mode: "number", unsigned: true }).references(() => workflowSteps.id, { onDelete: "set null" } ),
	serialNumber: varchar("serial_number", { length: 255 }).notNull(),
	createdBy: bigint("created_by", { mode: "number", unsigned: true }).references(() => users.id),
	status: mysqlEnum(['draft','in_progress','completed','rejected']).default('draft').notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }),
	updatedAt: timestamp("updated_at", { mode: 'string' }),
},
(table) => [
	primaryKey({ columns: [table.id], name: "replacement_request_id"}),
	unique("replacement_request_serial_number_unique").on(table.serialNumber),
]);