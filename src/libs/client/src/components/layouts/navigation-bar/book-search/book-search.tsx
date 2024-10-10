"use client";

import React, { ComponentProps, useRef, useState } from "react";
import MagnifyingGlass from "../../../ui/icons/magnifying-glass";
import QuickSearchResults from "./quick-search-results";
import { cn } from "@/client/utils";

const QuickSearchResultsWrapper = function ({ className, children }: ComponentProps<"div">) {
  return (
    <div className={cn("absolute left-0 top-full z-20 mt-2 block w-full bg-secondary-50 p-1", className)}>
      {children}
    </div>
  );
};

export default function BookSearch({ className }: ComponentProps<"div">) {
  const [searchInput, setSearchInput] = useState<string>("");
  const [searchResultsVisible, setSearchResultsVisible] = useState<boolean>(false);
  const searchInputElement = useRef<HTMLInputElement | null>(null);

  const handleOnSubmit = function (e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log(e);

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
      <form
        className={cn(
          "flex w-full items-center justify-start gap-1 rounded-lg border-2 border-transparent px-1 text-base has-[:focus]:border-primary hover:bg-primary-50 lg:text-lg",
        )}
        onSubmit={handleOnSubmit}
      >
        <MagnifyingGlass />
        <input
          type="search"
          className="w-full bg-inherit outline-none focus:outline-none"
          placeholder="Enter a book or string..."
          onChange={handleOnChange}
          ref={searchInputElement}
        />
      </form>
      {searchResultsVisible && (
        <QuickSearchResultsWrapper>
          <QuickSearchResults search={searchInput} setSearchResultsVisible={setSearchResultsVisible} />
        </QuickSearchResultsWrapper>
      )}
    </div>
  );
}
