import { ReactElement } from "react";
import NavBar from "@/client/components/layouts/navigation-bar/nav-bar";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): ReactElement {
  return (
    <>
      <NavBar />
      {children}
    </>
  );
}
