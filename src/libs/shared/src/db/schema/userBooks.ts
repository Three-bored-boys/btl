import { pgTable, serial, text, timestamp, integer, unique } from "drizzle-orm/pg-core";
import { users } from "./auth";
import { libraries } from "./libraries";
import type { InferInsertModel, InferSelectModel } from "drizzle-orm";

export const userBooks = pgTable(
  "user_books",
  {
    id: serial("id").primaryKey(),
    userId: integer("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    isbn: text("isbn").notNull(),
    libraryId: integer("library_id")
      .notNull()
      .references(() => libraries.id, { onDelete: "cascade" }),
    updatedAt: timestamp("updated_at", { mode: "date", withTimezone: true })
      .notNull()
      .defaultNow()
      .$onUpdate(() => new Date()),
  },
  (t) => ({
    unq: unique().on(t.userId, t.isbn),
  }),
);

export type UserBook = InferSelectModel<typeof userBooks>;
export type NewUserBook = InferInsertModel<typeof userBooks>;
