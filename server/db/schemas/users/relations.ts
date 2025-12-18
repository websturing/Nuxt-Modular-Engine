import { relations } from "drizzle-orm/relations";
import { assignmentLines } from "../assignmentLines/schema";
import { attendances } from "../attendances/schema";
import { employees } from "../employees/schema";
import { leaderLineAssignments } from "../leaderLineAssignments/schema";
import { replacementHistories } from "../replacementHistories/schema";
import { replacementRequest } from "../replacementRequest/schema";
import { replacementRequestNote } from "../replacementRequestNote/schema";
import { userShiftAssignments } from "../userShiftAssignments/schema";
import { users } from "./schema";

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
