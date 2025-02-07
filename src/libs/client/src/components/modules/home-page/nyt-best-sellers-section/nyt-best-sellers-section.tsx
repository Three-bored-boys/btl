import { SectionPreamble } from "@/client/components/modules/home-page/section-preamble";
import { Container } from "@/client/components/layouts/container";
import type { BestSeller } from "@/root/src/libs/shared/src/types";
import { CustomAPIError, fetchData } from "@/libs/client/src/utils";
import { Suspense } from "react";
import { SectionBooksShowcase } from "../section-books-showcase";
import { LoadingSkeleton } from "../loading-skeleton";
import { BookCard } from "../book-card";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorBoundaryRender } from "../error-boundary-render";
import { ExclamationTriangle } from "@/client/components/ui/icons/exclamation-triangle";

export function NYTBestSellersSection() {
  return (
    <section className="w-full py-10">
      <Container>
        <SectionPreamble title="NYT Best Sellers">
          Explore the latest books on the NYT Best Sellers List
        </SectionPreamble>
        <ErrorBoundary fallbackRender={ErrorBoundaryRender}>
          <GetBestSellersWrapper />
        </ErrorBoundary>
      </Container>
    </section>
  );
}

async function GetBestSellersWrapper() {
  try {
    const data = await fetchData<BestSeller[]>(`${process.env.API_URL}/books/best-sellers`);

    return (
      <Suspense fallback={<LoadingSkeleton />}>
        <SectionBooksShowcase name="best-sellers" count={data.length} sessionStorageKey="best-sellers-index">
          {data.map((val, i) => {
            return (
              <div className="w-full flex-[0_0_100%]" key={i}>
                <h3 className="text-center font-normal lowercase scrollbar-none">{val.name}</h3>
                <hr className="mb-5 h-1 w-full bg-primary scrollbar-none" />
                <div className="flex w-full items-center justify-between gap-3 overflow-x-auto scrollbar-thin">
                  {val.books.map((book, i) => (
                    <BookCard key={i} book={book} />
                  ))}
                </div>
              </div>
            );
          })}
        </SectionBooksShowcase>
      </Suspense>
    );
  } catch (e) {
    if (e instanceof CustomAPIError) {
      return (
        <div className="my-2 flex w-full flex-col items-center justify-start gap-y-1">
          <ExclamationTriangle />
          <p className="text-xl font-semibold">Error {e.status}</p>
          <p className="text-base font-normal">{e.errors[0]}</p>
        </div>
      );
    }

    throw e;
  }
}
