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
    <div {...props} className="flex items-center justify-between">
      <div className={cn({ "invisible cursor-default": genre === 0 })}>
        <ArrowLeft onClick={prevGenre} />
      </div>

      <div>
        <h2 className="hover:text-brown-400 cursor-pointer border-b-4 border-transparent px-4 text-center text-xs uppercase lg:text-lg">
          {genres[genre].name}
        </h2>
        <hr className="mb-5 h-1 w-full bg-primary" />
        <GenreBooksShowcase heading={genres[genre].name} />
      </div>

      <div className={cn({ "invisible cursor-default": genre === count - 1 })}>
        <ArrowRight onClick={nextGenre} />
      </div>
    </div>
  );
}
