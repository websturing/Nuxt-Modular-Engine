import { relations } from "drizzle-orm/relations";
import { cuttingGlSummaries } from "./schema";
import { cuttingGlColors } from "../cuttingGlColors/schema";

export const cuttingGlSummariesRelations = relations(cuttingGlSummaries, ({ many }) => ({
	cuttingGlColors: many(cuttingGlColors),
}));