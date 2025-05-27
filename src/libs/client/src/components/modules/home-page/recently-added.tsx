import { SanitizedUser } from "@/root/src/libs/shared/src/db/schema";
import React from "react";
import { Container } from "@/client/components/layouts/container";
import { ExclamationTriangle } from "@/client/components/ui/icons/exclamation-triangle";
import { getRecentlyAddedBooks } from "@/server/actions";
import { SectionPreamble } from "./section-preamble";
import Link from "next/link";
import Image from "next/image";

const genericBookImage = "/assets/images/generic-book.png";

export async function RecentlyAdded({ user }: { user: SanitizedUser }) {
  const result = await getRecentlyAddedBooks({ user });
  if (!result.success) {
    const { errors, status } = result;
    return (
      <RecentlyAddedLayout>
        <div className="my-2 flex w-full flex-col items-center justify-start gap-y-1">
          <ExclamationTriangle />
          <p className="text-xl font-semibold">Error {status}</p>
          <p className="text-base font-normal">{errors[0]}</p>
        </div>
      </RecentlyAddedLayout>
    );
  }

  const { data } = result;
  if (data.length === 0) {
    return (
      <RecentlyAddedLayout>
        <div>No books in recently added</div>
      </RecentlyAddedLayout>
    );
  }
  console.log(5);

  return (
    <RecentlyAddedLayout>
      <div className="flex w-full items-start justify-between gap-10 overflow-x-auto">
        {data.map(({ book, date }, i) => (
          <div key={i} className="min-w-40 max-w-40">
            <Link href={`/book/${book.isbn13 ? book.isbn13 : book.isbn10}`} className="w-full">
              <Image
                src={book.image ? book.image : genericBookImage}
                alt={`${book.title} by ${book.author}`}
                className="h-60 w-full rounded-lg object-cover"
                width={500}
                height={500}
              />
            </Link>
            <h4 className="truncate font-semibold">{book.title}</h4>
            <p className="truncate">{book.author}</p>
            <p className="mt-4 text-sm italic">Added to collection at {date.toString()}</p>
          </div>
        ))}
      </div>
    </RecentlyAddedLayout>
  );
}

const RecentlyAddedLayout = function ({ children }: { children: React.ReactNode }) {
  return (
    <section className="mb-20 w-full py-10">
      <Container>
        <SectionPreamble title="Recently Added Books To Collection">
          A brief overview of the latest books added to your collection
        </SectionPreamble>
        {children}
      </Container>
    </section>
  );
};
