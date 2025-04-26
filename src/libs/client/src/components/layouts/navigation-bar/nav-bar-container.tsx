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
