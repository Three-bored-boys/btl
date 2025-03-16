"use client";

import React, { useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { DEFAULT_MAX_RESULTS, DEFAULT_PAGE_NUMBER, MAX_MAX_RESULTS, MIN_MAX_RESULTS } from "@/shared/utils";
import { ArrowLeftCircle } from "@/client/components/ui/icons/arrow-left-circle";
import { ArrowRightCircle } from "@/client/components/ui/icons/arrow-right-circle";
import { cn, handleNumberSearchParam } from "@/client/utils";
import { SearchPageResults } from "./search-page-results";
import { Book } from "@/shared/types";
import { SearchPageResultsLoadingSkeleton } from "./search-page-results-loading-skeleton";

export function SearchPageQueryComponent({
  fullSearchResult,
}: {
  fullSearchResult: { books: Book[]; totalItems: number };
}) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const maxResults = handleNumberSearchParam(
    searchParams.get("maxResults"),
    DEFAULT_MAX_RESULTS,
    MIN_MAX_RESULTS,
    MAX_MAX_RESULTS,
  );
  const pageNumber = handleNumberSearchParam(searchParams.get("page"), DEFAULT_PAGE_NUMBER, DEFAULT_PAGE_NUMBER);
  const totalBooksThisSearch = fullSearchResult.books.length;

  const handlePageNavigation = function (param: string) {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("page", param);
    router.push(`/search?${newSearchParams.toString()}`);
  };

  const PageNavigation = function () {
    return (
      <div className="flex">
        <div
          className={cn({ "invisible": searchParams.get("page") === "1" })}
          onClick={() => {
            startTransition(() => {
              handlePageNavigation((Number(pageNumber) - 1).toString());
            });
          }}
          title="Previous page"
        >
          <ArrowLeftCircle />
        </div>
        <div
          className={cn({ "invisible": totalBooksThisSearch < Number(maxResults) })}
          onClick={() => {
            startTransition(() => {
              handlePageNavigation((Number(pageNumber) + 1).toString());
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
    <div className="flex flex-col items-center">
      {isPending ? <SearchPageResultsLoadingSkeleton /> : <SearchPageResults books={fullSearchResult.books} />}
      <PageNavigation />
    </div>
  );
}
