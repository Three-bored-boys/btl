import { unstable_cache } from "next/cache";
import { PaginationObjectType, SearchObjectType } from "@/shared/validators";
import { fullSearchResults } from "./actions";

export const cacheFullSearchResults = function ({
  maxResults,
  page,
  search,
  genre,
  isbn,
  publisher,
}: SearchObjectType & PaginationObjectType) {
  return unstable_cache(
    async () => {
      return fullSearchResults({ maxResults, page, search, genre, isbn, publisher });
    },
    [
      "full-search",
      `maxResults-${maxResults ?? ""},page-${page ?? ""},search-${search ?? ""},genre-${genre ?? ""},isbn-${isbn ?? ""},publisher-${publisher ?? ""}`,
    ],
    { revalidate: 86400 },
  );
};
