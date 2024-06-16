// import type { Book } from "@/libs/server/src/types";
import BookCard from "../book-card";
import { useGenresSectionBooksInnerBooksShowcase } from "@/libs/client/src/hooks";
import { Skeleton } from "@radix-ui/themes";

type GenresSectionInnerBooksShowcaseProps = {
  heading: string;
};

export default function GenresSectionInnerBooksShowcase({ heading }: GenresSectionInnerBooksShowcaseProps) {
  const { data, isLoading, error } = useGenresSectionBooksInnerBooksShowcase(heading);

  if (isLoading) {
    console.log("Loading...");
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
    console.log("There is an error");
    return <div className="h-72 w-full text-center text-lg font-medium">Error has occurred: {error.message}</div>;
  }

  console.log("No loading or error");
  return (
    <div className="flex w-full items-center justify-between gap-3 overflow-x-auto scrollbar-thin">
      {data?.map((book, i) => <BookCard key={i} book={book} />)}
    </div>
  );
}
