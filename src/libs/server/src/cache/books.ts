import { unstable_cache } from "next/cache";
import { bookByISBN } from "@/server/actions";

export const cacheBookByISBN = function (isbn: string) {
  return unstable_cache(bookByISBN, [`book-isbn-${isbn}`], { tags: ["isbn"], revalidate: 604800 });
};
