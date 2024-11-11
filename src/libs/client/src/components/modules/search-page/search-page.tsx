"use client";

import React from "react";
import Container from "../../layouts/container";
import SearchInput from "../../ui/search-input";
import Label from "../../ui/label";
import Input from "../../ui/input";
import { SearchObjectType } from "@/root/src/libs/server/src/types";
import { editLocalStorageOnInputChange } from "@/client/utils";
import useSearchPage from "./hook";

export const SearchPage = () => {
  const [filters, allInputElementRefsMap, searchInputElement, searchObjectRef] = useSearchPage();

  const handleOnChange = function (e: React.ChangeEvent<HTMLInputElement>, key: keyof SearchObjectType) {
    const trimmedValue = e.target.value.trim();
    if (window) {
      searchObjectRef.current = editLocalStorageOnInputChange(key, trimmedValue);
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
        </form>
      </Container>
    </div>
  );
};
