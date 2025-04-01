"use server";

import { db } from "@/server/db/db";
import { userBooks } from "@/server/db/schema";
import { bookLibraries, bookLibraryValues } from "@/shared/utils";
import { and, eq } from "drizzle-orm";
import { revalidateTag, unstable_cache } from "next/cache";
import { getUserSession } from "@/server/actions";
import { z } from "zod";
import { redirect } from "next/navigation";
import { BadResponse, Book, GoodResponse, ServerResult } from "@/shared/types";
import { cacheBookByISBN } from "@/server/actions/books";

const USER_BOOKS_CACHE_TAG = "user-books";

export const getUserBookLibraryValue = async function (isbn: string, userId: number) {
  const cachedUserBookLibraryValue = await cacheUserBookLibraryValue(isbn, userId);
  return cachedUserBookLibraryValue;
};

const userBookLibraryValue = async function (isbn: string, userId: number) {
  try {
    const book = await db
      .select()
      .from(userBooks)
      .where(and(eq(userBooks.userId, userId), eq(userBooks.isbn, isbn)));
    if (!book) {
      return null;
    }
    if (book.length === 0) {
      return null;
    }
    return book[0].libraryValue;
  } catch (e) {
    console.log(e);
    return null;
  }
};

const cacheUserBookLibraryValue = unstable_cache(userBookLibraryValue, [], {
  tags: [USER_BOOKS_CACHE_TAG],
});

//////////////////////////////////////////////////////////////////////////////////////////////////////

export const mutateUserBook = async function (
  _: ServerResult<string> | null,
  formData: FormData,
): Promise<ServerResult<string>> {
  console.log("Currently In the root of mutateUserBook");
  const redirectUrl = formData.get("redirect") as string | null;
  const libraryRaw = formData.get("library");
  const isbnRaw = formData.get("isbn");
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
      await db.delete(userBooks).where(and(eq(userBooks.userId, user.id), eq(userBooks.isbn, isbn)));
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

    revalidateTag(USER_BOOKS_CACHE_TAG);
    return responseData;
  }

  const validationForLibrary = z.enum(bookLibraryValues).safeParse(libraryRaw);
  if (!validationForLibrary.success) {
    return { success: false, errors: [validationForLibrary.error.message], status: 404 };
  }
  const library = validationForLibrary.data;

  try {
    const existingUserBookWithISBN = await db
      .select()
      .from(userBooks)
      .where(and(eq(userBooks.userId, user.id), eq(userBooks.isbn, isbn)));

    if (existingUserBookWithISBN.length === 0) {
      await db.insert(userBooks).values({ isbn, libraryValue: library, userId: user.id });
    }

    await db
      .update(userBooks)
      .set({ libraryValue: library })
      .where(and(eq(userBooks.userId, user.id), eq(userBooks.isbn, isbn)));
  } catch (e) {
    console.log(e);
    const responseData: BadResponse = { success: false, errors: ["There was an issue adding book"], status: 500 };
    return responseData;
  }
  const responseData: GoodResponse<string> = {
    success: true,
    data: `Added to ${bookLibraries.find((obj) => obj.value === library)?.name ?? "collection"}!`,
  };

  revalidateTag(USER_BOOKS_CACHE_TAG);
  return responseData;
};

//////////////////////////////////////////////////////////////////////////////////////////////////////

export const getUserBooksInALibrary = async function ({
  library,
  userId,
  limit,
}: {
  library: unknown;
  userId: number;
  limit: number;
}): Promise<ServerResult<Book[]>> {
  const validation = z.enum(bookLibraryValues).safeParse(library);

  if (!validation.success) {
    return { success: false, errors: ["Input validation failed"], status: 404 };
  }

  const { data: libraryValue } = validation;

  try {
    const result = await cacheUserBooksInALibrary(libraryValue, userId, limit);
    const promiseBooksByISBN = result.map((obj) => obj.isbn).map((isbn) => cacheBookByISBN(isbn));
    const settledArray = await Promise.all(promiseBooksByISBN);
    return {
      success: true,
      data: settledArray.filter((obj): obj is GoodResponse<Book> => obj.success).map((obj) => obj.data),
    };
  } catch (e) {
    return { success: false, errors: ["Something went wrong while getting the information"], status: 404 };
  }
};

const userBooksInALibrary = async function (
  library: (typeof bookLibraryValues)[number],
  userId: number,
  limit: number,
) {
  return await db
    .select({ isbn: userBooks.isbn })
    .from(userBooks)
    .where(and(eq(userBooks.libraryValue, library), eq(userBooks.userId, userId)))
    .limit(limit);
};

const cacheUserBooksInALibrary = unstable_cache(userBooksInALibrary, [], { tags: [USER_BOOKS_CACHE_TAG] });
