"use client";

import React from "react";
import { useSearchPage } from "./hooks";

function SearchPage() {
  const searchPageHookReturn = useSearchPage();

  if (searchPageHookReturn[5] === null && searchPageHookReturn[7] === null) return <div>Loading...</div>;

  if (searchPageHookReturn[5] === null && searchPageHookReturn[7] !== null)
    return <div>{searchPageHookReturn[7].message}</div>;

  if (typeof searchPageHookReturn[5] === "string") return <div>Enter a search term...</div>;

  return <div>{JSON.stringify(searchPageHookReturn[5])}</div>;
}

export default SearchPage;
