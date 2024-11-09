"use client";

import React from "react";
import Container from "../../layouts/container";
import SearchInputRef from "../search-input/search-input-ref";
import Label from "../../ui/label";
import Input from "../../ui/input";
import { SearchObjectType } from "@/root/src/libs/server/src/types";
import { getSearchObjectFromLocalStorage, setSearchObjectToLocalStorage } from "@/client/utils";
import useSearchPage from "./hook";

export const SearchPage = () => {
  const [filters, allInputElementRefsMap, searchInputElement, searchObjectRef] = useSearchPage();

  const handleOnChange = function (e: React.ChangeEvent<HTMLInputElement>, key: keyof SearchObjectType) {
    if (e.target.value !== "") {
      setSearchObjectToLocalStorage({ ...getSearchObjectFromLocalStorage(), [key]: e.target.value });
      return;
    }

    searchObjectRef.current = getSearchObjectFromLocalStorage();
    /* eslint-disable-next-line */
    delete searchObjectRef.current[key];
    setSearchObjectToLocalStorage(searchObjectRef.current);
  };

  return (
    <div className="w-full">
      <Container>
        <form className="mt-3 w-full">
          <div className="mx-auto w-11/12 max-w-96">
            <SearchInputRef
              classNameDiv="w-full border-2 border-primary-100"
              ref={searchInputElement}
              onChange={(e) => handleOnChange(e, "search")}
            />
          </div>
          <div className="w-full">
            <p>Filters</p>
            <hr />
            <div className="flex items-center justify-between">
              {filters.map((str) => (
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
