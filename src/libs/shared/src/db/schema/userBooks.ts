import { pgTable, serial, text, timestamp, integer, unique, pgEnum } from "drizzle-orm/pg-core";
import { bookLibraries } from "@/libs/shared/src/utils";
import { users } from "./auth";
import type { InferInsertModel, InferSelectModel } from "drizzle-orm";

const libraryValues = bookLibraries.map((lib) => lib.value) as [string, ...string[]];
export const libraryValueEnum = pgEnum("library_value", libraryValues);

export const userBooks = pgTable(
  "user_books",
  {
    id: serial("id").primaryKey(),
    userId: integer("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    isbn: text("isbn").notNull(),
    libraryValue: libraryValueEnum("library_value").notNull(),
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

/* TODO:
- Create a new column that will hold the library value. Copy the enum from the libraries table
- Delete the libraryId column
- Delete the libraries table
*/
