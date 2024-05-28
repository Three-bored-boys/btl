import SectionPreamble from "@/client/components/modules/home/section-preamble";
import Container from "@/client/components/layouts/container";
import type { BestSeller } from "@/libs/server/src/types";
import { fetchData } from "@/libs/client/src/hooks";
import NYTBestSellersSectionClient from "./nyt-best-sellers-section-client";
import { Suspense } from "react";

export default function NYTBestSellersSection() {
  return (
    <section className="w-full py-10">
      <Container>
        <SectionPreamble title="NYT Best Sellers">
          Explore the latest books on the NYT Best Sellers List
        </SectionPreamble>
        <Suspense fallback={<h1>Loading.....</h1>}>
          <GetBestSellersWrapper />
        </Suspense>
      </Container>
    </section>
  );
}

async function GetBestSellersWrapper() {
  const bestSellers = await fetchData<BestSeller[]>(`${process.env.NEXT_PUBLIC_API_URL}/books/best-sellers`);

  return <NYTBestSellersSectionClient bestSellers={bestSellers} />;
}
