"use client";

import React, { ComponentProps, useRef, useState, useEffect } from "react";
import { QuickSearchResults } from "./quick-search-results";
import { SearchInput } from "@/root/src/libs/client/src/components/ui/search-input";
import { cn, getSearchObjectFromLocalStorage, setSearchObjectToLocalStorage } from "@/client/utils";
import type { SearchObjectType } from "@/root/src/libs/shared/src/schemas";

const QuickSearchResultsWrapper = function ({ className, children }: ComponentProps<"div">) {
  return (
    <div className={cn("absolute left-0 top-full z-20 mt-2 block w-full bg-secondary-50 p-1", className)}>
      {children}
    </div>
  );
};

export function QuickSearch({ className }: ComponentProps<"div">) {
  const [searchInput, setSearchInput] = useState<string>("");
  const [searchResultsVisible, setSearchResultsVisible] = useState<boolean>(false);
  const searchInputElement = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (searchInputElement.current !== null && window) {
      const searchObject = getSearchObjectFromLocalStorage();
      if (searchObject.search !== undefined) {
        searchInputElement.current.value = searchObject.search;
      }
    }
  }, []);

  const handleOnEnterPress = function (e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key !== "Enter") return;

    if (searchInputElement.current) {
      if (searchInputElement.current.value.trim() === "") {
        return;
      }

      if (window) {
        setSearchObjectToLocalStorage({ search: searchInputElement.current.value.trim() });
      }

      setSearchInput(searchInputElement.current.value.trim());
      setSearchResultsVisible(true);
    }
  };

  const handleOnChange = function (e: React.ChangeEvent<HTMLInputElement>, key: keyof SearchObjectType) {
    const trimmedValue = e.target.value;

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
