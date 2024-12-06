import { PaginationObjectType, SearchObjectType } from "@/root/src/libs/shared/src/schemas";
import { filterKeysArray } from "@/root/src/libs/shared/src/utils";
import { useSearchParams } from "next/navigation";
import React from "react";
import { SearchPageQueryComponent } from "./search-page-query-component";

export function SearchPageQueryComponentWrapper() {
  const searchParams = useSearchParams();

  const searchObject: SearchObjectType = {};
  const paginationObject: PaginationObjectType = {};

  const searchQueryParam = searchParams.get("search");
  if (searchQueryParam !== null) {
    searchObject.search = searchQueryParam;
  }

  filterKeysArray.forEach((val) => {
    const filterParam = searchParams.get(val);
    if (filterParam !== null) {
      searchObject[val] = filterParam;
    }
  });

  const maxResults = searchParams.get("maxResults");
  if (maxResults !== null) {
    paginationObject.maxResults = maxResults;
  }

  const page = searchParams.get("page");
  if (page !== null) {
    paginationObject.page = page;
  }

  return <SearchPageQueryComponent searchObject={searchObject} paginationObject={paginationObject} />;
}
