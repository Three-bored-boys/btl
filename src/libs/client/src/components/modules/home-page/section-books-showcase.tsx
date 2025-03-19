"use client";

import { cn } from "@/client/utils";
import { ArrowLeftCircle } from "@/client/components/ui/icons/arrow-left-circle";
import { ArrowRightCircle } from "@/client/components/ui/icons/arrow-right-circle";
import { ComponentProps, useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";

type SectionBooksShowcaseProps = (
  | {
      name: "genres";

      count: number;
      localStorageKey: "genres-index";
    }
  | { name: "best-sellers"; count: number; localStorageKey: "best-sellers-index" }
) &
  ComponentProps<"div">;

export function SectionBooksShowcase({ name, count, localStorageKey, children, ...props }: SectionBooksShowcaseProps) {
  const [index, setIndex] = useState<number>(0);
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false, duration: 30, startIndex: 0, watchDrag: false });

  const getIndexFromLocalStorage = useCallback(
    (localStorageIndex: number) => {
      if (localStorageIndex && emblaApi) {
        if (localStorageIndex >= 0 && localStorageIndex < count) {
          setIndex(localStorageIndex);
          emblaApi.scrollTo(localStorageIndex);
        } else if (localStorageIndex >= count) {
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

  const setIndexToLocalStorage = useCallback(
    (indexToSet: number) => {
      if (indexToSet >= 0 && indexToSet < count) {
        window.localStorage.setItem(localStorageKey, String(indexToSet));
      } else if (indexToSet >= count) {
        window.localStorage.setItem(localStorageKey, String(count - 1));
      } else {
        window.localStorage.setItem(localStorageKey, "0");
      }
    },
    [count, localStorageKey],
  );

  useEffect(() => {
    if (typeof window !== "undefined") {
      const startIndex = Number(window.localStorage.getItem(localStorageKey));
      getIndexFromLocalStorage(startIndex);
    }
  }, [name, getIndexFromLocalStorage, localStorageKey]);

  const scrollPrev = useCallback(() => {
    if (emblaApi) {
      if (index > 0 && index < count) {
        emblaApi.scrollPrev();
        const newIndex = index - 1;
        setIndex(newIndex);
        setIndexToLocalStorage(newIndex);
      } else {
        const newIndex = count - 1;
        emblaApi.scrollTo(newIndex);
        setIndex(newIndex);
        setIndexToLocalStorage(newIndex);
      }
    }
  }, [emblaApi, index, count, setIndexToLocalStorage]);

  const scrollNext = useCallback(() => {
    if (emblaApi) {
      if (index < count - 1 && index >= 0) {
        emblaApi.scrollNext();
        const newIndex = index + 1;
        setIndex(newIndex);
        setIndexToLocalStorage(newIndex);
      } else {
        const newIndex = 0;
        emblaApi.scrollTo(newIndex);
        setIndex(newIndex);
        setIndexToLocalStorage(newIndex);
      }
    }
  }, [emblaApi, index, count, setIndexToLocalStorage]);

  return (
    <div className="w-full flex-col items-center" {...props}>
      <div className="overflow-hidden" ref={emblaRef}>
        <div className={cn("flex")}>{children}</div>
      </div>
      <div className="mt-8 flex w-full items-center justify-center gap-2">
        {Array.from({ length: count }, (_, i) => i).map((_, i) => (
          <div
            key={i}
            className={cn("h-2 w-2 cursor-pointer rounded-full bg-secondary-300", { "bg-primary": i === index })}
            onClick={() => {
              setIndex(i);
              setIndexToLocalStorage(i);
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
