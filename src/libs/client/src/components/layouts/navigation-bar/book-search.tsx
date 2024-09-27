"use client";

import React, { ComponentProps, useState } from "react";
import MagnifyingGlass from "../../ui/icons/magnifying-glass";
import { cn } from "../../../utils";

export default function BookSearch({ className }: ComponentProps<"div">) {
  const [searchInput, setSearchInput] = useState<string>("");

  return (
    <div className={cn(className)}>
      <div className="flex w-full items-center justify-start gap-1">
        <MagnifyingGlass />
        <input
          type="search"
          className="w-full rounded-lg border-2 border-primary-50 px-1 text-base outline-0 hover:border-primary-100 focus:border-primary sm:w-full lg:text-lg"
          placeholder="Enter a book or string..."
          onChange={(e) => {
            setSearchInput(e.target.value);
            console.log(e.target.value);
          }}
        />
      </div>
    </div>
  );
}
