"use client";

import React, { ComponentProps, useRef, useState } from "react";
import MagnifyingGlass from "../../../ui/icons/magnifying-glass";
import QuickSearchResults from "./quick-search-results";
import { cn } from "@/client/utils";

export default function BookSearch({ className }: ComponentProps<"div">) {
  const [searchInput, setSearchInput] = useState<string>("");
  const [searchResultsVisible, setSearchResultsVisible] = useState<boolean>(false);
  const timeoutFunction = useRef<NodeJS.Timeout | null>(null);
  const searchInputElement = useRef<HTMLInputElement | null>(null);

  const delayInSeconds = 5;

  const showSearchResults = function (
    input: string,
    e: React.FocusEvent<HTMLInputElement> | React.ChangeEvent<HTMLInputElement>,
  ) {
    if (e.type === "blur" && input.length === 0) {
      setSearchResultsVisible(false);
      return;
    }
    if (e.type === "blur" && input.length !== 0) {
      setSearchResultsVisible(true);
      return;
    }
    if (input.length === 0 && (e.type === "focus" || e.type === "change")) {
      setSearchResultsVisible(false);
      return;
    }
    setSearchResultsVisible(true);
    return;
  };

  const updateSearchInputState = function () {
    if (searchInputElement.current !== null) {
      setSearchInput(searchInputElement.current.value);
    }
  };

  const handleSearchInputDebounce = function () {
    if (!timeoutFunction.current) {
      updateSearchInputState();
    } else {
      clearTimeout(timeoutFunction.current);
      timeoutFunction.current = null;
    }

    timeoutFunction.current = setTimeout(() => {
      updateSearchInputState();
    }, delayInSeconds * 1000);
  };

  const handleOnChange = function (e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.value === "") {
      if (timeoutFunction.current !== null) {
        clearTimeout(timeoutFunction.current);
      }
      timeoutFunction.current = null;
      showSearchResults(e.target.value, e);
    } else {
      showSearchResults(e.target.value, e);
      handleSearchInputDebounce();
    }
  };

  const handleOnFocus = function (e: React.FocusEvent<HTMLInputElement>) {
    showSearchResults(e.target.value, e);
    if (timeoutFunction.current) {
      clearTimeout(timeoutFunction.current);
      timeoutFunction.current = null;
    }
  };

  const handleOnBlur = function (e: React.FocusEvent<HTMLInputElement>) {
    showSearchResults(e.target.value, e);
  };

  return (
    <div className={cn("relative", className)}>
      <div
        className={cn(
          "flex w-full items-center justify-start gap-1 rounded-lg border-2 border-transparent px-1 text-base has-[:focus]:border-primary hover:bg-primary-50 lg:text-lg",
        )}
      >
        <MagnifyingGlass />
        <input
          type="search"
          className="w-full bg-inherit outline-0"
          placeholder="Enter a book or string..."
          onChange={handleOnChange}
          onFocus={handleOnFocus}
          onBlur={handleOnBlur}
          ref={searchInputElement}
        />
      </div>
      {searchResultsVisible ? (
        <div className={cn("absolute left-0 top-full mt-2 block w-full bg-secondary-50 p-1")}>
          {searchInput !== "" ? <QuickSearchResults search={searchInput} /> : null}
        </div>
      ) : null}
    </div>
  );
}
