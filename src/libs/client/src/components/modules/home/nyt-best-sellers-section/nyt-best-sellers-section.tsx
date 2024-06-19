import SectionPreamble from "@/client/components/modules/home/section-preamble";
import Container from "@/client/components/layouts/container";
import type { BestSeller } from "@/libs/server/src/types";
import { fetchData } from "@/libs/client/src/hooks";
import { Suspense } from "react";
import SectionBooksShowcase from "../section-books-showcase";
import LoadingSkeleton from "../loading-skeleton";
import BookCard from "../book-card";

export default function NYTBestSellersSection() {
  return (
    <section className="w-full py-10">
      <Container>
        <SectionPreamble title="NYT Best Sellers">
          Explore the latest books on the NYT Best Sellers List
        </SectionPreamble>
        <Suspense fallback={<LoadingSkeleton />}>
          <GetBestSellersWrapper />
        </Suspense>
      </Container>
    </section>
  );
}

async function GetBestSellersWrapper() {
  const data = await fetchData<BestSeller[]>(`${process.env.NEXT_PUBLIC_API_URL}/books/best-sellers`);

  return (
    <SectionBooksShowcase name="best-sellers" count={data.length} sessionStorageKey="best-sellers-index">
      {data.map((val, i) => {
        return (
          <div className="flex-[0_0_100%]" key={i}>
            <h3 className="text-center font-normal lowercase scrollbar-none">{val.name}</h3>
            <hr className="mb-5 h-1 w-full bg-primary scrollbar-none" />
            <div className="flex w-full items-center justify-between gap-3 overflow-x-auto scrollbar-thin">
              {val.books.map((book, i) => (
                <BookCard key={i} book={book} />
              ))}
            </div>
          </div>
        );
      })}
    </SectionBooksShowcase>
  );
}
