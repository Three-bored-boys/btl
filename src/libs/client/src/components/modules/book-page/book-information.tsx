"use client";

import type { Book } from "@/root/src/libs/server/src/types";
import { ComponentProps, useState } from "react";
import { cn } from "../../../utils";

type BookInformationProps = { book: Book } & ComponentProps<"div">;

export default function BookInformation({ book, ...props }: BookInformationProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="mt-5" {...props}>
      <div className={cn("mb-2", { "line-clamp-2": !isExpanded, "h-auto": isExpanded })}>
        <p>{book.description}</p>
        <div className={cn("w-full grid-cols-2", { "hidden": !isExpanded, "grid": isExpanded })}>
          <p>hello</p>
          <p>i am</p>
          <p>the </p>
          <p>boy</p>
          <p>boy</p>
          <p>boy</p>
          <p>boy</p>
          <p>boy</p>
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
      ) : null}
    </div>
  );
}
