import React from "react";
import { fetchData } from "@/client/utils";
import { Book } from "@/root/src/libs/server/src/types";
import { useQuery, useQueryClient } from "@tanstack/react-query";

const getQuickSearchResultsBooks = async function (searchString: string) {
  const results = await fetchData<Book[]>(`${process.env.NEXT_PUBLIC_API_URL}/books/search/${searchString}`);
  return results;
};

const useQuickSearchResults = function ({ search }: { search: string }) {
  const renderCounter = React.useRef(0);
  //   const prevSearch = React.useRef(search);

  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ["quick-search-results", search],
    queryFn: async () => await getQuickSearchResultsBooks(search),
  });

  //   React.useEffect(() => {
  //     // renderCounter.current = renderCounter.current + 1;
  //     console.log(renderCounter.current);
  //     // console.log(query.isFetching, query.isError);
  //     renderCounter.current++;
  //     const invalidatePrevQueries = async function () {
  //       await queryClient.invalidateQueries({ exact: false, queryKey: ["quick-search-results"] });
  //     };

  //     invalidatePrevQueries().catch((err) => console.log(err));

  //     // queryClient.invalidateQueries({ exact: false, queryKey: ["quick-search-results"] });
  //   }, [search]);

  return query;
};

export default useQuickSearchResults;
