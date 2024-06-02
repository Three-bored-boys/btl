"use client";

import { cn } from "@/client/utils";
import ArrowLeftCircle from "@/client/components/ui/icons/arrow-left-circle";
import ArrowRightCircle from "@/client/components/ui/icons/arrow-right-circle";
import GenreBooksShowcase from "./genres-section/genre-books-showcase";
import type { Genres, BestSeller } from "@/libs/server/src/types";
import { ComponentProps, useState } from "react";
import BookCard from "./book-card";

type SectionBooksShowcaseProps = ({ name: "genres"; data: Genres } | { name: "best-sellers"; data: BestSeller[] }) &
  ComponentProps<"div">;

export default function SectionBooksShowcase({ name, data, ...props }: SectionBooksShowcaseProps) {
  let count: number;

  switch (name) {
    case "genres":
      count = data.count;
      break;
    case "best-sellers":
      count = data.length;
      break;
  }

  const [index, setIndex] = useState<number>(0);

  const nextIndex = function () {
    if (index < count - 1 && index >= 0) {
      setIndex((i) => i + 1);
    }
  };

  const prevIndex = function () {
    if (index > 0) {
      setIndex((i) => i - 1);
    }
  };

  return (
    <div className="w-full flex-col items-center" {...props}>
      <div className="w-full overflow-x-auto">
        <h2 className="text-center text-base font-semibold uppercase scrollbar-none md:text-lg lg:text-xl">
          {name === "genres" ? data.genres[index].name : data[index].name}
        </h2>
        <hr className="mb-5 h-1 w-full bg-primary scrollbar-none" />
        {name === "genres" ? (
          <GenreBooksShowcase heading={data.genres[index].name} />
        ) : (
          <div className="flex w-full items-center justify-between gap-3 overflow-x-auto scrollbar-thin">
            {data[index].books.map((book, i) => (
              <BookCard key={i} book={book} />
            ))}
          </div>
        )}
      </div>
      <div className="mt-8 flex w-full items-center justify-center gap-2">
        {name === "genres"
          ? data.genres.map((_, i) => (
              <div
                key={i}
                className={cn("h-2 w-2 cursor-pointer rounded-full bg-secondary-300", { "bg-primary": i === index })}
                onClick={() => setIndex(i)}
                title={_.name}
              ></div>
            ))
          : data.map((_, i) => (
              <div
                key={i}
                className={cn("h-2 w-2 cursor-pointer rounded-full bg-secondary-300", { "bg-primary": i === index })}
                onClick={() => setIndex(i)}
                title={_.name}
              ></div>
            ))}
      </div>
      <div className={cn("mt-5 flex w-full items-center justify-center")}>
        <span
          onClick={prevIndex}
          className={cn({ "invisible cursor-default": index === 0 }, "mr-9 flex cursor-pointer items-center")}
        >
          <ArrowLeftCircle />
        </span>
        <span
          onClick={nextIndex}
          className={cn({ "invisible cursor-default": index === count - 1 }, "flex cursor-pointer items-center")}
        >
          <ArrowRightCircle />
        </span>
      </div>
    </div>
  );
}
