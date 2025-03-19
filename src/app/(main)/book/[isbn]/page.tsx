import { BookPage } from "@/root/src/libs/client/src/components/modules/book-page/book-page";

export default async function Book({ params }: { params: Promise<{ isbn: string }> }) {
  const resolvedParams = await params;

  const { isbn } = resolvedParams;

  return <BookPage params={{ isbn }} />;
}
