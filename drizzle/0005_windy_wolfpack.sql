CREATE TABLE IF NOT EXISTS "books" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text,
	"author" text,
	"image" text,
	"description" text,
	"isbn13" text,
	"isbn10" text,
	"publisher" text,
	"categories" text[] DEFAULT ARRAY[]::text[] NOT NULL,
	CONSTRAINT "books_isbn13_isbn10_unique" UNIQUE("isbn13","isbn10")
);
