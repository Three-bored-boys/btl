import { BadResponse, Book, GoodResponse } from "@/root/src/libs/shared/src/types";
import React from "react";
import { SidebarContext } from "./collection-layout";
import { cn } from "@/client/utils";
import { LibraryBooksPreview } from "./library-books-preview";
import { LinkButton } from "@/client/components/ui/link-button";

type OverviewLibraryPreviewSectionProps = {
  name: string;
  slug: string;
  serverResult: GoodResponse<Book[]> | BadResponse;
} & React.ComponentProps<"section">;

export function OverviewLibraryPreviewSection({
  name,
  slug,
  serverResult,
  className,
  ...props
}: OverviewLibraryPreviewSectionProps) {
  const sidebarContextValue = React.useContext(SidebarContext);

  if (!sidebarContextValue) {
    throw new Error("SidebarContext is not provided");
  }

  const { showSidebar } = sidebarContextValue;

  if (!serverResult.success) {
    return <div>{serverResult.errors[0]}</div>;
  }

  const { data: books } = serverResult;

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
    <section {...props} className={cn("mt-5 w-full sm:mt-7 md:mt-8 lg:mt-10")}>
      <h2 className={cn("mb-1.5 text-2xl font-light sm:mb-2 sm:text-3xl md:mb-3 lg:mb-4 lg:text-4xl")}>{name}</h2>
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
