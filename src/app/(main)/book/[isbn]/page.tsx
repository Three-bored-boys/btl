import BookPage from "@/root/src/libs/client/src/components/modules/book-page/book-page";
import { fetchData } from "@/root/src/libs/client/src/hooks";
import type { Book } from "@/root/src/libs/server/src/types";

export default async function Book({ params: { isbn } }: { params: { isbn: string } }) {
  const bookObject = await fetchData<Book | string>(`${process.env.API_URL}/books/${isbn}`);

  if (typeof bookObject === "string") {
    return <div>{bookObject}</div>;
  }

  return <BookPage book={bookObject} />;
}
