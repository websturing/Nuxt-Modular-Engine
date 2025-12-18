import { relations } from "drizzle-orm/relations";
import { cuttingGlColors } from "./schema";
import { cuttingGlColorSizes } from "../cuttingGlColorSizes/schema";
import { cuttingGlSummaries } from "../cuttingGlSummaries/schema";

export const cuttingGlColorsRelations = relations(cuttingGlColors, ({ one, many }) => ({
	cuttingGlColorSizes: many(cuttingGlColorSizes),
	cuttingGlSummary: one(cuttingGlSummaries, {
		fields: [cuttingGlColors.cuttingGlSummaryId],
		references: [cuttingGlSummaries.id]
	}),
}));