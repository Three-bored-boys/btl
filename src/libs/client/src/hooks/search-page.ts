import { PaginationObjectType, SearchObjectType } from "@/root/src/libs/shared/src/validators";
import { fetchData, getSearchObjectFromLocalStorage } from "@/client/utils";
import { filterKeysArray } from "@/libs/shared/src/utils";
import { Book } from "@/root/src/libs/shared/src/types";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

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

export function useSearchPage({
  updatedSearchParams,
  originalSearchParams,
}: {
  updatedSearchParams: string;
  originalSearchParams: string;
}) {
  const allInputElementRefsMap = useRef<Map<keyof SearchObjectType, HTMLSelectElement | null>>(
    new Map(filterKeysArray.map((str) => [str, null])),
  );
  const searchInputElement = useRef<HTMLInputElement | null>(null);

  const router = useRouter();
  const [run, setRun] = useState(false);

  useEffect(() => {
    if (updatedSearchParams !== originalSearchParams) {
      router.replace(`/search?${updatedSearchParams}`);
      return;
    }

    const updatedSearchParamsObject = new URLSearchParams(updatedSearchParams);

    const searchQueryParam = updatedSearchParamsObject.get("search");
    if (searchInputElement.current !== null) {
      if (searchQueryParam !== null) {
        searchInputElement.current.value = searchQueryParam;
      } else {
        const searchObject = getSearchObjectFromLocalStorage();
        if (searchObject.search !== undefined) {
          searchInputElement.current.value = searchObject.search;
        } else {
          searchInputElement.current.value = "";
        }
      }
    }

    allInputElementRefsMap.current.forEach((elem, key, _) => {
      const queryParam = updatedSearchParamsObject.get(key);
      if (elem !== null) {
        if (queryParam !== null) {
          elem.value = queryParam;
        } else {
          elem.value = "";
        }
      }
    });

    setRun(true);
  }, [updatedSearchParams, originalSearchParams]);

  return {
    allInputElementRefsMap,
    searchInputElement,
    router,
    run,
    setRun,
  };
}
