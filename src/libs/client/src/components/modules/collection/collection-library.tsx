"use client";

import React, { useTransition } from "react";
import { Book } from "@/shared/types";
import { useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/client/utils";
import { ArrowLeftCircle } from "@/client/components/ui/icons/arrow-left-circle";
import { ArrowRightCircle } from "@/client/components/ui/icons/arrow-right-circle";
import { CollectionLibraryLoadingSkeleton } from "./collection-library-loading-skeleton";
import { LinkButton } from "@/client/components/ui/link-button";
import { bookLibraryValues } from "@/shared/utils";
import Link from "next/link";
import Image from "next/image";
import genericBookImage from "@/public/assets/images/generic-book.png";

export function CollectionLibrary({
  isLastPage,
  books,
  page,
  library,
}: {
  isLastPage: boolean;
  books: Book[];
  page: number;
  library: (typeof bookLibraryValues)[number];
}) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handlePageNavigation = function (param: string) {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("page", param);
    router.push(`/collection/${library}?${newSearchParams.toString()}`);
  };

  const CollectionLibraryPageResults = function () {
    return (
      <div className="relative flex h-full w-full flex-col items-center justify-start">
        {books.length === 0 && page === 1 ? (
          <span className="mb-5 text-base font-medium sm:text-xl lg:text-2xl">
            You currently have no books in this library.
          </span>
        ) : books.length === 0 ? (
          <span className="mb-5 text-base font-medium sm:text-xl lg:text-2xl">No books to render.</span>
        ) : (
          <div className="my-6 grid w-full px-12 xs:grid-cols-2 xs:px-5 radix-xs:px-12 md:grid-cols-4 md:px-1 lg:px-12 xl:px-32">
            {books.map((book, i) => (
              <Link
                href={`/book/${book.isbn13 || book.isbn10}`}
                key={i}
                className="aspect-auto border py-4 hover:border-primary"
                title={`"${book.title}" by ${book.author}`}
              >
                <div className="h-4/5 w-full px-[28%]">
                  <Image
                    alt={
                      book.image.length > 0 ? `Book cover for ${book.title} by ${book.author}` : "Generic book cover"
                    }
                    src={book.image || genericBookImage.src}
                    width={500}
                    height={500}
                    className="h-full w-full border object-cover"
                  />
                </div>
                <p className="line-clamp-1 px-1 text-center text-xs font-medium lg:text-sm xl:text-base">
                  {book.title}
                </p>
                <p className="line-clamp-1 px-1 text-center text-xs font-light lg:text-sm xl:text-base">
                  {book.author}
                </p>
              </Link>
            ))}
          </div>
        )}
        {page > 1 && books.length === 0 ? (
          <LinkButton href={`/collection/${library}`} background={"dark"} textSize={"big"}>
            Go to Page 1
          </LinkButton>
        ) : null}
      </div>
    );
  };

  const PageNavigation = function () {
    return (
      <div className="flex">
        <div
          className={cn({ "invisible": page === 1 })}
          onClick={() => {
            startTransition(() => {
              handlePageNavigation((Number(page) - 1).toString());
            });
          }}
          title="Previous page"
        >
          <ArrowLeftCircle />
        </div>
        <div
          className={cn({ "invisible": isLastPage })}
          onClick={() => {
            startTransition(() => {
              handlePageNavigation((Number(page) + 1).toString());
            });
          }}
          title="Next page"
        >
          <ArrowRightCircle />
        </div>
      </div>
    );
  };

  return (
    <div className="flex h-full w-full flex-col items-center justify-between">
      {isPending ? <CollectionLibraryLoadingSkeleton /> : <CollectionLibraryPageResults />}
      <PageNavigation />
    </div>
  );
}
