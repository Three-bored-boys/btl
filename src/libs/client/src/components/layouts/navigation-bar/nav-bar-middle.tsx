"use client";

import { useRootPathnameContext } from "@/client/hooks/root-pathname";
import { QuickSearch } from "@/client/components/modules/quick-search/quick-search";
import { Logo } from "@/client/components/ui/logo";

export const NavBarMiddle = function () {
  const { rootPathname } = useRootPathnameContext();

  if (rootPathname !== "/search") {
    return (
      <div className="flex items-center justify-center">
        <QuickSearch className="w-full" />
      </div>
    );
  }

  return (
    <div className="hidden">
      <Logo className="block md:hidden" />
    </div>
  );
};
