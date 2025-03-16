"use client";

import React, { ComponentProps, useRef, useState, useEffect, Suspense, useTransition } from "react";
import { QuickSearchResults } from "./quick-search-results";
import { SearchInput } from "@/client/components/ui/search-input";
import { cn, getSearchObjectFromLocalStorage, setSearchObjectToLocalStorage } from "@/client/utils";
import type { SearchObjectType } from "@/shared/validators";
import { Button } from "@/client/components/ui/button";
import { Close } from "@/client/components/ui/icons/close";
import { LoadingSkeleton } from "./loading-skeleton";
import { ErrorBoundary } from "react-error-boundary";
import { QuickSearchErrorBoundary } from "./quick-search-error-boundary";
import { BadResponse, GoodResponse, Book } from "@/shared/types";
import { getResultsOfQuickSearch } from "@/server/actions";

type QuickSearchResultsWrapperProps = {
  setSearchResultsVisible: React.Dispatch<React.SetStateAction<boolean>>;
} & ComponentProps<"div">;

const QuickSearchResultsWrapper = function ({
  className,
  children,
  setSearchResultsVisible,
}: QuickSearchResultsWrapperProps) {
  return (
    <div className={cn("absolute left-0 top-full z-20 mt-2 block w-full bg-secondary-50 p-1", className)}>
      {children}
      <div onClick={() => setSearchResultsVisible(false)} className="mt-2">
        <Button background={"dark"} textSize={"small"} className="hidden xs:block">
          Close
        </Button>
        <Close className="block rounded-full bg-primary hover:bg-primary-600 xs:hidden" stroke="#fff"></Close>
      </div>
    </div>
  );
};

export function QuickSearch({ className }: ComponentProps<"div">) {
  const [searchInput, setSearchInput] = useState<string>("");
  const [result, setResult] = useState<BadResponse | GoodResponse<Book[]> | null>(null);
  const [searchResultsVisible, setSearchResultsVisible] = useState<boolean>(false);
  const searchInputElement = useRef<HTMLInputElement | null>(null);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    if (searchInputElement.current !== null && window) {
      const searchObject = getSearchObjectFromLocalStorage();
      if (searchObject.search !== undefined) {
        searchInputElement.current.value = searchObject.search;
      }
    }
  }, []);

  const handleOnEnterPress = async function (e: React.KeyboardEvent<HTMLInputElement>) {
    if (searchInputElement.current) {
      if (searchInputElement.current.value.trim() === "") {
        return;
      }

      if (window) {
        setSearchObjectToLocalStorage({ search: searchInputElement.current.value.trim() });
      }

      const resultOfQuickSearch = await getResultsOfQuickSearch(searchInputElement.current.value.trim());
      setResult(resultOfQuickSearch);

      setSearchInput(searchInputElement.current.value.trim());
      setSearchResultsVisible(true);
    }
  };

  const handleOnChange = function (e: React.ChangeEvent<HTMLInputElement>, key: keyof SearchObjectType) {
    const trimmedValue = e.target.value.trim();

    if (trimmedValue !== "") return;

    setSearchResultsVisible(false);
    setSearchInput("");
  };

  return (
    <div className={cn("relative", className)}>
      <SearchInput
        ref={searchInputElement}
        onChange={(e) => handleOnChange(e, "search")}
        onKeyDown={(e) => {
          if (e.key !== "Enter") return;
          startTransition(() => {
            void handleOnEnterPress(e);
          });
        }}
        placeholder="Search by book title, author, ISBN..."
      />
      {isPending ? (
        <QuickSearchResultsWrapper setSearchResultsVisible={setSearchResultsVisible}>
          <LoadingSkeleton />
        </QuickSearchResultsWrapper>
      ) : (
        searchResultsVisible && (
          <QuickSearchResultsWrapper setSearchResultsVisible={setSearchResultsVisible}>
            <ErrorBoundary fallbackRender={QuickSearchErrorBoundary}>
              <Suspense fallback={<LoadingSkeleton />}>
                <QuickSearchResults
                  search={searchInput}
                  setSearchResultsVisible={setSearchResultsVisible}
                  result={result}
                />
              </Suspense>
            </ErrorBoundary>
          </QuickSearchResultsWrapper>
        )
      )}
    </div>
  );
}
