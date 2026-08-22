import { Book } from "@/root/src/libs/shared/src/types";
import Link from "next/link";
import React from "react";
import { BookCoverImage } from "@/client/components/ui/book-cover-image";
import { getBookCoverLinkHrefFromBook, getUIForBook, imageWH } from "@/shared/utils";

export function SearchPageResults({ books }: { books: Book[] }) {
  if (books.length === 0) {
    return <div>No more books to render</div>;
  }

  const booksWithISBN = books.filter((book) => book.isbn13 !== null || book.isbn10 !== null);

  if (booksWithISBN.length === 0) {
    return <div>No books to show on this page. Please navigate to either the next or previous page</div>;
  }

  return (
    <div className="my-6 grid w-full px-12 xs:grid-cols-2 xs:px-5 radix-xs:px-12 md:grid-cols-4 md:px-1 lg:px-12 xl:px-32">
      {booksWithISBN.map((book, i) => (
        <Link
          href={getBookCoverLinkHrefFromBook(book)}
          key={i}
          className="aspect-auto border py-4 hover:border-primary"
          title={`"${getUIForBook(book).title}" by ${getUIForBook(book).author}`}
        >
          <div className="h-4/5 w-full px-[28%]">
            <BookCoverImage book={book} {...imageWH} className="h-full w-full border object-cover" />
          </div>
          <p className="line-clamp-1 px-1 text-center text-xs font-medium lg:text-sm xl:text-base">
            {getUIForBook(book).title}
          </p>
          <p className="line-clamp-1 px-1 text-center text-xs font-light lg:text-sm xl:text-base">
            {getUIForBook(book).author}
          </p>
        </Link>
      ))}
    </div>
  );
}
