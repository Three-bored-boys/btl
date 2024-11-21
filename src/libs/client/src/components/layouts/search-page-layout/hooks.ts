import { SearchObjectType } from "@/root/src/libs/server/src/schemas";
import React, { useEffect, useRef } from "react";
import {
  filterKeysArray,
  editSearchObjectInLocalStorage,
  getSearchObjectFromLocalStorage,
  DEFAULT_MAX_RESULTS,
  DEFAULT_START_INDEX,
  handleNumberSearchParam,
} from "@/client/utils";
import { ReadonlyURLSearchParams, useRouter, useSearchParams } from "next/navigation";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

type SearchPageHookReturnType = [
  React.MutableRefObject<(keyof SearchObjectType)[]>,
  React.MutableRefObject<Map<string, HTMLInputElement | null>>,
  React.MutableRefObject<HTMLInputElement | null>,
  React.MutableRefObject<SearchObjectType>,
  ReadonlyURLSearchParams,
  AppRouterInstance,
];

export function useSearchPageLayout(): SearchPageHookReturnType {
  const filters = useRef<(keyof SearchObjectType)[]>(filterKeysArray);
  const allInputElementRefsMap = useRef<Map<keyof SearchObjectType, HTMLInputElement | null>>(
    new Map(filters.current.map((str) => [str, null])),
  );

  const searchObjectRef = useRef<SearchObjectType>({});
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
      searchParamsObject.set("search", searchQueryParam);
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
        searchParamsObject.set(key, queryParam);
      } else {
        searchObjectRef.current = editSearchObjectInLocalStorage(key, "");
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

    if (searchParams.toString() !== searchParamsObject.toString())
      router.replace(`/search?${searchParamsObject.toString()}`);
    /* eslint-disable-next-line */ // I only need this to run once on mount
  }, []);

  return [filters, allInputElementRefsMap, searchInputElement, searchObjectRef, searchParams, router];
}
