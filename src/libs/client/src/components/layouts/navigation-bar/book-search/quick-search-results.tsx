"use client";

import React from "react";
// import { book } from "./data";
import LoadingSkeleton from "./loading-skeleton";
import useQuickSearchResults from "./useQuickSearchResults";

export default function QuickSearchResults({ search }: { search: string }) {
  const { isFetching, error, data } = useQuickSearchResults({ search });

  if (isFetching) return <LoadingSkeleton />;

  if (error) return <div>Error!!!</div>;

  return <div>{JSON.stringify(data)}</div>;
}
