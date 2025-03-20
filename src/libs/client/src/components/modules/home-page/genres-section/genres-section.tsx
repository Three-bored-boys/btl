import { SectionPreamble } from "@/client/components/modules/home-page/section-preamble";
import { Container } from "@/client/components/layouts/container";
import type { BadResponse, Book, GoodResponse } from "@/root/src/libs/shared/src/types";
import { SectionBooksShowcase } from "../section-books-showcase";
import { Suspense } from "react";
import { LoadingSkeleton } from "../loading-skeleton";
import { BookCard } from "../book-card";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorBoundaryRender } from "../error-boundary-render";
import { ExclamationTriangle } from "@/client/components/ui/icons/exclamation-triangle";
import { genres as genresList } from "@/root/src/libs/shared/src/data/genres";
import { getBooksByGenre } from "@/server/actions";

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
  const genres = genresList.filter((genObj) => genObj.name !== "Non-fiction");
  const count = genres.length;

  const getGenresBooksPromisesArray = genres.map((val) => getBooksByGenre(val.name));

  const allGenresBooksPromisesArrayResult = await Promise.all(getGenresBooksPromisesArray);

  const data = allGenresBooksPromisesArrayResult.map((val, i) => {
    return { genre: genres[i].name, possibleBooks: val };
  });

  const BooksOrError = function ({ possibleBooks }: { possibleBooks: BadResponse | GoodResponse<Book[]> }) {
    if (!possibleBooks.success) {
      const { errors, status } = possibleBooks;
      return (
        <div className="my-2 flex w-full flex-col items-center justify-start gap-y-1">
          <ExclamationTriangle />
          <p className="text-xl font-semibold">Error {status}</p>
          <p className="text-base font-normal">{errors[0]}</p>
        </div>
      );
    }

    const { data } = possibleBooks;

    return data.map((book, i) => <BookCard key={i} book={book} />);
  };

  return (
    <Suspense fallback={<LoadingSkeleton />}>
      <SectionBooksShowcase name="genres" count={count} localStorageKey="genres-index">
        {data.map(({ genre, possibleBooks }, i) => {
          return (
            <div className="w-full flex-[0_0_100%]" key={i}>
              <h3 className="text-center font-normal lowercase scrollbar-none">{genre}</h3>
              <hr className="mb-5 h-1 w-full bg-primary scrollbar-none" />
              <div className="flex w-full items-center justify-between gap-3 overflow-x-auto scrollbar-thin">
                {<BooksOrError possibleBooks={possibleBooks} />}
              </div>
            </div>
          );
        })}
      </SectionBooksShowcase>
    </Suspense>
  );
}
