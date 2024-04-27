import Container from "@/libs/client/src/components/ui/container";
import { client } from "@/libs/server/src/hono";
import type { Book } from "@/libs/server/src/types";

const getBooksByGenreRPC = async function (genre: string) {
  const res = await client.api.books.genres[":genre"].$get({ param: { genre } });
  console.log(res);
  if (!res.ok) {
    const errorMessage = await res.text();
    throw new Error(errorMessage);
  }
  const data = await res.json();
  return data;
};

const getBooksByGenreFetch = async function (genre: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/books/genres/${genre}`, { cache: "no-store" });
  if (!res.ok) {
    const errorMessage = await res.text();
    throw new Error(errorMessage);
  }
  const data = (await res.json()) as Book[];
  return data;
};

export default async function HomePage() {
  try {
    const genre = "Fiction";
    const data = await getBooksByGenreFetch(genre);
    return (
      <main className="text-3xl">
        <Container>{JSON.stringify(data)}</Container>
      </main>
    );
  } catch (e) {
    const error = e as Error;
    console.log(error.message);
    return <main>{error.message}</main>;
  }
}
