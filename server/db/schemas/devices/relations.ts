import { relations } from "drizzle-orm/relations";
import { devices } from "./schema";
import { lineDevices } from "../lineDevices/schema";

export const devicesRelations = relations(devices, ({ many }) => ({
	lineDevices: many(lineDevices),
}));