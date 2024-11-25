"use client";

import React, { ReactElement } from "react";
import SearchInput from "../../ui/search-input";
import Label from "../../ui/label";
import Input from "../../ui/input";
import { BTL_LOCAL_STORAGE_SEARCH_OBJECT, setSearchObjectToLocalStorage } from "@/client/utils";
import { DEFAULT_MAX_RESULTS, DEFAULT_START_INDEX } from "@/libs/shared/src/utils";
import { useSearchPage } from "./hooks";
import Button from "../../ui/button";
import Container from "../../layouts/container";
import SearchPageResultsWrapper from "./search-page-results-wrapper";

const SearchPage = function (): ReactElement {
  const { filters, allInputElementRefsMap, searchInputElement, router, searchParams } = useSearchPage();

  const handleOnSubmit = function (e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();

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

    if (searchParamsObject.has("search") || filters.current.filter((key) => searchParamsObject.has(key)).length !== 0) {
      searchParamsObject.set("run", "");
    } else {
      searchParamsObject.delete("run");
    }
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
            <div className="flex items-center justify-between">
              {filters.current.map((str) => (
                <Label key={str}>
                  <span>By {str}</span>
                  <Input
                    className="w-full border-2 border-primary-100"
                    type="search"
                    ref={(node) => {
                      if (node) {
                        allInputElementRefsMap.current.set(str, node);
                      } else {
                        allInputElementRefsMap.current.delete(str);
                      }
                    }}
                  />
                </Label>
              ))}
            </div>
          </div>
          <Button type="submit" background={"light"} textSize={"small"} onClick={handleOnSubmit}>
            Submit
          </Button>
        </form>
        <SearchPageResultsWrapper></SearchPageResultsWrapper>
      </Container>
    </div>
  );
};

export default SearchPage;
