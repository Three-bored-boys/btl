"use client";

import { cn } from "@/libs/client/src/utils";
import ArrowLeftCircle from "../../../ui/icons/arrow-left-circle";
import ArrowRightCircle from "../../../ui/icons/arrow-right-circle";
import GenreBooksShowcase from "./genre-books-showcase";
import { Genres } from "@/libs/server/src/types";
import { ComponentProps, useState } from "react";

type GenresSectionClientProps = Genres & ComponentProps<"div">;

export default function GenresSectionClient({ genres, count, ...props }: GenresSectionClientProps) {
  const [genre, setGenre] = useState<number>(0);

  const nextGenre = function () {
    if (genre < count - 1 && genre >= 0) {
      setGenre((gen) => gen + 1);
    }
  };

  const prevGenre = function () {
    if (genre > 0) {
      setGenre((gen) => gen - 1);
    }
  };

  return (
    <div className="w-full flex-col items-center" {...props}>
      <div className="w-full overflow-x-auto">
        <h2 className="text-center text-base font-semibold uppercase scrollbar-none md:text-lg lg:text-xl">
          {genres[genre].name}
        </h2>
        <hr className="mb-5 h-1 w-full bg-primary scrollbar-none" />
        <GenreBooksShowcase heading={genres[genre].name} />
      </div>
      <div className="mt-8 flex w-full items-center justify-center gap-2">
        {genres.map((_, i) => (
          <div
            key={i}
            className={cn("h-2 w-2 cursor-pointer rounded-full bg-secondary-300", { "bg-primary": i === genre })}
            onClick={() => setGenre(i)}
            title={_.name}
          ></div>
        ))}
      </div>
      <div className={cn("mt-5 flex w-full items-center justify-center")}>
        <span
          onClick={prevGenre}
          className={cn({ "invisible cursor-default": genre === 0 }, "mr-9 flex cursor-pointer items-center")}
        >
          <ArrowLeftCircle />
        </span>
        <span
          onClick={nextGenre}
          className={cn({ "invisible cursor-default": genre === count - 1 }, "flex cursor-pointer items-center")}
        >
          <ArrowRightCircle />
        </span>
      </div>
    </div>
  );
}
