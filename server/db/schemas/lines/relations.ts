import { relations } from "drizzle-orm/relations";
import { lines } from "./schema";
import { assignmentLines } from "../assignmentLines/schema";
import { leaderLineAssignments } from "../leaderLineAssignments/schema";
import { lineDevices } from "../lineDevices/schema";

export const linesRelations = relations(lines, ({ many }) => ({
	assignmentLines: many(assignmentLines),
	leaderLineAssignments: many(leaderLineAssignments),
	lineDevices: many(lineDevices),
}));