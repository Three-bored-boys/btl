"use client";

import Logo from "../../ui/logo";
import React from "react";
import NavLinks from "./nav-links";
import NavBarRight from "./nav-bar-right";
import NavMenu from "./nav-menu";
import Hamburger from "@/client/components/ui/icons/hamburger";
import Close from "@/client/components/ui/icons/close";
import { usePathname } from "next/navigation";
import Container from "../container";
import { cn } from "../../../utils";

const navLinkArr = [
  { name: "Home", path: "/" },
  { name: "Library", path: "/library" },
  { name: "Search", path: "/search" },
] as const;

const navAuthLinkArr = [
  { name: "Log In", path: "/login" },
  { name: "Register", path: "/register" },
] as const;

export type NavLinkArr = typeof navLinkArr;
export type NavAuthLinkArr = typeof navAuthLinkArr;

export default function NavBar({ className, ...props }: React.ComponentProps<"nav">): React.ReactElement {
  const getRootPathname = (path: string): string => {
    return "/" + path.split("/")[1];
  };

  const pathname = usePathname();

  const [showMobileMenu, setShowMobileMenu] = React.useState<boolean>(false);

  const [rootPathname, setRootPathname] = React.useState<string>(getRootPathname(pathname));

  React.useEffect(() => {
    setRootPathname(getRootPathname(pathname));
  }, [pathname]);

  return (
    <nav className={cn("relative w-full shadow-lg", className)} {...props}>
      <Container className="flex items-center justify-between py-2">
        <div>
          <Logo className="hidden md:block" onClick={() => setShowMobileMenu(false)} />
          {showMobileMenu ? (
            <Close className="block md:hidden" onClick={() => setShowMobileMenu(false)} />
          ) : (
            <Hamburger className="block md:hidden" onClick={() => setShowMobileMenu(true)} />
          )}
        </div>

        <div>
          <Logo className="block text-2xl md:hidden" onClick={() => setShowMobileMenu(false)} />
          <div className="hidden md:block">
            <NavLinks device={"no-mobile"} routesArr={navLinkArr} rootPathname={rootPathname} />
          </div>
        </div>

        <NavBarRight routesArr={navAuthLinkArr} />
      </Container>
      {showMobileMenu ? (
        <NavMenu className={cn("block md:hidden")} onClick={() => setShowMobileMenu(false)}>
          <NavLinks device={"mobile"} routesArr={navLinkArr} rootPathname={rootPathname} />
        </NavMenu>
      ) : null}
    </nav>
  );
}
