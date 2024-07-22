import Container from "@/libs/client/src/components/layouts/container";
import type { Book } from "@/root/src/libs/server/src/types";
import { ComponentProps } from "react";
import Image from "next/image";

const genericBookImage = "/assets/images/generic-book.png";

type BookInformationProps = { book: Book } & ComponentProps<"div">;

export default function BookInformation({ book, ...props }: BookInformationProps) {
  return (
    <div {...props} className="mt-3">
      <Container>
        <div className="grid w-full grid-cols-[10rem_1fr] gap-4">
          <div className="w-32 min-w-28 sm:w-40 sm:min-w-36" {...props}>
            <Image
              src={book.image ? book.image : genericBookImage}
              alt={`${book.title} by ${book.author}`}
              className="mx-auto h-44 w-full rounded-lg object-cover sm:h-60"
              width={500}
              height={500}
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
