import { relations } from "drizzle-orm/relations";
import { attendanceLogs } from "./schema";
import { attendances } from "../attendances/schema";

export const attendanceLogsRelations = relations(attendanceLogs, ({ one }) => ({
	attendance: one(attendances, {
		fields: [attendanceLogs.attendanceId],
		references: [attendances.id]
	}),
}));