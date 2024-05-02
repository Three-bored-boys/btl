import type { Book } from "@/libs/server/src/types";
import BookCard from "../book-card";
import { useQuery } from "@tanstack/react-query";
import { fetchData } from "@/libs/client/src/hooks";

type GenreBooksShowcaseProps = {
  heading: string;
};

export default function GenreBooksShowcase({ heading }: GenreBooksShowcaseProps) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["genres", heading],
    queryFn: async () => {
      const data = await fetchData<Book[]>(`${process.env.NEXT_PUBLIC_API_URL}/books/genres/${heading}`);
      return data;
    },
  });

  if (isLoading) {
    return <div className="h-72 w-full text-center text-lg font-medium">Loading...</div>;
  }

  if (error) {
    return <div className="h-72 w-full text-center text-lg font-medium">Error has occurred: {error.message}</div>;
  }

  return <>{data?.map((book, i) => <BookCard key={i} book={book} />)}</>;
}
