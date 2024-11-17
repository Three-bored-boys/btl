import { Book } from "@/root/src/libs/server/src/types";
import { PaginationObjectType, SearchObjectType } from "@/root/src/libs/server/src/schemas";
import React, { useEffect, useRef, useState } from "react";
import { fetchData, getSearchObjectFromLocalStorage, filterKeysArray } from "@/client/utils";
import { useQuery } from "@tanstack/react-query";

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
  const searchInputElement = useRef<HTMLInputElement | null>(null);

  const [querySearchObject, setQuerySearchObject] = useState<SearchObjectType>({});
  const [showSearchResults, setShowSearchResults] = useState<boolean>(false);

  useEffect(() => {
    if (window) {
      searchObjectRef.current = getSearchObjectFromLocalStorage();
    }

    if (searchInputElement.current !== null && searchObjectRef.current.search !== undefined) {
      searchInputElement.current.value = searchObjectRef.current.search;
    }

    allInputElementRefsMap.current.forEach((_, key, map) => {
      const node = map.get(key);
      const nodeValue = searchObjectRef.current[key];
      if (nodeValue !== undefined && node !== null && node !== undefined) {
        node.value = nodeValue;
      }
    });
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
