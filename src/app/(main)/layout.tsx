import { ReactElement } from "react";
import { NavBar } from "@/client/components/layouts/navigation-bar/nav-bar";
import { Footer } from "@/libs/client/src/components/layouts/footer/footer";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): ReactElement {
  return (
    <div className="relative grid min-h-screen grid-cols-1 grid-rows-[auto_1fr_auto]">
      <NavBar />
      {children}
      <Footer />
    </div>
  );
}
