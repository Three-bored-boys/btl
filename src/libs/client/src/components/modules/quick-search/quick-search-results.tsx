import React, { useRef } from "react";
// import { book } from "./data";
import Image from "next/image";
import Link from "next/link";
import useQuickSearchResults from "./useQuickSearchResults";
import genericBookImage from "@/public/assets/images/generic-book.png";
import Button from "../../ui/button";
import Close from "../../ui/icons/close";
import { getSearchObjectFromLocalStorage, DEFAULT_MAX_RESULTS, DEFAULT_START_INDEX } from "../../../utils";
import { PaginationObjectType, SearchObjectType } from "@/root/src/libs/server/src/schemas";

export default function QuickSearchResults({
  search,
  setSearchResultsVisible,
}: {
  search: string;
  setSearchResultsVisible: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { error, data } = useQuickSearchResults({ search });
  const urlSearchParamsObject = useRef<SearchObjectType & PaginationObjectType & { run?: string | undefined }>({
    ...getSearchObjectFromLocalStorage(),
    search,
    maxResults: DEFAULT_MAX_RESULTS.toString(),
    startIndex: DEFAULT_START_INDEX.toString(),
  });

  if (error) return <div>Error: {error.message}</div>;

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

  if (data.length === 0) {
    return <div>No books found from search :(</div>;
  }

  return (
    <div className="h-full max-h-[95vh] overflow-y-auto">
      {data.map((book, i) => (
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
        <Link href={`/search?${new URLSearchParams(urlSearchParamsObject.current).toString()}`}>Go to search page</Link>
        <div onClick={() => setSearchResultsVisible(false)}>
          <Button background={"dark"} textSize={"small"} className="hidden xs:block">
            Close
          </Button>
          <Close className="block rounded-full bg-primary hover:bg-primary-600 xs:hidden" stroke="#fff"></Close>
        </div>
      </div>
    </div>
  );
}
