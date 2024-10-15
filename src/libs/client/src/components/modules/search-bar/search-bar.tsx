"use client";

import React, { useEffect, useRef } from "react";
import SearchBarRef from "./search-bar-ref";

export default function SearchBar() {
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const searchValue = window.localStorage.getItem("search");
    if (searchValue !== null && inputRef.current !== null) {
      inputRef.current.value = searchValue;
    }
  }, []);

  return <SearchBarRef ref={inputRef} />;
}
