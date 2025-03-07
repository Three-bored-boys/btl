import { GenresSection } from "@/libs/client/src/components/modules/home-page/genres-section/genres-section";
import { HeroSection } from "@/libs/client/src/components/modules/home-page/hero-section/hero-section";
import { NYTBestSellersSection } from "@/libs/client/src/components/modules/home-page/nyt-best-sellers-section/nyt-best-sellers-section";
import { QuotesSection } from "@/libs/client/src/components/modules/home-page/quotes-section/quotes-section";

export const dynamic = "force-dynamic"; // 4 days

export default function Home() {
  return (
    <>
      <HeroSection />
      <QuotesSection />
      <GenresSection />
      <NYTBestSellersSection />
    </>
  );
}
