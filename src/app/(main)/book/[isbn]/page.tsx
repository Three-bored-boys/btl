import Container from "@/libs/client/src/components/layouts/container";
import { ReactElement } from "react";

export default function Book({
  params: { isbn },
  searchParams,
}: {
  params: { isbn: string };
  searchParams: Record<string, string | string[] | undefined>;
}): ReactElement {
  return (
    <main className="text-3xl">
      <Container>Book Page: {isbn}</Container>
    </main>
  );
}
