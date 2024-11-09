import { SearchObjectType } from "@/root/src/libs/server/src/types";
import React, { useEffect, useRef, useState } from "react";
import { getSearchObjectFromLocalStorage } from "@/client/utils";

type SearchPageRefs = [
  (keyof SearchObjectType)[],
  React.MutableRefObject<Map<string, HTMLInputElement | null>>,
  React.MutableRefObject<HTMLInputElement | null>,
  React.MutableRefObject<SearchObjectType>,
];

export default function useSearchPage(): SearchPageRefs {
  const [filters, _] = useState<(keyof SearchObjectType)[]>(["title", "author", "genre", "publisher"]);
  const allInputElementRefsMap = useRef<Map<keyof SearchObjectType, HTMLInputElement | null>>(
    new Map(filters.map((str) => [str, null])),
  );

  const searchObjectRef = useRef<SearchObjectType>({});
  const searchInputElement = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    searchObjectRef.current = getSearchObjectFromLocalStorage();

    if (searchInputElement.current !== null && searchObjectRef.current.search !== undefined) {
      searchInputElement.current.value = searchObjectRef.current.search;
    }

    allInputElementRefsMap.current.forEach((_, key, map) => {
      const node = map.get(key);
      const nodeValue = searchObjectRef.current[key];
      console.log(node, key);
      if (nodeValue !== undefined && node !== null && node !== undefined) {
        node.value = nodeValue;
      }
    });
  }, []);

  return [filters, allInputElementRefsMap, searchInputElement, searchObjectRef];
}
