import React from "react";
import { testBook } from "./data";
import { OverviewLibraryPreviewSection } from "./overview-library-preview-section";
import { bookLocations } from "@/client/utils";

export function OverviewPage() {
  const books1 = [testBook, testBook, testBook, testBook, testBook, testBook, testBook, testBook, testBook, testBook];
  const books2 = [testBook, testBook, testBook, testBook, testBook, testBook];
  const books3 = [testBook, testBook, testBook, testBook, testBook];
  const books4 = [testBook, testBook, testBook, testBook];
  const books = [books1, books2, books3, books4];

  return (
    <div>
      <h1 className="mb-4 font-semibold md:mb-7">Overview</h1>
      {bookLocations.map((location, i) => (
        <OverviewLibraryPreviewSection name={location.name} slug={location.value} books={books[i]} key={i} />
      ))}
    </div>
  );
}
