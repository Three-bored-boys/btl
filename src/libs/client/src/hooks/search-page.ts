import { SearchObjectType } from "@/root/src/libs/shared/src/validators";
import { getSearchObjectFromLocalStorage } from "@/client/utils";
import { filterKeysArray } from "@/libs/shared/src/utils";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export function useSearchPage() {
  const allInputElementRefsMap = useRef<Map<keyof SearchObjectType, HTMLSelectElement | null>>(
    new Map(filterKeysArray.map((str) => [str, null])),
  );
  const searchInputElement = useRef<HTMLInputElement | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const [run, setRun] = useState<boolean | null>(null);

  useEffect(() => {
    const searchQueryParam = searchParams.get("search");
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
      const queryParam = searchParams.get(key);
      if (elem !== null) {
        if (queryParam !== null) {
          elem.value = queryParam;
        } else {
          elem.value = "";
        }
      }
    });

    setRun(true);
  }, [searchParams]);

  return {
    allInputElementRefsMap,
    searchInputElement,
    router,
    run,
    setRun,
    searchParams,
  };
}
