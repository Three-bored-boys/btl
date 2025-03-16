"use client";

import { cn } from "@/client/utils";
import React from "react";
import { useRootPathnameContext } from "@/client/hooks/root-pathname";
import { Container } from "../container";

export const NavBarContainer = function ({ children }: { children: React.ReactNode }) {
  const { rootPathname } = useRootPathnameContext();

  return (
    <Container>
      <div
        className={cn("py-1", {
          "grid grid-cols-[auto_1fr_auto] gap-x-2 xs:gap-x-4 radix-xs:gap-x-10 md:grid-cols-[auto_1fr_auto_auto] md:gap-x-1":
            rootPathname !== "/search",
          "flex items-center justify-between": rootPathname === "/search",
        })}
      >
        {children}
      </div>
    </Container>
  );
};

/* <div className="flex items-center justify-center">
        <Logo className="hidden md:block" onClick={() => setShowMobileMenu(false)} />
        {showMobileMenu ? (
          <Close className="block md:hidden" onClick={() => setShowMobileMenu(false)} />
        ) : (
          <Hamburger className="block md:hidden" onClick={() => setShowMobileMenu(true)} />
        )}
      </div>

      {rootPathname !== "/search" ? (
        <div className="flex items-center justify-center">
          <QuickSearch className="w-full" />
        </div>
      ) : (
        <div className="hidden">
          <Logo className="block md:hidden" />
        </div>
      )}

      <div className="hidden md:flex md:items-center">
        <NavLinks device={"no-mobile"} routesArr={navLinkArr} rootPathname={rootPathname} className="w-full" />
      </div>

      <div className="flex items-center">
        <NavBarRight routesArr={navAuthLinkArr} />
      </div> */
