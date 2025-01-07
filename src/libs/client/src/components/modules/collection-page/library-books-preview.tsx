import { Book } from "@/root/src/libs/shared/src/types";
import Link from "next/link";
import React from "react";
import Image from "next/image";
import genericBookImage from "@/public/assets/images/generic-book.png";
import { cn } from "@/client/utils";

export function LibraryBooksPreview({ books, showSidebar }: { books: Book[]; showSidebar: boolean }) {
  console.log(showSidebar);

  if (books.length === 0) {
    return <div>No books to show on this page. Please navigate to either the next or previous page</div>;
  }

  return (
    // <div className="flex items-center justify-start gap-5">
    <div className={cn("grid grid-cols-5", { "gap-4 sm:gap-1": showSidebar })}>
      {books.map((book, i) => (
        <div key={i}>
          <Link
            href={`/books/${book.isbn13 || book.isbn10}`}
            className={cn({
              "block w-full sm:w-28 md:w-24 min-[896px]:w-28 lg:w-32 xl:w-40": showSidebar,
            })}
          >
            <div className="w-full">
              <Image
                src={book.image || genericBookImage}
                alt={`${book.title} by ${book.author}`}
                width={500}
                height={500}
                className="aspect-[10/16] w-full rounded-lg object-cover"
              />
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
}
