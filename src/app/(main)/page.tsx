import Container from "@/libs/client/src/components/ui/container";
import { Book, BestSeller } from "@/libs/server/src/types";
import { useFetch } from "@/libs/client/src/hooks";

export default async function HomePage() {
  // const genre = "Fiction";
  const data = await useFetch<BestSeller>(`${process.env.NEXT_PUBLIC_URL}/api/books/best-sellers`, {
    next: { revalidate: 3 * 24 * 60 * 60 },
  });
  /* const data = await useFetch<Book[]>(`${process.env.NEXT_PUBLIC_URL}/api/books/genres/${genre}`, {
    cache: "no-store",
  }); */
  return (
    <main className="text-3xl">
      <Container>{JSON.stringify(data)}</Container>
    </main>
  );
}
