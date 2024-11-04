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
import QuickSearch from "./quick-search/quick-search";

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
        <div
          className={cn("", {
            "grid grid-cols-[auto_1fr_auto] gap-x-2 py-1 xs:gap-x-4 radix-xs:gap-x-10 md:grid-cols-[auto_1fr_auto_auto] md:gap-x-1":
              rootPathname !== "/search",
            "flex items-center justify-between": rootPathname === "/search",
          })}
        >
          <div>
            <Logo className="hidden md:block" onClick={() => setShowMobileMenu(false)} />
            {showMobileMenu ? (
              <Close className="block md:hidden" onClick={() => setShowMobileMenu(false)} />
            ) : (
              <Hamburger className="block md:hidden" onClick={() => setShowMobileMenu(true)} />
            )}
          </div>

          <div className={cn("flex items-center")}>
            {rootPathname !== "/search" ? <QuickSearch className="w-full" /> : <Logo className="block md:hidden" />}
          </div>

          <div className="hidden md:flex md:items-center">
            <NavLinks device={"no-mobile"} routesArr={navLinkArr} rootPathname={rootPathname} className="w-full" />
          </div>

          <div className="flex items-center">
            <NavBarRight routesArr={navAuthLinkArr} />
          </div>
        </div>
      </Container>
      {showMobileMenu && (
        <NavMenu className={cn("block md:hidden")} onClick={() => setShowMobileMenu(false)}>
          <NavLinks device={"mobile"} routesArr={navLinkArr} rootPathname={rootPathname} />
          {rootPathname !== "/search" && (
            <Logo className="mt-5 block text-xl" onClick={() => setShowMobileMenu(false)} />
          )}
        </NavMenu>
      )}
    </nav>
  );
}
