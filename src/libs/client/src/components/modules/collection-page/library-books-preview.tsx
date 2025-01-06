import { Book } from "@/root/src/libs/shared/src/types";
import React from "react";

export function LibraryBooksPreview({ books, showSidebar }: { books: Book[]; showSidebar: boolean }) {
  console.log(showSidebar);

  if (books.length === 0) {
    return <div>No books to show on this page. Please navigate to either the next or previous page</div>;
  }

  return <div>LibraryBooksPreview</div>;
}
