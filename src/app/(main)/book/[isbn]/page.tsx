import { BookPage } from "@/root/src/libs/client/src/components/modules/book-page/book-page";

export default function Book({ params: { isbn } }: { params: { isbn: string } }) {
  return <BookPage params={{ isbn }} />;
}
