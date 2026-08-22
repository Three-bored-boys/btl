import { pgTable, serial, text, unique } from "drizzle-orm/pg-core";
import { sql, type InferInsertModel, type InferSelectModel } from "drizzle-orm";

export const books = pgTable(
  "books",
  {
    id: serial("id").primaryKey(),
    title: text("title"),
    author: text("author"),
    image: text("image"),
    description: text("description"),
    isbn13: text("isbn13"),
    isbn10: text("isbn10"),
    publisher: text("publisher"),
    categories: text("categories")
      .array()
      .notNull()
      .default(sql`ARRAY[]::text[]`),
  },
  (t) => ({
    unq: unique().on(t.isbn13, t.isbn10),
  }),
);

export type BooksRow = InferSelectModel<typeof books>;
export type NewBooksRow = InferInsertModel<typeof books>;
