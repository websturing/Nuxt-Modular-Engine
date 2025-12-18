import { relations } from "drizzle-orm/relations";
import { gls } from "./schema";
import { assignmentLines } from "../assignmentLines/schema";

export const glsRelations = relations(gls, ({ many }) => ({
	assignmentLines: many(assignmentLines),
}));