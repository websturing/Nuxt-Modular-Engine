import { relations } from "drizzle-orm/relations";
import { shifts } from "./schema";
import { userShiftAssignments } from "../userShiftAssignments/schema";

export const shiftsRelations = relations(shifts, ({ many }) => ({
	userShiftAssignments: many(userShiftAssignments),
}));