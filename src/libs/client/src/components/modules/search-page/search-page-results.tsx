import { Book } from "@/root/src/libs/shared/src/types";
import Link from "next/link";
import React from "react";

export function SearchPageResults({ books }: { books: Book[] }) {
  if (books.length === 0) {
    return <div>No books</div>;
  }

  return (
    <div className="grid grid-cols-4 gap-3">
      {books
        .filter((book) => book.isbn13 !== "" || book.isbn10 !== "")
        .map((book, i) => (
          <Link href={`/books/${book.isbn13 || book.isbn10}`} key={i} className="bg-red-800">
            <div className="mx-auto w-1/2 bg-white text-center text-red-950">{book.isbn13 || book.isbn10}</div>
          </Link>
        ))}
    </div>
  );
}
