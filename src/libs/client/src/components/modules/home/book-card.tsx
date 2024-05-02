import React from "react";
import type { Book } from "@/server/types";
import Image from "next/image";
import Link from "next/link";

const genericBookImage = "/assets/images/generic-book.png";

type BookCardTypes = {
  book: Book;
} & React.ComponentProps<"div">;

export default function BookCard({ book, ...props }: BookCardTypes): React.ReactElement {
  return (
    <Link href={`/book/${book.isbn13 ? book.isbn13 : book.isbn10}`}>
      <div className="w-40 min-w-36" {...props}>
        <Image
          src={book.image ? book.image : genericBookImage}
          alt={`${book.title} by ${book.author}`}
          className="h-44 w-full rounded-lg object-cover sm:h-60"
          width={500}
          height={500}
        />
        <h2 className="truncate font-semibold">{book.title}</h2>
        <p className="truncate">{book.author}</p>
      </div>
    </Link>
  );
}
