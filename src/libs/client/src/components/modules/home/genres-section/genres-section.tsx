import SectionPreamble from "@/client/components/modules/home/section-preamble";
import Container from "@/client/components/layouts/container";
import type { Book, Genres } from "@/libs/server/src/types";
import { fetchData } from "@/libs/client/src/hooks";
import SectionBooksShowcase from "../section-books-showcase";
import { Suspense } from "react";
import LoadingSkeleton from "../loading-skeleton";

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
  const { genres, count } = await fetchData<Genres>(`${process.env.NEXT_PUBLIC_API_URL}/books/genres`);

  const getGenresBooksPromisesArray: Promise<Book[]>[] = genres.map((val, i) =>
    fetchData<Book[]>(`${process.env.NEXT_PUBLIC_API_URL}/books/genres/${val.name}`),
  );

  const allGenresBooksArray = await Promise.all(getGenresBooksPromisesArray);
  console.log(allGenresBooksArray);

  const data = allGenresBooksArray.map((val, i) => {
    return { genre: genres[i].name, books: val };
  });

  return <SectionBooksShowcase name="genres" data={data} count={count} sessionStorageKey="genres-index" />;
}
