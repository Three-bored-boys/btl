import { fetchData } from "@/client/utils";
import { Book } from "@/root/src/libs/shared/src/types";
import { useSuspenseQuery } from "@tanstack/react-query";

const getQuickSearchResultsBooks = async function (searchString: string) {
  const results = await fetchData<Book[]>(`${process.env.NEXT_PUBLIC_API_URL}/books/quick-search/${searchString}`);
  return results;
};

export const useQuickSearchResults = function ({ search }: { search: string }) {
  const query = useSuspenseQuery({
    queryKey: ["quick-search-results", search],
    queryFn: async () => await getQuickSearchResultsBooks(search),
  });

  return query;
};
