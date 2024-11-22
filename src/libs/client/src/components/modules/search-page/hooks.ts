import { PaginationObjectType, SearchObjectType } from "@/root/src/libs/server/src/schemas";
import { fetchData, filterKeysArray } from "../../../utils";
import { Book } from "@/root/src/libs/server/src/types";
import { QueryClient, useQueryClient } from "@tanstack/react-query";
import { ReadonlyURLSearchParams, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

type UseSearchPageHookReturnType = [
  ReadonlyURLSearchParams,
  React.MutableRefObject<(keyof SearchObjectType)[]>,
  React.MutableRefObject<SearchObjectType>,
  React.MutableRefObject<PaginationObjectType>,
  QueryClient,
  (
    | {
        books: Book[];
        totalItems: number;
      }
    | null
    | string
  ),
  React.Dispatch<
    React.SetStateAction<
      | {
          books: Book[];
          totalItems: number;
        }
      | null
      | string
    >
  >,
  Error | null,
  React.Dispatch<React.SetStateAction<Error | null>>,
];

const getFullSearchResults = async function (searchObject: SearchObjectType, paginationObject: PaginationObjectType) {
  const results = await fetchData<{ books: Book[]; totalItems: number }>(
    `${process.env.NEXT_PUBLIC_API_URL}/books/full-search?${new URLSearchParams({ ...searchObject, ...paginationObject }).toString()}`,
  );
  return results;
};

export const useSearchPage = function (): UseSearchPageHookReturnType {
  const noSearchParams = "Please enter a search term";
  const searchParams = useSearchParams();
  const filters = useRef<(keyof SearchObjectType)[]>(filterKeysArray);
  const searchObjectRef = useRef<SearchObjectType>({});
  const paginationObjectRef = useRef<PaginationObjectType>({});
  const queryClient = useQueryClient();
  const [data, setData] = useState<{ books: Book[]; totalItems: number } | null | string>(null);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const getQueryData = async () => {
      try {
        if (Object.entries(searchObjectRef.current).length !== 0) {
          const data = await queryClient.fetchQuery({
            queryKey: ["full-search-results"],
            queryFn: async () => await getFullSearchResults(searchObjectRef.current, paginationObjectRef.current),
          });
          setData(data);
          setError(null);
        } else {
          setData(noSearchParams);
          setError(null);
        }
      } catch (error) {
        console.log(error);
        const err = error as Error;
        setError(err);
        setData(null);
      }
    };

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

    console.log({ ...searchObjectRef.current, ...paginationObjectRef.current });

    void getQueryData();
  }, [searchParams, queryClient]);

  return [searchParams, filters, searchObjectRef, paginationObjectRef, queryClient, data, setData, error, setError];
};
