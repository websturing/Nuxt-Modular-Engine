import { relations } from "drizzle-orm/relations";
import { replacementRequestNote } from "./schema";
import { replacementRequest } from "../replacementRequest/schema";
import { users } from "../users/schema";

export const replacementRequestNoteRelations = relations(replacementRequestNote, ({ one }) => ({
	user: one(users, {
		fields: [replacementRequestNote.createdBy],
		references: [users.id]
	}),
	replacementRequest: one(replacementRequest, {
		fields: [replacementRequestNote.replacementRequestId],
		references: [replacementRequest.id]
	}),
}));