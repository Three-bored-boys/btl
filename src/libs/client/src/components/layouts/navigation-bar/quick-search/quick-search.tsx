"use client";

import React, { ComponentProps, useRef, useState } from "react";
import QuickSearchResults from "./quick-search-results";
import SearchBar from "@/client/components/modules/search-bar/search-bar";
import { cn } from "@/client/utils";

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
    if (e.target.value !== "") return;

    setSearchResultsVisible(false);
    setSearchInput("");
  };

  return (
    <div className={cn("relative", className)}>
      <SearchBar
        ref={searchInputElement}
        onChange={handleOnChange}
        onKeyDown={handleOnEnterPress}
        placeholder="Enter a book or string..."
      />
      {searchResultsVisible && (
        <QuickSearchResultsWrapper>
          <QuickSearchResults search={searchInput} setSearchResultsVisible={setSearchResultsVisible} />
        </QuickSearchResultsWrapper>
      )}
    </div>
  );
}
