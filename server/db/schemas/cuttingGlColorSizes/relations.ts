import { relations } from "drizzle-orm/relations";
import { cuttingGlColorSizes } from "./schema";
import { cuttingGlColors } from "../cuttingGlColors/schema";

export const cuttingGlColorSizesRelations = relations(cuttingGlColorSizes, ({ one }) => ({
	cuttingGlColor: one(cuttingGlColors, {
		fields: [cuttingGlColorSizes.cuttingGlColorId],
		references: [cuttingGlColors.id]
	}),
}));