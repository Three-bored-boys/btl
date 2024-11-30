"use client";

import React, { ReactElement } from "react";
import SearchInput from "../../ui/search-input";
import Label from "../../ui/label";
import { BTL_LOCAL_STORAGE_SEARCH_OBJECT, setSearchObjectToLocalStorage } from "@/client/utils";
import { DEFAULT_MAX_RESULTS, DEFAULT_START_INDEX } from "@/libs/shared/src/utils";
import { useSearchPage } from "./hooks";
import Button from "../../ui/button";
import Container from "../../layouts/container";
import SearchPageResultsWrapper from "./search-page-results-wrapper";
import { data } from "./data";

const SearchPage = function (): ReactElement {
  const { filters, allInputElementRefsMap, searchInputElement, router, searchParams } = useSearchPage();

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

    const searchParamsObject = new URLSearchParams(searchParams.toString());

    searchParamsObject.set("maxResults", DEFAULT_MAX_RESULTS.toString());
    searchParamsObject.set("startIndex", DEFAULT_START_INDEX.toString());

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

    console.log(searchParamsObject);

    if (searchParamsObject.toString() !== searchParams.toString()) {
      router.push(`/search?${searchParamsObject.toString()}`);
    }
  };

  return (
    <div className="w-full">
      <Container>
        <form className="mt-3 w-full">
          <div className="mx-auto w-11/12 max-w-96">
            <SearchInput
              classNameDiv="w-full border-2 border-primary-100"
              ref={searchInputElement}
              placeholder="Search..."
            />
          </div>
          <div className="w-full">
            <p>Filters</p>
            <hr />
            <div className="flex items-center justify-center gap-x-3">
              {filters.current.map((str) => (
                <Label key={str}>
                  <span>{str[0].toUpperCase() + str.slice(1)}</span>
                  <div className="appearance-none">
                    <select
                      className="w-full rounded-md border-2 border-primary-100"
                      ref={(node) => {
                        if (node) {
                          allInputElementRefsMap.current.set(str, node);
                        } else {
                          allInputElementRefsMap.current.delete(str);
                        }
                      }}
                      onChange={(e) => console.log(e.target.value)}
                    >
                      <option value="">All {str}s</option>
                      {data[str]?.map((val, i) => (
                        <option value={val} selected={val === searchParams.get(str)} key={i}>
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
        <SearchPageResultsWrapper />
      </Container>
    </div>
  );
};

export default SearchPage;
