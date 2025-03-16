"use client";

import { NavMenu } from "./nav-menu";
import { NavLinks } from "./nav-links";
import { Logo } from "@/client/components/ui/logo";
import { cn } from "@/client/utils";
import { useMobileMenuContext } from "@/client/hooks/show-mobile-menu";
import { type NavLinkArr } from "./nav-bar";
import { SanitizedUser } from "@/root/src/libs/shared/src/db/schema";

export const NavMenuMobile = function ({ navLinkArr, user }: { navLinkArr: NavLinkArr; user: SanitizedUser | null }) {
  const { showMobileMenu, setShowMobileMenu } = useMobileMenuContext();

  if (!showMobileMenu) return null;

  return (
    <NavMenu className={cn("block md:hidden")} onClick={() => setShowMobileMenu(false)}>
      <NavLinks device={"mobile"} routesArr={navLinkArr} className="mb-5" user={user} />
      <Logo className="inline text-xl" onClick={() => setShowMobileMenu(false)} />
    </NavMenu>
  );
};
