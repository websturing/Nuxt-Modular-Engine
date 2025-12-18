import { relations } from "drizzle-orm/relations";
import { lineDevices } from "./schema";
import { devices } from "../devices/schema";
import { lines } from "../lines/schema";

export const lineDevicesRelations = relations(lineDevices, ({ one }) => ({
	device: one(devices, {
		fields: [lineDevices.deviceId],
		references: [devices.id]
	}),
	line: one(lines, {
		fields: [lineDevices.lineId],
		references: [lines.id]
	}),
}));