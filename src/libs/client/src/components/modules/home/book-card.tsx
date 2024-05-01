import React from "react";
import type { Book } from "@/server/types";
import Image from "next/image";
import Link from "next/link";

const genericBookImage = new URL("@/public/assets/images/generic-book.png", import.meta.url).href;

type BookCardTypes = {
  book: Book;
} & React.ComponentProps<"div">;

export default function BookCard({ book, ...props }: BookCardTypes): React.ReactElement {
  return (
    <Link href={`/book/${book.isbn13 ? book.isbn13 : book.isbn10}`}>
      <div className="w-40 min-w-36" {...props}>
        <Image
          src={book.image ? book.image : genericBookImage}
          alt=""
          className="h-44 w-full rounded-lg object-cover sm:h-60"
        />
        <h2 className="truncate font-semibold">{book.title}</h2>
        <p className="truncate">{book.author}</p>
      </div>
    </Link>
  );
}
