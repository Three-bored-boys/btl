import Container from "@/libs/client/src/components/layouts/container";
import { Book } from "@/libs/server/src/types";
import { useFetch } from "@/libs/client/src/hooks";

export default async function HomePage() {
  const genre = "null";
  const data = await useFetch<Book[]>(`${process.env.NEXT_PUBLIC_URL}/api/books/genres/${genre}`, {
    cache: "no-store",
  });
  return (
    <main className="text-3xl">
      <Container>{JSON.stringify(data)}</Container>
    </main>
  );
}
