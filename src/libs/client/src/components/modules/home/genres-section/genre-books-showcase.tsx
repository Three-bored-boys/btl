import type { Book } from "@/libs/server/src/types";
import BookCard from "../book-card";
import { useQuery } from "@tanstack/react-query";
import { fetchData } from "@/libs/client/src/hooks";
import { Skeleton } from "@radix-ui/themes";
import {API_URL} from "@/client/utils";

type GenreBooksShowcaseProps = {
  heading: string;
};

export default function GenreBooksShowcase({ heading }: GenreBooksShowcaseProps) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["genres", heading],
    queryFn: async () => {
      const data = await fetchData<Book[]>(`${API_URL}/books/genres/${heading}`);
      return data;
    },
  });

  if (isLoading) {
    return (
      <div className="flex w-full items-center justify-between gap-3 overflow-x-auto scrollbar-thin">
        <div className="grid h-56 w-36 grid-cols-1 grid-rows-[12rem_1fr_1fr] gap-y-2 sm:h-72 sm:grid-rows-[15rem_1fr_1fr]">
          {Array.from({ length: 3 }, (_, i) => i).map((_, i) => (
            <Skeleton key={i} className="block h-full w-full rounded-lg"></Skeleton>
          ))}
        </div>
        <div className="grid h-56 w-36 grid-cols-1 grid-rows-[12rem_1fr_1fr] gap-y-2 sm:h-72 sm:grid-rows-[15rem_1fr_1fr]">
          {Array.from({ length: 3 }, (_, i) => i).map((_, i) => (
            <Skeleton key={i} className="block h-full w-full rounded-lg"></Skeleton>
          ))}
        </div>
        <div className="grid h-56 w-36 grid-cols-1 grid-rows-[12rem_1fr_1fr] gap-y-2 sm:h-72 sm:grid-rows-[15rem_1fr_1fr]">
          {Array.from({ length: 3 }, (_, i) => i).map((_, i) => (
            <Skeleton key={i} className="block h-full w-full rounded-lg"></Skeleton>
          ))}
        </div>
        <div className="hidden h-56 w-36 grid-cols-1 grid-rows-[12rem_1fr_1fr] gap-y-2 xs:grid sm:h-72 sm:grid-rows-[15rem_1fr_1fr]">
          {Array.from({ length: 3 }, (_, i) => i).map((_, i) => (
            <Skeleton key={i} className="block h-full w-full rounded-lg"></Skeleton>
          ))}
        </div>
        <div className="hidden h-56 w-36 grid-cols-1 grid-rows-[12rem_1fr_1fr] gap-y-2 sm:grid sm:h-72 sm:grid-rows-[15rem_1fr_1fr]">
          {Array.from({ length: 3 }, (_, i) => i).map((_, i) => (
            <Skeleton key={i} className="block h-full w-full rounded-lg"></Skeleton>
          ))}
        </div>
        <div className="hidden h-56 w-36 grid-cols-1 grid-rows-[12rem_1fr_1fr] gap-y-2 sm:h-72 sm:grid-rows-[15rem_1fr_1fr] md:grid">
          {Array.from({ length: 3 }, (_, i) => i).map((_, i) => (
            <Skeleton key={i} className="block h-full w-full rounded-lg"></Skeleton>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return <div className="h-72 w-full text-center text-lg font-medium">Error has occurred: {error.message}</div>;
  }

  return (
    <div className="flex w-full items-center justify-between gap-3 overflow-x-auto scrollbar-thin">
      {data?.map((book, i) => <BookCard key={i} book={book} />)}
    </div>
  );
}
