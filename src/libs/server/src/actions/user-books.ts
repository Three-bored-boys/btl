"use server";

import { db } from "@/server/db/db";
import { SanitizedUser, userBooks, books } from "@/server/db/schema";
import { bookLibraries, bookLibraryValues, bookFormNames } from "@/shared/utils";
import { and, eq, inArray, or, sql } from "drizzle-orm";
import { revalidateTag } from "next/cache";
import { getUserSession } from "@/server/actions";
import { z } from "zod";
import { redirect } from "next/navigation";
import { BadResponse, Book, GoodResponse, ServerResult } from "@/shared/types";
import { getBookByISBN } from "@/server/actions";
import { bookSchema } from "@/shared/validators";
import { cacheUserBookLibraryValue, cacheUserBooksInALibrary, cacheRecentlyAddedBooks } from "@/server/cache";
import { USER_BOOKS_CACHE_TAG_KEY } from "@/shared/utils";

export const getUserBookLibraryValue = async function (isbn: string): Promise<ServerResult<string | null>> {
  try {
    const { user } = await getUserSession();
    if (!user) {
      const responseObject: GoodResponse<string | null> = { success: true, data: null };
      return responseObject;
    }

    const cachedUserBookLibraryValue = await cacheUserBookLibraryValue(isbn, user.id);
    const responseObject: GoodResponse<string | null> = { success: true, data: cachedUserBookLibraryValue };
    return responseObject;
  } catch (e) {
    const responseObject: BadResponse = {
      success: false,
      errors: ["Something went wrong while retrieving library value"],
      status: 500,
    };
    return responseObject;
  }
};

//////////////////////////////////////////////////////////////////////////////////////////////////////

export const mutateUserBook = async function (
  _: ServerResult<string> | null,
  formData: FormData,
): Promise<ServerResult<string>> {
  console.log("Currently In the root of mutateUserBook");
  const redirectUrl = formData.get("redirect") as string | null;
  const libraryRaw = formData.get("library");
  const isbnRaw = formData.get("isbn");

  const bookAuthorRaw = formData.get(bookFormNames.author) as string | null;
  const bookTitleRaw = formData.get(bookFormNames.title) as string | null;
  const bookDescriptionRaw = formData.get(bookFormNames.description) as string | null;
  const bookImageRaw = formData.get(bookFormNames.image) as string | null;
  const bookPublisherRaw = formData.get(bookFormNames.publisher) as string | null;
  const bookIsbn13Raw = formData.get(bookFormNames.isbn13) as string | null;
  const bookIsbn10Raw = formData.get(bookFormNames.isbn10) as string | null;
  const bookCategoriesRaw = formData.getAll(bookFormNames.categories) as string[];

  const bookObjectRaw = {
    title: bookTitleRaw,
    author: bookAuthorRaw,
    description: bookDescriptionRaw,
    image: bookImageRaw,
    publisher: bookPublisherRaw,
    isbn13: bookIsbn13Raw,
    isbn10: bookIsbn10Raw,
    categories: bookCategoriesRaw,
  };

  const { user } = await getUserSession();
  if (!user) {
    if (redirectUrl) {
      redirect(`/login?redirect=${encodeURIComponent(redirectUrl)}`);
    }
    redirect("/login");
  }

  const validationForISBN = z.string().safeParse(isbnRaw);
  if (!validationForISBN.success) {
    return { success: false, errors: [validationForISBN.error.message], status: 404 };
  }
  const isbn = validationForISBN.data;

  if (!libraryRaw) {
    try {
      await db.delete(userBooks).where(
        and(
          eq(userBooks.userId, user.id),
          inArray(
            userBooks.bookId,
            db
              .select({ id: books.id })
              .from(books)
              .where(or(eq(books.isbn10, isbn), eq(books.isbn13, isbn))),
          ),
        ),
      );
    } catch (e) {
      console.log(e);
      const responseData: BadResponse = {
        success: false,
        errors: ["There was an issue deleting the book from your collection"],
        status: 500,
      };
      return responseData;
    }
    const responseData: GoodResponse<string> = {
      success: true,
      data: "Removed from collection!",
    };

    revalidateTag(USER_BOOKS_CACHE_TAG_KEY);
    return responseData;
  }

  const validationForLibrary = z.enum(bookLibraryValues).safeParse(libraryRaw);
  if (!validationForLibrary.success) {
    return { success: false, errors: [validationForLibrary.error.message], status: 404 };
  }
  const library = validationForLibrary.data;

  const validationForBookObject = bookSchema.safeParse(bookObjectRaw);
  if (!validationForBookObject.success) {
    return { success: false, errors: [validationForBookObject.error.message], status: 404 };
  }
  const bookObject = validationForBookObject.data;

  try {
    const { isbn13 } = bookObject;
    const isIsbn13 = isbn13 === isbn;

    const [{ id: bookId }] = await db
      .insert(books)
      .values(bookObject)
      .onConflictDoUpdate({ target: isIsbn13 ? books.isbn13 : books.isbn10, set: { isbn13: sql`${books.isbn13}` } })
      .returning({ id: books.id });

    await db
      .insert(userBooks)
      .values({
        isbn,
        libraryValue: library,
        userId: user.id,
        bookId,
      })
      .onConflictDoUpdate({
        target: [userBooks.userId, userBooks.bookId],
        set: {
          libraryValue: library,
        },
      });
  } catch (e) {
    console.error(e);

    return {
      success: false,
      errors: ["There was an issue adding book"],
      status: 500,
    };
  }

  const responseData: GoodResponse<string> = {
    success: true,
    data: `Added to ${bookLibraries.find((obj) => obj.value === library)?.name ?? "collection"}!`,
  };

  revalidateTag(USER_BOOKS_CACHE_TAG_KEY);
  return responseData;
};

//////////////////////////////////////////////////////////////////////////////////////////////////////

export const getUserBooksInALibrary = async function ({
  library,
  userId,
  limit,
  page = 1,
}: {
  library: unknown;
  userId: number;
  limit: number;
  page?: number;
}): Promise<ServerResult<Book[]>> {
  const validation = z.enum(bookLibraryValues).safeParse(library);

  if (!validation.success) {
    return { success: false, errors: ["Input validation failed"], status: 404 };
  }

  const { data: libraryValue } = validation;

  try {
    const result = await cacheUserBooksInALibrary(libraryValue, userId, limit, page);
    const promiseBooksByISBN = result.map((obj) => obj.isbn).map((isbn) => getBookByISBN(isbn));
    const settledArray = await Promise.all(promiseBooksByISBN);
    return {
      success: true,
      data: settledArray.filter((obj): obj is GoodResponse<Book> => obj.success).map((obj) => obj.data),
    };
  } catch (e) {
    return { success: false, errors: ["Something went wrong while getting the information"], status: 404 };
  }
};

//////////////////////////////////////////////////////////////////////////////////////////////////////

export const getRecentlyAddedBooks = async function ({
  user,
}: {
  user: SanitizedUser;
}): Promise<ServerResult<{ book: Book; date: Date }[]>> {
  try {
    const userBooksQueryResults = await cacheRecentlyAddedBooks({ userId: user.id });
    const recentlyAddedUserBooksWithPromises = userBooksQueryResults.map(async (userBook) => {
      const bookResult = await getBookByISBN(userBook.isbn);
      if (!bookResult.success) {
        return null;
      }
      return { book: bookResult.data, date: userBook.updatedAt };
    });
    const recentlyAddedUserBooksWithDates = await Promise.all(recentlyAddedUserBooksWithPromises);
    return {
      success: true,
      data: recentlyAddedUserBooksWithDates.filter((obj): obj is { book: Book; date: Date } => obj !== null),
    };
  } catch (e) {
    return { success: false, status: 500, errors: ["Something went wrong while getting the recently added books"] };
  }
};
