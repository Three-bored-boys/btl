import React from "react";
import { useSearchPageResults } from "./hooks";
import { PaginationObjectType, SearchObjectType } from "@/root/src/libs/shared/src/schemas";
import { useSearchParams } from "next/navigation";
import { DEFAULT_MAX_RESULTS } from "@/root/src/libs/shared/src/utils";

function SearchPageQueryComponent({
  searchObject,
  paginationObject,
}: {
  searchObject: SearchObjectType;
  paginationObject: PaginationObjectType;
}) {
  const { data, error, isLoading } = useSearchPageResults(searchObject, paginationObject);
  const searchParams = useSearchParams();

  if (isLoading) return <div>Loading...</div>;

  if (error) return <div>{error.message}</div>;

  const maxResults = searchParams.get("maxResults") ?? DEFAULT_MAX_RESULTS.toString();
  const pagesNumberNotRounded = data.totalItems / parseInt(maxResults, 10);
  const pagesNumberFloor = Math.floor(pagesNumberNotRounded);

  return <div>{JSON.stringify({ pagesNumberFloor, pagesNumberNotRounded })}</div>;
}

export default SearchPageQueryComponent;
