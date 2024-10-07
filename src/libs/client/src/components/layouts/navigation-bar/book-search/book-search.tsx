"use client";

import React, { ComponentProps, useRef, useState } from "react";
import MagnifyingGlass from "../../../ui/icons/magnifying-glass";
import ArrowPath from "../../../ui/icons/arrow-path";
import QuickSearchResults from "./quick-search-results";
import { cn } from "@/client/utils";

const QuickSearchResultsWrapper = function ({ className, children }: ComponentProps<"div">) {
  return (
    <div className={cn("absolute left-0 top-full z-20 mt-2 w-full bg-secondary-50 p-1", className)}>{children}</div>
  );
};

export default function BookSearch({ className }: ComponentProps<"div">) {
  const [searchInput, setSearchInput] = useState<string>("");
  const [searchResultsVisible, setSearchResultsVisible] = useState<boolean>(false);
  const [isTimeOutFuncQueued, setIsTimeOutFuncQueued] = useState<boolean>(false);
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

  const handleSearchInputDebounce = function (e: React.ChangeEvent<HTMLInputElement>) {
    if (timeoutFunction.current) {
      clearTimeout(timeoutFunction.current);
    }

    timeoutFunction.current = setTimeout(() => {
      updateSearchInputState();
      showSearchResults(e.target.value, e);
      setIsTimeOutFuncQueued(false);
    }, delayInSeconds * 1000);

    setIsTimeOutFuncQueued(true);
  };

  const handleOnChange = function (e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.value === "") {
      if (timeoutFunction.current !== null) {
        clearTimeout(timeoutFunction.current);
      }
      timeoutFunction.current = null;
      showSearchResults(e.target.value, e);
      setIsTimeOutFuncQueued(false);
    } else {
      handleSearchInputDebounce(e);
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
        {isTimeOutFuncQueued ? <ArrowPath className="animate-spin-slow" /> : <MagnifyingGlass />}
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
      <QuickSearchResultsWrapper
        className={cn({
          "block": searchResultsVisible,
          "hidden": !searchResultsVisible,
        })}
      >
        <QuickSearchResults search={searchInput} />
      </QuickSearchResultsWrapper>
    </div>
  );
}
