import { cn } from "@/client/utils";
import type { Book } from "@/libs/server/src/types";
import { ComponentProps } from "react";
import BookCard from "../book-card";
import { useQuery } from "@tanstack/react-query";
import { fetchData } from "@/libs/client/src/hooks";

type GenreBooksShowcaseProps = {
  heading: string;
} & ComponentProps<"div">;

export default function GenreBooksShowcase({ heading, className, ...props }: GenreBooksShowcaseProps) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["genres", heading],
    queryFn: async () => {
      const data = await fetchData<Book[]>(`${process.env.NEXT_PUBLIC_API_URL}/books/genres/${heading}`);
      return data;
    },
  });

  if (isLoading) {
    return (
      <div {...props} className={cn("flex h-72 gap-3 overflow-x-auto lg:justify-center", className)}>
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div {...props} className={cn("flex h-72 gap-3 overflow-x-auto lg:justify-center", className)}>
        Error has occurred: {error.message}
      </div>
    );
  }

  return (
    <div {...props} className={cn("flex gap-3 overflow-x-auto lg:justify-center", className)}>
      {data?.map((book, i) => <BookCard key={i} book={book} />)}
    </div>
  );
}
