"use client";

import React from "react";
import useQuickSearchResults from "./useQuickSearchResults";

export default function QuickSearchResults({ search }: { search: string }) {
  const { isFetching, error, data } = useQuickSearchResults({ search });

  if (isFetching) return <div>Loading...</div>;

  if (error) return <div>Error!!!</div>;

  return <div>{JSON.stringify(data)}</div>;
}
