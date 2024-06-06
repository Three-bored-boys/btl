"use client";

import { cn } from "@/client/utils";
import ArrowLeftCircle from "@/client/components/ui/icons/arrow-left-circle";
import ArrowRightCircle from "@/client/components/ui/icons/arrow-right-circle";
import GenresSectionInnerBooksShowcase from "./genres-section/genres-section-inner-books-showcase";
import type { Genres, BestSeller } from "@/libs/server/src/types";
import { ComponentProps, useEffect, useState, useRef } from "react";
import BookCard from "./book-card";

type SectionBooksShowcaseProps = ({ name: "genres"; data: Genres } | { name: "best-sellers"; data: BestSeller[] }) &
  ComponentProps<"div">;

export default function SectionBooksShowcase({ name, data, ...props }: SectionBooksShowcaseProps) {
  // let count: number;

  const count = useRef<number>(0);
  const [index, setIndex] = useState<number>(0);

  const getIndexFromSessionStorage = function (sessionStorageIndex: number) {
    if (sessionStorageIndex) {
      if (sessionStorageIndex >= 0 && sessionStorageIndex < count.current) {
        setIndex(sessionStorageIndex);
      } else if (sessionStorageIndex >= count.current) {
        setIndex(count.current - 1);
      } else {
        setIndex(0);
      }
    }
  };

  const setIndexToSessionStorage = function (name: string, indexToSet: number) {
    switch (name) {
      case "genres":
        if (indexToSet >= 0 && indexToSet < count.current) {
          window.sessionStorage.setItem("genres-index", String(indexToSet));
        } else if (indexToSet >= count.current) {
          window.sessionStorage.setItem("genres-index", String(count.current - 1));
        } else {
          window.sessionStorage.setItem("genres-index", "0");
        }
        break;
      case "best-sellers":
        if (indexToSet >= 0 && indexToSet < count.current) {
          window.sessionStorage.setItem("best-sellers-index", String(indexToSet));
        } else if (indexToSet >= count.current) {
          window.sessionStorage.setItem("best-sellers-index", String(count.current - 1));
        } else {
          window.sessionStorage.setItem("best-sellers-index", "0");
        }
        break;
    }
  };

  useEffect(() => {
    switch (name) {
      case "genres":
        count.current = data.count;
        break;
      case "best-sellers":
        count.current = data.length;
        break;
    }

    if (typeof window !== "undefined") {
      switch (name) {
        case "genres":
          const genresIndex = Number(window.sessionStorage.getItem("genres-index"));
          getIndexFromSessionStorage(genresIndex);
          break;
        case "best-sellers":
          const bestSellersIndex = Number(window.sessionStorage.getItem("best-sellers-index"));
          getIndexFromSessionStorage(bestSellersIndex);
          break;
      }
    }
  }, [name, data]);

  const nextIndex = function () {
    if (index < count.current - 1 && index >= 0) {
      const updatedNextIndex = index + 1;
      setIndex(updatedNextIndex);
      setIndexToSessionStorage(name, updatedNextIndex);
    }
  };

  const prevIndex = function () {
    if (index > 0) {
      const updatedPrevIndex = index - 1;
      setIndex(updatedPrevIndex);
      setIndexToSessionStorage(name, updatedPrevIndex);
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
          <GenresSectionInnerBooksShowcase heading={data.genres[index].name} />
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
          className={cn(
            { "invisible cursor-default": index === count.current - 1 },
            "flex cursor-pointer items-center",
          )}
        >
          <ArrowRightCircle />
        </span>
      </div>
    </div>
  );
}
