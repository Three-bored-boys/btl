import { GenresSection } from "@/libs/client/src/components/modules/home-page/genres-section/genres-section";
import { HeroSection } from "@/libs/client/src/components/modules/home-page/hero-section/hero-section";
import { NYTBestSellersSection } from "@/libs/client/src/components/modules/home-page/nyt-best-sellers-section/nyt-best-sellers-section";
import { QuotesSection } from "@/libs/client/src/components/modules/home-page/quotes-section/quotes-section";

export default function Home() {
  return (
    <div className="w-full">
      <HeroSection />
      <hr className="mx-auto w-1/2 min-w-[15rem]" />
      <QuotesSection />
      <hr className="mx-auto w-1/2 min-w-[15rem]" />
      <GenresSection />
      <hr className="mx-auto w-1/2 min-w-[15rem]" />
      <NYTBestSellersSection />
    </div>
  );
}
