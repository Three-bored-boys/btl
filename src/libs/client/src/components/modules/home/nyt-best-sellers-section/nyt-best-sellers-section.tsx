import SectionPreamble from "@/client/components/modules/home/section-preamble";
import Container from "@/client/components/layouts/container";
import type { BestSeller } from "@/libs/server/src/types";
import { fetchData } from "@/libs/client/src/hooks";
import { Suspense } from "react";
import SectionBooksShowcase from "../section-books-showcase";
import LoadingSkeleton from "../loading-skeleton";

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
  const bestSellers = await fetchData<BestSeller[]>(`${process.env.NEXT_PUBLIC_API_URL}/books/best-sellers`);

  return (
    <SectionBooksShowcase
      name="best-sellers"
      data={bestSellers}
      count={bestSellers.length}
      sessionStorageKey="best-sellers-index"
    />
  );
}
