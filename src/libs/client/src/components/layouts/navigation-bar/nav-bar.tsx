import React from "react";
import { NavBarRight } from "./nav-bar-right";
import { cn } from "@/client/utils";
import { NavBarContainer } from "./nav-bar-container";
import { NavMenuMobile } from "./nav-menu-mobile";
import { NavLinksMain } from "./nav-links-main";
import { NavBarMiddle } from "./nav-bar-middle";
import { NavBarLeft } from "./nav-bar-left";

const navLinkArr = [
  { name: "Home", path: "/" },
  { name: "Collection", path: "/collection" },
  { name: "Search", path: "/search" },
] as const;

const navAuthLinkArr = [
  { name: "Log In", path: "/login" },
  { name: "Sign Up", path: "/signup" },
] as const;

export type NavLinkArr = typeof navLinkArr;
export type NavAuthLinkArr = typeof navAuthLinkArr;

export function NavBar({ className, ...props }: React.ComponentProps<"nav">): React.ReactElement {
  return (
    <nav className={cn("relative w-full border-b border-b-secondary-100", className)} {...props}>
      <NavBarContainer>
        <NavBarLeft />
        <NavBarMiddle />
        <NavLinksMain navLinkArr={navLinkArr}></NavLinksMain>
        <div className="flex items-center">
          <NavBarRight routesArr={navAuthLinkArr} />
        </div>
      </NavBarContainer>
      <NavMenuMobile navLinkArr={navLinkArr}></NavMenuMobile>
    </nav>
  );
}
