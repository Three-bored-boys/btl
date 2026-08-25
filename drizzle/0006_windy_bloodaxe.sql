ALTER TABLE "user_books" DROP CONSTRAINT "user_books_user_id_isbn_unique";--> statement-breakpoint
ALTER TABLE "books" DROP CONSTRAINT "books_isbn13_isbn10_unique";--> statement-breakpoint
ALTER TABLE "user_books" ADD COLUMN "book_id" integer;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_books" ADD CONSTRAINT "user_books_book_id_books_id_fk" FOREIGN KEY ("book_id") REFERENCES "public"."books"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "user_books" ADD CONSTRAINT "user_books_user_id_isbn_book_id_unique" UNIQUE("user_id","isbn","book_id");--> statement-breakpoint
ALTER TABLE "books" ADD CONSTRAINT "books_isbn13_unique" UNIQUE("isbn13");--> statement-breakpoint
ALTER TABLE "books" ADD CONSTRAINT "books_isbn10_unique" UNIQUE("isbn10");