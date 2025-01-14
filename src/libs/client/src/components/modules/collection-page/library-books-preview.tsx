import { Book } from "@/root/src/libs/shared/src/types";
import Link from "next/link";
import React from "react";
import Image from "next/image";
import genericBookImage from "@/public/assets/images/generic-book.png";
import { cn } from "@/client/utils";

export function LibraryBooksPreview({ books, showSidebar }: { books: Book[]; showSidebar: boolean }) {
  if (books.length === 0) {
    return (
      <div
        className={cn("w-full", {
          "h-18 xs:h-20 radix-xs:h-28 sm:h-36 md:h-40 lg:h-52 xl:h-56": showSidebar,
          "h-18 xs:h-20 radix-xs:h-28 sm:h-36 md:h-52 lg:h-64 xl:h-72": !showSidebar,
        })}
      >
        No books to show on this page. Please navigate to either the next or previous page
      </div>
    );
  }

  return (
    <div className={cn("grid grid-cols-5 gap-4 sm:gap-1")}>
      {books.map((book, i) => (
        <div key={i}>
          <Link
            href={`/books/${book.isbn13 || book.isbn10}`}
            className={cn("block w-full sm:w-28", {
              "md:w-24 min-[896px]:w-28 lg:w-32 xl:w-40": showSidebar,
              "md:w-28 min-[896px]:w-36 lg:w-40 xl:w-44": !showSidebar,
            })}
            title={`"${book.title}" by ${book.author}`}
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
            <p
              className={cn(
                "text-wrap text-sm font-medium leading-none lg:text-base lg:leading-tight xl:text-lg xl:leading-snug",
              )}
            >
              {book.title}
            </p>
          </Link>
        </div>
      ))}
    </div>
  );
}
