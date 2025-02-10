import { SectionPreamble } from "@/client/components/modules/home-page/section-preamble";
import { Container } from "@/client/components/layouts/container";
import type { Book, FetchDataResult, Genres } from "@/root/src/libs/shared/src/types";
import { fetchData } from "@/libs/client/src/utils";
import { SectionBooksShowcase } from "../section-books-showcase";
import { Suspense } from "react";
import { LoadingSkeleton } from "../loading-skeleton";
import { BookCard } from "../book-card";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorBoundaryRender } from "../error-boundary-render";
import { ExclamationTriangle } from "@/client/components/ui/icons/exclamation-triangle";

export function GenresSection() {
  return (
    <section className="w-full py-10">
      <Container>
        <SectionPreamble title="Oldies but Goldies">
          Explore some more older books below according to a select list of popular genres
        </SectionPreamble>
        <ErrorBoundary fallbackRender={ErrorBoundaryRender}>
          <Suspense fallback={<LoadingSkeleton />}>
            <GetGenresWrapper />
          </Suspense>
        </ErrorBoundary>
      </Container>
    </section>
  );
}

async function GetGenresWrapper() {
  const { fetchDataResult } = await fetchData<Genres>(`${process.env.API_URL}/books/genres`);

  if (!fetchDataResult.success) {
    const { status, errors } = fetchDataResult;
    return (
      <div className="my-2 flex w-full flex-col items-center justify-start gap-y-1">
        <ExclamationTriangle />
        <p className="text-xl font-semibold">Error {status}</p>
        <p className="text-base font-normal">{errors[0]}</p>
      </div>
    );
  }

  const {
    data: { genres, count },
  } = fetchDataResult;

  const getGenresBooksPromisesArray: Promise<FetchDataResult<Book[]>>[] = genres.map((val) =>
    fetchData<Book[]>(`${process.env.API_URL}/books/genres/${val.name}`),
  );

  const allGenresBooksArray = await Promise.all(getGenresBooksPromisesArray);

  const data = allGenresBooksArray.map((val, i) => {
    return { genre: genres[i].name, books: val };
  });

  const BooksOrError = function ({ fetchDataResult }: Omit<FetchDataResult<Book[]>, "res">) {
    if (!fetchDataResult.success) {
      const { status, errors } = fetchDataResult;
      return (
        <div className="my-2 flex w-full flex-col items-center justify-start gap-y-1">
          <ExclamationTriangle />
          <p className="text-xl font-semibold">Error {status}</p>
          <p className="text-base font-normal">{errors[0]}</p>
        </div>
      );
    }

    const { data } = fetchDataResult;

    return data.map((book, i) => <BookCard key={i} book={book} />);
  };

  return (
    <Suspense fallback={<LoadingSkeleton />}>
      <SectionBooksShowcase name="genres" count={count} sessionStorageKey="genres-index">
        {data.map(({ genre, books: { fetchDataResult } }, i) => {
          return (
            <div className="w-full flex-[0_0_100%]" key={i}>
              <h3 className="text-center font-normal lowercase scrollbar-none">{genre}</h3>
              <hr className="mb-5 h-1 w-full bg-primary scrollbar-none" />
              <div className="flex w-full items-center justify-between gap-3 overflow-x-auto scrollbar-thin">
                {<BooksOrError fetchDataResult={fetchDataResult} />}
              </div>
            </div>
          );
        })}
      </SectionBooksShowcase>
    </Suspense>
  );
}
