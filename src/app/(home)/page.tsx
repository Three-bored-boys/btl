import GenresSection from "@/libs/client/src/components/modules/home/genres-section/genres-section";
import Footer from "@/libs/client/src/components/layouts/footer/footer";
import NavBar from "@/libs/client/src/components/layouts/navigation-bar/nav-bar";
import HeroSection from "@/libs/client/src/components/modules/home/hero-section/hero-section";

export default function Home() {
  return (
    <main className="relative">
      <NavBar />
      <HeroSection />
      <GenresSection />
      <Footer />
    </main>
  );
}
