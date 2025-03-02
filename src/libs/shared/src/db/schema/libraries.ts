import { pgTable, serial, pgEnum } from "drizzle-orm/pg-core";
import { bookLibraries } from "@/libs/shared/src/utils";

const libraryNames = bookLibraries.map((lib) => lib.name) as [string, ...string[]];
const libraryValues = bookLibraries.map((lib) => lib.value) as [string, ...string[]];

export const libraryNameEnum = pgEnum("library_name", libraryNames);
export const libraryValueEnum = pgEnum("library_value", libraryValues);

export const libraries = pgTable("libraries", {
  id: serial("id").primaryKey(),
  libraryName: libraryNameEnum("library_name").notNull(),
  libraryValue: libraryValueEnum("library_value").notNull(),
});
