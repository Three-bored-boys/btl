import { PaginationObjectType, SearchObjectType } from "@/root/src/libs/server/src/schemas";
import { fetchData, filterKeysArray } from "../../../utils";
import { Book } from "@/root/src/libs/server/src/types";
import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { ReadonlyURLSearchParams, useSearchParams } from "next/navigation";
import { useRef } from "react";

type UseSearchPageHookReturnType = [
  ReadonlyURLSearchParams,
  React.MutableRefObject<(keyof SearchObjectType)[]>,
  React.MutableRefObject<SearchObjectType>,
  React.MutableRefObject<PaginationObjectType>,
  UseQueryResult<{
    books: Book[];
    totalItems: number;
  }>,
];

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

export const useSearchPage = function (): UseSearchPageHookReturnType {
  const searchParams = useSearchParams();
  const filters = useRef<(keyof SearchObjectType)[]>(filterKeysArray);
  const searchObjectRef = useRef<SearchObjectType>({});
  const paginationObjectRef = useRef<PaginationObjectType>({});

  const searchQuery = searchParams.get("search");
  if (searchQuery !== null) searchObjectRef.current.search = searchQuery;

  filters.current.forEach((key) => {
    const searchParam = searchParams.get(key);
    if (searchParam !== null) searchObjectRef.current[key] = searchParam;
  });

  const maxResultsParam = searchParams.get("maxResults");
  if (maxResultsParam !== null) paginationObjectRef.current.maxResults = maxResultsParam;

  const startIndexParam = searchParams.get("startIndex");
  if (startIndexParam !== null) paginationObjectRef.current.startIndex = startIndexParam;

  const query = useFullSearchResults(searchObjectRef.current, paginationObjectRef.current);

  return [searchParams, filters, searchObjectRef, paginationObjectRef, query];
};
