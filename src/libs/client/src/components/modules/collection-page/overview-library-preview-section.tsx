"use client";

import { Book } from "@/root/src/libs/shared/src/types";
import { useRouter } from "next/navigation";
import React from "react";
import { SidebarContext } from "./collection-layout";
import { cn } from "@/client/utils";

type OverviewLibraryPreviewSectionProps = {
  name: string;
  slug: string;
  books: Book[];
} & React.ComponentProps<"section">;

export function OverviewLibraryPreviewSection({
  name,
  slug,
  books,
  className,
  ...props
}: OverviewLibraryPreviewSectionProps) {
  const router = useRouter();
  const sidebarContextValue = React.useContext(SidebarContext);

  if (!sidebarContextValue) {
    throw new Error("SidebarContext is not provided");
  }

  const { showSidebar } = sidebarContextValue;

  const booksToRender = function (): Book[] {
    if (books.length <= 5) {
      return books;
    }
    return books.slice(0, 5);
  };

  const showViewMore = function (): boolean {
    return books.length > 5;
  };

  return (
    <section {...props} className={cn("flex flex-col gap-3", { "w-full": showSidebar }, className)}>
      <h2>{name}</h2>
      <div>{booksToRender().map((book) => book.title)}</div>
      {showViewMore() && (
        <button
          onClick={() => {
            router.push(`/collection/${slug}`);
          }}
        >
          View more
        </button>
      )}
    </section>
  );
}
