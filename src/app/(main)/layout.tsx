import { ReactElement } from "react";
import NavBar from "@/client/components/layouts/navigation-bar/nav-bar";
import Footer from "@/libs/client/src/components/layouts/footer/footer";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): ReactElement {
  return (
    <>
      <NavBar />
      {children}
      <Footer />
    </>
  );
}
