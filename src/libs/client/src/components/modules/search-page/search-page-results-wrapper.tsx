import { PaginationObjectType, SearchObjectType } from "@/root/src/libs/shared/src/schemas";
import { filterKeysArray } from "@/root/src/libs/shared/src/utils";
import { useSearchParams } from "next/navigation";
import React from "react";

export default function SearchPageResultsWrapper() {
  const searchParams = useSearchParams();

  const searchObject: SearchObjectType = {};
  const paginationObject: PaginationObjectType = {};

  const paramsHasSearch = searchParams.has("search");
  const paramsHasFilters = filterKeysArray.filter((val) => searchParams.has(val));

  if (!paramsHasSearch && paramsHasFilters.length === 0) {
    return <div>Please enter a search term or select a filter</div>;
  }

  return <div>This is the results wrapperrrrr</div>;
}
