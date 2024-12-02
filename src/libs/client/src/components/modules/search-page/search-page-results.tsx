import { Book } from "@/root/src/libs/shared/src/types";
import React from "react";

export function SearchPageResults({ books }: { books: Book[] }) {
  if (books.length === 0) {
    return <div>No books</div>;
  }

  return (
    <div className="flex flex-col gap-6">
      {books
        .filter((book) => book.isbn13 !== "" || book.isbn10 !== "")
        .map((book, i) => (
          <div key={i}>{book.isbn13 || book.isbn10}</div>
        ))}
    </div>
  );
}
