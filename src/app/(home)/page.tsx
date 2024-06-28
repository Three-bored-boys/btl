import GenresSection from "@/libs/client/src/components/modules/home/genres-section/genres-section";
import Footer from "@/libs/client/src/components/layouts/footer/footer";
import NavBar from "@/libs/client/src/components/layouts/navigation-bar/nav-bar";
import HeroSection from "@/libs/client/src/components/modules/home/hero-section/hero-section";
import NYTBestSellersSection from "@/libs/client/src/components/modules/home/nyt-best-sellers-section/nyt-best-sellers-section";
import QuotesSection from "@/libs/client/src/components/modules/home/quotes-section/quotes-section";

export const revalidate = 0;

export default function Home() {
  console.log("We are Home");
  return (
    <main className="relative">
      <NavBar />
      <HeroSection />
      <QuotesSection />
      <GenresSection />
      <NYTBestSellersSection />
      <Footer />
    </main>
  );
}
