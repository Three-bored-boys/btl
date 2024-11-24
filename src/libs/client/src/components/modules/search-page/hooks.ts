import { PaginationObjectType, SearchObjectType } from "@/root/src/libs/shared/src/schemas";
import {
  DEFAULT_MAX_RESULTS,
  DEFAULT_START_INDEX,
  editSearchObjectInLocalStorage,
  fetchData,
  filterKeysArray,
  getSearchObjectFromLocalStorage,
  handleNumberSearchParam,
} from "../../../utils";
import { Book } from "@/root/src/libs/shared/src/types";
import { useQuery } from "@tanstack/react-query";
import { ReadonlyURLSearchParams, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
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
  searchObjectRef: React.MutableRefObject<SearchObjectType>;
  paginationObjectRef: React.MutableRefObject<PaginationObjectType>;
  searchParams: ReadonlyURLSearchParams;
  router: AppRouterInstance;
  paginationObjectState: PaginationObjectType;
  setPaginationObjectState: React.Dispatch<React.SetStateAction<PaginationObjectType>>;
  searchObjectState: SearchObjectType;
  setSearchObjectState: React.Dispatch<React.SetStateAction<SearchObjectType>>;
};

export function useSearchPage(): SearchPageHookReturnType {
  const filters = useRef<(keyof SearchObjectType)[]>(filterKeysArray);
  const allInputElementRefsMap = useRef<Map<keyof SearchObjectType, HTMLInputElement | null>>(
    new Map(filters.current.map((str) => [str, null])),
  );

  const searchObjectRef = useRef<SearchObjectType>({});
  const paginationObjectRef = useRef<PaginationObjectType>({});
  const [searchObjectState, setSearchObjectState] = useState<SearchObjectType>({});
  const [paginationObjectState, setPaginationObjectState] = useState<PaginationObjectType>({});
  const searchInputElement = useRef<HTMLInputElement | null>(null);

  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    if (window) {
      searchObjectRef.current = getSearchObjectFromLocalStorage();
    }

    const searchParamsObject = new URLSearchParams(searchParams.toString());

    const searchQueryParam = searchParamsObject.get("search");
    if (searchInputElement.current !== null && searchQueryParam !== null) {
      searchInputElement.current.value = searchQueryParam;
      searchObjectRef.current = editSearchObjectInLocalStorage("search", searchQueryParam);
    } else if (
      searchInputElement.current !== null &&
      searchQueryParam === null &&
      searchObjectRef.current.search !== undefined
    ) {
      searchInputElement.current.value = searchObjectRef.current.search;
      searchParamsObject.set("search", searchObjectRef.current.search);
    }

    allInputElementRefsMap.current.forEach((_, key, map) => {
      const queryParam = searchParamsObject.get(key);
      const node = map.get(key);

      if (node !== null && node !== undefined && queryParam !== null) {
        node.value = queryParam;
        searchObjectRef.current = editSearchObjectInLocalStorage(key, queryParam);
      } else {
        searchObjectRef.current = editSearchObjectInLocalStorage(key, "");
      }
    });

    const maxResultsQueryParam = searchParamsObject.get("maxResults");
    paginationObjectRef.current.maxResults = handleNumberSearchParam(
      maxResultsQueryParam,
      DEFAULT_MAX_RESULTS,
      DEFAULT_MAX_RESULTS,
    );
    searchParamsObject.set("maxResults", paginationObjectRef.current.maxResults);

    const startIndexQueryParam = searchParamsObject.get("startIndex");
    paginationObjectRef.current.startIndex = handleNumberSearchParam(
      startIndexQueryParam,
      DEFAULT_START_INDEX,
      DEFAULT_START_INDEX,
    );
    searchParamsObject.set("startIndex", paginationObjectRef.current.startIndex);

    if (searchParams.toString() !== searchParamsObject.toString()) {
      router.replace(`/search?${searchParamsObject.toString()}`);
    }

    setSearchObjectState(searchObjectRef.current);
    setPaginationObjectState(paginationObjectRef.current);
  }, [router, searchParams]);

  return {
    filters,
    allInputElementRefsMap,
    searchInputElement,
    searchObjectRef,
    paginationObjectRef,
    searchParams,
    router,
    paginationObjectState,
    setPaginationObjectState,
    searchObjectState,
    setSearchObjectState,
  };
}
