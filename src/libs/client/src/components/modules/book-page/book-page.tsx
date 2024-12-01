import { Container } from "@/libs/client/src/components/layouts/container";
import type { Book } from "@/root/src/libs/shared/src/types";
import { ComponentProps } from "react";
import Image from "next/image";
import genericBookImage from "@/public/assets/images/generic-book.png";
import { BookInformation } from "./book-information";
import { BookLocationRadioGroup } from "./book-location-radio-group";

type BookPageProps = { book: Book } & ComponentProps<"div">;

export function BookPage({ book, ...props }: BookPageProps) {
  return (
    <div className="mt-5" {...props}>
      <Container>
        <div className="grid w-full grid-cols-1 gap-4 px-6 sm:grid-cols-[11rem_1fr] sm:gap-7 sm:px-3 md:grid-cols-[12rem_1fr] md:gap-10 lg:grid-cols-[14.5rem_1fr] lg:gap-16 xl:grid-cols-[16rem_1fr] xl:gap-20 2xl:grid-cols-[18rem_1fr] 2xl:gap-28">
          <div className="mx-auto aspect-[10/16] w-2/4 border-[1px] border-gray-950 sm:w-full">
            <Image
              src={book.image || genericBookImage}
              alt={`${book.title} by ${book.author}`}
              className="mx-auto h-full w-full object-cover"
              width={500}
              height={500}
            />
          </div>
          <div className="truncate text-pretty">
            <div className="flex items-center justify-center sm:block">
              {book.categories?.map((category, i) => (
                <div key={i} className="mb-3 inline-block rounded-xl bg-secondary-50 px-3 py-0.5 text-secondary-300">
                  {category}
                </div>
              ))}
            </div>
            <h2 className="mb-3 text-center font-semibold sm:text-left">{book.title}</h2>
            <h3 className="mb-4 text-center italic sm:text-left">{book.author}</h3>
            <BookInformation book={book} />
            <BookLocationRadioGroup />
          </div>
        </div>
      </Container>
    </div>
  );
}
