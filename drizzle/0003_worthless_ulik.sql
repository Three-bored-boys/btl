ALTER TABLE "user_books" DROP CONSTRAINT "user_books_library_id_libraries_id_fk";
--> statement-breakpoint
ALTER TABLE "user_books" DROP COLUMN IF EXISTS "library_id";