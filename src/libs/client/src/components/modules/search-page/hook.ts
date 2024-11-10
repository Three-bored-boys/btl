import { SearchObjectType } from "@/root/src/libs/server/src/types";
import React, { useEffect, useRef } from "react";
import { getSearchObjectFromLocalStorage } from "@/client/utils";

type SearchPageHookReturnType = [
  React.MutableRefObject<(keyof SearchObjectType)[]>,
  React.MutableRefObject<Map<string, HTMLInputElement | null>>,
  React.MutableRefObject<HTMLInputElement | null>,
  React.MutableRefObject<SearchObjectType>,
];

export default function useSearchPage(): SearchPageHookReturnType {
  const filters = useRef<(keyof SearchObjectType)[]>(["title", "author", "genre", "publisher"]);
  const allInputElementRefsMap = useRef<Map<keyof SearchObjectType, HTMLInputElement | null>>(
    new Map(filters.current.map((str) => [str, null])),
  );

  const searchObjectRef = useRef<SearchObjectType>(getSearchObjectFromLocalStorage());
  const searchInputElement = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
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

  return [filters, allInputElementRefsMap, searchInputElement, searchObjectRef];
}
