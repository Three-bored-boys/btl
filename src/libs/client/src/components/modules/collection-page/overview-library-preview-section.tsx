"use client";

import { Book } from "@/root/src/libs/shared/src/types";
import { useRouter } from "next/navigation";
import React from "react";

type OverviewLibraryPreviewSectionProps = {
  name: string;
  slug: string;
  books: Book[];
} & React.ComponentProps<"section">;

export function OverviewLibraryPreviewSection({ name, slug, books, ...props }: OverviewLibraryPreviewSectionProps) {
  const router = useRouter();

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
    <section {...props}>
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
