"use client";

import React, { ComponentProps, useState } from "react";
import MagnifyingGlass from "../../../ui/icons/magnifying-glass";
import { cn } from "../../../../utils";

export default function BookSearch({ className }: ComponentProps<"div">) {
  const [searchInput, setSearchInput] = useState<string>("");
  const [isInputFocus, setIsInputFocus] = useState<boolean>(false);

  return (
    <div className={cn("relative", className)}>
      <div
        className={cn(
          "flex w-full items-center justify-start gap-1 rounded-lg border-2 border-transparent px-1 text-base hover:bg-primary-50 lg:text-lg",
          { "border-primary": isInputFocus },
        )}
      >
        <MagnifyingGlass />
        <input
          type="search"
          className="w-full bg-inherit outline-0"
          placeholder="Enter a book or string..."
          onChange={(e) => {
            setSearchInput(e.target.value);
            console.log(e.target.value);
          }}
          onFocus={() => setIsInputFocus(true)}
          onBlur={() => setIsInputFocus(false)}
        />
      </div>
      <div
        className={cn("absolute left-0 top-full mt-2 w-full bg-slate-300", {
          "hidden": !isInputFocus,
          "block": isInputFocus,
        })}
      >
        {searchInput === "" ? <div>Input a search item...</div> : <div>You have input something `{searchInput}`</div>}
      </div>
    </div>
  );
}
