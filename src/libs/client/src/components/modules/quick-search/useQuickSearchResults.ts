import { CustomAPIError, fetchData } from "@/client/utils";
import { Book } from "@/root/src/libs/shared/src/types";
import { useSuspenseQuery } from "@tanstack/react-query";

const getQuickSearchResultsBooks = async function (searchString: string) {
  try {
    const results = await fetchData<Book[]>(`${process.env.NEXT_PUBLIC_API_URL}/books/quick-search/${searchString}`);
    return results;
  } catch (e) {
    if (e instanceof CustomAPIError) {
      return e;
    }
    throw e;
  }
};

export const useQuickSearchResults = function ({ search }: { search: string }) {
  const query = useSuspenseQuery({
    queryKey: ["quick-search-results", search],
    queryFn: async () => await getQuickSearchResultsBooks(search),
  });

  return query;
};
