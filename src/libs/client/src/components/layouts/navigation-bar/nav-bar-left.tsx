"use client";

import { useMobileMenuContext } from "@/client/hooks/show-mobile-menu";
import { Logo } from "@/client/components/ui/logo";
import { Close } from "@/client/components/ui/icons/close";
import { Hamburger } from "@/client/components/ui/icons/hamburger";

export const NavBarLeft = function () {
  const { showMobileMenu, setShowMobileMenu } = useMobileMenuContext();

  return (
    <div className="flex items-center justify-center">
      <Logo className="hidden md:block" onClick={() => setShowMobileMenu(false)} />
      {showMobileMenu ? (
        <Close className="block md:hidden" onClick={() => setShowMobileMenu(false)} />
      ) : (
        <Hamburger className="block md:hidden" onClick={() => setShowMobileMenu(true)} />
      )}
    </div>
  );
};
