import { cn } from "@/client/utils";
import type { Book } from "@/libs/server/src/types";
import { ComponentProps } from "react";
import BookCard from "./book-card";

type BooksShowcaseProps = {
  heading: string;
  books: Book[];
} & ComponentProps<"div">;

export default function BooksShowcase({ heading, books, className, ...props }: BooksShowcaseProps) {
  return (
    <div {...props} className={cn(className)}>
      <h2>{heading}</h2>
      <div>
        {books.map((book, i) => (
          <BookCard key={i} book={book} />
        ))}
      </div>
    </div>
  );
}
