"use server";

import { db } from "@/server/db/db";
import { userBooks } from "@/server/db/schema";
import { and, eq } from "drizzle-orm";
import { unstable_cache } from "next/cache";

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
