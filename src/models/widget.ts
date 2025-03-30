import { pgTable, serial, text, boolean } from "drizzle-orm/pg-core";

export const widgets = pgTable("widgets", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  visible: boolean("visible").default(true),
});
