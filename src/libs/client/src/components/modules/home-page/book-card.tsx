"use client";

import React from "react";
import type { Book } from "@/root/src/libs/shared/src/types";
import { getBookCoverLinkHrefFromBook, getUIForBook, imageWH } from "@/shared/utils";
import { BookCoverImage } from "@/client/components/ui/book-cover-image";
import { addBookToTable } from "@/server/actions";
import { useRouter } from "next/navigation";
import { cn } from "@/client/utils";

type BookCardTypes = {
  book: Book;
} & React.ComponentProps<"div">;

export function BookCard({ book, ...props }: BookCardTypes): React.ReactElement {
  const router = useRouter();
  const [isPending, startTransition] = React.useTransition();

  return (
    <div
      title={`${getUIForBook(book).title} by ${getUIForBook(book).author}`}
      onClick={
        isPending
          ? undefined
          : () => {
              startTransition(async () => {
                await addBookToTable({ book });
                router.push(getBookCoverLinkHrefFromBook(book));
              });
            }
      }
      className={cn({ "cursor-pointer": !isPending, "cursor-wait": isPending })}
    >
      <div className="w-32 min-w-28 sm:w-40 sm:min-w-36" {...props}>
        <BookCoverImage book={book} {...imageWH} className="h-44 w-full rounded-lg object-cover sm:h-60" />
        <h4 className="truncate font-semibold">{getUIForBook(book).title}</h4>
        <p className="truncate">{getUIForBook(book).author}</p>
      </div>
    </div>
  );
}
