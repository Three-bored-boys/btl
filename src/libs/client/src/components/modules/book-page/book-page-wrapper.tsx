import { BookPage } from "@/root/src/libs/client/src/components/modules/book-page/book-page";
import { fetchData } from "@/root/src/libs/client/src/utils";
import type { Book } from "@/root/src/libs/shared/src/types";

export async function BookPageWrapper({ params: { isbn } }: { params: { isbn: string } }) {
  const bookObject = await fetchData<Book[]>(`${process.env.API_URL}/books/isbn/${isbn}`);

  return <BookPage book={bookObject[0]} />;
}
