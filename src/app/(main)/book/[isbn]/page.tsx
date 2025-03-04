import { BookPageWrapper } from "@/root/src/libs/client/src/components/modules/book-page/book-page-wrapper";

export default function Book({ params: { isbn } }: { params: { isbn: string } }) {
  return <BookPageWrapper params={{ isbn }} />;
}
