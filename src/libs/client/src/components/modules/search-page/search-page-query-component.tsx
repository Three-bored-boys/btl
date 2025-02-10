import React from "react";
import { useSearchPageResults } from "./hooks";
import { PaginationObjectType, SearchObjectType } from "@/shared/validators";
import { useRouter, useSearchParams } from "next/navigation";
import { DEFAULT_MAX_RESULTS, DEFAULT_PAGE_NUMBER, MAX_MAX_RESULTS, MIN_MAX_RESULTS } from "@/shared/utils";
import { ArrowLeftCircle } from "@/client/components/ui/icons/arrow-left-circle";
import { ArrowRightCircle } from "@/client/components/ui/icons/arrow-right-circle";
import { cn, handleNumberSearchParam } from "@/libs/client/src/utils";
import { SearchPageResults } from "./search-page-results";
import { SearchPageResultsLoadingSkeleton } from "./search-page-results-loading-skeleton";
import { Container } from "@/client/components/layouts/container";
import { LinkButton } from "@/client/components/ui/link-button";
import notFoundImage from "@/public/assets/images/not-found.webp";
import Image from "next/image";

export function SearchPageQueryComponent({
  searchObject,
  paginationObject,
}: {
  searchObject: SearchObjectType;
  paginationObject: PaginationObjectType;
}) {
  const { data: result } = useSearchPageResults(searchObject, paginationObject);
  const searchParams = useSearchParams();
  const router = useRouter();
  const newSearchParams = React.useRef<null | URLSearchParams>(null);
  const [loading, setLoading] = React.useState(false);
  React.useEffect(() => {
    if (searchParams.toString() === newSearchParams.current?.toString()) {
      setLoading(false);
    }
  }, [searchParams]);

  if (!result.success) {
    const { errors, status } = result;
    return (
      <div className="relative min-h-screen w-full">
        <Container>
          <div className="flex flex-col items-center justify-start gap-y-3 py-5">
            <p className="mb-3 text-8xl font-extralight md:mb-9 md:text-9xl">{status}</p>
            <h2 className="mb-2 text-4xl radix-xs:text-5xl md:mb-5 md:text-7xl">Oops! Something has gone wrong!</h2>
            <p className="mb-8 text-base radix-xs:text-xl md:mb-3 md:text-2xl">{errors[0]}</p>
            <LinkButton href="/" background={"light"} textSize={"big"} className="mb-2">
              Return Home
            </LinkButton>
            <div>
              <Image src={notFoundImage} alt="Cartoon image of man sitting on floor and reading a book"></Image>
            </div>
          </div>
        </Container>
      </div>
    );
  }

  const { data } = result;

  const maxResults = handleNumberSearchParam(
    searchParams.get("maxResults"),
    DEFAULT_MAX_RESULTS,
    MIN_MAX_RESULTS,
    MAX_MAX_RESULTS,
  );
  const pageNumber = handleNumberSearchParam(searchParams.get("page"), DEFAULT_PAGE_NUMBER, DEFAULT_PAGE_NUMBER);
  const totalBooksThisSearch = data.books.length;

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
      {loading ? <SearchPageResultsLoadingSkeleton /> : <SearchPageResults books={data.books} />}
      <PageNavigation />
    </div>
  );
}
