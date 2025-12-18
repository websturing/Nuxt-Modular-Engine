import { mysqlTable, primaryKey, bigint, text, timestamp, date, int, time } from "drizzle-orm/mysql-core";
import { sql } from "drizzle-orm";
import { replacementRequest } from "../replacementRequest/schema";
import { users } from "../users/schema";

export const replacementRequestNote = mysqlTable("replacement_request_note", {
	id: bigint({ mode: "number", unsigned: true }).autoincrement().notNull(),
	replacementRequestId: bigint("replacement_request_id", { mode: "number", unsigned: true }).notNull().references(() => replacementRequest.id),
	createdBy: bigint("created_by", { mode: "number", unsigned: true }).notNull().references(() => users.id),
	description: text(),
	createdAt: timestamp("created_at", { mode: 'string' }),
	updatedAt: timestamp("updated_at", { mode: 'string' }),
},
(table) => [
	primaryKey({ columns: [table.id], name: "replacement_request_note_id"}),
]);