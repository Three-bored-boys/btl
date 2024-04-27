"use client";

import Container from "@/libs/client/src/components/ui/container";
import { ReactElement } from "react";
import { client } from "@/libs/server/src/hono";
import { useQuery } from "@tanstack/react-query";

const getBooksByGenre = async function (genre: string) {
  const res = await client.api.books.genres[":genre"].$get({ param: { genre } });
  console.log(res);
  if (!res.ok) {
    const errorMessage = await res.text();
    throw new Error(errorMessage);
  }
  const data = await res.json();
  return data;
};

export default function HomePage(): ReactElement {
  const genre = "Fiction";
  const { data, error, isLoading } = useQuery({
    queryKey: ["genres", genre],
    queryFn: async () => {
      return await getBooksByGenre(genre);
    },
  });

  if (isLoading) {
    console.log(isLoading);
    return <main>Loading...</main>;
  }

  if (error) {
    console.log(error);
    return <main>{error.message}</main>;
  }

  console.log(data);
  return (
    <main className="text-3xl">
      <Container>{JSON.stringify(data)}</Container>
    </main>
  );
}
