"use client";

import React from "react";
import MagnifyingGlass from "../../ui/icons/magnifying-glass";

export default function BookSearch() {
  return (
    <div>
      <div className="flex items-center justify-start gap-1">
        <MagnifyingGlass />
        <input
          type="search"
          className="w-full rounded-lg border-2 px-1 text-base outline-none sm:w-4/5 md:w-full lg:text-lg"
          placeholder="Enter a book or string..."
        />
      </div>
    </div>
  );
}
