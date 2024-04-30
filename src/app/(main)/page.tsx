import Container from "@/libs/client/src/components/ui/container";
import { Book } from "@/libs/server/src/types";
import { useFetch } from "@/libs/client/src/hooks";
// import { cache } from "hono/cache";

/* const getBooksByGenreRPC = async function (genre: string) {
  const res = await client.api.books.genres[":genre"].$get({ param: { genre } });
  console.log(res.status);
  console.log(res.ok);
  const result = await res.json();
  if (!result.success) {
    console.log(result.error);
    throw new Error(result.error);
  }
  console.log(result);
  return result;
}; */

/* const getBooksByGenreFetch = async function (genre: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/books/genres/${genre}`, { cache: "no-store" });
  console.log({ res });
  console.log(res.ok);
  if (!res.ok) {
    const errorMessage = (await res.json()) as { success: false; error: string };
    console.log(errorMessage.error);
    throw new Error(`${errorMessage.error} with status of ${res.status.toString()}`);
  }
  const data = (await res.json()) as { success: true; data: Book[] };
  return data;
}; */

export default async function HomePage() {
  const genre = "Fiction";
  const data = await useFetch<Book[]>(`${process.env.NEXT_PUBLIC_URL}/api/books/genres/${genre}`, {
    cache: "no-store",
  });
  return (
    <main className="text-3xl">
      <Container>{JSON.stringify(data)}</Container>
    </main>
  );
}
