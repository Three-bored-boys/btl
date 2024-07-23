import Container from "@/libs/client/src/components/layouts/container";
import type { Book } from "@/root/src/libs/server/src/types";
import { ComponentProps } from "react";
import Image from "next/image";

const genericBookImage = "/assets/images/generic-book.png";

type BookInformationProps = { book: Book } & ComponentProps<"div">;

export default function BookInformation({ book, ...props }: BookInformationProps) {
  return (
    <div className="mt-5" {...props}>
      <Container>
        <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-[11rem_1fr] md:grid-cols-[12rem_1fr] lg:grid-cols-[14.5rem_1fr] xl:grid-cols-[16rem_1fr] 2xl:grid-cols-[18rem_1fr]">
          <div className="mx-auto aspect-[10/16] w-2/4 border-[1px] border-gray-950 sm:w-full">
            <Image
              src={book.image ? book.image : genericBookImage}
              alt={`${book.title} by ${book.author}`}
              className="mx-auto h-full w-full object-cover"
              width={1000}
              height={1000}
            />
          </div>
          <div className="truncate text-pretty">
            Book Page: {book.isbn13} <br />
            `&quot;`, `&ldquo;`, `&#34;`, `&rdquo;` <br />
            {JSON.stringify(book)}
          </div>
        </div>
      </Container>
    </div>
  );
}
