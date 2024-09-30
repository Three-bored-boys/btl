"use client";

import React, { ComponentProps, useRef, useState } from "react";
import MagnifyingGlass from "../../../ui/icons/magnifying-glass";
import { cn } from "@/client/utils";

export default function BookSearch({ className }: ComponentProps<"div">) {
  const [searchInput, setSearchInput] = useState<string>("");
  const [searchResultsVisible, setSearchResultsVisible] = useState<boolean>(false);
  const timeoutFunction = useRef<NodeJS.Timeout | null>(null);
  const searchInputElement = useRef<HTMLInputElement | null>(null);

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

  const handleSearchInput = function () {
    if (!timeoutFunction.current) {
      updateSearchInputState();
    } else {
      clearTimeout(timeoutFunction.current);
    }

    timeoutFunction.current = setTimeout(() => {
      updateSearchInputState();
    }, 1000);
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
          onChange={(e) => {
            showSearchResults(e.target.value, e);
            handleSearchInput();
          }}
          onFocus={(e) => {
            showSearchResults(e.target.value, e);
          }}
          onBlur={(e) => {
            showSearchResults(e.target.value, e);
            if (timeoutFunction.current) {
              clearTimeout(timeoutFunction.current);
              timeoutFunction.current = null;
            }
          }}
          ref={searchInputElement}
        />
      </div>
      {searchResultsVisible ? (
        <div className={cn("absolute left-0 top-full mt-2 block w-full bg-secondary-50 p-1")}>
          {searchInput !== "" && <div>You have input something {searchInput}</div>}
        </div>
      ) : null}
    </div>
  );
}
