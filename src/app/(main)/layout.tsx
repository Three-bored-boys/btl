import { ReactElement } from "react";
import NavBar from "@/client/components/layouts/navigation-bar/nav-bar";
import Footer from "@/libs/client/src/components/layouts/footer/footer";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): ReactElement {
  return (
    <div className="relative flex min-h-screen flex-col">
      <NavBar />
      {children}
      <Footer />
    </div>
  );
}
