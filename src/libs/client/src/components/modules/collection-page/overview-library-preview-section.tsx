"use client";

import { Book } from "@/root/src/libs/shared/src/types";
import React from "react";
import { SidebarContext } from "./collection-layout";
import { cn } from "@/client/utils";
import { LibraryBooksPreview } from "./library-books-preview";
import { LinkButton } from "@/client/components/ui/link-button";

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
    <section {...props} className={cn({ "mt-3 w-full sm:mt-5 md:mt-8 lg:mt-10": !showSidebar })}>
      <h2 className={cn({ "mb-2 font-light sm:mb-3 md:mb-4 lg:mb-6": !showSidebar })}>{name}</h2>
      <LibraryBooksPreview books={booksToRender()} showSidebar={showSidebar} />
      {showViewMore() && (
        <div className="mt-5 flex items-center justify-end">
          <LinkButton href={`/collection/${slug}`} background={"light"} textSize={"small"}>
            View more
          </LinkButton>
        </div>
      )}
    </section>
  );
}
