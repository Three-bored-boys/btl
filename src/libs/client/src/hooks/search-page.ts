import { PaginationObjectType, SearchObjectType } from "@/root/src/libs/shared/src/validators";
import { fetchData, getSearchObjectFromLocalStorage, handleNumberSearchParam } from "@/client/utils";
import {
  DEFAULT_MAX_RESULTS,
  DEFAULT_PAGE_NUMBER,
  MAX_MAX_RESULTS,
  MIN_MAX_RESULTS,
  filterKeysArray,
} from "@/libs/shared/src/utils";
import { Book } from "@/root/src/libs/shared/src/types";
import { useSuspenseQuery } from "@tanstack/react-query";
import { ReadonlyURLSearchParams, useRouter, useSearchParams } from "next/navigation";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

const getFullSearchResults = async function (searchObject: SearchObjectType, paginationObject: PaginationObjectType) {
  const { fetchDataResult, res } = await fetchData<{ books: Book[]; totalItems: number }>(
    `/api/books/full-search?${new URLSearchParams({ ...searchObject, ...paginationObject }).toString()}`,
  );
  return { fetchDataResult, res };
};

export function useSearchPageResults(searchObject: SearchObjectType, paginationObject: PaginationObjectType) {
  return useSuspenseQuery({
    queryKey: ["full-search-results", searchObject, paginationObject],
    queryFn: async () => {
      return await getFullSearchResults(searchObject, paginationObject);
    },
  });
}

type SearchPageHookReturnType = {
  filters: React.MutableRefObject<(keyof SearchObjectType)[]>;
  allInputElementRefsMap: React.MutableRefObject<Map<string, HTMLSelectElement | null>>;
  searchInputElement: React.MutableRefObject<HTMLInputElement | null>;
  searchParams: ReadonlyURLSearchParams;
  router: AppRouterInstance;
  run: boolean;
  setRun: Dispatch<SetStateAction<boolean>>;
};

export function useSearchPage(): SearchPageHookReturnType {
  const filters = useRef<(keyof SearchObjectType)[]>(filterKeysArray);
  const allInputElementRefsMap = useRef<Map<keyof SearchObjectType, HTMLSelectElement | null>>(
    new Map(filters.current.map((str) => [str, null])),
  );
  const searchInputElement = useRef<HTMLInputElement | null>(null);

  const searchParams = useSearchParams();
  const router = useRouter();
  const [run, setRun] = useState(false);

  useEffect(() => {
    const searchParamsObject = new URLSearchParams(searchParams.toString());

    const searchQueryParam = searchParamsObject.get("search");
    if (searchInputElement.current !== null && searchQueryParam !== null) {
      if (searchQueryParam !== "") {
        searchInputElement.current.value = searchQueryParam;
      } else {
        searchParamsObject.delete("search");
      }
    } else if (searchInputElement.current !== null && searchQueryParam === null && window) {
      const searchObject = getSearchObjectFromLocalStorage();
      if (searchObject.search !== undefined) {
        searchParamsObject.set("search", searchObject.search);
      }
    }

    allInputElementRefsMap.current.forEach((_, key, map) => {
      const queryParam = searchParamsObject.get(key);
      if (queryParam !== null && queryParam.length === 0) {
        searchParamsObject.delete(key);
      }
    });

    const maxResultsQueryParam = searchParamsObject.get("maxResults");
    searchParamsObject.set(
      "maxResults",
      handleNumberSearchParam(maxResultsQueryParam, DEFAULT_MAX_RESULTS, MIN_MAX_RESULTS, MAX_MAX_RESULTS),
    );

    const pageQueryParam = searchParamsObject.get("page");
    searchParamsObject.set("page", handleNumberSearchParam(pageQueryParam, DEFAULT_PAGE_NUMBER, DEFAULT_PAGE_NUMBER));

    if (searchParams.toString() !== searchParamsObject.toString()) {
      router.replace(`/search?${searchParamsObject.toString()}`);
    } else {
      setRun(true);
    }
  }, [router, searchParams]);

  return {
    filters,
    allInputElementRefsMap,
    searchInputElement,
    searchParams,
    router,
    run,
    setRun,
  };
}
