import { SearchPage } from "@/root/src/libs/client/src/components/modules/search-page/search-page";
import { PaginationObjectType, SearchObjectType } from "@/root/src/libs/shared/src/validators";
import {
  DEFAULT_MAX_RESULTS,
  DEFAULT_PAGE_NUMBER,
  MAX_MAX_RESULTS,
  MIN_MAX_RESULTS,
  filterKeysArray,
} from "@/libs/shared/src/utils";
import { handleNumberSearchParam } from "@/client/utils";
import assert from "node:assert/strict";
import React from "react";
import { redirect } from "next/navigation";

const isDeepEqual = function (actual: unknown, expected: unknown): boolean {
  try {
    assert.deepStrictEqual(actual, expected);
    return true;
  } catch (e) {
    return false;
  }
};

function Search({ searchParams }: { searchParams: SearchObjectType & PaginationObjectType }) {
  const searchParamsObject = new URLSearchParams(searchParams);
  const newSearchParamsObject = new URLSearchParams();

  const searchQueryParam = searchParamsObject.get("search");
  if (searchQueryParam !== null) {
    if (searchQueryParam !== "") {
      newSearchParamsObject.set("search", searchQueryParam);
    }
  }

  filterKeysArray.forEach((key) => {
    const queryParam = searchParamsObject.get(key);
    if (queryParam !== null) {
      newSearchParamsObject.set(key, queryParam);
    } else {
      newSearchParamsObject.set(key, "");
    }
  });

  const maxResultsQueryParam = searchParamsObject.get("maxResults");
  newSearchParamsObject.set(
    "maxResults",
    handleNumberSearchParam(maxResultsQueryParam, DEFAULT_MAX_RESULTS, MIN_MAX_RESULTS, MAX_MAX_RESULTS),
  );

  const pageQueryParam = searchParamsObject.get("page");
  newSearchParamsObject.set("page", handleNumberSearchParam(pageQueryParam, DEFAULT_PAGE_NUMBER, DEFAULT_PAGE_NUMBER));

  const searchParamsEqual = isDeepEqual(searchParamsObject.entries(), newSearchParamsObject.entries());
  console.log(searchParamsEqual);

  if (!searchParamsEqual) {
    redirect(`/search?${encodeURIComponent(newSearchParamsObject.toString())}`);
  }

  console.log(searchParamsObject, newSearchParamsObject);
  // return <SearchPage />;
  return <div>Hello</div>;
}

export default Search;
