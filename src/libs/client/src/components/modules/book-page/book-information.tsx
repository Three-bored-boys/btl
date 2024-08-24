"use client";

import type { Book } from "@/root/src/libs/server/src/types";
import { ComponentProps, useState } from "react";
import { cn } from "../../../utils";

type BookInformationProps = { book: Book } & ComponentProps<"div">;

export default function BookInformation({ book, ...props }: BookInformationProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="mt-5" {...props}>
      <p className={cn("", { "line-clamp-3": !isExpanded, "h-auto": isExpanded })}>{book.description}</p>
      <span
        className={cn("border-b-2 border-b-primary p-0", { "inline-block": !isExpanded })}
        onClick={() => setIsExpanded(true)}
      >
        Show more
      </span>
    </div>
  );
}
