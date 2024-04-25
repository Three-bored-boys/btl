import Container from "@/libs/client/src/components/ui/container";
import { ReactElement } from "react";
import { client } from "@/libs/server/src/hono";

const getGenres = async function (): Promise<{
  genres: {
    name: string;
    picture: string;
  }[];
  count: number;
}> {
  const res = await client.api.books.genres.$get();
  const data = res.json();
  return data;
};

export default async function HomePage(): Promise<ReactElement> {
  const data = await getGenres();
  return (
    <main className="text-3xl">
      <Container>{JSON.stringify(data)}</Container>
    </main>
  );
}
