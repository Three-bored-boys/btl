import { unstable_cache } from "next/cache";
import { userBookLibraryValue } from "./actions";

export const cacheUserBookLibraryValue = function ({ isbn, userId }: { isbn: string; userId: number }) {
  return unstable_cache(
    () => userBookLibraryValue(isbn, userId),
    ["user-book-library-value", `isbn-${isbn},userId-${userId.toString()}`],
    { tags: ["user-book-library-value", `isbn-${isbn},userId-${userId.toString()}`] },
  );
};
