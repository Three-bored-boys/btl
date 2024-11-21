"use client";

import React, { ComponentProps, useRef, useState, useEffect } from "react";
import QuickSearchResults from "./quick-search-results";
import SearchInput from "@/root/src/libs/client/src/components/ui/search-input";
import { cn, getSearchObjectFromLocalStorage, editSearchObjectInLocalStorage } from "@/client/utils";
import type { SearchObjectType } from "@/server/schemas";

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
  const searchObjectRef = useRef<SearchObjectType>({});

  useEffect(() => {
    if (window) {
      searchObjectRef.current = getSearchObjectFromLocalStorage();
    }

    if (searchInputElement.current !== null) {
      if (searchObjectRef.current.search !== undefined)
        searchInputElement.current.value = searchObjectRef.current.search;
    }
  }, []);

  const handleOnEnterPress = function (e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key !== "Enter") return;

    if (searchInputElement.current) {
      if (searchInputElement.current.value.trim() === "") {
        return;
      }

      setSearchInput(searchInputElement.current.value);
      setSearchResultsVisible(true);
    }
  };

  const handleOnChange = function (e: React.ChangeEvent<HTMLInputElement>, key: keyof SearchObjectType) {
    const trimmedValue = e.target.value;
    if (window) {
      searchObjectRef.current = editSearchObjectInLocalStorage(key, trimmedValue);
    }

    if (trimmedValue !== "") return;

    setSearchResultsVisible(false);
    setSearchInput("");
  };

  return (
    <div className={cn("relative", className)}>
      <SearchInput
        ref={searchInputElement}
        onChange={(e) => handleOnChange(e, "search")}
        onKeyDown={handleOnEnterPress}
        placeholder="Search by book title, author, ISBN..."
      />
      {searchResultsVisible && (
        <QuickSearchResultsWrapper>
          <QuickSearchResults search={searchInput} setSearchResultsVisible={setSearchResultsVisible} />
        </QuickSearchResultsWrapper>
      )}
    </div>
  );
}
