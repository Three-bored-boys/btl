"use server";

import { ServerResult, Book } from "@/shared/types";
import { cacheCurrentlyReadingBooks } from "@/server/cache";

export const getCurrentlyReadingBooks = async function (): Promise<ServerResult<Book[]>> {
  try {
    const books = await cacheCurrentlyReadingBooks(process.env.USER_EMAIL);
    return { success: true, data: books };
  } catch (er) {
    const e = er as Error;
    return { success: false, status: 500, errors: [e.message] };
  }
};
