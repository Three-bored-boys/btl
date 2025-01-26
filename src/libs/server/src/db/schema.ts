import { boolean, pgTable, serial, text, timestamp, pgEnum, integer } from "drizzle-orm/pg-core";
import { bookLibraries } from "@/libs/shared/src/utils";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  userName: text("user_name").notNull().unique(),
  emailAddress: text("email_address").notNull().unique(),
  emailVerified: boolean("email_verified").notNull().default(false),
  hashedPassword: text("hashed_password").notNull(),
  createdAt: timestamp("created_at", { mode: "date", withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { mode: "date", withTimezone: true }).notNull().defaultNow(),
});

export const sessions = pgTable("sessions", {
  id: text("id").primaryKey(),
  userId: integer("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expiresAt: timestamp("expires_at", { mode: "date", withTimezone: true }).notNull(),
});

const libraryNames = bookLibraries.map((lib) => lib.name) as [string, ...string[]];
const libraryValues = bookLibraries.map((lib) => lib.value) as [string, ...string[]];

export const libraryNameEnum = pgEnum("library_name", libraryNames);
export const libraryValueEnum = pgEnum("library_value", libraryValues);

export const libraries = pgTable("libraries", {
  id: serial("id").primaryKey(),
  libraryName: libraryNameEnum("library_name").notNull(),
  libraryValue: libraryValueEnum("library_value").notNull(),
});
