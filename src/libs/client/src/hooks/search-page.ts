import { SearchObjectType } from "@/root/src/libs/shared/src/validators";
import { getSearchObjectFromLocalStorage } from "@/client/utils";
import { filterKeysArray } from "@/libs/shared/src/utils";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

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
