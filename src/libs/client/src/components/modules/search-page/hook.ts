import { SearchObjectType } from "@/root/src/libs/server/src/types";
import React, { useEffect, useRef } from "react";
import { getSearchObjectFromLocalStorage } from "@/client/utils";

type SearchPageRefs = [
  React.MutableRefObject<(keyof SearchObjectType)[]>,
  React.MutableRefObject<Map<string, HTMLInputElement>>,
  React.MutableRefObject<HTMLInputElement | null>,
  React.MutableRefObject<SearchObjectType>,
];

export default function useSearchPage(): SearchPageRefs {
  const filters = useRef<(keyof SearchObjectType)[]>(["title", "author", "genre", "publisher"]);
  const allInputElementRefsMap = useRef<Map<string, HTMLInputElement>>(new Map());

  const searchObjectRef = useRef<SearchObjectType>({});
  const searchInputElement = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    searchObjectRef.current = getSearchObjectFromLocalStorage();

    if (searchInputElement.current !== null) {
      if (searchObjectRef.current.search !== undefined)
        searchInputElement.current.value = searchObjectRef.current.search;
    }
    console.log(allInputElementRefsMap);

    allInputElementRefsMap.current.forEach((el, key) => {
      const str = key as keyof SearchObjectType;
      if (searchObjectRef.current[str] !== undefined) el.value = searchObjectRef.current[str];
    });
  }, []);

  return [filters, allInputElementRefsMap, searchInputElement, searchObjectRef];
}
