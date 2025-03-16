import { SearchPage } from "@/client/components/modules/search-page/search-page";
import { filterKeysArray } from "@/shared/utils";
import { PaginationObjectType, SearchObjectType } from "@/shared/validators";
import React, { Suspense } from "react";
import { DEFAULT_MAX_RESULTS, DEFAULT_PAGE_NUMBER, MAX_MAX_RESULTS, MIN_MAX_RESULTS } from "@/shared/utils";
import { handleNumberSearchParam } from "@/client/utils";
import { ErrorBoundary } from "react-error-boundary";
import { SearchPageErrorBoundary } from "@/client/components/modules/search-page/search-page-error-boundary";
import { SearchPageQueryComponentWrapper } from "@/client/components/modules/search-page/search-page-query-component-wrapper";
import { SearchPageResultsLoadingSkeleton } from "@/client/components/modules/search-page/search-page-results-loading-skeleton";

function Search({ searchParams }: { searchParams: SearchObjectType & PaginationObjectType }) {
  const originalSearchParamsObject = new URLSearchParams(searchParams);
  const newSearchParamsObject = new URLSearchParams();

  const searchObject: SearchObjectType = {};
  const paginationObject: PaginationObjectType = {};

  const searchQueryParam = originalSearchParamsObject.get("search");
  if (searchQueryParam !== null) {
    if (searchQueryParam.length !== 0) {
      newSearchParamsObject.set("search", searchQueryParam);
      searchObject.search = searchQueryParam;
    }
  }

  filterKeysArray.forEach((key) => {
    const queryParam = originalSearchParamsObject.get(key);
    if (queryParam !== null) {
      if (queryParam.length !== 0) {
        newSearchParamsObject.set(key, queryParam);
        searchObject[key] = queryParam;
      }
    }
  });

  const maxResultsQueryParam = originalSearchParamsObject.get("maxResults");
  const newMaxResultsQueryParam = handleNumberSearchParam(
    maxResultsQueryParam,
    DEFAULT_MAX_RESULTS,
    MIN_MAX_RESULTS,
    MAX_MAX_RESULTS,
  );
  newSearchParamsObject.set("maxResults", newMaxResultsQueryParam);
  paginationObject.maxResults = newMaxResultsQueryParam;

  const pageQueryParam = originalSearchParamsObject.get("page");
  const newPageQueryParam = handleNumberSearchParam(pageQueryParam, DEFAULT_PAGE_NUMBER, DEFAULT_PAGE_NUMBER);
  newSearchParamsObject.set("page", newPageQueryParam);
  paginationObject.page = newPageQueryParam;

  console.log(
    "The old string is: ",
    originalSearchParamsObject.toString(),
    "The new string is: ",
    newSearchParamsObject.toString(),
  );

  const noFormInput = !searchObject.genre && !searchObject.publisher && !searchObject.search;

  return (
    <SearchPage
      updatedSearchParams={newSearchParamsObject.toString()}
      originalSearchParams={originalSearchParamsObject.toString()}
    >
      {noFormInput ? (
        <div>Please enter a search term or select a filter and click &quot;Submit&quot;</div>
      ) : (
        <ErrorBoundary fallbackRender={SearchPageErrorBoundary}>
          <Suspense fallback={<SearchPageResultsLoadingSkeleton />}>
            <SearchPageQueryComponentWrapper searchObject={searchObject} paginationObject={paginationObject} />
          </Suspense>
        </ErrorBoundary>
      )}
    </SearchPage>
  );
}

export default Search;
