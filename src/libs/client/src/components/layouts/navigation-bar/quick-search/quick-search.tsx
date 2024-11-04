"use client";

import React, { ComponentProps, useRef, useState, useEffect } from "react";
import QuickSearchResults from "./quick-search-results";
import SearchInputRef from "@/root/src/libs/client/src/components/modules/search-input/search-input-ref";
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

  useEffect(() => {
    const searchValue = window.localStorage.getItem("search");
    if (searchValue !== null && searchInputElement.current !== null) {
      searchInputElement.current.value = searchValue;
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
    if (window) window.localStorage.setItem("search", e.target.value);

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
