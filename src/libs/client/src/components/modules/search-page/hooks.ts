import { PaginationObjectType, SearchObjectType } from "@/root/src/libs/shared/src/schemas";
import { fetchData, getSearchObjectFromLocalStorage, handleNumberSearchParam } from "../../../utils";
import { DEFAULT_MAX_RESULTS, DEFAULT_START_INDEX, filterKeysArray } from "@/libs/shared/src/utils";
import { Book } from "@/root/src/libs/shared/src/types";
import { useQuery } from "@tanstack/react-query";
import { ReadonlyURLSearchParams, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

const getFullSearchResults = async function (searchObject: SearchObjectType, paginationObject: PaginationObjectType) {
  const results = await fetchData<{ books: Book[]; totalItems: number }>(
    `${process.env.NEXT_PUBLIC_API_URL}/books/full-search?${new URLSearchParams({ ...searchObject, ...paginationObject }).toString()}`,
  );
  return results;
};

export function useSearchPageResults(searchObject: SearchObjectType, paginationObject: PaginationObjectType) {
  const searchQueryKey = searchObject.search ?? "";
  const filtersQueryKeyArray = filterKeysArray.map((key) => {
    return searchObject[key] ?? "";
  });
  const maxResultsQueryKey = paginationObject.maxResults ?? "";
  const startIndexQueryKey = paginationObject.startIndex ?? "";

  return useQuery({
    queryKey: ["full-search-results", searchQueryKey, ...filtersQueryKeyArray, maxResultsQueryKey, startIndexQueryKey],
    queryFn: async () => {
      return await getFullSearchResults(searchObject, paginationObject);
    },
  });
}

type SearchPageHookReturnType = {
  filters: React.MutableRefObject<(keyof SearchObjectType)[]>;
  allInputElementRefsMap: React.MutableRefObject<Map<string, HTMLInputElement | null>>;
  searchInputElement: React.MutableRefObject<HTMLInputElement | null>;
  searchParams: ReadonlyURLSearchParams;
  router: AppRouterInstance;
};

export function useSearchPage(): SearchPageHookReturnType {
  const filters = useRef<(keyof SearchObjectType)[]>(filterKeysArray);
  const allInputElementRefsMap = useRef<Map<keyof SearchObjectType, HTMLInputElement | null>>(
    new Map(filters.current.map((str) => [str, null])),
  );
  const searchInputElement = useRef<HTMLInputElement | null>(null);

  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const searchParamsObject = new URLSearchParams(searchParams.toString());

    const searchQueryParam = searchParamsObject.get("search");
    if (searchInputElement.current !== null && searchQueryParam !== null) {
      searchInputElement.current.value = searchQueryParam;
    } else if (searchInputElement.current !== null && searchQueryParam === null && window) {
      const searchObject = getSearchObjectFromLocalStorage();
      if (searchObject.search !== undefined) {
        searchParamsObject.set("search", searchObject.search);
      }
    }

    allInputElementRefsMap.current.forEach((_, key, map) => {
      const queryParam = searchParamsObject.get(key);
      const node = map.get(key);

      if (node !== null && node !== undefined && queryParam !== null) {
        node.value = queryParam;
      }
    });

    const maxResultsQueryParam = searchParamsObject.get("maxResults");
    searchParamsObject.set(
      "maxResults",
      handleNumberSearchParam(maxResultsQueryParam, DEFAULT_MAX_RESULTS, DEFAULT_MAX_RESULTS),
    );

    const startIndexQueryParam = searchParamsObject.get("startIndex");
    searchParamsObject.set(
      "startIndex",
      handleNumberSearchParam(startIndexQueryParam, DEFAULT_START_INDEX, DEFAULT_START_INDEX),
    );

    console.log(searchParams.toString());
    console.log(searchParamsObject.toString());

    if (searchParams.toString() !== searchParamsObject.toString()) {
      router.replace(`/search?${searchParamsObject.toString()}`);
    }
  }, [router, searchParams]);

  return {
    filters,
    allInputElementRefsMap,
    searchInputElement,
    searchParams,
    router,
  };
}
