import { assignmentLines, attendances, employees, leaderLineAssignments, replacementHistories, replacementRequest, replacementRequestNote, userShiftAssignments, users } from "@db/migrations/schema";
import { relations } from "drizzle-orm/relations";

export const usersRelations = relations(users, ({ many, one }) => ({
    assignmentLines: many(assignmentLines),
    attendances: many(attendances),
    employees: one(employees),
    leaderLineAssignments: many(leaderLineAssignments),
    replacementHistories: many(replacementHistories),
    replacementRequests: many(replacementRequest),
    replacementRequestNotes: many(replacementRequestNote),
    userShiftAssignments: many(userShiftAssignments),
}));