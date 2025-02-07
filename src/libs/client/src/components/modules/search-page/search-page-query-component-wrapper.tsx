import { PaginationObjectType, SearchObjectType } from "@/root/src/libs/shared/src/validators";
import { filterKeysArray } from "@/root/src/libs/shared/src/utils";
import { useSearchParams } from "next/navigation";
import React from "react";
import { SearchPageQueryComponent } from "./search-page-query-component";
import { ErrorBoundary } from "react-error-boundary";
import { SearchPageErrorBoundary } from "./search-page-error-boundary";

export function SearchPageQueryComponentWrapper() {
  const searchParams = useSearchParams();

  const searchParamsHasSearch = searchParams.has("search");
  const searchParamsHasFilters = filterKeysArray.filter((val) => searchParams.has(val));

  if (!searchParamsHasSearch && searchParamsHasFilters.length === 0) {
    return <div>Please enter a search term or select a filter and click &quot;Submit&quot;</div>;
  }

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

  return (
    <ErrorBoundary fallbackRender={SearchPageErrorBoundary}>
      <SearchPageQueryComponent searchObject={searchObject} paginationObject={paginationObject} />
    </ErrorBoundary>
  );
}
