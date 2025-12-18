import { mysqlTable, primaryKey, varchar, text, char, mediumtext, int } from "drizzle-orm/mysql-core";
import { sql } from "drizzle-orm";

export const cache = mysqlTable("cache", {
	key: varchar({ length: 255 }).notNull(),
	value: mediumtext().notNull(),
	expiration: int().notNull(),
},
(table) => [
	primaryKey({ columns: [table.key], name: "cache_key"}),
]);