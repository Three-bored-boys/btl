import React from "react";
import { testBook } from "./data";
import { OverviewLibraryPreviewSection } from "./overview-library-preview-section";
import { bookLibraries } from "@/shared/utils";
import { Book } from "@/root/src/libs/shared/src/types";

export function OverviewPage() {
  const books1 = [testBook, testBook, testBook, testBook, testBook, testBook, testBook, testBook, testBook, testBook];
  const books2: Book[] = [];
  const books3 = [testBook, testBook, testBook, testBook, testBook];
  const books4 = [testBook, testBook, testBook, testBook];
  const books = [books1, books2, books3, books4];

  return (
    <div>
      <h1 className="font-semibold">Overview</h1>
      {bookLibraries.map((library, i) => (
        <OverviewLibraryPreviewSection name={library.name} slug={library.value} books={books[i]} key={i} />
      ))}
    </div>
  );
}
