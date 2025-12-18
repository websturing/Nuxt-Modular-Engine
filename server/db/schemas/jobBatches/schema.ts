import { mysqlTable, primaryKey, varchar, text, char, mediumtext, int, longtext } from "drizzle-orm/mysql-core";
import { sql } from "drizzle-orm";

export const jobBatches = mysqlTable("job_batches", {
	id: varchar({ length: 255 }).notNull(),
	name: varchar({ length: 255 }).notNull(),
	totalJobs: int("total_jobs").notNull(),
	pendingJobs: int("pending_jobs").notNull(),
	failedJobs: int("failed_jobs").notNull(),
	failedJobIds: longtext("failed_job_ids").notNull(),
	options: mediumtext(),
	cancelledAt: int("cancelled_at"),
	createdAt: int("created_at").notNull(),
	finishedAt: int("finished_at"),
},
(table) => [
	primaryKey({ columns: [table.id], name: "job_batches_id"}),
]);