import { Book } from "@/root/src/libs/server/src/types";
import { PaginationObjectType, SearchObjectType } from "@/root/src/libs/server/src/schemas";
import React, { useEffect, useRef, useState } from "react";
import {
  fetchData,
  filterKeysArray,
  editSearchObjectInLocalStorage,
  getSearchObjectFromLocalStorage,
  DEFAULT_MAX_RESULTS,
  DEFAULT_START_INDEX,
} from "@/client/utils";
import { useQuery } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";

type SearchPageHookReturnType = [
  React.MutableRefObject<(keyof SearchObjectType)[]>,
  React.MutableRefObject<Map<string, HTMLInputElement | null>>,
  React.MutableRefObject<HTMLInputElement | null>,
  React.MutableRefObject<SearchObjectType>,
  SearchObjectType,
  React.Dispatch<React.SetStateAction<SearchObjectType>>,
  boolean,
  React.Dispatch<React.SetStateAction<boolean>>,
];

export function useSearchPage(): SearchPageHookReturnType {
  const filters = useRef<(keyof SearchObjectType)[]>(filterKeysArray);
  const allInputElementRefsMap = useRef<Map<keyof SearchObjectType, HTMLInputElement | null>>(
    new Map(filters.current.map((str) => [str, null])),
  );

  const searchObjectRef = useRef<SearchObjectType>({});
  const paginationObjectRef = useRef<PaginationObjectType>({});
  const searchInputElement = useRef<HTMLInputElement | null>(null);

  const [querySearchObject, setQuerySearchObject] = useState<SearchObjectType>({});
  const [showSearchResults, setShowSearchResults] = useState<boolean>(false);

  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    if (window) {
      searchObjectRef.current = getSearchObjectFromLocalStorage();
    }

    const searchQueryParam = searchParams.get("search");

    if (searchInputElement.current !== null && searchQueryParam !== null) {
      searchInputElement.current.value = searchQueryParam;
      searchObjectRef.current = editSearchObjectInLocalStorage("search", searchQueryParam);
    } else if (
      searchInputElement.current !== null &&
      searchQueryParam === null &&
      searchObjectRef.current.search !== undefined
    ) {
      searchInputElement.current.value = searchObjectRef.current.search;
    }

    allInputElementRefsMap.current.forEach((_, key, map) => {
      const queryParam = searchParams.get(key);
      const node = map.get(key);
      const searchObjectRefKeyValue = searchObjectRef.current[key];

      if (node !== null && node !== undefined && queryParam !== null) {
        node.value = queryParam;
        searchObjectRef.current = editSearchObjectInLocalStorage(key, queryParam);
      } else if (node !== null && node !== undefined && queryParam === null && searchObjectRefKeyValue !== undefined) {
        node.value = searchObjectRefKeyValue;
      }
    });

    const maxResultsQueryParam = searchParams.get("maxResults");
    if (maxResultsQueryParam !== null) {
      paginationObjectRef.current.maxResults = maxResultsQueryParam;
    } else {
      paginationObjectRef.current.maxResults = DEFAULT_MAX_RESULTS.toString();
    }

    const startIndexQueryParam = searchParams.get("startIndex");
    if (startIndexQueryParam !== null) {
      paginationObjectRef.current.startIndex = startIndexQueryParam;
    } else {
      paginationObjectRef.current.startIndex = DEFAULT_START_INDEX.toString();
    }

    const updatedParamsObject = new URLSearchParams({
      ...searchObjectRef.current,
      ...paginationObjectRef.current,
    }).toString();

    if (searchParams.toString() !== updatedParamsObject) router.replace(`/search?${updatedParamsObject}`);
  }, []);

  return [
    filters,
    allInputElementRefsMap,
    searchInputElement,
    searchObjectRef,
    querySearchObject,
    setQuerySearchObject,
    showSearchResults,
    setShowSearchResults,
  ];
}

const getFullSearchResults = async function (searchObject: SearchObjectType, paginationObject: PaginationObjectType) {
  const results = await fetchData<{ books: Book[]; totalItems: number }>(
    `${process.env.NEXT_PUBLIC_API_URL}/books/full-search?${new URLSearchParams({ ...searchObject, ...paginationObject }).toString()}`,
  );
  return results.books;
};

export const useFullSearchResults = function (searchObj: SearchObjectType, paginationObj: PaginationObjectType) {
  const query = useQuery({
    queryKey: ["full-search-results"],
    queryFn: async () => await getFullSearchResults(searchObj, paginationObj),
  });

  return query;
};
