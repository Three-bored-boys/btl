"use client";

import { BookPageErrorBoundaryRender } from "@/root/src/libs/client/src/components/modules/book-page/book-page-error-boundary-render";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return <BookPageErrorBoundaryRender error={error} reset={reset} />;
}
