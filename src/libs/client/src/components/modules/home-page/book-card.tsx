import React from "react";
import type { Book } from "@/root/src/libs/shared/src/types";
import NextImage from "next/image";
import { Image } from "@imagekit/next";
import Link from "next/link";
import { GENERIC_BOOK_IMAGE_ALT, imageKitProps, imageWH } from "@/shared/utils";

const genericBookImage = "/assets/images/generic-book.png";

type BookCardTypes = {
  book: Book;
} & React.ComponentProps<"div">;

export function BookCard({ book, ...props }: BookCardTypes): React.ReactElement {
  return (
    <Link href={`/book/${book.isbn13 ? book.isbn13 : book.isbn10}`} title={`${book.title} by ${book.author}`}>
      <div className="w-32 min-w-28 sm:w-40 sm:min-w-36" {...props}>
        {book.image && book.image.length > 0 ? (
          <Image
            src={book.image}
            alt={`Book cover for ${book.title} by ${book.author}`}
            {...imageWH}
            {...imageKitProps}
            className="h-44 w-full rounded-lg object-cover sm:h-60"
          />
        ) : (
          <NextImage
            src={genericBookImage}
            alt={GENERIC_BOOK_IMAGE_ALT}
            {...imageWH}
            className="h-44 w-full rounded-lg object-cover sm:h-60"
          />
        )}
        <h4 className="truncate font-semibold">{book.title}</h4>
        <p className="truncate">{book.author}</p>
      </div>
    </Link>
  );
}
