import { unstable_cache } from "next/cache";
import { bookByISBN, nytBestSellers } from "@/server/actions";

export const cacheBookByISBN = function (isbn: string) {
  return unstable_cache(bookByISBN, [`book-isbn-${isbn}`], { revalidate: 604800 });
};

export const cacheNYTBestSellers = unstable_cache(nytBestSellers, ["nyt-best-sellers"], { revalidate: 604800 });
