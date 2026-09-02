import { bookLibraryValues, USER_BOOKS_CACHE_TAG_KEY } from "@/shared/utils";
import { userBooks, users, books } from "@/server/db/schema";
import { eq } from "drizzle-orm";
import { unstable_cache } from "next/cache";
import { db } from "@/server/db/db";

const currentlyReadingBooks = async function (emailAddress: string) {
  console.log("currently working in DB");

  const userRowFromEmailSq = db
    .select({ userId: users.id })
    .from(users)
    .where(eq(users.emailAddress, emailAddress))
    .as("user_row_from_email_sq");

  const booksCurrentlyReading = await db
    .select({
      title: books.title,
      author: books.author,
      description: books.description,
      image: books.image,
      isbn13: books.isbn13,
      isbn10: books.isbn10,
      publisher: books.publisher,
      categories: books.categories,
    })
    .from(books)
    .innerJoin(userBooks, eq(userBooks.bookId, books.id))
    .innerJoin(userRowFromEmailSq, eq(userRowFromEmailSq.userId, userBooks.userId))
    .where(eq(userBooks.libraryValue, bookLibraryValues[0]));

  return booksCurrentlyReading;
};

export const cacheCurrentlyReadingBooks = unstable_cache(currentlyReadingBooks, [USER_BOOKS_CACHE_TAG_KEY], {
  tags: [USER_BOOKS_CACHE_TAG_KEY],
});
