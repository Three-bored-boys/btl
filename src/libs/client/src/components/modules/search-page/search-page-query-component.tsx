import React from "react";
import { useSearchPageResults } from "./hooks";
import { PaginationObjectType, SearchObjectType } from "@/root/src/libs/shared/src/schemas";
import { useRouter, useSearchParams } from "next/navigation";
import {
  DEFAULT_MAX_RESULTS,
  DEFAULT_PAGE_NUMBER,
  MAX_MAX_RESULTS,
  MIN_MAX_RESULTS,
} from "@/root/src/libs/shared/src/utils";
import { ArrowLeftCircle } from "../../ui/icons/arrow-left-circle";
import { ArrowRightCircle } from "../../ui/icons/arrow-right-circle";
import { cn, handleNumberSearchParam } from "@/libs/client/src/utils";
import { SearchPageResults } from "./search-page-results";
import { SearchPageResultsLoadingSkeleton } from "./search-page-results-loading-skeleton";

export function SearchPageQueryComponent({
  searchObject,
  paginationObject,
}: {
  searchObject: SearchObjectType;
  paginationObject: PaginationObjectType;
}) {
  const {
    data: { books },
    error,
  } = useSearchPageResults(searchObject, paginationObject);
  const searchParams = useSearchParams();
  const router = useRouter();
  const newSearchParams = React.useRef<null | URLSearchParams>(null);
  const [loading, setLoading] = React.useState(false);
  React.useEffect(() => {
    if (searchParams.toString() === newSearchParams.current?.toString()) {
      setLoading(false);
    }
  }, [searchParams]);

  if (error) return <div>{error.message}</div>;

  const maxResults = handleNumberSearchParam(
    searchParams.get("maxResults"),
    DEFAULT_MAX_RESULTS,
    MIN_MAX_RESULTS,
    MAX_MAX_RESULTS,
  );
  const pageNumber = handleNumberSearchParam(searchParams.get("page"), DEFAULT_PAGE_NUMBER, DEFAULT_PAGE_NUMBER);
  const totalBooksThisSearch = books.length;

  const handlePageNavigation = function (param: string) {
    setLoading(true);
    newSearchParams.current = new URLSearchParams(searchParams);
    newSearchParams.current.set("page", param);
    router.push(`/search?${newSearchParams.current.toString()}`);
  };

  const PageNavigation = function () {
    return (
      <div className="flex">
        <div
          className={cn({ "invisible": searchParams.get("page") === "1" })}
          onClick={() => {
            handlePageNavigation((Number(pageNumber) - 1).toString());
          }}
          title="Previous page"
        >
          <ArrowLeftCircle />
        </div>
        <div
          className={cn({ "invisible": totalBooksThisSearch < Number(maxResults) })}
          onClick={() => {
            handlePageNavigation((Number(pageNumber) + 1).toString());
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
      {loading ? <SearchPageResultsLoadingSkeleton /> : <SearchPageResults books={books} />}
      <PageNavigation />
    </div>
  );
}
