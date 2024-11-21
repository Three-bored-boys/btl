import { PaginationObjectType, SearchObjectType } from "@/root/src/libs/server/src/schemas";
import { fetchData } from "../../../utils";
import { Book } from "@/root/src/libs/server/src/types";
import { useQuery } from "@tanstack/react-query";

const getFullSearchResults = async function (searchObject: SearchObjectType, paginationObject: PaginationObjectType) {
  const results = await fetchData<{ books: Book[]; totalItems: number }>(
    `${process.env.NEXT_PUBLIC_API_URL}/books/full-search?${new URLSearchParams({ ...searchObject, ...paginationObject }).toString()}`,
  );
  return results;
};

export const useFullSearchResults = function (searchObj: SearchObjectType, paginationObj: PaginationObjectType) {
  const query = useQuery({
    queryKey: ["full-search-results"],
    queryFn: async () => await getFullSearchResults(searchObj, paginationObj),
  });

  return query;
};
