"use client";

import React, { ComponentProps, useState } from "react";
import MagnifyingGlass from "../../../ui/icons/magnifying-glass";
import { cn } from "@/client/utils";

export default function BookSearch({ className }: ComponentProps<"div">) {
  const [searchInput, setSearchInput] = useState<string>("");
  const [searchResultsVisible, setSearchResultsVisible] = useState<boolean>(false);

  const showSearchResults = function (
    input: string,
    e: React.FocusEvent<HTMLInputElement> | React.ChangeEvent<HTMLInputElement>,
  ) {
    if (e.type === "blur") {
      setSearchResultsVisible(false);
      return;
    }
    if (input.length === 0 && (e.type === "focus" || e.type === "change")) {
      setSearchResultsVisible(false);
      return;
    }
    setSearchResultsVisible(true);
    return;
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
            setSearchInput(e.target.value);
            showSearchResults(e.target.value, e);
          }}
          onFocus={(e) => showSearchResults(searchInput, e)}
          onBlur={(e) => showSearchResults(searchInput, e)}
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
