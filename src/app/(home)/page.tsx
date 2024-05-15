import GenresSection from "@/libs/client/src/components/modules/home/genres-section/genres-section";
import Footer from "@/libs/client/src/components/layouts/footer/footer";
import Header from "@/libs/client/src/components/modules/home/header/header";
import NavBar from "@/libs/client/src/components/layouts/navigation-bar/nav-bar";

export default function Home() {
  return (
    <main className="relative">
      <NavBar />
      <Header />
      <GenresSection />
      <Footer />
    </main>
  );
}
