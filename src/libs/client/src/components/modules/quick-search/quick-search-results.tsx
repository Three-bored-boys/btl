import React from "react";
// import { book } from "./data";
import Image from "next/image";
import Link from "next/link";
import { useQuickSearchResults } from "./useQuickSearchResults";
import genericBookImage from "@/public/assets/images/generic-book.png";
import { DEFAULT_MAX_RESULTS, DEFAULT_PAGE_NUMBER } from "@/libs/shared/src/utils";
import { ExclamationTriangle } from "@/client/components/ui/icons/exclamation-triangle";

export function QuickSearchResults({
  search,
  setSearchResultsVisible,
}: {
  search: string;
  setSearchResultsVisible: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const {
    data: { fetchDataResult, res },
    error,
  } = useQuickSearchResults({ search });

  if (error) {
    throw error;
  }

  if (!fetchDataResult.success) {
    const { errors } = fetchDataResult;
    return (
      <div className="my-2 flex w-full flex-col items-center justify-start gap-y-1">
        <ExclamationTriangle />
        <p className="text-xl font-semibold">Error {res.status}</p>
        <p className="text-base font-normal">{errors[0]}</p>
      </div>
    );
  }

  const { data } = fetchDataResult;
  const booksWithISBN = data.filter((book) => book.isbn10 !== "" || book.isbn13 !== "");
  if (data.length === 0 || booksWithISBN.length === 0) {
    return <div>No books found from search :(</div>;
  }

  return (
    <div className="h-full max-h-[95vh] overflow-y-auto">
      {booksWithISBN.map((book, i) => (
        <Link
          className="grid w-full grid-cols-[40px_1fr] grid-rows-[auto] gap-1 rounded-xl py-2 hover:bg-secondary-100 xs:grid-cols-[45px_1fr] max-lg:md:grid-cols-[40px_1fr]"
          href={`/books/${book.isbn13 || book.isbn10}`}
          key={i}
          onClick={() => {
            setSearchResultsVisible(false);
          }}
        >
          <div className="aspect-square">
            <Image
              width={500}
              height={500}
              src={book.image || genericBookImage}
              alt={`${book.title} by ${book.author}`}
              className="mx-auto h-full w-full rounded-lg object-cover"
            />
          </div>
          <div className="truncate text-sm">
            <p className="mb-1 truncate font-medium leading-4">{book.title}</p>
            <p className="truncate font-light leading-4">{book.author}</p>
          </div>
        </Link>
      ))}
      <div className="flex items-center justify-between">
        <Link
          href={`/search?${new URLSearchParams({ search, maxResults: DEFAULT_MAX_RESULTS.toString(), page: DEFAULT_PAGE_NUMBER.toString() }).toString()}`}
        >
          Go to search page
        </Link>
      </div>
    </div>
  );
}

/* return Array.from({ length: 3 }, (_, i) => i).map((_, i) => (
    <Link
      className="grid w-full grid-cols-[40px_1fr] grid-rows-[auto] gap-1 rounded-xl py-2 hover:bg-secondary-100 xs:grid-cols-[45px_1fr] max-lg:md:grid-cols-[40px_1fr]"
      href={`/book/${book.isbn13}`}
      key={i}
    >
      <div className="aspect-square">
        <Image
          width={500}
          height={500}
          src={book.image ?? genericBookImage}
          alt={`${book.title} by ${book.author}`}
          className="mx-auto h-full w-full rounded-lg object-cover"
        />
      </div>
      <div className="truncate text-sm">
        <p className="mb-1 truncate font-medium leading-4">{book.title}</p>
        <p className="truncate font-light leading-4">{book.author}</p>
      </div>
    </Link>
  )); */
