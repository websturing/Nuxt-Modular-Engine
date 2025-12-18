import { mysqlTable, primaryKey, varchar, char, int } from "drizzle-orm/mysql-core";
import { sql } from "drizzle-orm";

export const cacheLocks = mysqlTable("cache_locks", {
	key: varchar({ length: 255 }).notNull(),
	owner: varchar({ length: 255 }).notNull(),
	expiration: int().notNull(),
},
(table) => [
	primaryKey({ columns: [table.key], name: "cache_locks_key"}),
]);