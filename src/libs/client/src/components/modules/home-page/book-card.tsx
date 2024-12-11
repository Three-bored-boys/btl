import React from "react";
import type { Book } from "@/root/src/libs/shared/src/types";
import Image from "next/image";
import Link from "next/link";

const genericBookImage = "/assets/images/generic-book.png";

type BookCardTypes = {
  book: Book;
} & React.ComponentProps<"div">;

export function BookCard({ book, ...props }: BookCardTypes): React.ReactElement {
  return (
    <Link href={`/books/${book.isbn13 ? book.isbn13 : book.isbn10}`} title={`${book.title} by ${book.author}`}>
      <div className="w-32 min-w-28 sm:w-40 sm:min-w-36" {...props}>
        <Image
          src={book.image ? book.image : genericBookImage}
          alt={`${book.title} by ${book.author}`}
          className="h-44 w-full rounded-lg object-cover sm:h-60"
          width={500}
          height={500}
        />
        <h4 className="truncate font-semibold">{book.title}</h4>
        <p className="truncate">{book.author}</p>
      </div>
    </Link>
  );
}
