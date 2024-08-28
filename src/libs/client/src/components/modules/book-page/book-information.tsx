"use client";

import type { Book } from "@/root/src/libs/server/src/types";
import { ComponentProps, useState } from "react";
import { cn } from "../../../utils";

type BookInformationProps = { book: Book } & ComponentProps<"div">;

export default function BookInformation({ book, ...props }: BookInformationProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="mt-5 w-full" {...props}>
      <div className={cn("mb-2 w-full", { "line-clamp-2": !isExpanded, "h-auto": isExpanded })}>
        <p>{book.description}</p>
        <div className={cn("mt-5 grid-cols-[150px_1fr] gap-2", { "hidden": !isExpanded, "grid": isExpanded })}>
          <div>ISBN</div>
          <div>{book.isbn10}</div>
          <div>ISBN 13</div>
          <div>{book.isbn13}</div>
          <div>Publisher</div>
          <div>{book.publisher}</div>
        </div>
      </div>
      {!isExpanded ? (
        <span
          className={cn(
            "cursor-pointer border-b-[1px] border-b-secondary-300 text-secondary-300 transition-colors hover:border-b-primary hover:text-primary",
          )}
          onClick={() => setIsExpanded(true)}
        >
          Show more
        </span>
      ) : (
        <span
          className={cn(
            "cursor-pointer border-b-[1px] border-b-secondary-300 text-secondary-300 transition-colors hover:border-b-primary hover:text-primary",
          )}
          onClick={() => setIsExpanded(false)}
        >
          Show less
        </span>
      )}
    </div>
  );
}
