"use client";

import { cn } from "@/libs/client/src/utils";
import ArrowLeft from "../../../ui/icons/arrow-left";
import ArrowRight from "../../../ui/icons/arrow-right";
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
    <div className="w-full flex-col items-center">
      <div {...props} className="w-full lg:grid lg:grid-cols-[auto_1fr_auto]">
        <div className={cn({ "invisible cursor-default": genre === 0 }, "hidden lg:flex lg:items-center")}>
          <ArrowLeft onClick={prevGenre} />
        </div>

        <div className="overflow-x-auto scrollbar-none">
          <h2 className="cursor-pointer overflow-x-auto border-b-4 border-transparent px-4 text-center text-xs uppercase scrollbar-none lg:text-lg">
            {genres[genre].name}
          </h2>
          <hr className="mb-5 h-1 w-full overflow-x-auto bg-primary scrollbar-none" />
          <div className="flex w-full items-center justify-between gap-3 overflow-x-auto scrollbar-none">
            <GenreBooksShowcase heading={genres[genre].name} />
          </div>
        </div>

        <div className={cn({ "invisible cursor-default": genre === count - 1 }, "hidden lg:flex lg:items-center")}>
          <ArrowRight onClick={nextGenre} />
        </div>
      </div>
      <div className={cn("flex w-full items-center justify-center lg:hidden")}>
        <ArrowLeft onClick={prevGenre} className={cn({ "invisible cursor-default": genre === 0 })} />
        <ArrowRight onClick={nextGenre} className={cn({ "invisible cursor-default": genre === count - 1 })} />
      </div>
    </div>
  );
}
