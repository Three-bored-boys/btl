"use client";

import { cn } from "@/client/utils";
import ArrowLeftCircle from "@/client/components/ui/icons/arrow-left-circle";
import ArrowRightCircle from "@/client/components/ui/icons/arrow-right-circle";
import type { BestSeller, Book } from "@/libs/server/src/types";
import { ComponentProps, useCallback, useEffect, useState } from "react";
import BookCard from "./book-card";
import useEmblaCarousel from "embla-carousel-react";

type SectionBooksShowcaseProps = (
  | {
      name: "genres";
      data: {
        genre: string;
        books: Book[];
      }[];
      count: number;
      sessionStorageKey: "genres-index";
    }
  | { name: "best-sellers"; data: BestSeller[]; count: number; sessionStorageKey: "best-sellers-index" }
) &
  ComponentProps<"div">;

export default function SectionBooksShowcase({
  name,
  data,
  count,
  sessionStorageKey,
  ...props
}: SectionBooksShowcaseProps) {
  const [index, setIndex] = useState<number>(0);
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false, duration: 30, startIndex: 0 });

  const getIndexFromSessionStorage = useCallback(
    (sessionStorageIndex: number) => {
      if (sessionStorageIndex && emblaApi) {
        if (sessionStorageIndex >= 0 && sessionStorageIndex < count) {
          setIndex(sessionStorageIndex);
          emblaApi.scrollTo(sessionStorageIndex);
        } else if (sessionStorageIndex >= count) {
          setIndex(count - 1);
          emblaApi.scrollTo(count - 1);
        } else {
          setIndex(0);
          emblaApi.scrollTo(0);
        }
      }
    },
    [count, emblaApi],
  );

  const setIndexToSessionStorage = useCallback(
    (indexToSet: number) => {
      if (indexToSet >= 0 && indexToSet < count) {
        window.sessionStorage.setItem(sessionStorageKey, String(indexToSet));
      } else if (indexToSet >= count) {
        window.sessionStorage.setItem(sessionStorageKey, String(count - 1));
      } else {
        window.sessionStorage.setItem(sessionStorageKey, "0");
      }
    },
    [count, sessionStorageKey],
  );

  useEffect(() => {
    if (typeof window !== "undefined") {
      const startIndex = Number(window.sessionStorage.getItem(sessionStorageKey));
      getIndexFromSessionStorage(startIndex);
    }
  }, [name, data, getIndexFromSessionStorage, sessionStorageKey]);

  const scrollPrev = useCallback(() => {
    if (emblaApi) {
      console.log(index);
      if (index > 0 && index < count) {
        emblaApi.scrollPrev();
        const newIndex = index - 1;
        setIndex(newIndex);
        setIndexToSessionStorage(newIndex);
      } else {
        const newIndex = count - 1;
        emblaApi.scrollTo(newIndex);
        setIndex(newIndex);
        setIndexToSessionStorage(newIndex);
      }
    }
  }, [emblaApi, index, count, setIndexToSessionStorage]);

  const scrollNext = useCallback(() => {
    if (emblaApi) {
      console.log(index);
      if (index < count - 1 && index >= 0) {
        emblaApi.scrollNext();
        const newIndex = index + 1;
        setIndex(newIndex);
        setIndexToSessionStorage(newIndex);
      } else {
        const newIndex = 0;
        emblaApi.scrollTo(newIndex);
        setIndex(newIndex);
        setIndexToSessionStorage(newIndex);
      }
    }
  }, [emblaApi, index, count, setIndexToSessionStorage]);

  return (
    <div className="w-full flex-col items-center" {...props}>
      <div className="overflow-hidden" ref={emblaRef}>
        <div className={cn("flex")}>
          {name === "genres"
            ? data.map((val, i) => {
                return (
                  <div className="flex-[0_0_100%]" key={i}>
                    <h3 className="text-center font-normal lowercase scrollbar-none">{val.genre}</h3>
                    <hr className="mb-5 h-1 w-full bg-primary scrollbar-none" />
                    <div className="flex w-full items-center justify-between gap-3 overflow-x-auto scrollbar-thin">
                      {val.books.map((book, i) => (
                        <BookCard key={i} book={book} />
                      ))}
                    </div>
                  </div>
                );
              })
            : data.map((val, i) => {
                return (
                  <div className="flex-[0_0_100%]" key={i}>
                    <h3 className="text-center font-normal lowercase scrollbar-none">{val.name}</h3>
                    <hr className="mb-5 h-1 w-full bg-primary scrollbar-none" />
                    <div className="flex w-full items-center justify-between gap-3 overflow-x-auto scrollbar-thin">
                      {val.books.map((book, i) => (
                        <BookCard key={i} book={book} />
                      ))}
                    </div>
                  </div>
                );
              })}
        </div>
      </div>
      <div className="mt-8 flex w-full items-center justify-center gap-2">
        {Array.from({ length: count }, (_, i) => i).map((_, i) => (
          <div
            key={i}
            className={cn("h-2 w-2 cursor-pointer rounded-full bg-secondary-300", { "bg-primary": i === index })}
            onClick={() => {
              setIndex(i);
              setIndexToSessionStorage(i);
              emblaApi?.scrollTo(i);
            }}
          ></div>
        ))}
      </div>
      <div className={cn("mt-5 flex w-full items-center justify-center gap-x-9")}>
        <span onClick={scrollPrev} className={cn("flex cursor-pointer items-center")}>
          <ArrowLeftCircle />
        </span>
        <span onClick={scrollNext} className={cn("flex cursor-pointer items-center")}>
          <ArrowRightCircle />
        </span>
      </div>
    </div>
  );
}
