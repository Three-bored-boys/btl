"use client";

import React, { ComponentProps, useRef, useState, useEffect } from "react";
import QuickSearchResults from "./quick-search-results";
import SearchInputRef from "@/root/src/libs/client/src/components/modules/search-input/search-input-ref";
import { cn } from "@/client/utils";
import type { SearchObjectType } from "@/server/types";

const QuickSearchResultsWrapper = function ({ className, children }: ComponentProps<"div">) {
  return (
    <div className={cn("absolute left-0 top-full z-20 mt-2 block w-full bg-secondary-50 p-1", className)}>
      {children}
    </div>
  );
};

export default function QuickSearch({ className }: ComponentProps<"div">) {
  const [searchInput, setSearchInput] = useState<string>("");
  const [searchResultsVisible, setSearchResultsVisible] = useState<boolean>(false);
  const searchInputElement = useRef<HTMLInputElement | null>(null);
  const searchObjectRef = useRef<SearchObjectType | null>(null);

  useEffect(() => {
    searchObjectRef.current = JSON.parse(window.localStorage.getItem("searchObject") ?? "{}") as SearchObjectType;

    if (searchObjectRef.current !== null && searchInputElement.current !== null) {
      if (searchObjectRef.current.search !== undefined)
        searchInputElement.current.value = searchObjectRef.current.search;
    }
  }, []);

  const handleOnEnterPress = function (e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key !== "Enter") return;

    if (searchInputElement.current) {
      if (searchInputElement.current.value === "") {
        return;
      }

      setSearchInput(searchInputElement.current.value);
      setSearchResultsVisible(true);
    }
  };

  const handleOnChange = function (e: React.ChangeEvent<HTMLInputElement>) {
    if (window) {
      window.localStorage.setItem(
        "searchObject",
        JSON.stringify({ ...searchObjectRef.current, search: e.target.value }),
      );
    }

    if (e.target.value !== "") return;

    setSearchResultsVisible(false);
    setSearchInput("");
  };

  return (
    <div className={cn("relative", className)}>
      <SearchInputRef
        ref={searchInputElement}
        onChange={handleOnChange}
        onKeyDown={handleOnEnterPress}
        placeholder="Enter book title, author or ISBN..."
      />
      {searchResultsVisible && (
        <QuickSearchResultsWrapper>
          <QuickSearchResults search={searchInput} setSearchResultsVisible={setSearchResultsVisible} />
        </QuickSearchResultsWrapper>
      )}
    </div>
  );
}
