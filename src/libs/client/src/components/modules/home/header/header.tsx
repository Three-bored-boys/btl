import NavBar from "../../../layouts/navigation-bar/nav-bar";
import HeroSection from "./hero-section";

export default function Header() {
  return (
    <header className="w-full pb-10">
      <NavBar />
      <HeroSection />
    </header>
  );
}
