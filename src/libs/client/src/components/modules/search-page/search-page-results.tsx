import React from "react";
import { useSearchPageResults } from "./hooks";
import { PaginationObjectType, SearchObjectType } from "@/root/src/libs/server/src/schemas";

function SearchPageResults({
  searchObject,
  paginationObject,
}: {
  searchObject: SearchObjectType;
  paginationObject: PaginationObjectType;
}) {
  const { data, error, isLoading } = useSearchPageResults(searchObject, paginationObject);

  if (isLoading) return <div>Loading...</div>;

  if (error) return <div>{error.message}</div>;

  return <div>{JSON.stringify(data)}</div>;
}

export default SearchPageResults;
