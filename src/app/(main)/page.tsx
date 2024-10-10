import GenresSection from "@/libs/client/src/components/modules/home/genres-section/genres-section";
import HeroSection from "@/libs/client/src/components/modules/home/hero-section/hero-section";
import NYTBestSellersSection from "@/libs/client/src/components/modules/home/nyt-best-sellers-section/nyt-best-sellers-section";
import QuotesSection from "@/libs/client/src/components/modules/home/quotes-section/quotes-section";

export const revalidate = 0;

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
