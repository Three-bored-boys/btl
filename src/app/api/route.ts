import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { db } from "@/server/db/db";
import { ServerResult, Book } from "@/shared/types";
import { bookLibraryValues, USER_BOOKS_CACHE_TAG_KEY } from "@/shared/utils";
import { userBooks, users, books } from "@/server/db/schema";
import { eq } from "drizzle-orm";
import { unstable_cache } from "next/cache";

export async function GET(): Promise<NextResponse<ServerResult<Book[]>>> {
  const headersList = await headers();

  const authorisationHeader = headersList.get("Authorization");
  if (!authorisationHeader) {
    return NextResponse.json({ success: false, errors: ["No authorisation!"], status: 401 }, { status: 401 });
  }

  const bearerAuthToken = authorisationHeader.split(" ")[1].trim();
  if (!bearerAuthToken) {
    return NextResponse.json({ success: false, errors: ["No authorisation!"], status: 401 }, { status: 401 });
  }

  if (bearerAuthToken !== process.env.BEARER_AUTH_TOKEN) {
    return NextResponse.json(
      { success: false, errors: ["No authorisation! Wrong token!"], status: 401 },
      { status: 401 },
    );
  }

  const result = await getCurrentlyReadingBooks();

  if (!result.success) {
    return NextResponse.json(result, { status: result.status });
  }

  return NextResponse.json(result);
}

const getCurrentlyReadingBooks = async function (): Promise<ServerResult<Book[]>> {
  try {
    const books = await cacheCurrentlyReadingBooks(process.env.USER_EMAIL);
    return { success: true, data: books };
  } catch (er) {
    return { success: false, status: 500, errors: ["Something went wrong while getting the recently added books"] };
  }
};

const currentlyReadingBooks = async function (emailAddress: string) {
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

const cacheCurrentlyReadingBooks = unstable_cache(currentlyReadingBooks, [USER_BOOKS_CACHE_TAG_KEY], {
  tags: [USER_BOOKS_CACHE_TAG_KEY],
});
