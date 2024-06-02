"use client";

import { cn } from "@/libs/client/src/utils";
import ArrowLeftCircle from "../../../ui/icons/arrow-left-circle";
import ArrowRightCircle from "../../../ui/icons/arrow-right-circle";
import type { BestSellers } from "@/libs/server/src/types";
import BookCard from "../book-card";
import { useState, ComponentProps } from "react";

type NYTBestSellersSectionClientProps = BestSellers & ComponentProps<"div">;

export default function NYTBestSellersSectionClient({ bestSellers, ...props }: NYTBestSellersSectionClientProps) {
  const [category, setCategory] = useState<number>(0);

  const nextCategory = function () {
    if (category < bestSellers.length - 1 && category >= 0) {
      setCategory((cat) => cat + 1);
    }
  };

  const prevCategory = function () {
    if (category > 0) {
      setCategory((cat) => cat - 1);
    }
  };

  return (
    <div className="w-full flex-col items-center" {...props}>
      <div className="w-full overflow-x-auto">
        <h2 className="text-center text-base font-semibold uppercase scrollbar-none md:text-lg lg:text-xl">
          {bestSellers[category].name}
        </h2>
        <hr className="mb-5 h-1 w-full bg-primary scrollbar-none" />
        <div className="flex w-full items-center justify-between gap-3 overflow-x-auto scrollbar-thin">
          {bestSellers[category].books.map((book, i) => (
            <BookCard key={i} book={book} />
          ))}
        </div>
      </div>
      <div className="mt-8 flex w-full items-center justify-center gap-2">
        {bestSellers.map((_, i) => (
          <div
            key={i}
            className={cn("h-2 w-2 cursor-pointer rounded-full bg-secondary-300", { "bg-primary": i === category })}
            onClick={() => setCategory(i)}
            title={_.name}
          ></div>
        ))}
      </div>
      <div className={cn("mt-5 flex w-full items-center justify-center")}>
        <span
          onClick={prevCategory}
          className={cn({ "invisible cursor-default": category === 0 }, "mr-9 flex cursor-pointer items-center")}
        >
          <ArrowLeftCircle />
        </span>
        <span
          onClick={nextCategory}
          className={cn(
            { "invisible cursor-default": category === bestSellers.length - 1 },
            "flex cursor-pointer items-center",
          )}
        >
          <ArrowRightCircle />
        </span>
      </div>
    </div>
  );
}
