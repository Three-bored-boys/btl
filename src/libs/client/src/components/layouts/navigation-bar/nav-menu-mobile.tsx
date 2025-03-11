"use client";

import { NavMenu } from "./nav-menu";
import { NavLinks } from "./nav-links";
import { Logo } from "@/client/components/ui/logo";
import { cn } from "@/client/utils";
import { useRootPathnameContext } from "@/client/hooks/root-pathname";
import { useMobileMenuContext } from "@/client/hooks/show-mobile-menu";
import { type NavLinkArr } from "./nav-bar";

export const NavMenuMobile = function ({ navLinkArr }: { navLinkArr: NavLinkArr }) {
  const { rootPathname } = useRootPathnameContext();
  const { showMobileMenu, setShowMobileMenu } = useMobileMenuContext();

  if (!showMobileMenu) return null;

  return (
    <NavMenu className={cn("block md:hidden")} onClick={() => setShowMobileMenu(false)}>
      <NavLinks device={"mobile"} routesArr={navLinkArr} rootPathname={rootPathname} className="mb-5" />
      <Logo className="inline text-xl" onClick={() => setShowMobileMenu(false)} />
    </NavMenu>
  );
};
