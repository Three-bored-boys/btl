import GenresSection from "@/libs/client/src/components/modules/home/genres-section/genres-section";
import Footer from "@/libs/client/src/components/layouts/footer/footer";
import Header from "@/libs/client/src/components/modules/home/header/header";

export default function Home() {
  return (
    <>
      <Header />
      <GenresSection />
      <Footer />
    </>
  );
}
