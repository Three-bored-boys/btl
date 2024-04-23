"use client";

import Logo from "../../ui/logo";
import React from "react";
import NavLinks from "./nav-links";
import NavBarRight from "./nav-bar-right";
import NavMenu from "./nav-menu";
import Hamburger from "@/client/components/ui/icons/hamburger";
import Close from "@/client/components/ui/icons/close";
import { cn, containerStyleClasses } from "@/client/utils";

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

export default function NavBar(): React.ReactElement {
  const [showMobileMenu, setShowMobileMenu] = React.useState<boolean>(false);

  return (
    <nav className="relative w-full shadow-lg">
      <div
        className={cn(
          "flex items-center justify-between py-2",
          containerStyleClasses,
        )}
      >
        <div>
          <Logo
            className="hidden md:block"
            onClick={() => setShowMobileMenu(false)}
          />
          {showMobileMenu ? (
            <Close
              className="block md:hidden"
              onClick={() => setShowMobileMenu(false)}
            />
          ) : (
            <Hamburger
              className="block md:hidden"
              onClick={() => setShowMobileMenu(true)}
            />
          )}
        </div>

        <div>
          <Logo
            className="block text-2xl md:hidden"
            onClick={() => setShowMobileMenu(false)}
          />
          <div className="hidden md:block">
            <NavLinks device={"no-mobile"} routesArr={navLinkArr} />
          </div>
        </div>

        <NavBarRight routesArr={navAuthLinkArr} />
      </div>
      {showMobileMenu ? (
        <NavMenu
          className="block md:hidden"
          onClick={() => setShowMobileMenu(false)}
        >
          <NavLinks device={"mobile"} routesArr={navLinkArr} />
        </NavMenu>
      ) : null}
    </nav>
  );
}
