"use client";

import React from "react";
import { book } from "./data";
import Image from "next/image";
import Link from "next/link";
// import LoadingSkeleton from "./loading-skeleton";
// import useQuickSearchResults from "./useQuickSearchResults";
// import type { Book } from "@/root/src/libs/server/src/types";

export default function QuickSearchResults({ search }: { search: string }) {
  // const { isFetching, error, data } = useQuickSearchResults({ search });

  // if (isFetching) return <LoadingSkeleton />;

  // if (error) return <div>Error!!!</div>;

  return Array.from({ length: 3 }, (_, i) => i).map((_, i) => (
    <Link
      className="grid w-full grid-cols-[40px_1fr] grid-rows-[auto] gap-1 rounded-xl py-2 hover:bg-secondary-100 xs:grid-cols-[45px_1fr] max-lg:md:grid-cols-[40px_1fr]"
      href={`/book/${book.isbn13}`}
      key={i}
    >
      <div className="aspect-square">
        <Image
          width={500}
          height={500}
          src={book.image}
          alt={`${book.title} by ${book.author}`}
          className="mx-auto h-full w-full rounded-lg object-cover"
        />
      </div>
      <div className="truncate text-sm">
        <p className="mb-1 truncate font-medium leading-4">{book.title}</p>
        <p className="truncate font-light leading-4">{book.author}</p>
      </div>
    </Link>
  ));

  /* return (
    <>
      {data?.map((book, i) => (
        <Link
          className="grid w-full grid-cols-[40px_1fr] grid-rows-[auto] gap-1 xs:grid-cols-[45px_1fr] max-lg:md:grid-cols-[40px_1fr]"
          href={`/book/${book.isbn13}`}
          key={i}
        >
          <div className="aspect-square">
            <Image
              width={500}
              height={500}
              src={book.image}
              alt={`${book.title} by ${book.author}`}
              className="mx-auto h-full w-full rounded-lg object-cover"
            />
          </div>
          <div className="truncate text-sm">
            <p className="mb-1 truncate font-medium leading-4">{book.title}</p>
            <p className="truncate font-extralight leading-4">{book.author}</p>
          </div>
        </Link>
      ))}
    </>
  ); */
}
