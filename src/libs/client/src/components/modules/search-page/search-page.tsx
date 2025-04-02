"use client";

import React, { ReactElement } from "react";
import { SearchInput } from "@/client/components/ui/search-input";
import { Label } from "@/client/components/ui/label";
import { filterKeysArray } from "@/libs/shared/src/utils";
import { useSearchPage } from "@/client/hooks/search-page";
import { Button } from "@/client/components/ui/button";
import { Container } from "@/client/components/layouts/container";
import { data } from "./data";
import { SearchPageResultsLoadingSkeleton } from "./search-page-results-loading-skeleton";
import { DEFAULT_MAX_RESULTS, DEFAULT_PAGE_NUMBER, MAX_MAX_RESULTS, MIN_MAX_RESULTS } from "@/shared/utils";
import { handleNumberSearchParam, editSearchObjectInLocalStorage } from "@/client/utils";

export const SearchPage = function ({
  updatedSearchParams,
  originalSearchParams,
  children,
}: {
  updatedSearchParams: string;
  originalSearchParams: string;
  children: React.ReactNode;
}): ReactElement {
  const { allInputElementRefsMap, searchInputElement, router, run, setRun } = useSearchPage({
    updatedSearchParams,
    originalSearchParams,
  });

  const handleOnSubmit = function (e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setRun(false);

    const newSearchParamsObject = new URLSearchParams(updatedSearchParams);

    const maxResultsQueryParam = newSearchParamsObject.get("maxResults");
    const newMaxResultsQueryParam = handleNumberSearchParam(
      maxResultsQueryParam,
      DEFAULT_MAX_RESULTS,
      MIN_MAX_RESULTS,
      MAX_MAX_RESULTS,
    );
    newSearchParamsObject.set("maxResults", newMaxResultsQueryParam);

    newSearchParamsObject.set("page", DEFAULT_PAGE_NUMBER.toString());

    if (searchInputElement.current !== null) {
      const search = searchInputElement.current.value.trim();
      if (search.length !== 0) {
        newSearchParamsObject.set("search", search);
      } else {
        newSearchParamsObject.delete("search");
      }
      if (window) {
        editSearchObjectInLocalStorage("search", search);
      }
    }

    allInputElementRefsMap.current.forEach((_, key, map) => {
      const node = map.get(key);
      if (node !== undefined && node !== null) {
        const filterValue = node.value.trim();
        if (filterValue.length !== 0) {
          newSearchParamsObject.set(key, filterValue);
        } else {
          newSearchParamsObject.delete(key);
        }
      }
    });

    if (updatedSearchParams.toString() !== newSearchParamsObject.toString()) {
      router.push(`/search?${newSearchParamsObject.toString()}`);
    } else {
      setRun(true);
    }
  };

  return (
    <div className="w-full">
      <Container>
        <form className="mt-3 w-full" onSubmit={(e) => handleOnSubmit(e)}>
          <div className="mx-auto mb-5 w-11/12 max-w-96">
            <SearchInput
              classNameDiv="w-full border-2 border-primary-100"
              ref={searchInputElement}
              placeholder="Search by book title, author, ISBN..."
            />
          </div>
          <div className="mb-6 w-full">
            <p className="text-2xl font-semibold">Filters</p>
            <hr className="h-5" />
            <div className="flex items-center justify-center gap-x-3">
              {filterKeysArray.map((str) => (
                <Label key={str}>
                  <span className="text-xl font-medium">{str[0].toUpperCase() + str.slice(1)}</span>
                  <div className="appearance-none">
                    <select
                      className="w-full rounded-md border-2 border-primary-100 px-1 py-0.5 text-base lg:text-lg"
                      ref={(node) => {
                        if (node) {
                          allInputElementRefsMap.current.set(str, node);
                        } else {
                          allInputElementRefsMap.current.delete(str);
                        }
                      }}
                    >
                      <option value="">All {str}s</option>
                      {data[str]?.map((val, i) => (
                        <option value={val} key={i}>
                          {val}
                        </option>
                      ))}
                    </select>
                  </div>
                </Label>
              ))}
            </div>
          </div>
          <Button type="submit" background={"light"} textSize={"small"}>
            Submit
          </Button>
        </form>
        {run ? children : <SearchPageResultsLoadingSkeleton />}
      </Container>
    </div>
  );
};
