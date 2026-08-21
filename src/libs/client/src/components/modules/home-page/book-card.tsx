import React from "react";
import type { Book } from "@/root/src/libs/shared/src/types";
import Link from "next/link";
import { imageWH } from "@/shared/utils";
import { BookCoverImage } from "@/client/components/ui/book-cover-image";

type BookCardTypes = {
  book: Book;
} & React.ComponentProps<"div">;

export function BookCard({ book, ...props }: BookCardTypes): React.ReactElement {
  return (
    <Link href={`/book/${book.isbn13 ? book.isbn13 : book.isbn10}`} title={`${book.title} by ${book.author}`}>
      <div className="w-32 min-w-28 sm:w-40 sm:min-w-36" {...props}>
        <BookCoverImage book={book} {...imageWH} className="h-44 w-full rounded-lg object-cover sm:h-60" />
        <h4 className="truncate font-semibold">{book.title}</h4>
        <p className="truncate">{book.author}</p>
      </div>
    </Link>
  );
}
