import { SectionPreamble } from "@/client/components/modules/home-page/section-preamble";
import { Container } from "@/client/components/layouts/container";
import { Suspense } from "react";
import { SectionBooksShowcase } from "../section-books-showcase";
import { LoadingSkeleton } from "../loading-skeleton";
import { BookCard } from "../book-card";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorBoundaryRender } from "../error-boundary-render";
import { ExclamationTriangle } from "@/client/components/ui/icons/exclamation-triangle";
import { getCachedNYTBestSellers } from "@/server/actions";

export function NYTBestSellersSection() {
  return (
    <section className="w-full py-10">
      <Container>
        <SectionPreamble title="NYT Best Sellers">
          Explore the latest books on the NYT Best Sellers List
        </SectionPreamble>
        <ErrorBoundary fallbackRender={ErrorBoundaryRender}>
          <Suspense fallback={<LoadingSkeleton />}>
            <GetBestSellersWrapper />
          </Suspense>
        </ErrorBoundary>
      </Container>
    </section>
  );
}

async function GetBestSellersWrapper() {
  const fetchDataResult = await getCachedNYTBestSellers();

  if (!fetchDataResult.success) {
    const { errors } = fetchDataResult;
    return (
      <div className="my-2 flex w-full flex-col items-center justify-start gap-y-1">
        <ExclamationTriangle />
        <p className="text-xl font-semibold">Error {fetchDataResult.status}</p>
        <p className="text-base font-normal">{errors[0]}</p>
      </div>
    );
  }

  const { data } = fetchDataResult;

  return (
    <SectionBooksShowcase name="best-sellers" count={data.length} sessionStorageKey="best-sellers-index">
      {data.map(({ name, books }, i) => {
        return (
          <div className="w-full flex-[0_0_100%]" key={i}>
            <h3 className="text-center font-normal lowercase scrollbar-none">{name}</h3>
            <hr className="mb-5 h-1 w-full bg-primary scrollbar-none" />
            <div className="flex w-full items-center justify-between gap-3 overflow-x-auto scrollbar-thin">
              {books.map((book, i) => (
                <BookCard key={i} book={book} />
              ))}
            </div>
          </div>
        );
      })}
    </SectionBooksShowcase>
  );
}
