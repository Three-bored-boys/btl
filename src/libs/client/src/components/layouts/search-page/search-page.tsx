"use client";

import React, { ReactElement } from "react";
import Container from "../container";
import SearchInput from "../../ui/search-input";
import Label from "../../ui/label";
import Input from "../../ui/input";
import { SearchObjectType } from "@/root/src/libs/server/src/schemas";
import { DEFAULT_MAX_RESULTS, DEFAULT_START_INDEX, editSearchObjectInLocalStorage } from "@/client/utils";
import { useSearchPage } from "./hooks";
import Button from "../../ui/button";

export const SearchPage = function ({ children }: { children: React.ReactNode }): ReactElement {
  const [filters, allInputElementRefsMap, searchInputElement, searchObjectRef, searchParams, router] = useSearchPage();

  const handleOnChange = function (e: React.ChangeEvent<HTMLInputElement>, key: keyof SearchObjectType) {
    const trimmedValue = e.target.value.trim();
    if (window) {
      searchObjectRef.current = editSearchObjectInLocalStorage(key, trimmedValue);
    }
  };

  const handleOnSubmit = function (e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    console.log(searchParams);
    console.log(router);
    console.log(searchObjectRef.current);
    router.push(
      `/search?${new URLSearchParams({ ...searchObjectRef.current, maxResults: DEFAULT_MAX_RESULTS.toString(), startIndex: DEFAULT_START_INDEX.toString() }).toString()}`,
    );
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
        {children}
      </Container>
    </div>
  );
};
