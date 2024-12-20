import { BookPage } from "@/root/src/libs/client/src/components/modules/book-page/book-page";
import { fetchData } from "@/root/src/libs/client/src/utils";
import type { Book } from "@/root/src/libs/shared/src/types";
import { BookPageLoadingSkeleton } from "@/client/components/modules/book-page/book-page-loading-skeleton";

export default async function Book({ params: { isbn } }: { params: { isbn: string } }) {
  const bookObject = await fetchData<Book[]>(`${process.env.API_URL}/books/isbn/${isbn}`);

  if (bookObject.length === 0) {
    return <BookPageLoadingSkeleton />;
  }

  return (
    <>
      <BookPage book={bookObject[0]} />
      <BookPageLoadingSkeleton />
    </>
  );
}
