import { db } from "@/server/db/db";
import { userBooks, books } from "@/server/db/schema";
import { bookLibraryValues } from "@/shared/utils";
import { and, desc, eq, or } from "drizzle-orm";
import { unstable_cache } from "next/cache";

import { USER_BOOKS_CACHE_TAG_KEY } from "@/shared/utils";

//////////////////////////////////////////////////////////////////////////////////////////////////////

const userBookLibraryValue = async function (isbn: string, userId: number) {
  const bookSqFromISBN = db
    .select()
    .from(books)
    .where(or(eq(books.isbn10, isbn), eq(books.isbn13, isbn)))
    .as("book_sq");

  const [userBook] = await db
    .select({ libraryValue: userBooks.libraryValue })
    .from(userBooks)
    .innerJoin(bookSqFromISBN, eq(userBooks.bookId, bookSqFromISBN.id))
    .where(eq(userBooks.userId, userId))
    .limit(1);
  if (!userBook) {
    return null;
  }
  return userBook.libraryValue;
};

export const cacheUserBookLibraryValue = unstable_cache(userBookLibraryValue, [USER_BOOKS_CACHE_TAG_KEY], {
  tags: [USER_BOOKS_CACHE_TAG_KEY],
});

//////////////////////////////////////////////////////////////////////////////////////////////////////

const userBooksInALibrary = async function (
  library: (typeof bookLibraryValues)[number],
  userId: number,
  limit: number,
  page: number,
) {
  const offset = (page - 1) * limit;
  return await db
    .select({ isbn: userBooks.isbn })
    .from(userBooks)
    .where(and(eq(userBooks.libraryValue, library), eq(userBooks.userId, userId)))
    .limit(limit)
    .offset(offset);
};

export const cacheUserBooksInALibrary = unstable_cache(userBooksInALibrary, [USER_BOOKS_CACHE_TAG_KEY], {
  tags: [USER_BOOKS_CACHE_TAG_KEY],
});

//////////////////////////////////////////////////////////////////////////////////////////////////////

const recentlyAddedBooks = async function ({ userId }: { userId: number }) {
  const books = await db
    .select()
    .from(userBooks)
    .where(eq(userBooks.userId, userId))
    .limit(5)
    .orderBy(desc(userBooks.updatedAt));

  return books;
};

export const cacheRecentlyAddedBooks = unstable_cache(recentlyAddedBooks, [USER_BOOKS_CACHE_TAG_KEY], {
  tags: [USER_BOOKS_CACHE_TAG_KEY],
});
