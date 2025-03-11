"use client";

import { NavLinks } from "./nav-links";
import { useRootPathnameContext } from "@/client/hooks/root-pathname";
import { type NavLinkArr } from "./nav-bar";

export const NavLinksMain = function ({ navLinkArr }: { navLinkArr: NavLinkArr }) {
  const { rootPathname } = useRootPathnameContext();

  return (
    <div className="hidden md:flex md:items-center">
      <NavLinks device={"no-mobile"} routesArr={navLinkArr} rootPathname={rootPathname} className="w-full" />
    </div>
  );
};
