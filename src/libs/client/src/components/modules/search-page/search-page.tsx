"use client";

import React, { ReactElement, Suspense } from "react";
import { SearchInput } from "@/client/components/ui/search-input";
import { Label } from "@/client/components/ui/label";
import {
  BTL_LOCAL_STORAGE_SEARCH_OBJECT,
  handleNumberSearchParam,
  setSearchObjectToLocalStorage,
} from "@/client/utils/utils";
import { DEFAULT_MAX_RESULTS, DEFAULT_PAGE_NUMBER, MAX_MAX_RESULTS, MIN_MAX_RESULTS } from "@/libs/shared/src/utils";
import { useSearchPage } from "@/client/hooks/search-page";
import { Button } from "@/client/components/ui/button";
import { Container } from "@/client/components/layouts/container";
import { SearchPageQueryComponentWrapper } from "./search-page-query-component-wrapper";
import { data } from "./data";
import { SearchPageResultsLoadingSkeleton } from "./search-page-results-loading-skeleton";

export const SearchPage = function (): ReactElement {
  const { filters, allInputElementRefsMap, searchInputElement, router, searchParams, run, setRun } = useSearchPage();

  const handleOnSubmit = function (e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();

    if (
      searchInputElement.current?.value.trim() === "" &&
      Array.from(allInputElementRefsMap.current.values()).filter((elem) => {
        return elem?.value.trim() !== "";
      }).length === 0
    ) {
      return;
    }

    setRun(false);

    const searchParamsObject = new URLSearchParams(searchParams.toString());

    searchParamsObject.set(
      "maxResults",
      handleNumberSearchParam(
        searchParamsObject.get("maxResults"),
        DEFAULT_MAX_RESULTS,
        MIN_MAX_RESULTS,
        MAX_MAX_RESULTS,
      ),
    );
    searchParamsObject.set("page", DEFAULT_PAGE_NUMBER.toString());

    if (searchInputElement.current !== null) {
      const search = searchInputElement.current.value.trim();
      if (search.length !== 0) {
        searchParamsObject.set("search", search);
        if (window) setSearchObjectToLocalStorage({ search });
      } else {
        searchParamsObject.delete("search");
        if (window) window.localStorage.removeItem(BTL_LOCAL_STORAGE_SEARCH_OBJECT);
      }
    }

    allInputElementRefsMap.current.forEach((_, key, map) => {
      const node = map.get(key);

      if (node !== undefined && node !== null) {
        const filterValue = node.value.trim();
        if (filterValue.length !== 0) {
          searchParamsObject.set(key, filterValue);
        } else {
          searchParamsObject.delete(key);
        }
      }
    });

    if (searchParamsObject.toString() !== searchParams.toString()) {
      router.push(`/search?${searchParamsObject.toString()}`);
    } else {
      setRun(true);
    }
  };

  return (
    <div className="w-full">
      <Container>
        <form className="mt-3 w-full">
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
              {filters.current.map((str) => (
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
                      defaultValue={searchParams.get(str) ?? ""}
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
          <Button type="submit" background={"light"} textSize={"small"} onClick={handleOnSubmit}>
            Submit
          </Button>
        </form>
        {run ? (
          <Suspense fallback={<SearchPageResultsLoadingSkeleton />}>
            <SearchPageQueryComponentWrapper />
          </Suspense>
        ) : (
          <SearchPageResultsLoadingSkeleton />
        )}
      </Container>
    </div>
  );
};
