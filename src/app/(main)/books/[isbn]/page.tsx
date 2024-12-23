import { BookPageErrorBoundaryRender } from "@/root/src/libs/client/src/components/modules/book-page/book-page-error-boundary-render";
import { BookPageWrapper } from "@/root/src/libs/client/src/components/modules/book-page/book-page-wrapper";
import { ErrorBoundary } from "react-error-boundary";

export default function Book({ params: { isbn } }: { params: { isbn: string } }) {
  return (
    <ErrorBoundary fallbackRender={BookPageErrorBoundaryRender}>
      <BookPageWrapper params={{ isbn }} />
    </ErrorBoundary>
  );
}
