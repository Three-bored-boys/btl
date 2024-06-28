import SectionPreamble from "@/client/components/modules/home/section-preamble";
import Container from "@/client/components/layouts/container";
import type { Book, Genres } from "@/libs/server/src/types";
import { fetchData } from "@/libs/client/src/hooks";
import SectionBooksShowcase from "../section-books-showcase";
import { Suspense } from "react";
import LoadingSkeleton from "../loading-skeleton";
import BookCard from "../book-card";

export default function GenresSection() {
  return (
    <section className="w-full py-10">
      <Container>
        <SectionPreamble title="Oldies but Goldies">
          Explore some more older books below according to a select list of popular genres
        </SectionPreamble>
        <Suspense fallback={<LoadingSkeleton />}>
          <GetGenresWrapper />
        </Suspense>
      </Container>
    </section>
  );
}

async function GetGenresWrapper() {
  const { genres, count } = await fetchData<Genres>(`${process.env.API_URL}/books/genres`);

  const getGenresBooksPromisesArray: Promise<Book[]>[] = genres.map((val, i) =>
    fetchData<Book[]>(`${process.env.API_URL}/books/genres/${val.name}`),
  );

  const allGenresBooksArray = await Promise.all(getGenresBooksPromisesArray);

  const data = allGenresBooksArray.map((val, i) => {
    return { genre: genres[i].name, books: val };
  });

  return (
    <SectionBooksShowcase name="genres" count={count} sessionStorageKey="genres-index">
      {data.map((val, i) => {
        return (
          <div className="w-full flex-[0_0_100%]" key={i}>
            <h3 className="text-center font-normal lowercase scrollbar-none">{val.genre}</h3>
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
  );
}
