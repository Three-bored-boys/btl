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
import MagnifyingGlass from "@/client/components/ui/icons/magnifying-glass";

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
      <Container>
        <div className="grid grid-cols-[auto_1fr_auto] gap-x-6 py-1 radix-xs:gap-x-16 md:grid-cols-[auto_1fr_1fr_auto] md:gap-x-6">
          <div>
            <Logo className="hidden md:block" onClick={() => setShowMobileMenu(false)} />
            {showMobileMenu ? (
              <Close className="block md:hidden" onClick={() => setShowMobileMenu(false)} />
            ) : (
              <Hamburger className="block md:hidden" onClick={() => setShowMobileMenu(true)} />
            )}
          </div>

          <div className="flex items-center justify-start gap-1">
            <MagnifyingGlass />
            <input
              type="search"
              className="w-full rounded-lg border-2 px-1 text-base outline-none sm:w-4/5 md:w-full lg:text-lg"
              placeholder="Enter a book or string..."
            ></input>
          </div>

          <div className="hidden md:flex md:items-center">
            <NavLinks device={"no-mobile"} routesArr={navLinkArr} rootPathname={rootPathname} className="w-full" />
          </div>

          <div>
            <NavBarRight routesArr={navAuthLinkArr} />
          </div>
        </div>
      </Container>
      {showMobileMenu && (
        <NavMenu className={cn("block md:hidden")} onClick={() => setShowMobileMenu(false)}>
          <NavLinks device={"mobile"} routesArr={navLinkArr} rootPathname={rootPathname} />
          <Logo className="mt-5 block text-xl" onClick={() => setShowMobileMenu(false)} />
        </NavMenu>
      )}
    </nav>
  );
}
