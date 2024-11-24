"use client";

import React, { ReactElement } from "react";
import SearchInput from "../../ui/search-input";
import Label from "../../ui/label";
import Input from "../../ui/input";
import { SearchObjectType } from "@/root/src/libs/shared/src/schemas";
import { DEFAULT_MAX_RESULTS, DEFAULT_START_INDEX, editSearchObjectInLocalStorage } from "@/client/utils";
import { useSearchPage } from "./hooks";
import Button from "../../ui/button";
import Container from "../../layouts/container";
import SearchPageResults from "./search-page-results";

const SearchPage = function (): ReactElement {
  const {
    filters,
    allInputElementRefsMap,
    searchInputElement,
    searchObjectRef,
    router,
    paginationObjectState,
    searchObjectState,
  } = useSearchPage();

  const handleOnChange = function (e: React.ChangeEvent<HTMLInputElement>, key: keyof SearchObjectType) {
    const trimmedValue = e.target.value.trim();
    if (window) {
      searchObjectRef.current = editSearchObjectInLocalStorage(key, trimmedValue);
    }
  };

  const handleOnSubmit = function (e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    console.log(searchObjectRef.current);

    if (Object.entries(searchObjectRef.current).length !== 0) {
      router.push(
        `/search?${new URLSearchParams({ ...searchObjectRef.current, maxResults: DEFAULT_MAX_RESULTS.toString(), startIndex: DEFAULT_START_INDEX.toString() }).toString()}`,
      );
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
              onChange={(e) => handleOnChange(e, "search")}
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
                    onChange={(e) => handleOnChange(e, str)}
                  />
                </Label>
              ))}
            </div>
          </div>
          <Button type="submit" background={"light"} textSize={"small"} onClick={handleOnSubmit}>
            Submit
          </Button>
        </form>
        {Object.entries(searchObjectState).length !== 0 ? (
          <SearchPageResults paginationObject={paginationObjectState} searchObject={searchObjectState} />
        ) : null}
      </Container>
    </div>
  );
};

export default SearchPage;
