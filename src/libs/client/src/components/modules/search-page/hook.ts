import { SearchObjectType } from "@/root/src/libs/server/src/types";
import React, { useEffect, useRef, useState } from "react";
import { getSearchObjectFromLocalStorage } from "@/client/utils";

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

export default function useSearchPage(): SearchPageHookReturnType {
  const filters = useRef<(keyof SearchObjectType)[]>(["title", "author", "genre", "publisher"]);
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
