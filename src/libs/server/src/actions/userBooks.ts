"use server";

import { db } from "@/server/db/db";
import { userBooks } from "@/server/db/schema";
import { bookLibraries, bookLibraryValues } from "@/shared/utils";
import { and, eq } from "drizzle-orm";
import { revalidateTag, unstable_cache } from "next/cache";
import { getUserSession } from "@/server/actions";
import { z } from "zod";
import { redirect } from "next/navigation";
import { BadResponse, GoodResponse } from "@/shared/types";

const getUserBookLibraryValue = async function (isbn: string, userId: number) {
  try {
    const [book] = await db
      .select()
      .from(userBooks)
      .where(and(eq(userBooks.userId, userId), eq(userBooks.isbn, isbn)));
    return book.libraryValue;
  } catch (e) {
    console.log(e);
    return null;
  }
};

export const getCachedUserBookLibraryValue = unstable_cache(getUserBookLibraryValue, ["user-book-library-value"], {
  tags: ["user-book-library-value"],
});

//////////////////////////////////////////////////////////////////////////////////////////////////////

export const addUserBook = async function (
  {
    isbn,
    library,
  }: {
    isbn: unknown;
    library: unknown;
  },
  pathname: string,
): Promise<BadResponse | GoodResponse<string>> {
  const { user } = await getUserSession();
  if (!user) {
    redirect(`/login?redirect=${encodeURIComponent(pathname)}`);
  }

  const validation = z.object({ isbn: z.string(), library: z.enum(bookLibraryValues) }).safeParse({ isbn, library });

  if (!validation.success) {
    return { success: false, errors: ["Invalid entries"], status: 404 };
  }

  const { isbn: validIsbn, library: validLibrary } = validation.data;

  try {
    const existingUserBookWithISBN = await db
      .select()
      .from(userBooks)
      .where(and(eq(userBooks.userId, user.id), eq(userBooks.isbn, validIsbn)));

    if (existingUserBookWithISBN.length === 0) {
      await db.insert(userBooks).values({ isbn: validIsbn, libraryValue: validLibrary, userId: user.id });
      const responseData: GoodResponse<string> = {
        success: true,
        data: `Added to ${bookLibraries.find((obj) => obj.value === library)?.name ?? "collection"}!`,
      };
      return responseData;
    }

    await db
      .update(userBooks)
      .set({ libraryValue: validLibrary })
      .where(and(eq(userBooks.userId, user.id), eq(userBooks.isbn, validIsbn)));

    const responseData: GoodResponse<string> = {
      success: true,
      data: `Added to ${bookLibraries.find((obj) => obj.value === library)?.name ?? "collection"}!`,
    };

    revalidateTag("user-book-library-value");
    return responseData;
  } catch (e) {
    console.log(e);
    const responseData: BadResponse = { success: false, errors: ["There was an issue adding book"], status: 500 };
    return responseData;
  }
};

//////////////////////////////////////////////////////////////////////////////////////////////////////

export const deleteUserBook = async function ({ isbn }: { isbn: string }, pathname: string) {
  const { user } = await getUserSession();
  if (!user) {
    redirect(`/login?redirect=${encodeURIComponent(pathname)}`);
  }

  try {
    await db.delete(userBooks).where(and(eq(userBooks.userId, user.id), eq(userBooks.isbn, isbn)));

    const responseData: GoodResponse<string> = {
      success: true,
      data: "Removed from collection!",
    };

    revalidateTag("user-book-library-value");
    return responseData;
  } catch (e) {
    console.log(e);
    const responseData: BadResponse = {
      success: false,
      errors: ["There was an issue deleting the book from your collection"],
      status: 500,
    };
    return responseData;
  }
};
