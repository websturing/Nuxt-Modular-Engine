import { mysqlTable, primaryKey, bigint, text, timestamp, date, int, tinyint, time } from "drizzle-orm/mysql-core";
import { sql } from "drizzle-orm";
import { replacementRequest } from "../replacementRequest/schema";
import { workflowSteps } from "../workflowSteps/schema";
import { users } from "../users/schema";

export const replacementHistories = mysqlTable("replacement_histories", {
	id: bigint({ mode: "number", unsigned: true }).autoincrement().notNull(),
	replacementRequestId: bigint("replacement_request_id", { mode: "number", unsigned: true }).notNull().references(() => replacementRequest.id),
	workflowStepId: bigint("workflow_step_id", { mode: "number", unsigned: true }).notNull().references(() => workflowSteps.id),
	actionBy: bigint("action_by", { mode: "number", unsigned: true }).notNull().references(() => users.id),
	note: text().notNull(),
	isApproved: tinyint("is_approved").default(0).notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }),
	updatedAt: timestamp("updated_at", { mode: 'string' }),
},
(table) => [
	primaryKey({ columns: [table.id], name: "replacement_histories_id"}),
]);