import { fetchData } from "@/client/utils";
import { Book } from "@/root/src/libs/server/src/types";
import { useSuspenseQuery } from "@tanstack/react-query";

const getQuickSearchResultsBooks = async function (searchString: string) {
  const results = await fetchData<Book[]>(`${process.env.NEXT_PUBLIC_API_URL}/books/quick-search/${searchString}`);
  return results;
};

const useQuickSearchResults = function ({ search }: { search: string }) {
  const query = useSuspenseQuery({
    queryKey: ["quick-search-results", search],
    queryFn: async () => await getQuickSearchResultsBooks(search),
  });

  return query;
};

export default useQuickSearchResults;
