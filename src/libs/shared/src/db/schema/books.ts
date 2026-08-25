import { pgTable, serial, text } from "drizzle-orm/pg-core";
import { sql, type InferInsertModel, type InferSelectModel } from "drizzle-orm";

export const books = pgTable("books", {
  id: serial("id").primaryKey(),
  title: text("title"),
  author: text("author"),
  image: text("image"),
  description: text("description"),
  isbn13: text("isbn13").unique(),
  isbn10: text("isbn10").unique(),
  publisher: text("publisher"),
  categories: text("categories")
    .array()
    .notNull()
    .default(sql`ARRAY[]::text[]`),
});

export type BooksRow = InferSelectModel<typeof books>;
export type NewBooksRow = InferInsertModel<typeof books>;
