import { PaginationObjectType, SearchObjectType } from "@/root/src/libs/shared/src/schemas";
import { filterKeysArray } from "@/root/src/libs/shared/src/utils";
import { useSearchParams } from "next/navigation";
import React from "react";
import SearchPageQueryComponent from "./search-page-query-component";

export default function SearchPageQueryComponentWrapper() {
  const searchParams = useSearchParams();

  const searchObject: SearchObjectType = {};
  const paginationObject: PaginationObjectType = {};

  const paramsHasSearch = searchParams.has("search");
  const paramsHasFilters = filterKeysArray.filter((val) => searchParams.has(val));

  if (!paramsHasSearch && paramsHasFilters.length === 0) {
    return <div>Please enter a search term or select a filter and click &quot;Submit&quot;</div>;
  }

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
