import { SanitizedUser } from "@/root/src/libs/shared/src/db/schema";
import React from "react";
import { Container } from "@/client/components/layouts/container";
import { ExclamationTriangle } from "@/client/components/ui/icons/exclamation-triangle";
import { getRecentlyAddedBooks } from "@/server/actions";
import { BookCard } from "./book-card";
import { SectionPreamble } from "./section-preamble";

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

  return (
    <RecentlyAddedLayout>
      <div className="grid grid-cols-5 gap-10">
        {data.map((obj, i) => (
          <div key={i}>
            <BookCard book={obj.book}></BookCard>
            <div className="mt-4 text-wrap text-sm italic">Added to collection at {obj.date.toString()}</div>
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
