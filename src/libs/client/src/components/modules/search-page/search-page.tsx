"use client";

import React from "react";
import { useSearchPage } from "./hooks";

function SearchPage() {
  const hello = useSearchPage();

  if (hello[4].isLoading) return <div>Loading...</div>;

  if (hello[4].error) return <div>Error!!!</div>;

  return <div>{JSON.stringify(hello[4].data)}</div>;
}

export default SearchPage;
